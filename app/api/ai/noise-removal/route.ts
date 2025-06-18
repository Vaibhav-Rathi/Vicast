// app/api/ai/noise-removal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

type NoiseLevel = 'low' | 'medium' | 'high';

export async function POST(request: NextRequest) {
  
  let inputPath: string | null = null;
  let outputPath: string | null = null;
  
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const noiseLevel = formData.get('noise_level') || 'medium';
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }
    
    // Validate file type
    if (!audioFile.type.startsWith('audio/') && !audioFile.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }
    
    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create temporary files
    const timestamp = Date.now();
    inputPath = join(tmpdir(), `input_${timestamp}.webm`);
    outputPath = join(tmpdir(), `output_${timestamp}.wav`);
    
    // Write input file
    writeFileSync(inputPath, buffer);
    
    // Configure noise reduction parameters based on level
    let _noisereduceParams: string[];
    switch (noiseLevel) {
      case 'low':
        _noisereduceParams = ['0.21'];
        break;
      case 'high':
        _noisereduceParams = ['0.8'];
        break;
      default: // medium
        _noisereduceParams = ['0.5'];
    }
    
    // Method 1: Using FFmpeg with built-in noise reduction filters
    const processedAudio = await processWithFFmpeg(inputPath, outputPath, noiseLevel as NoiseLevel);
    
    if (processedAudio) {
      // Check if client wants base64 response
      const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
      
      if (wantsBase64) {
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
    
    // Method 2: Fallback to SoX if available
    try {
      const soxProcessed = await processWithSoX(inputPath, outputPath, noiseLevel as NoiseLevel);
      if (soxProcessed) {
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
    } catch (_soxError) {
      // SoX processing failed, continue to basic fallback
    }
    
    // Method 3: Basic audio processing fallback
    const basicProcessed = await basicNoiseReduction(buffer, noiseLevel as NoiseLevel);
    
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
    return NextResponse.json({ 
      error: 'Failed to process audio',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    // Clean up temporary files
    try {
      if (inputPath) {
        unlinkSync(inputPath);
      }
      if (outputPath) {
        unlinkSync(outputPath);
      }
    } catch (_cleanupError) {
      // Cleanup error ignored
    }
  }
}

async function processWithFFmpeg(inputPath: string, outputPath: string, noiseLevel: NoiseLevel): Promise<Buffer | null> {
  return new Promise((resolve) => {
    // Check if ffmpeg is available
    const testFFmpeg = spawn('ffmpeg', ['-version']);
    testFFmpeg.on('error', (_error) => {
      resolve(null);
    });
    
    testFFmpeg.on('close', (code) => {
      if (code !== 0) {
        resolve(null);
        return;
      }
      
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
      
      const ffmpegArgs = [
        '-i', inputPath,
        '-af', filterComplex,
        '-ar', '44100',
        '-ac', '2',
        '-y', // Overwrite output file
        outputPath
      ];
      
      const ffmpeg = spawn('ffmpeg', ffmpegArgs);
      
      let _stderr = '';
      let _stdout = '';
      
      ffmpeg.stdout.on('data', (data) => {
        _stdout += data.toString();
      });
      
      ffmpeg.stderr.on('data', (data) => {
        _stderr += data.toString();
      });
      
      ffmpeg.on('close', (code) => {
        if (code === 0) {
          try {
            const outputBuffer = readFileSync(outputPath);
            resolve(outputBuffer);
          } catch (_readError) {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
      
      ffmpeg.on('error', (_error) => {
        resolve(null);
      });
    });
  });
}

async function processWithSoX(inputPath: string, outputPath: string, noiseLevel: NoiseLevel): Promise<Buffer | null> {
  return new Promise((resolve) => {
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
    
    const sox = spawn('sox', soxArgs);
    
    let _stderr = '';
    
    sox.stderr.on('data', (data) => {
      _stderr += data.toString();
    });
    
    sox.on('close', (code) => {
      if (code === 0) {
        try {
          const outputBuffer = readFileSync(outputPath);
          resolve(outputBuffer);
        } catch (_readError) {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
    
    sox.on('error', (_error) => {
      resolve(null);
    });
  });
}

async function basicNoiseReduction(inputBuffer: Buffer, noiseLevel: NoiseLevel): Promise<Buffer> {
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