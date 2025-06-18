// app/api/ai/enhance-voice/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

type EnhancementLevel = 'low' | 'medium' | 'high';
type VoiceType = 'speech' | 'singing' | 'podcast';

export async function POST(request: NextRequest) {
  
  let inputPath: string | null = null;
  let outputPath: string | null = null;
  
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const enhancementLevel = formData.get('enhancement_level') || 'medium'; // low, medium, high
    const voiceType = formData.get('voice_type') || 'speech'; // speech, singing, podcast
    
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
    outputPath = join(tmpdir(), `enhanced_${timestamp}.wav`);
    
       // Write input file
    writeFileSync(inputPath, buffer);
    
    // Method 1: Using FFmpeg with voice enhancement filters
    const enhancedAudio = await enhanceWithFFmpeg(inputPath, outputPath, enhancementLevel as EnhancementLevel, voiceType as VoiceType);
    
    if (enhancedAudio) {
      // Check if client wants base64 response
      const wantsBase64 = request.headers.get('X-Response-Format') === 'base64';
      
      if (wantsBase64) {
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
    
    
    // Method 2: Fallback to SoX enhancement
    try {
      const soxEnhanced = await enhanceWithSoX(inputPath, outputPath, enhancementLevel as EnhancementLevel, voiceType as VoiceType);
      if (soxEnhanced) {
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
    } catch (_soxError) {
      // SoX enhancement failed, continue to basic fallback
    }
    
    // Method 3: Basic voice enhancement fallback
    const basicEnhanced = await basicVoiceEnhancement(buffer, enhancementLevel as EnhancementLevel, voiceType as VoiceType);
    
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
    return NextResponse.json({ 
      error: 'Failed to enhance voice',
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

async function enhanceWithFFmpeg(
  inputPath: string, 
  outputPath: string, 
  enhancementLevel: EnhancementLevel, 
  voiceType: VoiceType
): Promise<Buffer | null> {
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
      
      const ffmpegArgs = [
        '-i', inputPath,
        '-af', filterComplex,
        '-ar', '44100',
        '-ac', '2',
        '-c:a', 'pcm_s16le',
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

async function enhanceWithSoX(
  inputPath: string, 
  outputPath: string, 
  enhancementLevel: EnhancementLevel, 
  voiceType: VoiceType
): Promise<Buffer | null> {
  return new Promise((resolve) => {
    // SoX command for voice enhancement
    const soxArgs: string[] = [inputPath, outputPath];
    
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

async function basicVoiceEnhancement(
  inputBuffer: Buffer, 
  enhancementLevel: EnhancementLevel, 
  _voiceType: VoiceType
): Promise<Buffer> {
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