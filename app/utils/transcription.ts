// **utils/transcription.ts**
import axios from 'axios';

export interface Caption {
  start: number;
  end: number;
  text: string;
}

export async function generateCaptions(audioBlob: Blob): Promise<Caption[]> {
  // Extract audio from video if needed
  const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
  
  // Use OpenAI Whisper via your API endpoint
  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('model', 'whisper-1');
  formData.append('response_format', 'verbose_json');
  
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/transcribe`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    
    const data = response.data;
    
    // Format captions
    return (data as any).segments.map((segment: any) => ({
      start: segment.start,
      end: segment.end,
      text: segment.text.trim()
    }));
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
}

// Render captions on video
export function renderCaptionsOnCanvas(
  ctx: CanvasRenderingContext2D,
  captions: Caption[],
  currentTime: number,
  canvasWidth: number,
  canvasHeight: number
) {
  const currentCaption = captions.find(
    cap => currentTime >= cap.start && currentTime <= cap.end
  );
  
  if (currentCaption) {
    // Style settings
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    
    // Draw text with outline
    const x = canvasWidth / 2;
    const y = canvasHeight - 50;
    
    ctx.strokeText(currentCaption.text, x, y);
    ctx.fillText(currentCaption.text, x, y);
  }
}
