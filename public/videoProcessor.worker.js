// public/videoProcessor.worker.js

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;
  
  try {
    switch (type) {
      case 'DETECT_SILENCES':
        const { audioData } = data;
        
        // Reconstruct Float32Array from transferred ArrayBuffer
        const channelData = new Float32Array(audioData.channelData);
        
        const silences = detectSilences(
          channelData, 
          audioData.sampleRate, 
          audioData.duration
        );
        
        self.postMessage({ 
          type: 'SILENCES_DETECTED', 
          data: { silences } 
        });
        break;
        
      case 'APPLY_NOISE_REMOVAL':
        // Process noise removal
        const processed = await removeNoise(data.audioBuffer);
        self.postMessage({ 
          type: 'NOISE_REMOVED', 
          data: { processed } 
        });
        break;
        
      case 'APPLY_VOICE_ENHANCEMENT':
        // Process voice enhancement
        const enhanced = await enhanceVoice(data.audioBuffer);
        self.postMessage({ 
          type: 'VOICE_ENHANCED', 
          data: { enhanced } 
        });
        break;
        
      case 'GENERATE_CAPTIONS':
        // Process captions generation
        // This would typically use an API like Whisper
        const captions = await generateCaptions(data.audioBuffer);
        self.postMessage({ 
          type: 'CAPTIONS_GENERATED', 
          data: { captions } 
        });
        break;
    }
  } catch (error) {
    self.postMessage({ 
      type: 'ERROR', 
      data: { error: error.message } 
    });
  }
});

function detectSilences(channelData, sampleRate, duration) {
  const silences = [];
  const threshold = -40; // dB
  const minSilenceDuration = 0.5; // seconds
  const windowSize = Math.floor(sampleRate * 0.05); // 50ms windows
  
  let silenceStart = null;
  
  for (let i = 0; i < channelData.length; i += windowSize) {
    const window = channelData.slice(i, Math.min(i + windowSize, channelData.length));
    
    // Calculate RMS (Root Mean Square)
    let sum = 0;
    for (let j = 0; j < window.length; j++) {
      sum += window[j] * window[j];
    }
    const rms = Math.sqrt(sum / window.length);
    const db = 20 * Math.log10(Math.max(rms, 0.000001)); // Avoid log(0)
    
    if (db < threshold) {
      if (silenceStart === null) {
        silenceStart = i / sampleRate;
      }
    } else {
      if (silenceStart !== null) {
        const silenceEnd = i / sampleRate;
        const silenceDuration = silenceEnd - silenceStart;
        
        if (silenceDuration >= minSilenceDuration) {
          silences.push({
            start: silenceStart,
            end: silenceEnd,
            duration: silenceDuration
          });
        }
        silenceStart = null;
      }
    }
  }
  
  // Check if the audio ends with silence
  if (silenceStart !== null) {
    const silenceEnd = duration;
    const silenceDuration = silenceEnd - silenceStart;
    
    if (silenceDuration >= minSilenceDuration) {
      silences.push({
        start: silenceStart,
        end: silenceEnd,
        duration: silenceDuration
      });
    }
  }
  
  return silences;
}

async function removeNoise(audioBuffer) {
  // Basic noise removal implementation
  // In production, you'd use a proper audio processing library or API
  
  // For now, we'll apply a simple high-pass filter
  // This is a placeholder - real noise removal would be more sophisticated
  
  // Convert ArrayBuffer to Float32Array
  const audioData = new Float32Array(audioBuffer);
  const filteredData = new Float32Array(audioData.length);
  
  // Simple high-pass filter to remove low-frequency noise
  const cutoffFrequency = 80; // Hz
  const sampleRate = 44100; // Assuming standard sample rate
  const rc = 1.0 / (cutoffFrequency * 2 * Math.PI);
  const dt = 1.0 / sampleRate;
  const alpha = dt / (rc + dt);
  
  filteredData[0] = audioData[0];
  for (let i = 1; i < audioData.length; i++) {
    filteredData[i] = alpha * (filteredData[i - 1] + audioData[i] - audioData[i - 1]);
  }
  
  return filteredData.buffer;
}

async function enhanceVoice(audioBuffer) {
  // Basic voice enhancement
  // In production, you'd use specialized audio processing
  
  const audioData = new Float32Array(audioBuffer);
  const enhancedData = new Float32Array(audioData.length);
  
  // Apply simple dynamics compression and EQ
  // This is a simplified version - real voice enhancement would be more complex
  
  for (let i = 0; i < audioData.length; i++) {
    let sample = audioData[i];
    
    // Simple compression
    const threshold = 0.5;
    const ratio = 4;
    if (Math.abs(sample) > threshold) {
      const excess = Math.abs(sample) - threshold;
      const compressedExcess = excess / ratio;
      sample = Math.sign(sample) * (threshold + compressedExcess);
    }
    
    // Boost mid frequencies (simplified)
    // Real implementation would use proper EQ
    enhancedData[i] = sample * 1.2;
    
    // Prevent clipping
    enhancedData[i] = Math.max(-1, Math.min(1, enhancedData[i]));
  }
  
  return enhancedData.buffer;
}

async function generateCaptions(audioBuffer) {
  // This is a placeholder
  // In production, you'd send the audio to a transcription API
  // like OpenAI Whisper, Google Speech-to-Text, or AssemblyAI
  
  // Return mock captions for demo
  return [
    {
      start: 0,
      end: 3,
      text: "Welcome to our podcast."
    },
    {
      start: 3,
      end: 6,
      text: "Today we'll be discussing video editing."
    },
    {
      start: 6,
      end: 10,
      text: "Let's dive into the AI-powered features."
    }
  ];
}

// Helper function to convert audio buffer to WAV format
// Useful for sending to transcription APIs
function audioBufferToWav(buffer, sampleRate) {
  const length = buffer.length;
  const arrayBuffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(arrayBuffer);
  
  // WAV header
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * 2, true);
  
  // Convert float samples to 16-bit PCM
  let offset = 44;
  for (let i = 0; i < length; i++) {
    const sample = Math.max(-1, Math.min(1, buffer[i]));
    view.setInt16(offset, sample * 0x7FFF, true);
    offset += 2;
  }
  
  return arrayBuffer;
}