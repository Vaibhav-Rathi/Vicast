import { NextRequest } from 'next/server';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir, readFile as fsReadFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const execAsync = promisify(exec);

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  // Check if FFmpeg is installed
  try {
    await execAsync('ffmpeg -version');
  } catch (error) {
    console.error('FFmpeg not found:', error);
    return new Response(
      `data: ${JSON.stringify({ 
        type: 'error', 
        error: 'FFmpeg is not installed on the server. Please install FFmpeg or use a cloud service.' 
      })}\n\n`,
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      }
    );
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  processVideo(request, writer, encoder).finally(() => {
    writer.close();
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

async function processVideo(
  request: NextRequest,
  writer: WritableStreamDefaultWriter,
  encoder: TextEncoder
) {
  const tempDir = path.join(process.cwd(), 'temp');
  const sessionId = randomUUID();
  const sessionDir = path.join(tempDir, sessionId);
  
  try {
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'progress', 
      stage: 'Initializing', 
      percentage: 0 
    })}\n\n`));
    
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }
    await mkdir(sessionDir, { recursive: true });
    
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const effects = JSON.parse(formData.get('effects') as string || '[]');
    const captions = formData.get('captions') ? JSON.parse(formData.get('captions') as string) : null;
    
    if (!videoFile) {
      throw new Error('No video file provided');
    }
    
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'progress', 
      stage: 'Uploading', 
      percentage: 10 
    })}\n\n`));
    
    const inputPath = path.join(sessionDir, 'input.webm');
    const outputPath = path.join(sessionDir, 'output.mp4');
    
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    await writeFile(inputPath, videoBuffer);
    
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'progress', 
      stage: 'Preparing', 
      percentage: 20 
    })}\n\n`));
    
    // Build FFmpeg command
    const ffmpegArgs = ['-i', inputPath];
    
    // Handle audio effects
    let audioInputIndex = 1;
    let useProcessedAudio = false;
    
    for (const effect of effects) {
      const audioFile = formData.get(`audio_${effect}`) as File;
      if (audioFile && (effect === 'noise-removal' || effect === 'voice-enhance')) {
        const audioPath = path.join(sessionDir, `audio_${effect}.wav`);
        const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
        await writeFile(audioPath, audioBuffer);
        
        ffmpegArgs.push('-i', audioPath);
        audioInputIndex++;
        useProcessedAudio = true;
        
        await writer.write(encoder.encode(`data: ${JSON.stringify({ 
          type: 'progress', 
          stage: `Applying ${effect}`, 
          percentage: 25 
        })}\n\n`));
      }
    }
    
    if (useProcessedAudio) {
      ffmpegArgs.push('-map', '0:v');
      ffmpegArgs.push('-map', `${audioInputIndex - 1}:a`);
    }
    
    // Handle captions with drawtext filter
    let captionsApplied = false;
    if (captions && effects.includes('auto-captions')) {
      try {
        console.log('Processing captions:', captions.length);
        
        // Build filter complex for captions
        const filters: string[] = [];
        
        // Group captions by time to avoid overlapping
        const sortedCaptions = [...captions].sort((a: any, b: any) => a.start - b.start);
        
        // Process up to 50 captions
        const maxCaptions = 50;
        const captionsToProcess = sortedCaptions.slice(0, maxCaptions);
        
        captionsToProcess.forEach((caption: any, index: number) => {
          // Clean and prepare text
          let text = caption.text
            .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII
            .replace(/\\/g, '')           // Remove backslashes
            .replace(/'/g, '')            // Remove single quotes
            .replace(/"/g, '')            // Remove double quotes
            .replace(/:/g, ' ')           // Replace colons with space
            .replace(/,/g, ' ')           // Replace commas with space
            .replace(/\[/g, '')           // Remove brackets
            .replace(/\]/g, '')
            .replace(/\{/g, '')
            .replace(/\}/g, '')
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .trim();
          
          if (!text) return;
          
          // Build drawtext filter for this caption
          const filter = `drawtext=text='${text}':fontfile=C\\\\:/Windows/Fonts/arial.ttf:fontsize=48:fontcolor=white:borderw=3:bordercolor=black:x=(w-text_w)/2:y=h-100:enable='between(t,${caption.start},${caption.end})'`;
          
          filters.push(filter);
        });
        
        if (filters.length > 0) {
          // Join all filters with comma
          ffmpegArgs.push('-vf', filters.join(','));
          captionsApplied = true;
          console.log(`Applied ${filters.length} caption filters`);
          
          if (captionsToProcess.length < captions.length) {
            console.warn(`Note: Only first ${maxCaptions} captions were processed`);
          }
        }
        
        await writer.write(encoder.encode(`data: ${JSON.stringify({ 
          type: 'progress', 
          stage: 'Adding captions', 
          percentage: 30,
          message: captionsApplied ? 'Captions added successfully' : 'No captions to add'
        })}\n\n`));
        
      } catch (error) {
        console.error('Error in caption processing:', error);
        
        await writer.write(encoder.encode(`data: ${JSON.stringify({ 
          type: 'progress', 
          stage: 'Processing', 
          percentage: 30,
          message: 'Continuing without captions due to error'
        })}\n\n`));
      }
    }
    
    // Add encoding settings
    ffmpegArgs.push(
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '23',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      '-progress', 'pipe:1',
      '-stats_period', '0.5',
      '-y',
      outputPath
    );
    
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'progress', 
      stage: 'Encoding video', 
      percentage: 35 
    })}\n\n`));
    
    console.log('FFmpeg command:', 'ffmpeg', ffmpegArgs.join(' '));
    
    // Execute FFmpeg
    await new Promise<void>((resolve, reject) => {
      let ffmpegCommand = 'ffmpeg';
      
      if (process.platform === 'win32') {
        const possiblePaths = [
          'C:\\ffmpeg\\bin\\ffmpeg.exe',
          'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
          'C:\\Program Files (x86)\\ffmpeg\\bin\\ffmpeg.exe',
        ];
        
        for (const ffmpegPath of possiblePaths) {
          if (existsSync(ffmpegPath)) {
            ffmpegCommand = ffmpegPath;
            break;
          }
        }
      }
      
      console.log('Using FFmpeg command:', ffmpegCommand);
      
      const ffmpeg = spawn(ffmpegCommand, ffmpegArgs, {
        windowsHide: true,
        shell: false,
      });
      
      let duration = 0;
      let lastProgress = 35;
      let errorOutput = '';
      
      ffmpeg.stdout.on('data', (data) => {
        const output = data.toString();
        const lines = output.split('\n');
        
        for (const line of lines) {
          if (line.includes('Duration:') && duration === 0) {
            const match = line.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
            if (match) {
              duration = parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]);
            }
          }
          
          if (line.startsWith('out_time_ms=')) {
            const timeMs = parseInt(line.split('=')[1]);
            const currentTime = timeMs / 1000000;
            
            if (duration > 0) {
              const encodingProgress = (currentTime / duration) * 55;
              const totalProgress = Math.min(90, Math.round(35 + encodingProgress));
              
              if (totalProgress > lastProgress) {
                lastProgress = totalProgress;
                writer.write(encoder.encode(`data: ${JSON.stringify({ 
                  type: 'progress', 
                  stage: 'Encoding video', 
                  percentage: totalProgress 
                })}\n\n`)).catch(() => {});
              }
            }
          }
        }
      });
      
      ffmpeg.stderr.on('data', (data) => {
        const output = data.toString();
        errorOutput += output;
        
        if (output.includes('error') || output.includes('Error')) {
          console.error('FFmpeg error:', output);
        } else {
          console.log('FFmpeg:', output);
        }
        
        if (duration === 0 && output.includes('Duration:')) {
          const match = output.match(/Duration: (\d{2}):(\d{2}):(\d{2})/);
          if (match) {
            duration = parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3]);
          }
        }
      });
      
      ffmpeg.on('close', (code) => {
        if (code !== 0) {
          console.error('FFmpeg failed with output:', errorOutput);
          reject(new Error(`FFmpeg exited with code ${code}`));
        } else {
          console.log('FFmpeg completed successfully');
          resolve();
        }
      });
      
      ffmpeg.on('error', (err) => {
        console.error('FFmpeg spawn error:', err);
        reject(err);
      });
    });
    
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'progress', 
      stage: 'Finalizing', 
      percentage: 95 
    })}\n\n`));
    
    // Verify output file exists
    if (!existsSync(outputPath)) {
      throw new Error('Output file was not created');
    }
    
    const processedVideo = await fsReadFile(outputPath);
    const base64Video = processedVideo.toString('base64');
    
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'complete', 
      video: base64Video,
      mimeType: 'video/mp4',
      filename: `edited_video_${Date.now()}.mp4`,
      captionsApplied: captionsApplied
    })}\n\n`));
    
    // Clean up
    cleanup(sessionDir);
    
  } catch (error) {
    console.error('Video export error:', error);
    
    await writer.write(encoder.encode(`data: ${JSON.stringify({ 
      type: 'error', 
      error: error instanceof Error ? error.message : 'Unknown error occurred during export' 
    })}\n\n`));
    
    if (existsSync(sessionDir)) {
      cleanup(sessionDir);
    }
  }
}

async function cleanup(dir: string) {
  try {
    const { readdir, unlink, rmdir } = await import('fs/promises');
    const files = await readdir(dir);
    
    await Promise.all(
      files.map(file => unlink(path.join(dir, file)))
    );
    
    await rmdir(dir);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
}