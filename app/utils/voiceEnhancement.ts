// utils/voiceEnhancement.ts

// Enhanced voice enhancement with parameters and base64 support
export async function enhanceVoice(
  audioBlob: Blob, 
  enhancementLevel: 'low' | 'medium' | 'high' = 'medium',
  voiceType: 'speech' | 'singing' | 'podcast' = 'speech',
  useBase64: boolean = true // Default to base64 for reliability
): Promise<Blob> {
  console.log('Starting voice enhancement with parameters:', {
    level: enhancementLevel,
    type: voiceType,
    useBase64: useBase64
  });
  
  try {
    // Validate input
    if (!audioBlob || audioBlob.size === 0) {
      throw new Error('Invalid audio input');
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');
    formData.append('enhancement_level', enhancementLevel);
    formData.append('voice_type', voiceType);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = `${baseUrl}/api/ai/enhance-voice`;
    
    console.log('Sending request to:', url);
    
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
      
      console.log('Response status:', response.status);
      console.log('Response headers:', {
        contentType: response.headers.get('content-type'),
        contentLength: response.headers.get('content-length')
      });
      
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
        
        console.log('Received base64 response:', {
          success: data.success,
          audioLength: data.audio ? data.audio.length : 0,
          size: data.size,
          firstBytes: data.firstBytes
        });
        
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
        
        const enhancedBlob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        
        console.log('Created blob from base64:', {
          size: enhancedBlob.size,
          type: enhancedBlob.type
        });
        
        // Test audio playback
        const testUrl = URL.createObjectURL(enhancedBlob);
        console.log('Test audio URL:', testUrl);
        
        return enhancedBlob;
        
      } else {
        // Handle binary response
        const arrayBuffer = await response.arrayBuffer();
        
        console.log('Received arrayBuffer:', {
          byteLength: arrayBuffer.byteLength,
          firstBytes: Array.from(new Uint8Array(arrayBuffer).slice(0, 10))
        });
        
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
        const enhancedBlob = new Blob([arrayBuffer], { type: 'audio/wav' });
        
        console.log('Created blob:', {
          size: enhancedBlob.size,
          type: enhancedBlob.type
        });
        
        console.log('Voice enhancement completed successfully');
        return enhancedBlob;
      }
      
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timed out after 5 minutes');
      }
      throw fetchError;
    }
    
  } catch (error) {
    console.error('AI voice enhancement error:', error);
    
    // Attempt client-side fallback
    try {
      console.log('Attempting client-side voice enhancement fallback...');
      return await enhanceVoiceClientSide(audioBlob, enhancementLevel, voiceType);
    } catch (fallbackError) {
      console.error('Client-side fallback also failed:', fallbackError);
      throw new Error(`Failed to enhance voice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Legacy function for backward compatibility
export async function enhanceVoiceLegacy(audioBlob: Blob): Promise<Blob> {
  return enhanceVoice(audioBlob, 'high', 'speech', true);
}

// Enhanced client-side processing
export async function enhanceVoiceClientSide(
  audioBlob: Blob, 
  enhancementLevel: 'low' | 'medium' | 'high' = 'medium',
  voiceType: 'speech' | 'singing' | 'podcast' = 'speech'
): Promise<Blob> {
  try {
    const audioContext = new AudioContext();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const processedBuffer = await applyVoiceEnhancement(audioBuffer, enhancementLevel, voiceType);
    
    // Convert back to blob
    return audioBufferToBlob(processedBuffer);
  } catch (error) {
    console.error('Client-side voice enhancement failed:', error);
    throw new Error('Failed to enhance voice on client side');
  }
}

// Enhanced version of applyVoiceEnhancement function
export async function applyVoiceEnhancement(
  audioBuffer: AudioBuffer,
  enhancementLevel: 'low' | 'medium' | 'high' = 'medium',
  voiceType: 'speech' | 'singing' | 'podcast' = 'speech'
): Promise<AudioBuffer> {
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );
  
  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  
  // Create enhancement filters
  const highpass = offlineContext.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = 80;
  
  // EQ for voice clarity
  const midBoost = offlineContext.createBiquadFilter();
  midBoost.type = 'peaking';
  midBoost.frequency.value = 1000;
  midBoost.Q.value = 1;
  
  const presenceBoost = offlineContext.createBiquadFilter();
  presenceBoost.type = 'peaking';
  presenceBoost.frequency.value = 3000;
  presenceBoost.Q.value = 0.5;
  
  const highShelf = offlineContext.createBiquadFilter();
  highShelf.type = 'highshelf';
  highShelf.frequency.value = 8000;
  
  // De-esser/compressor
  const compressor = offlineContext.createDynamicsCompressor();
  
  // Configure based on enhancement level
  switch (enhancementLevel) {
    case 'low':
      midBoost.gain.value = 1;
      presenceBoost.gain.value = 1.5;
      highShelf.gain.value = 1;
      compressor.threshold.value = -30;
      compressor.ratio.value = 6;
      break;
    case 'high':
      midBoost.gain.value = 4;
      presenceBoost.gain.value = 3;
      highShelf.gain.value = 2;
      compressor.threshold.value = -25;
      compressor.ratio.value = 8;
      break;
    default: // medium
      midBoost.gain.value = 2;
      presenceBoost.gain.value = 2;
      highShelf.gain.value = 1.5;
      compressor.threshold.value = -28;
      compressor.ratio.value = 7;
  }
  
  // Voice type adjustments
  switch (voiceType) {
    case 'singing':
      midBoost.frequency.value = 800;
      presenceBoost.frequency.value = 2500;
      presenceBoost.Q.value = 0.7;
      break;
    case 'podcast':
      midBoost.frequency.value = 1200;
      presenceBoost.frequency.value = 4000;
      presenceBoost.Q.value = 0.4;
      break;
    default: // speech
      midBoost.frequency.value = 1000;
      presenceBoost.frequency.value = 3000;
      presenceBoost.Q.value = 0.5;
  }
  
  // Set compressor parameters
  compressor.knee.value = 30;
  compressor.attack.value = 0.001;
  compressor.release.value = 0.01;
  
  // Connect the audio processing chain
  source.connect(highpass);
  highpass.connect(midBoost);
  midBoost.connect(presenceBoost);
  presenceBoost.connect(highShelf);
  highShelf.connect(compressor);
  compressor.connect(offlineContext.destination);
  
  source.start();
  return offlineContext.startRendering();
}

// Utility function to convert AudioBuffer to Blob
async function audioBufferToBlob(audioBuffer: AudioBuffer): Promise<Blob> {
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