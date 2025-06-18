// **app/api/ai/transcribe/route.ts**
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Type definitions
interface OpenAISegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface OpenAIResponse {
  text: string;
  segments?: OpenAISegment[];
  language?: string;
  duration?: number;
}

interface AssemblyAIWord {
  start: number;
  end: number;
  text: string;
  confidence: number;
}

interface AssemblyAIResponse {
  id: string;
  status: 'processing' | 'queued' | 'completed' | 'error';
  text: string;
  words?: AssemblyAIWord[];
  language_code?: string;
  audio_duration?: number;
}

interface AssemblyAIUploadResponse {
  upload_url: string;
}

interface DeepgramWord {
  word: string;
  start: number;
  end: number;
  confidence: number;
  punctuated_word?: string;
}

interface DeepgramResponse {
  results: {
    channels: Array<{
      alternatives: Array<{
        transcript: string;
        words?: DeepgramWord[];
      }>;
    }>;
    metadata: {
      duration: number;
    };
  };
}

interface TranscriptionResponse {
  text: string;
  segments?: OpenAISegment[];
  language?: string;
  duration?: number;
}

// Helper function to extract error message
function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const errorObj = error as Record<string, any>;
    if (errorObj.response?.data?.error?.message) {
      return errorObj.response.data.error.message;
    }
    if (errorObj.response?.data?.message) {
      return errorObj.response.data.message;
    }
    if (errorObj.message) {
      return errorObj.message;
    }
  }
  return 'Unknown error occurred';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('file') as File;
    const model = (formData.get('model') as string) || 'whisper-1';
    const responseFormat = (formData.get('response_format') as string) || 'verbose_json';
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }
    
    // Option 1: Use OpenAI Whisper (if you have API access)
    if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      try {
        const openAIFormData = new FormData();
        openAIFormData.append('file', audioFile);
        openAIFormData.append('model', model);
        openAIFormData.append('response_format', responseFormat);
        
        const response = await axios.post<OpenAIResponse>(
          'https://api.openai.com/v1/audio/transcriptions',
          openAIFormData,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            }
          }
        );
        
        return NextResponse.json(response.data);
      } catch (openAIError) {
        const errorMessage = getErrorMessage(openAIError);
        console.error('OpenAI error:', errorMessage);
        // Continue to next service instead of returning error
      }
    }
    
    // Option 2: Use AssemblyAI for transcription
    if (process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY) {
      try {
        // Convert file to buffer
        const buffer = Buffer.from(await audioFile.arrayBuffer());
        
        // Upload audio to AssemblyAI
        const uploadResponse = await axios.post<AssemblyAIUploadResponse>(
          'https://api.assemblyai.com/v2/upload',
          buffer,
          {
            headers: {
              'authorization': process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
              'content-type': audioFile.type || 'audio/wav',
            }
          }
        );
        
        const audioUrl = uploadResponse.data.upload_url;
        
        // Create transcription
        const transcriptResponse = await axios.post<AssemblyAIResponse>(
          'https://api.assemblyai.com/v2/transcript',
          {
            audio_url: audioUrl,
            punctuate: true,
            format_text: true,
            word_boost: [],
            auto_highlights: true,
          },
          {
            headers: {
              'authorization': process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
              'content-type': 'application/json',
            }
          }
        );
        
        // Poll for completion
        const transcriptId = transcriptResponse.data.id;
        let status: AssemblyAIResponse['status'] = 'processing';
        let result: AssemblyAIResponse | null = null;
        
        while (status === 'processing' || status === 'queued') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const statusResponse = await axios.get<AssemblyAIResponse>(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            {
              headers: {
                'authorization': process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
              }
            }
          );
          
          status = statusResponse.data.status;
          result = statusResponse.data;
        }
        
        if (status === 'completed' && result) {
          // Format to match OpenAI Whisper response
          const segments: OpenAISegment[] = result.words ? result.words.map((word, index) => ({
            id: index,
            start: word.start / 1000, // Convert ms to seconds
            end: word.end / 1000,
            text: word.text,
          })) : [];
          
          const response: TranscriptionResponse = {
            text: result.text,
            segments,
            language: result.language_code,
            duration: result.audio_duration,
          };
          
          return NextResponse.json(response);
        }
        
        if (status === 'error') {
          throw new Error('AssemblyAI transcription failed');
        }
      } catch (assemblyError) {
        const errorMessage = getErrorMessage(assemblyError);
        console.error('AssemblyAI error:', errorMessage);
        // Continue to next service
      }
    }
    
    // Option 3: Use Deepgram for transcription
    if (process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY) {
      try {
        const buffer = Buffer.from(await audioFile.arrayBuffer());
        
        const response = await axios.post<DeepgramResponse>(
          'https://api.deepgram.com/v1/listen?punctuate=true&utterances=true&model=nova-2',
          buffer,
          {
            headers: {
              'Authorization': `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`,
              'Content-Type': audioFile.type || 'audio/wav',
            }
          }
        );
        
        // Format Deepgram response to match expected format
        const result = response.data.results;
        if (result && result.channels && result.channels[0]) {
          const alternatives = result.channels[0].alternatives[0];
          
          const segments: OpenAISegment[] = alternatives.words ? alternatives.words.map((word, index) => ({
            id: index,
            start: word.start,
            end: word.end,
            text: word.punctuated_word || word.word,
          })) : [];
          
          const transcriptionResponse: TranscriptionResponse = {
            text: alternatives.transcript,
            segments,
            duration: result.metadata.duration,
          };
          
          return NextResponse.json(transcriptionResponse);
        }
        
        throw new Error('Invalid Deepgram response format');
      } catch (deepgramError) {
        const errorMessage = getErrorMessage(deepgramError);
        console.error('Deepgram error:', errorMessage);
      }
    }
    
    return NextResponse.json(
      { error: 'No transcription service available. Please configure API keys.' },
      { status: 500 }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio', details: errorMessage },
      { status: 500 }
    );
  }
}