// utils/audioProcessing.ts

export async function audioBufferToBlob(audioBuffer: AudioBuffer): Promise<Blob> {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  const sampleRate = audioBuffer.sampleRate;
  
  // Create a new AudioContext to handle the conversion
  const offlineContext = new OfflineAudioContext(numberOfChannels, length, sampleRate);
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start();
  
  const renderedBuffer = await offlineContext.startRendering();
  
  // Convert to WAV format
  const wavBuffer = audioBufferToWav(renderedBuffer);
  return new Blob([wavBuffer], { type: 'audio/wav' });
}

function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const length = buffer.length * buffer.numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);
  const channels = [];
  let offset = 0;
  let pos = 0;

  // Write WAV header
  const setUint16 = (data: number) => {
    view.setUint16(pos, data, true);
    pos += 2;
  };

  const setUint32 = (data: number) => {
    view.setUint32(pos, data, true);
    pos += 4;
  };

  // RIFF identifier
  setUint32(0x46464952);
  // file length minus RIFF identifier length and file description length
  setUint32(length - 8);
  // RIFF type
  setUint32(0x45564157);
  // format chunk identifier
  setUint32(0x20746d66);
  // format chunk length
  setUint32(16);
  // sample format (raw)
  setUint16(1);
  // channel count
  setUint16(buffer.numberOfChannels);
  // sample rate
  setUint32(buffer.sampleRate);
  // byte rate (sample rate * block align)
  setUint32(buffer.sampleRate * 4);
  // block align (channel count * bytes per sample)
  setUint16(buffer.numberOfChannels * 2);
  // bits per sample
  setUint16(16);
  // data chunk identifier
  setUint32(0x61746164);
  // data chunk length
  setUint32(length - pos - 4);

  // write interleaved data
  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (pos < length) {
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const sample = Math.max(-1, Math.min(1, channels[i][offset]));
      view.setInt16(pos, sample * 0x7FFF, true);
      pos += 2;
    }
    offset++;
  }

  return arrayBuffer;
}

// Enhanced Web Audio API noise removal (client-side fallback)
export async function removeBackgroundNoise(audioBlob: Blob, level: 'low' | 'medium' | 'high' = 'medium'): Promise<Blob> {
  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Apply noise gate and filtering based on level
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );
    
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Create filters based on noise removal level
    const highpass = offlineContext.createBiquadFilter();
    highpass.type = 'highpass';
    
    const lowpass = offlineContext.createBiquadFilter();
    lowpass.type = 'lowpass';
    
    const compressor = offlineContext.createDynamicsCompressor();
    
    // Configure based on level
    switch (level) {
      case 'low':
        highpass.frequency.value = 60;
        lowpass.frequency.value = 10000;
        compressor.threshold.value = -40;
        compressor.ratio.value = 8;
        break;
      case 'high':
        highpass.frequency.value = 100;
        lowpass.frequency.value = 7000;
        compressor.threshold.value = -60;
        compressor.ratio.value = 16;
        break;
      default: // medium
        highpass.frequency.value = 80;
        lowpass.frequency.value = 8000;
        compressor.threshold.value = -50;
        compressor.ratio.value = 12;
    }
    
    compressor.knee.value = 40;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;
    
    // Connect nodes
    source.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(compressor);
    compressor.connect(offlineContext.destination);
    
    source.start();
    const processedBuffer = await offlineContext.startRendering();
    
    // Convert back to blob
    return audioBufferToBlob(processedBuffer);
  } catch (error) {
    console.error('Client-side noise removal failed:', error);
    throw new Error('Failed to process audio on client side');
  }
}

// Enhanced AI-powered noise removal with proper validation and base64 support
export async function removeNoiseWithAI(
  audioBlob: Blob, 
  noiseLevel: 'low' | 'medium' | 'high' = 'medium',
  useBase64: boolean = true // Default to base64 for reliability
): Promise<Blob> {
  
  try {
    // Validate input
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error('Invalid audio input');
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');
    formData.append('noise_level', noiseLevel);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = `${baseUrl}/api/ai/noise-removal`;
    
    
    const headers: HeadersInit = {
      'Accept': 'audio/wav, audio/*, application/octet-stream'
    };
    
    if (useBase64) {
      headers['X-Response-Format'] = 'base64';
      headers['Accept'] = 'application/json';
    }
    
    // Create an AbortController for potential timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5 minute timeout
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers
      });
      
      clearTimeout(timeoutId);
      
      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || errorData.details || `Server error: ${response.status}`);
        } catch {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
      }
      
      if (useBase64) {
        // Handle base64 response
        const data = await response.json();
              
        if (!data.success || !data.audio) {
          throw new Error('Invalid response from server');
        }
        
        // Convert base64 to blob
        const binaryString = atob(data.audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Validate it's a WAV file
        const isWav = bytes[0] === 82 && bytes[1] === 73 && 
                      bytes[2] === 70 && bytes[3] === 70; // "RIFF"
        
        if (!isWav) {
          console.error('Invalid WAV file from base64, first bytes:', Array.from(bytes.slice(0, 10)));
          throw new Error('Server returned invalid audio format');
        }
        
        const processedBlob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        
        // Test audio playback
        const testUrl = URL.createObjectURL(processedBlob);
        
        return processedBlob;
        
      } else {
        // Handle binary response
        const arrayBuffer = await response.arrayBuffer();
            
        // Validate the response
        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          throw new Error('Server returned empty audio file');
        }
        
        // Check if it's a valid WAV file (starts with "RIFF")
        const firstBytes = new Uint8Array(arrayBuffer).slice(0, 4);
        const isWav = firstBytes[0] === 82 && firstBytes[1] === 73 && 
                      firstBytes[2] === 70 && firstBytes[3] === 70; // "RIFF"
        
        if (!isWav) {
          console.error('Invalid WAV file, first bytes:', Array.from(firstBytes));
          throw new Error('Server returned invalid audio format');
        }
        
        // Create blob from arrayBuffer
        const processedBlob = new Blob([arrayBuffer], { type: 'audio/wav' });
              
        return processedBlob;
      }
      
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out after 5 minutes');
      }
      throw fetchError;
    }
    
  } catch (error) {
    console.error('AI noise removal error:', error);
    
    // DO NOT fallback to client-side processing - throw the error
    // This ensures the UI knows the processing actually failed
    throw new Error(`Failed to remove noise: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Utility function to check audio file validity
export function validateAudioBlob(blob: Blob): boolean {
  return blob.size > 0 && blob.type.startsWith('audio/');
}

// Utility function to get audio duration from blob
export async function getAudioDuration(audioBlob: Blob): Promise<number> {
  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer.duration;
  } catch (error) {
    console.error('Failed to get audio duration:', error);
    return 0;
  }
}