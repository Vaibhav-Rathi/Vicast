// app/api/ai/enhance-voice/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
  console.log('=== VOICE ENHANCEMENT API STARTED ===');
  
  let inputPath: string | null = null;
  let outputPath: string | null = null;
  
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const enhancementLevel = formData.get('enhancement_level') || 'medium'; // low, medium, high
    const voiceType = formData.get('voice_type') || 'speech'; // speech, singing, podcast
    
    console.log('Received request:', {
      hasAudioFile: !!audioFile,
      audioFileName: audioFile?.name,
      audioFileSize: audioFile?.size,
      audioFileType: audioFile?.type,
      enhancementLevel: enhancementLevel,
      voiceType: voiceType
    });
    
    if (!audioFile) {
      console.error('No audio file provided in request');
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }
    
    // Validate file type
    if (!audioFile.type.startsWith('audio/') && !audioFile.type.startsWith('video/')) {
      console.error('Invalid file type:', audioFile.type);
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
    
    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Audio buffer created:', {
      bufferSize: buffer.length,
      bufferType: buffer.constructor.name
    });
    
    // Create temporary files
    const timestamp = Date.now();
    inputPath = join(tmpdir(), `input_${timestamp}.webm`);
    outputPath = join(tmpdir(), `enhanced_${timestamp}.wav`);
    
    console.log('Temp file paths:', {
      inputPath,
      outputPath,
      tmpdir: tmpdir()
    });
    
    // Write input file
    writeFileSync(inputPath, buffer);
    console.log('Input file written successfully, size:', buffer.length);
    
    // Method 1: Using FFmpeg with voice enhancement filters
    console.log('Starting FFmpeg enhancement...');
    const enhancedAudio = await enhanceWithFFmpeg(inputPath, outputPath, enhancementLevel as any, voiceType as any);
    
    if (enhancedAudio) {
      console.log('FFmpeg enhancement successful:', {
        outputSize: enhancedAudio.length,
        outputType: enhancedAudio.constructor.name
      });
      
      // Log first few bytes to check if it's valid audio data
      console.log('First 10 bytes of output:', Array.from(enhancedAudio.slice(0, 10)));
      
      // Check if client wants base64 response
      const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
      
      if (wantsBase64) {
        console.log('Returning base64 encoded response');
        // Return as base64 JSON
        const base64Audio = enhancedAudio.toString('base64');
        return NextResponse.json({
          success: true,
          audio: base64Audio,
          mimeType: 'audio/wav',
          size: enhancedAudio.length,
          firstBytes: Array.from(enhancedAudio.slice(0, 10))
        });
      }
      
      // IMPORTANT: Convert Buffer to Uint8Array for proper binary handling
      const uint8Array = new Uint8Array(enhancedAudio);
      
      return new Response(uint8Array, {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Disposition': 'attachment; filename="enhanced_voice.wav"',
          'Content-Length': uint8Array.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    console.log('FFmpeg enhancement failed, trying SoX...');
    
    // Method 2: Fallback to SoX enhancement
    try {
      const soxEnhanced = await enhanceWithSoX(inputPath, outputPath, enhancementLevel as any, voiceType as any);
      if (soxEnhanced) {
        console.log('SoX enhancement successful:', {
          outputSize: soxEnhanced.length,
          outputType: soxEnhanced.constructor.name
        });
        
        // Check if client wants base64 response
        const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
        
        if (wantsBase64) {
          const base64Audio = soxEnhanced.toString('base64');
          return NextResponse.json({
            success: true,
            audio: base64Audio,
            mimeType: 'audio/wav',
            size: soxEnhanced.length
          });
        }
        
        const uint8Array = new Uint8Array(soxEnhanced);
        
        return new Response(uint8Array, {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'Content-Disposition': 'attachment; filename="enhanced_voice.wav"',
            'Content-Length': uint8Array.length.toString(),
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      }
    } catch (soxError) {
      console.error('SoX enhancement failed:', soxError);
    }
    
    // Method 3: Basic voice enhancement fallback
    console.log('Both FFmpeg and SoX failed, using basic fallback...');
    const basicEnhanced = await basicVoiceEnhancement(buffer, enhancementLevel as any, voiceType as any);
    
    console.log('Basic enhancement result:', {
      outputSize: basicEnhanced.length,
      outputType: basicEnhanced.constructor.name
    });
    
    // Check if client wants base64 response
    const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
    
    if (wantsBase64) {
      const base64Audio = basicEnhanced.toString('base64');
      return NextResponse.json({
        success: true,
        audio: base64Audio,
        mimeType: 'audio/wav',
        size: basicEnhanced.length
      });
    }
    
    const uint8Array = new Uint8Array(basicEnhanced);
    
    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="enhanced_voice.wav"',
        'Content-Length': uint8Array.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
    
  } catch (error) {
    console.error('=== VOICE ENHANCEMENT ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({ 
      error: 'Failed to enhance voice',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    // Clean up temporary files
    console.log('Cleaning up temporary files...');
    try {
      if (inputPath) {
        unlinkSync(inputPath);
        console.log('Deleted input file:', inputPath);
      }
      if (outputPath) {
        unlinkSync(outputPath);
        console.log('Deleted output file:', outputPath);
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
    console.log('=== VOICE ENHANCEMENT API COMPLETED ===\n');
  }
}

async function enhanceWithFFmpeg(
  inputPath: string, 
  outputPath: string, 
  enhancementLevel: string, 
  voiceType: string
): Promise<Buffer | null> {
  return new Promise((resolve) => {
    console.log('FFmpeg: Starting with parameters:', {
      inputPath,
      outputPath,
      enhancementLevel,
      voiceType
    });
    
    // Check if ffmpeg is available
    const testFFmpeg = spawn('ffmpeg', ['-version']);
    testFFmpeg.on('error', (error) => {
      console.error('FFmpeg not found:', error.message);
      resolve(null);
    });
    
    testFFmpeg.on('close', (code) => {
      if (code !== 0) {
        console.error('FFmpeg test failed with code:', code);
        resolve(null);
        return;
      }
      
      console.log('FFmpeg is available, proceeding with enhancement...');
      
      // Configure FFmpeg filters based on enhancement level and voice type
      let filterComplex: string;
      
      // Base filters for voice enhancement
      const baseFilters = [
        'highpass=f=80', // Remove low-frequency rumble
        'lowpass=f=8000', // Remove high-frequency noise above human speech
      ];
      
      // Enhancement-specific filters
      let enhancementFilters: string[] = [];
      
      switch (enhancementLevel) {
        case 'low':
          enhancementFilters = [
            'equalizer=f=1000:width_type=h:width=200:g=2', // Slight mid-range boost
            'compand=attacks=0.1:decays=0.3:points=-80/-80|-12.4/-12.4|-6/-8|0/-6.8|20/-2.8'
          ];
          break;
        case 'high':
          enhancementFilters = [
            'equalizer=f=1000:width_type=h:width=200:g=4', // Strong mid-range boost
            'equalizer=f=3000:width_type=h:width=500:g=3', // Presence boost
            'compand=attacks=0.05:decays=0.2:points=-80/-80|-12.4/-12.4|-6/-8|0/-6.8|20/-2.8',
            'aemphasis=level_in=1:level_out=1:mode=reproduction:type=riaa', // De-emphasis
            'dynaudnorm=f=500:g=31:p=0.5:m=10.0:r=0.9:n=1:c=1' // Dynamic range compression
          ];
          break;
        default: // medium
          enhancementFilters = [
            'equalizer=f=1000:width_type=h:width=200:g=3', // Moderate mid-range boost
            'equalizer=f=3000:width_type=h:width=500:g=2', // Slight presence boost
            'compand=attacks=0.1:decays=0.3:points=-80/-80|-12.4/-12.4|-6/-8|0/-6.8|20/-2.8',
            'dynaudnorm=f=500:g=31:p=0.5:m=10.0:r=0.9:n=1' // Moderate dynamic range compression
          ];
      }
      
      // Voice type specific adjustments
      switch (voiceType) {
        case 'singing':
          enhancementFilters.push('equalizer=f=2000:width_type=h:width=1000:g=2'); // Vocal clarity
          break;
        case 'podcast':
          enhancementFilters.push(
            'equalizer=f=200:width_type=h:width=100:g=-2', // Reduce muddiness
            'equalizer=f=5000:width_type=h:width=2000:g=1.5' // Add air/brightness
          );
          break;
        default: // speech
          enhancementFilters.push('equalizer=f=1500:width_type=h:width=300:g=2'); // Speech intelligibility
      }
      
      // Combine all filters
      filterComplex = [...baseFilters, ...enhancementFilters].join(',');
      
      console.log('FFmpeg filter complex:', filterComplex);
      
      const ffmpegArgs = [
        '-i', inputPath,
        '-af', filterComplex,
        '-ar', '44100',
        '-ac', '2',
        '-c:a', 'pcm_s16le',
        '-y', // Overwrite output file
        outputPath
      ];
      
      console.log('FFmpeg command:', 'ffmpeg', ffmpegArgs.join(' '));
      
      const ffmpeg = spawn('ffmpeg', ffmpegArgs);
      
      let stderr = '';
      let stdout = '';
      
      ffmpeg.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      ffmpeg.stderr.on('data', (data) => {
        stderr += data.toString();
        // Log FFmpeg progress
        const progressMatch = data.toString().match(/time=(\d+:\d+:\d+\.\d+)/);
        if (progressMatch) {
          console.log('FFmpeg progress:', progressMatch[1]);
        }
      });
      
      ffmpeg.on('close', (code) => {
        console.log('FFmpeg process exited with code:', code);
        
        if (code === 0) {
          console.log('FFmpeg completed successfully');
          try {
            const outputBuffer = readFileSync(outputPath);
            console.log('FFmpeg output file read successfully:', {
              size: outputBuffer.length,
              firstBytes: Array.from(outputBuffer.slice(0, 10))
            });
            resolve(outputBuffer);
          } catch (readError) {
            console.error('Error reading FFmpeg output:', readError);
            resolve(null);
          }
        } else {
          console.error('FFmpeg failed with code:', code);
          console.error('FFmpeg stderr:', stderr);
          console.error('FFmpeg stdout:', stdout);
          resolve(null);
        }
      });
      
      ffmpeg.on('error', (error) => {
        console.error('FFmpeg spawn error:', error);
        resolve(null);
      });
    });
  });
}

async function enhanceWithSoX(
  inputPath: string, 
  outputPath: string, 
  enhancementLevel: string, 
  voiceType: string
): Promise<Buffer | null> {
  return new Promise((resolve) => {
    console.log('SoX: Starting with parameters:', {
      inputPath,
      outputPath,
      enhancementLevel,
      voiceType
    });
    
    // SoX command for voice enhancement
    let soxArgs: string[] = [inputPath, outputPath];
    
    // Base processing
    soxArgs.push('highpass', '80'); // Remove low-frequency noise
    soxArgs.push('lowpass', '8000'); // Remove high-frequency noise
    
    // Enhancement based on level
    switch (enhancementLevel) {
      case 'low':
        soxArgs.push('equalizer', '1000', '200', '2'); // Mild mid-range boost
        soxArgs.push('compand', '0.1,0.3', '6:-70,-60,-20', '-5');
        break;
      case 'high':
        soxArgs.push('equalizer', '1000', '200', '4'); // Strong mid-range boost
        soxArgs.push('equalizer', '3000', '500', '3'); // Presence boost
        soxArgs.push('compand', '0.05,0.2', '6:-70,-60,-20', '-5', '-90', '0.1');
        soxArgs.push('gain', '2'); // Overall gain boost
        break;
      default: // medium
        soxArgs.push('equalizer', '1000', '200', '3'); // Moderate mid-range boost
        soxArgs.push('equalizer', '3000', '500', '2'); // Slight presence boost
        soxArgs.push('compand', '0.1,0.3', '6:-70,-60,-20', '-5');
    }
    
    // Voice type specific processing
    switch (voiceType) {
      case 'singing':
        soxArgs.push('equalizer', '2000', '1000', '2'); // Vocal clarity
        break;
      case 'podcast':
        soxArgs.push('equalizer', '200', '100', '-2'); // Reduce muddiness
        soxArgs.push('equalizer', '5000', '2000', '1.5'); // Add brightness
        break;
      default: // speech
        soxArgs.push('equalizer', '1500', '300', '2'); // Speech intelligibility
    }
    
    console.log('SoX command:', 'sox', soxArgs.join(' '));
    
    const sox = spawn('sox', soxArgs);
    
    let stderr = '';
    
    sox.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    sox.on('close', (code) => {
      console.log('SoX process exited with code:', code);
      
      if (code === 0) {
        console.log('SoX completed successfully');
        try {
          const outputBuffer = readFileSync(outputPath);
          console.log('SoX output file read successfully:', {
            size: outputBuffer.length,
            firstBytes: Array.from(outputBuffer.slice(0, 10))
          });
          resolve(outputBuffer);
        } catch (readError) {
          console.error('Error reading SoX output:', readError);
          resolve(null);
        }
      } else {
        console.error('SoX failed with code:', code);
        console.error('SoX stderr:', stderr);
        resolve(null);
      }
    });
    
    sox.on('error', (error) => {
      console.error('SoX spawn error:', error);
      resolve(null);
    });
  });
}

async function basicVoiceEnhancement(
  inputBuffer: Buffer, 
  enhancementLevel: string, 
  voiceType: string
): Promise<Buffer> {
  console.log('Basic voice enhancement: Starting with parameters:', {
    inputSize: inputBuffer.length,
    enhancementLevel,
    voiceType
  });
  
  // Basic voice enhancement using digital signal processing concepts
  const sampleRate = 44100;
  const numChannels = 2;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  
  const originalData = new Int16Array(inputBuffer.buffer, inputBuffer.byteOffset, inputBuffer.length / bytesPerSample);
  const enhancedData = new Int16Array(originalData.length);
  
  // Enhancement parameters based on level
  let gainBoost: number;
  let compressionRatio: number;
  let midRangeBoost: number;
  
  switch (enhancementLevel) {
    case 'low':
      gainBoost = 1.1;
      compressionRatio = 0.9;
      midRangeBoost = 1.1;
      break;
    case 'high':
      gainBoost = 1.4;
      compressionRatio = 0.7;
      midRangeBoost = 1.3;
      break;
    default: // medium
      gainBoost = 1.25;
      compressionRatio = 0.8;
      midRangeBoost = 1.2;
  }
  
  // Simple digital processing
  for (let i = 0; i < originalData.length; i++) {
    let sample = originalData[i] / 32768; // Normalize to -1 to 1
    
    // Apply basic EQ (simplified mid-range boost for voice)
    if (i > 0 && i < originalData.length - 1) {
      // Simple high-pass filter (remove low frequencies)
      const highPassed = sample - (originalData[i-1] / 32768) * 0.1;
      
      // Mid-range boost (simulate vocal frequency enhancement)
      sample = highPassed * midRangeBoost;
    }
    
    // Dynamic range compression
    if (Math.abs(sample) > 0.1) {
      sample = sample * compressionRatio + (sample > 0 ? 0.1 : -0.1) * (1 - compressionRatio);
    }
    
    // Apply gain boost
    sample *= gainBoost;
    
    // Prevent clipping
    sample = Math.max(-1, Math.min(1, sample));
    
    enhancedData[i] = Math.floor(sample * 32767);
  }
  
  // Create WAV file
  const wavHeader = createWavHeader(enhancedData.length * bytesPerSample, sampleRate, numChannels, bitsPerSample);
  const wavBuffer = new ArrayBuffer(wavHeader.length + enhancedData.length * bytesPerSample);
  const wavView = new Uint8Array(wavBuffer);
  
  // Set header
  wavView.set(wavHeader, 0);
  
  // Set audio data
  const dataView = new DataView(wavBuffer, wavHeader.length);
  for (let i = 0; i < enhancedData.length; i++) {
    dataView.setInt16(i * bytesPerSample, enhancedData[i], true); // true for little-endian
  }
  
  console.log('Basic voice enhancement completed:', {
    outputSize: wavBuffer.byteLength,
    firstBytes: Array.from(wavView.slice(0, 10))
  });
  
  return Buffer.from(wavBuffer);
}

function createWavHeader(dataLength: number, sampleRate: number, numChannels: number, bitsPerSample: number): Uint8Array {
  const bytesPerSample = bitsPerSample / 8;
  const byteRate = sampleRate * numChannels * bytesPerSample;
  const blockAlign = numChannels * bytesPerSample;
  const headerLength = 44;
  
  const header = new ArrayBuffer(headerLength);
  const view = new DataView(header);
  
  // RIFF chunk descriptor
  view.setUint32(0, 0x46464952, false); // "RIFF"
  view.setUint32(4, headerLength + dataLength - 8, true); // File size - 8
  view.setUint32(8, 0x45564157, false); // "WAVE"
  
  // fmt sub-chunk
  view.setUint32(12, 0x20746d66, false); // "fmt "
  view.setUint32(16, 16, true); // Sub-chunk size
  view.setUint16(20, 1, true); // Audio format (PCM)
  view.setUint16(22, numChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, byteRate, true); // Byte rate
  view.setUint16(32, blockAlign, true); // Block align
  view.setUint16(34, bitsPerSample, true); // Bits per sample
  
  // data sub-chunk
  view.setUint32(36, 0x61746164, false); // "data"
  view.setUint32(40, dataLength, true); // Data size
  
  return new Uint8Array(header);
}