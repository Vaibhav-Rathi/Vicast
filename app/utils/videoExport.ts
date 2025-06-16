// **utils/videoExport.ts**
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

export interface TimelineItem {
  id: string;
  videoId: string;
  startTime: number;
  endTime: number;
  name: string;
  effects?: string[];
}

export interface Video {
  id: string;
  name: string;
  url: string;
  duration: number;
  type: 'local' | 'dashboard';
}

export class VideoExporter {
  private ffmpeg: FFmpeg;
  
  constructor() {
    this.ffmpeg = new FFmpeg();
  }
  
  async initialize() {
    if (!this.ffmpeg.loaded) {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      await this.ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
    }
  }
  
  async exportVideo(
    timeline: TimelineItem[],
    videos: Video[],
    outputFormat: 'mp4' | 'webm' = 'mp4',
    quality: 'low' | 'medium' | 'high' = 'high'
  ): Promise<Blob> {
    await this.initialize();
    
    // Write input files
    for (const video of videos) {
      const response = await fetch(video.url);
      const data = await response.arrayBuffer();
      await this.ffmpeg.writeFile(`input_${video.id}.webm`, new Uint8Array(data));
    }
    
    // Create filter complex for timeline
    const filterComplex = this.buildFilterComplex(timeline, videos);
    
    // Quality settings
    const qualitySettings = {
      low: ['-crf', '35', '-preset', 'faster'],
      medium: ['-crf', '23', '-preset', 'medium'],
      high: ['-crf', '18', '-preset', 'slow']
    };
    
    // Build FFmpeg command
    const inputFiles: string[] = [];
    videos.forEach(v => {
      inputFiles.push('-i', `input_${v.id}.webm`);
    });
    
    const outputFile = `output.${outputFormat}`;
    
    await this.ffmpeg.exec([
      ...inputFiles,
      '-filter_complex', filterComplex,
      '-map', '[out]',
      '-c:v', outputFormat === 'mp4' ? 'libx264' : 'libvpx-vp9',
      ...qualitySettings[quality],
      outputFile
    ]);
    
    // Read output
    const data = await this.ffmpeg.readFile(outputFile);
    const blob = new Blob([data], { type: `video/${outputFormat}` });
    
    // Cleanup
    for (const video of videos) {
      await this.ffmpeg.deleteFile(`input_${video.id}.webm`);
    }
    await this.ffmpeg.deleteFile(outputFile);
    
    return blob;
  }
  
  private buildFilterComplex(timeline: TimelineItem[], videos: Video[]): string {
    let filterSteps: string[] = [];
    
    timeline.forEach((item, index) => {
      const videoIndex = videos.findIndex(v => v.id === item.videoId);
      const inputLabel = `[${videoIndex}:v]`;
      
      // Trim to timeline segment
      let filter = `${inputLabel}trim=start=${item.startTime}:end=${item.endTime},setpts=PTS-STARTPTS[v${index}];`;
      
      // Apply effects
      if (item.effects?.includes('noise-removal')) {
        filter += `[${videoIndex}:a]highpass=f=200,lowpass=f=3000[a${index}];`;
      }
      
      filterSteps.push(filter);
    });
    
    // Concatenate all segments
    const videoLabels = timeline.map((_, i) => `[v${i}]`).join('');
    const concat = `${videoLabels}concat=n=${timeline.length}:v=1:a=0[out]`;
    filterSteps.push(concat);
    
    return filterSteps.join('');
  }
}