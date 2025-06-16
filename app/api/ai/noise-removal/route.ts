// app/api/ai/noise-removal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export async function POST(request: NextRequest) {
  console.log('=== NOISE REMOVAL API STARTED ===');
  
  let inputPath: string | null = null;
  let outputPath: string | null = null;
  
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const noiseLevel = formData.get('noise_level') || 'medium';
    
    console.log('Received request:', {
      hasAudioFile: !!audioFile,
      audioFileName: audioFile?.name,
      audioFileSize: audioFile?.size,
      audioFileType: audioFile?.type,
      noiseLevel: noiseLevel
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
    outputPath = join(tmpdir(), `output_${timestamp}.wav`);
    
    console.log('Temp file paths:', {
      inputPath,
      outputPath,
      tmpdir: tmpdir()
    });
    
    // Write input file
    writeFileSync(inputPath, buffer);
    console.log('Input file written successfully, size:', buffer.length);
    
    // Configure noise reduction parameters based on level
    let noisereduceParams: string[];
    switch (noiseLevel) {
      case 'low':
        noisereduceParams = ['0.21'];
        break;
      case 'high':
        noisereduceParams = ['0.8'];
        break;
      default: // medium
        noisereduceParams = ['0.5'];
    }
    
    // Method 1: Using FFmpeg with built-in noise reduction filters
    console.log('Starting FFmpeg processing...');
    const processedAudio = await processWithFFmpeg(inputPath, outputPath, noiseLevel as any);
    
    if (processedAudio) {
      console.log('FFmpeg processing successful:', {
        outputSize: processedAudio.length,
        outputType: processedAudio.constructor.name
      });
      
      // Log first few bytes to check if it's valid audio data
      console.log('First 10 bytes of output:', Array.from(processedAudio.slice(0, 10)));
      
      // Check if client wants base64 response
      const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
      
      if (wantsBase64) {
        console.log('Returning base64 encoded response');
        // Return as base64 JSON
        const base64Audio = processedAudio.toString('base64');
        return NextResponse.json({
          success: true,
          audio: base64Audio,
          mimeType: 'audio/wav',
          size: processedAudio.length,
          firstBytes: Array.from(processedAudio.slice(0, 10))
        });
      }
      
      // IMPORTANT: Convert Buffer to Uint8Array for proper binary handling
      const uint8Array = new Uint8Array(processedAudio);
      
      return new Response(uint8Array, {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Disposition': 'attachment; filename="noise_reduced_audio.wav"',
          'Content-Length': uint8Array.length.toString(),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    console.log('FFmpeg processing failed, trying SoX...');
    
    // Method 2: Fallback to SoX if available
    try {
      const soxProcessed = await processWithSoX(inputPath, outputPath, noiseLevel as any);
      if (soxProcessed) {
        console.log('SoX processing successful:', {
          outputSize: soxProcessed.length,
          outputType: soxProcessed.constructor.name
        });
        
        // Check if client wants base64 response
        const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
        
        if (wantsBase64) {
          const base64Audio = soxProcessed.toString('base64');
          return NextResponse.json({
            success: true,
            audio: base64Audio,
            mimeType: 'audio/wav',
            size: soxProcessed.length
          });
        }
        
        const uint8Array = new Uint8Array(soxProcessed);
        
        return new Response(uint8Array, {
          status: 200,
          headers: {
            'Content-Type': 'audio/wav',
            'Content-Disposition': 'attachment; filename="noise_reduced_audio.wav"',
            'Content-Length': uint8Array.length.toString(),
            'Cache-Control': 'no-cache, no-store, must-revalidate'
          }
        });
      }
    } catch (soxError) {
      console.error('SoX processing failed:', soxError);
    }
    
    // Method 3: Basic audio processing fallback
    console.log('Both FFmpeg and SoX failed, using basic fallback...');
    const basicProcessed = await basicNoiseReduction(buffer, noiseLevel as any);
    
    console.log('Basic processing result:', {
      outputSize: basicProcessed.length,
      outputType: basicProcessed.constructor.name
    });
    
    // Check if client wants base64 response
    const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
    
    if (wantsBase64) {
      const base64Audio = basicProcessed.toString('base64');
      return NextResponse.json({
        success: true,
        audio: base64Audio,
        mimeType: 'audio/wav',
        size: basicProcessed.length
      });
    }
    
    const uint8Array = new Uint8Array(basicProcessed);
    
    return new Response(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="processed_audio.wav"',
        'Content-Length': uint8Array.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
    
  } catch (error) {
    console.error('=== NOISE REMOVAL ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({ 
      error: 'Failed to process audio',
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
    console.log('=== NOISE REMOVAL API COMPLETED ===\n');
  }
}

async function processWithFFmpeg(inputPath: string, outputPath: string, noiseLevel: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    console.log('FFmpeg: Starting with parameters:', {
      inputPath,
      outputPath,
      noiseLevel
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
      
      console.log('FFmpeg is available, proceeding with processing...');
      
      // FFmpeg command with noise reduction filters
      let filterComplex: string;
      
      switch (noiseLevel) {
        case 'low':
          filterComplex = 'afftdn=nr=10:nf=-25';
          break;
        case 'high':
          filterComplex = 'afftdn=nr=25:nf=-35,highpass=f=80,lowpass=f=8000';
          break;
        default: // medium
          filterComplex = 'afftdn=nr=20:nf=-30,highpass=f=60';
      }
      
      console.log('FFmpeg filter complex:', filterComplex);
      
      const ffmpegArgs = [
        '-i', inputPath,
        '-af', filterComplex,
        '-ar', '44100',
        '-ac', '2',
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

async function processWithSoX(inputPath: string, outputPath: string, noiseLevel: string): Promise<Buffer | null> {
  return new Promise((resolve) => {
    console.log('SoX: Starting with parameters:', {
      inputPath,
      outputPath,
      noiseLevel
    });
    
    // SoX command with noise reduction
    let soxArgs: string[];
    
    switch (noiseLevel) {
      case 'low':
        soxArgs = [inputPath, outputPath, 'noisered', '0.21'];
        break;
      case 'high':
        soxArgs = [inputPath, outputPath, 'noisered', '0.8', 'compand', '0.3,1', '6:-70,-60,-20', '-5', '-90', '0.2'];
        break;
      default: // medium
        soxArgs = [inputPath, outputPath, 'noisered', '0.5', 'compand', '0.3,1', '6:-70,-60,-20', '-5'];
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

async function basicNoiseReduction(inputBuffer: Buffer, noiseLevel: string): Promise<Buffer> {
  console.log('Basic noise reduction: Starting with parameters:', {
    inputSize: inputBuffer.length,
    noiseLevel
  });
  
  // Basic noise reduction using Web Audio API concepts
  // This is a simplified implementation - in practice, you'd use more sophisticated algorithms
  
  // Create a basic WAV header
  const sampleRate = 44100;
  const numChannels = 2;
  const bitsPerSample = 16;
  const bytesPerSample = bitsPerSample / 8;
  
  // Simple noise gate and amplitude adjustment
  const processedData = new Int16Array(inputBuffer.length / bytesPerSample);
  const originalData = new Int16Array(inputBuffer.buffer, inputBuffer.byteOffset, inputBuffer.length / bytesPerSample);
  
  // Noise gate threshold based on level
  let threshold: number;
  let compressionRatio: number;
  
  switch (noiseLevel) {
    case 'low':
      threshold = 0.05;
      compressionRatio = 0.9;
      break;
    case 'high':
      threshold = 0.15;
      compressionRatio = 0.7;
      break;
    default: // medium
      threshold = 0.1;
      compressionRatio = 0.8;
  }
  
  for (let i = 0; i < originalData.length; i++) {
    const sample = originalData[i] / 32768; // Normalize to -1 to 1
    
    // Simple noise gate
    if (Math.abs(sample) < threshold) {
      processedData[i] = Math.floor(sample * 0.1 * 32768); // Reduce low-level noise
    } else {
      // Apply compression to loud sounds
      const compressed = sample * compressionRatio;
      processedData[i] = Math.floor(compressed * 32768);
    }
  }
  
  // Create WAV file
  const wavHeader = createWavHeader(processedData.length * bytesPerSample, sampleRate, numChannels, bitsPerSample);
  const wavBuffer = new ArrayBuffer(wavHeader.length + processedData.length * bytesPerSample);
  const wavView = new Uint8Array(wavBuffer);
  
  // Set header
  wavView.set(wavHeader, 0);
  
  // Set audio data
  const dataView = new DataView(wavBuffer, wavHeader.length);
  for (let i = 0; i < processedData.length; i++) {
    dataView.setInt16(i * bytesPerSample, processedData[i], true); // true for little-endian
  }
  
  console.log('Basic noise reduction completed:', {
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