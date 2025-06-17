// /dashboard/project/page.tsx

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Upload, Volume2, Mic, Film, Plus, Trash2, Wand2, ChevronRight, X, Check, FileVideo, AlertCircle, AlertTriangle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { generateCaptions } from '../../utils/transcription';
import { removeNoiseWithAI } from '../../utils/audioProcessing';
import { enhanceVoice } from '../../utils/voiceEnhancement';
import { useToast } from '../../hooks/use-toast';

// Types
interface Video {
  id: string;
  name: string;
  url: string;
  duration: number;
  type: 'local' | 'dashboard';
  participantId?: string;
  sessionId?: string;
}

interface Participant {
  id: string;
  username: string;
  chunks: Array<{
    id: string;
    downloadUrl: string;
    duration: number;
  }>;
}

interface Session {
  id: string;
  roomName: string;
  participants: Participant[];
}

interface AITool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface Caption {
  start: number;
  end: number;
  text: string;
}

interface ExportProgress {
  stage: string;
  percentage: number;
  message: string;
  timeRemaining?: string;
}

interface DeleteConfirmation {
  isOpen: boolean;
  videoId: string | null;
  videoName: string | null;
}

interface ImportProgress {
  isImporting: boolean;
  participantName: string;
  stage: string;
  percentage: number;
}

interface ProcessingProgress {
  tool: string | null;
  stage: string;
  percentage: number;
}

const ProjectPage: React.FC = () => {
  const { toast } = useToast();
  
  // State Management
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<ExportProgress | null>(null);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [showAITools, setShowAITools] = useState<boolean>(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState<boolean>(false);
  const [processingEffect, setProcessingEffect] = useState<string | null>(null);
  const [generatedCaptions, setGeneratedCaptions] = useState<{ [videoId: string]: Caption[] }>({});
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [processedAudioFiles, setProcessedAudioFiles] = useState<{ [videoId: string]: { [effect: string]: Blob } }>({});
  const [appliedEffects, setAppliedEffects] = useState<{ [videoId: string]: string[] }>({});
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation>({ isOpen: false, videoId: null, videoName: null });
  const [importProgress, setImportProgress] = useState<ImportProgress>({ isImporting: false, participantName: '', stage: '', percentage: 0 });
  const [processingProgress, setProcessingProgress] = useState<ProcessingProgress>({ tool: null, stage: '', percentage: 0 });
  
  // Enhanced AI options state
  const [enhancementOptions, setEnhancementOptions] = useState<{
    noiseLevel: 'low' | 'medium' | 'high';
    voiceLevel: 'low' | 'medium' | 'high';
    voiceType: 'speech' | 'singing' | 'podcast';
  }>({
    noiseLevel: 'medium',
    voiceLevel: 'medium',
    voiceType: 'speech'
  });
  
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  
  // AI Tools Configuration (Enhanced descriptions)
  const aiTools: AITool[] = [
    { id: 'noise-removal', name: 'Noise Removal', icon: Volume2, description: 'Remove background noise and unwanted sounds' },
    { id: 'voice-enhance', name: 'Voice Enhancement', icon: Mic, description: 'Enhance voice clarity and presence' },
    { id: 'auto-captions', name: 'Auto Captions', icon: Film, description: 'Generate automatic captions/subtitles' },
  ];

  // Auto-import from dashboard
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
      const importData = sessionStorage.getItem('editorImport');
      if (importData) {
        try {
          const { participantId, sessionId, participantName } = JSON.parse(importData);
          sessionStorage.removeItem('editorImport');
          importFromDashboard(participantId, sessionId, participantName || 'Participant');
        } catch (error) {
          console.error('Error parsing import data:', error);
        }
      }
    }
  }, []);

  // Cleanup video URLs on unmount
  useEffect(() => {
    return () => {
      videos.forEach(video => {
        if (video.type === 'local' || video.type === 'dashboard') {
          URL.revokeObjectURL(video.url);
        }
      });
      
      // Clean up SSE connection if exists
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Update video source when active video changes
  useEffect(() => {
    if (videoRef.current && activeVideoId) {
      const activeVideo = videos.find(v => v.id === activeVideoId);
      if (activeVideo && videoRef.current.src !== activeVideo.url) {
        videoRef.current.src = activeVideo.url;
        videoRef.current.load();
      }
    }
  }, [activeVideoId, videos]);

  // Current caption display
  const getCurrentCaption = (): string => {
    if (!activeVideoId || !generatedCaptions[activeVideoId] || !showCaptions) {
      return '';
    }
    
    const currentCaptions = generatedCaptions[activeVideoId];
    const currentCaption = currentCaptions.find(
      caption => currentTime >= caption.start && currentTime <= caption.end
    );
    
    return currentCaption?.text || '';
  };

  // Handle delete confirmation
  const handleDeleteClick = (videoId: string): void => {
    const video = videos.find(v => v.id === videoId);
    if (video) {
      setDeleteConfirmation({
        isOpen: true,
        videoId: videoId,
        videoName: video.name
      });
    }
  };

  // Delete video function
  const deleteVideo = (videoId: string): void => {
    const video = videos.find(v => v.id === videoId);
    if (video && (video.type === 'local' || video.type === 'dashboard')) {
      URL.revokeObjectURL(video.url);
    }
    
    setVideos(prev => prev.filter(v => v.id !== videoId));
    
    // Clean up processed audio files
    setProcessedAudioFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[videoId];
      return newFiles;
    });
    
    // Clean up captions
    setGeneratedCaptions(prev => {
      const newCaptions = { ...prev };
      delete newCaptions[videoId];
      return newCaptions;
    });
    
    // Clean up applied effects
    setAppliedEffects(prev => {
      const newEffects = { ...prev };
      delete newEffects[videoId];
      return newEffects;
    });
    
    if (activeVideoId === videoId) {
      setActiveVideoId(null);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    }

    toast({
      title: "Video deleted",
      description: "Video has been removed from the project",
    });
    
    setDeleteConfirmation({ isOpen: false, videoId: null, videoName: null });
  };

  // Fetch dashboard sessions
  const fetchDashboardSessions = async (): Promise<void> => {
    setLoadingSessions(true);
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        toast({
          title: "Feature unavailable",
          description: "This feature is not available in this environment",
          variant: "destructive"
        });
        return;
      }

      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        toast({
          title: "Authentication required",
          description: "Please login to access your recordings",
          variant: "destructive"
        });
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      
      const userResponse = await axios.post(`${baseUrl}/api/find-userId`, {
        token: authToken
      });
      
      const userId = (userResponse.data as any).id;
      
      const sessionsResponse = await axios.get(
        `${baseUrl}/api/recording/user-sessions/${userId}`
      );
      
      if ((sessionsResponse.data as any).sessions) {
        const detailedSessions = await Promise.all(
          (sessionsResponse.data as any).sessions.map(async (session: any) => {
            const detailsResponse = await axios.get(
              `${baseUrl}/api/recording/session/${session.id}?userId=${userId}`
            );
            return (detailsResponse.data as any).session;
          })
        );
        
        setSessions(detailedSessions);
        toast({
          title: "Sessions loaded",
          description: `Found ${detailedSessions.length} recording sessions`,
        });
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        title: "Loading failed",
        description: "Failed to load your recordings",
        variant: "destructive"
      });
    } finally {
      setLoadingSessions(false);
    }
  };

  // Import video from dashboard
  const importFromDashboard = async (participantId: string, sessionId: string, participantName: string): Promise<void> => {
    setImportProgress({
      isImporting: true,
      participantName,
      stage: 'Fetching video data',
      percentage: 10
    });
    
    try {
      if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        toast({
          title: "Feature unavailable",
          description: "This feature is not available in this environment",
          variant: "destructive"
        });
        return;
      }

      const authToken = localStorage.getItem('auth_token');
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      
      setImportProgress(prev => ({ ...prev, stage: 'Authenticating', percentage: 20 }));
      
      const userResponse = await axios.post(`${baseUrl}/api/find-userId`, {
        token: authToken
      });
      const userId = (userResponse.data as any).id;

      setImportProgress(prev => ({ ...prev, stage: 'Loading video chunks', percentage: 30 }));

      const mergeResponse = await axios.get(
        `${baseUrl}/api/recording/merge-chunks/${participantId}?userId=${userId}&format=url`
      );

      if ((mergeResponse.data as any).success && (mergeResponse.data as any).chunks) {
        const chunks = (mergeResponse.data as any).chunks;
        const totalDuration = (mergeResponse.data as any).totalDuration || 0;
        
        setImportProgress(prev => ({ ...prev, stage: 'Downloading chunks', percentage: 40 }));
        
        const chunkBlobs = await Promise.all(
          chunks.map(async (chunk: any, index: number) => {
            const response = await fetch(chunk.url);
            const blob = await response.blob();
            setImportProgress(prev => ({ 
              ...prev, 
              percentage: 40 + Math.floor((index + 1) / chunks.length * 30) 
            }));
            return blob;
          })
        );

        setImportProgress(prev => ({ ...prev, stage: 'Merging video', percentage: 70 }));

        let mergedBlob = new Blob(chunkBlobs, { type: 'video/webm' });
        
        setImportProgress(prev => ({ ...prev, stage: 'Processing video', percentage: 85 }));
        
        // Fix the duration metadata
        try {
          const fixWebmDuration = (await import('fix-webm-duration')).default;
          const durationInMilliseconds = totalDuration * 1000;
          
          mergedBlob = await fixWebmDuration(mergedBlob, durationInMilliseconds, {
            logger: false
          });
        } catch (fixError) {
          console.error('Error fixing WebM duration:', fixError);
          toast({
            title: "Duration fix failed",
            description: "Video imported but duration may be incorrect",
            variant: "destructive"
          });
        }
        
        setImportProgress(prev => ({ ...prev, stage: 'Finalizing', percentage: 95 }));
        
        const videoUrl = URL.createObjectURL(mergedBlob);

        const video: Video = {
          id: Date.now().toString(),
          name: `${participantName} - Recording`,
          url: videoUrl,
          duration: totalDuration,
          type: 'dashboard',
          participantId,
          sessionId
        };

        setVideos(prev => [...prev, video]);
        setShowImportModal(false);
        
        toast({
          title: "Video imported",
          description: `Successfully imported ${participantName}'s recording`,
        });
      }
    } catch (error) {
      console.error('Error importing video:', error);
      toast({
        title: "Import failed",
        description: "Failed to import video from dashboard",
        variant: "destructive"
      });
    } finally {
      setImportProgress({
        isImporting: false,
        participantName: '',
        stage: '',
        percentage: 0
      });
    }
  };
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const video: Video = {
        id: Date.now().toString() + Math.random().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        duration: 0,
        type: 'local'
      };
      setVideos(prev => [...prev, video]);
    });

    if (files.length > 0) {
      toast({
        title: "Files uploaded",
        description: `Added ${files.length} video${files.length > 1 ? 's' : ''} to project`,
      });
    }
  };

  // Enhanced Apply AI effect with proper validation and progress tracking
  const applyAIEffect = async (): Promise<void> => {
    if (!selectedTool || !activeVideoId) return;
    
    setProcessingEffect(selectedTool);
    setProcessingProgress({ tool: selectedTool, stage: 'Preparing', percentage: 10 });
    
    const activeVideo = videos.find(v => v.id === activeVideoId);
    if (!activeVideo) {
      setProcessingEffect(null);
      setProcessingProgress({ tool: null, stage: '', percentage: 0 });
      return;
    }
    
    try {
      // Fetch the audio
      setProcessingProgress({ tool: selectedTool, stage: 'Loading audio', percentage: 20 });
      const audioResponse = await fetch(activeVideo.url);
      if (!audioResponse.ok) {
        throw new Error('Failed to fetch audio from video');
      }
      
      const audioBlob = await audioResponse.blob();
      if (audioBlob.size === 0) {
        throw new Error('Invalid audio data');
      }
      
      setProcessingProgress({ tool: selectedTool, stage: 'Processing', percentage: 50 });
      
      let processedResult: Blob | Caption[] | null = null;
      let successMessage: string = '';
      
      switch (selectedTool) {
        case 'noise-removal':
          setProcessingProgress({ tool: selectedTool, stage: 'Removing noise', percentage: 60 });
          
          
          // Create a timeout promise that rejects after 5 minutes
          const noiseRemovalTimeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Noise removal timed out after 5 minutes')), 5 * 60 * 1000);
          });
          
          try {
            // Race between the actual processing and timeout
            processedResult = await Promise.race([
              removeNoiseWithAI(audioBlob, enhancementOptions.noiseLevel, true),
              noiseRemovalTimeout
            ]) as Blob;
            
          } catch (apiError) {
            console.error('Noise removal API error:', apiError);
            throw apiError;
          }
          
          // Validate the processed audio
          if (!processedResult) {
            throw new Error('Noise removal processing failed - no result returned');
          }
          
          if (!(processedResult instanceof Blob)) {
            throw new Error('Noise removal processing failed - result is not a Blob');
          }
          
          if (processedResult.size === 0) {
            throw new Error('Noise removal processing failed - empty audio file');
          }
          
          // Log successful processing
         
          
          successMessage = `${enhancementOptions.noiseLevel} level noise reduction completed successfully`;
          break;
          
        case 'voice-enhance':
          setProcessingProgress({ tool: selectedTool, stage: 'Enhancing voice', percentage: 60 });
                   
          // Create a timeout promise that rejects after 5 minutes
          const voiceEnhanceTimeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Voice enhancement timed out after 5 minutes')), 5 * 60 * 1000);
          });
          
          try {
            // Race between the actual processing and timeout
            processedResult = await Promise.race([
              enhanceVoice(audioBlob, enhancementOptions.voiceLevel, enhancementOptions.voiceType, true),
              voiceEnhanceTimeout
            ]) as Blob;
            
          } catch (apiError) {
            console.error('Voice enhancement API error:', apiError);
            throw apiError;
          }
          
          // Validate the enhanced audio
          if (!processedResult) {
            throw new Error('Voice enhancement processing failed - no result returned');
          }
          
          if (!(processedResult instanceof Blob)) {
            throw new Error('Voice enhancement processing failed - result is not a Blob');
          }
          
          if (processedResult.size === 0) {
            throw new Error('Voice enhancement processing failed - empty audio file');
          }
          
          // Additional validation - check if it's actually audio
          if (!processedResult.type.startsWith('audio/')) {
            console.warn('Voice enhancement warning - unexpected blob type:', processedResult.type);
            // Don't throw here, as the server might return audio without proper content-type
          }
          
          successMessage = `${enhancementOptions.voiceLevel} level enhancement for ${enhancementOptions.voiceType} completed successfully`;
          break;
          
        case 'auto-captions':
          setProcessingProgress({ tool: selectedTool, stage: 'Generating captions', percentage: 60 });
          
          
          // Create a timeout promise that rejects after 3 minutes
          const captionsTimeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Caption generation timed out after 3 minutes')), 3 * 60 * 1000);
          });
          
          try {
            // Race between the actual processing and timeout
            processedResult = await Promise.race([
              generateCaptions(audioBlob),
              captionsTimeout
            ]) as Caption[];
            
          } catch (apiError) {
            console.error('Caption generation API error:', apiError);
            throw apiError;
          }
          
          // Validate captions
          if (!processedResult) {
            throw new Error('Caption generation failed - no result returned');
          }
          
          if (!Array.isArray(processedResult)) {
            throw new Error('Caption generation failed - invalid output format');
          }
          
          if (processedResult.length === 0) {
            throw new Error('Caption generation failed - no captions generated');
          }
          
          successMessage = `Generated ${processedResult.length} caption segments successfully`;
          break;
          
        default:
          throw new Error('Unknown tool selected');
      }
      
      setProcessingProgress({ tool: selectedTool, stage: 'Finalizing', percentage: 90 });
      
      // Double-check the result before marking as complete
      if (selectedTool !== 'auto-captions') {
        if (!processedResult || !(processedResult instanceof Blob) || processedResult.size === 0) {
          throw new Error('Processing completed but no valid output received');
        }
      } else {
        if (!processedResult || !Array.isArray(processedResult)) {
          throw new Error('Processing completed but no valid captions received');
        }
      }
      
      // Update state ONLY if we have valid results
      if (selectedTool === 'auto-captions') {
        if (Array.isArray(processedResult)) {
          setGeneratedCaptions(prev => ({
            ...prev,
            [activeVideoId]: processedResult as Caption[]
          }));
        }
      } else {
        if (processedResult instanceof Blob) {
          setProcessedAudioFiles(prev => ({
            ...prev,
            [activeVideoId]: {
              ...prev[activeVideoId],
              [selectedTool]: processedResult as Blob
            }
          }));
        }
      }
      
      // Add to applied effects ONLY after successful processing
      setAppliedEffects(prev => ({
        ...prev,
        [activeVideoId]: [...(prev[activeVideoId] || []).filter(e => e !== selectedTool), selectedTool]
      }));
      
      setProcessingProgress({ tool: selectedTool, stage: 'Complete', percentage: 100 });
      
      // Show success toast ONLY after everything is truly complete
      toast({
        title: `${aiTools.find(t => t.id === selectedTool)?.name} applied`,
        description: successMessage,
      });
      
      // Clear progress after a short delay
      setTimeout(() => {
        setProcessingProgress({ tool: null, stage: '', percentage: 0 });
      }, 1000);
      
    } catch (error: any) {
      console.error('Error applying effect:', error);
      
      setProcessingProgress({ tool: null, stage: '', percentage: 0 });
      
      // Remove any partially applied effects
      setAppliedEffects(prev => ({
        ...prev,
        [activeVideoId]: (prev[activeVideoId] || []).filter(e => e !== selectedTool)
      }));
      
      // Remove any partial processed files
      setProcessedAudioFiles(prev => {
        const newFiles = { ...prev };
        if (newFiles[activeVideoId] && newFiles[activeVideoId][selectedTool]) {
          delete newFiles[activeVideoId][selectedTool];
        }
        return newFiles;
      });
      
      // Show detailed error message
      toast({
        title: "Effect failed",
        description: error.message || `Failed to apply ${aiTools.find(t => t.id === selectedTool)?.name}`,
        variant: "destructive"
      });
    } finally {
      setProcessingEffect(null);
    }
  };


  // Enhanced AI Tools sidebar with options
  const renderAIToolsSidebar = () => (
    <div className="p-4 overflow-y-auto">
      <h2 className="text-sm font-semibold mb-4">AI Tools</h2>
      <div className="space-y-2">
        {aiTools.map(tool => {
          const IconComponent = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                selectedTool === tool.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              <IconComponent className="w-5 h-5 flex-shrink-0" />
              <div className="text-left">
                <div className="text-sm font-medium">{tool.name}</div>
                <div className="text-xs opacity-70">{tool.description}</div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Enhanced Options Panel */}
      {selectedTool && activeVideoId && (
        <div className="mt-4 p-3 bg-muted rounded-lg space-y-3">
          <h3 className="text-sm font-medium">Options</h3>
          
          {selectedTool === 'noise-removal' && (
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Noise Reduction Level</label>
              <select
                value={enhancementOptions.noiseLevel}
                onChange={(e) => setEnhancementOptions(prev => ({
                  ...prev,
                  noiseLevel: e.target.value as 'low' | 'medium' | 'high'
                }))}
                className="w-full px-2 py-1 bg-background border border-border rounded text-sm"
              >
                <option value="low">Low - Conservative</option>
                <option value="medium">Medium - Balanced</option>
                <option value="high">High - Aggressive</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                {enhancementOptions.noiseLevel === 'low' && 'Gentle noise reduction, preserves audio quality'}
                {enhancementOptions.noiseLevel === 'medium' && 'Balanced approach for most content'}
                {enhancementOptions.noiseLevel === 'high' && 'Maximum noise removal, may affect voice quality'}
              </p>
            </div>
          )}
          
          {selectedTool === 'voice-enhance' && (
            <>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Enhancement Level</label>
                <select
                  value={enhancementOptions.voiceLevel}
                  onChange={(e) => setEnhancementOptions(prev => ({
                    ...prev,
                    voiceLevel: e.target.value as 'low' | 'medium' | 'high'
                  }))}
                  className="w-full px-2 py-1 bg-background border border-border rounded text-sm"
                >
                  <option value="low">Low - Subtle</option>
                  <option value="medium">Medium - Balanced</option>
                  <option value="high">High - Maximum</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Voice Type</label>
                <select
                  value={enhancementOptions.voiceType}
                  onChange={(e) => setEnhancementOptions(prev => ({
                    ...prev,
                    voiceType: e.target.value as 'speech' | 'singing' | 'podcast'
                  }))}
                  className="w-full px-2 py-1 bg-background border border-border rounded text-sm"
                >
                  <option value="speech">Speech - General</option>
                  <option value="podcast">Podcast - Broadcast</option>
                  <option value="singing">Singing - Vocal</option>
                </select>
              </div>
              <p className="text-xs text-muted-foreground">
                {enhancementOptions.voiceType === 'speech' && 'Optimized for conversations and speech'}
                {enhancementOptions.voiceType === 'podcast' && 'Professional broadcast-quality enhancement'}
                {enhancementOptions.voiceType === 'singing' && 'Vocal-focused enhancement for music'}
              </p>
            </>
          )}
          
          <button
            onClick={applyAIEffect}
            disabled={processingEffect !== null}
            className="w-full py-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded text-sm transition-colors"
          >
            {processingEffect === selectedTool ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                <span>Processing...</span>
              </span>
            ) : (
              `Apply ${aiTools.find(t => t.id === selectedTool)?.name}`
            )}
          </button>
        </div>
      )}
    </div>
  );

  // Server-side export with SSE progress
  const handleExportWithSSE = async (): Promise<void> => {
    if (!activeVideoId) {
      toast({
        title: "No video selected",
        description: "Please select a video to export",
        variant: "destructive"
      });
      return;
    }
    
    setIsExporting(true);
    setExportProgress({ stage: 'Preparing', percentage: 0, message: 'Initializing export...' });
    
    try {
      const video = videos.find(v => v.id === activeVideoId);
      if (!video) throw new Error('Video not found');
      
      // Create FormData with video and effects
      const formData = new FormData();
      
      // Add video file
      const videoResponse = await fetch(video.url);
      const videoBlob = await videoResponse.blob();
      formData.append('video', videoBlob, 'input.webm');
      
      // Add processed audio if available
      if (processedAudioFiles[activeVideoId]) {
        const effects = appliedEffects[activeVideoId] || [];
        for (const effect of effects) {
          if (processedAudioFiles[activeVideoId][effect]) {
            formData.append(`audio_${effect}`, processedAudioFiles[activeVideoId][effect]);
          }
        }
      }
      
      // Add captions if available
      if (generatedCaptions[activeVideoId] && 
          appliedEffects[activeVideoId]?.includes('auto-captions')) {
        formData.append('captions', JSON.stringify(generatedCaptions[activeVideoId]));
      }
      
      // Add applied effects list
      formData.append('effects', JSON.stringify(appliedEffects[activeVideoId] || []));
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
      const authToken = localStorage.getItem('auth_token');
      
      // Make the request
      const response = await fetch(`${baseUrl}/api/video/export-sse`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      // Read the SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Decode the chunk and add to buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete messages
        const messages = buffer.split('\n\n');
        buffer = messages.pop() || ''; // Keep incomplete message in buffer
        
        for (const message of messages) {
          if (message.trim() === '') continue;
          
          const lines = message.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.type === 'progress') {
                  setExportProgress({
                    stage: data.stage,
                    percentage: data.percentage,
                    message: `${data.stage}... ${data.percentage}%`
                  });
                } else if (data.type === 'complete') {
                  // Convert base64 to blob and download
                  const byteCharacters = atob(data.video);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const blob = new Blob([byteArray], { type: data.mimeType });
                  
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = data.filename || `edited_video_${Date.now()}.mp4`;
                  a.click();
                  
                  URL.revokeObjectURL(url);
                  
                  setExportProgress({
                    stage: 'Complete',
                    percentage: 100,
                    message: 'Export completed successfully!'
                  });
                  
                  toast({
                    title: "Export complete",
                    description: "Video has been processed and downloaded successfully",
                  });
                  
                  setTimeout(() => {
                    setIsExporting(false);
                    setExportProgress(null);
                  }, 2000);
                } else if (data.type === 'error') {
                  throw new Error(data.error);
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError, line);
              }
            }
          }
        }
      }
      
    } catch (error: any) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: error.message || "Failed to export video",
        variant: "destructive"
      });
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  // Video controls
  const togglePlayPause = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const rate = parseFloat(e.target.value);
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>): void => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleVideoLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>): void => {
    const videoDuration = e.currentTarget.duration;
    setDuration(videoDuration);
    
    setVideos(prev => prev.map(v => 
      v.id === activeVideoId 
        ? { ...v, duration: videoDuration }
        : v
    ));
  };

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Processing Progress Modal Component
  const ProcessingProgressModal = () => {
    if (!processingProgress.tool) return null;
    
    const tool = aiTools.find(t => t.id === processingProgress.tool);
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
        <div className="bg-card rounded-lg p-6 w-[400px] border border-border shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            {tool && <tool.icon className="w-5 h-5" />}
            <span>Applying {tool?.name}</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>{processingProgress.stage}</span>
                <span>{processingProgress.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${processingProgress.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
            
            {processingProgress.percentage === 100 && (
              <div className="flex items-center space-x-2 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Processing complete!</span>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground">
              {processingProgress.tool === 'noise-removal' && `Analyzing and removing ${enhancementOptions.noiseLevel} level noise...`}
              {processingProgress.tool === 'voice-enhance' && `Enhancing voice with ${enhancementOptions.voiceLevel} level ${enhancementOptions.voiceType} settings...`}
              {processingProgress.tool === 'auto-captions' && 'Transcribing audio and generating captions...'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header Toolbar */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Video Editor</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowImportModal(true)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center space-x-2 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <label className="px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-md text-sm flex items-center space-x-2 cursor-pointer transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Media</span>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAITools(!showAITools)}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm flex items-center space-x-2 transition-colors"
            >
              <Wand2 className="w-4 h-4" />
              <span>AI Tools</span>
            </button>
            {activeVideoId && generatedCaptions[activeVideoId] && (
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`px-3 py-1.5 rounded-md text-sm flex items-center space-x-2 transition-colors ${
                  showCaptions 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Captions</span>
              </button>
            )}
            <button
              onClick={handleExportWithSSE}
              disabled={isExporting || videos.length === 0 || !activeVideoId}
              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-white rounded-md text-sm flex items-center space-x-2 transition-colors"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-card rounded-lg p-6 w-[400px] border border-border shadow-xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start space-x-3 mb-4">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Delete Video</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Are you sure you want to delete "{deleteConfirmation.videoName}"? This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 mt-6">
              <button
                onClick={() => setDeleteConfirmation({ isOpen: false, videoId: null, videoName: null })}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-md text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirmation.videoId) {
                    deleteVideo(deleteConfirmation.videoId);
                  }
                }}
                className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md text-sm transition-colors"
              >
                Delete Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Progress Modal */}
      {importProgress.isImporting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-card rounded-lg p-6 w-[450px] border border-border shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Importing Video</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm font-medium">{importProgress.participantName}'s Recording</span>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{importProgress.stage}</span>
                  <span>{importProgress.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${importProgress.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                This may take a few moments depending on the video size...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Export Progress Modal */}
      {exportProgress && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-[450px] border border-border shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Exporting Video</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{exportProgress.stage}</span>
                  <span>{exportProgress.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${exportProgress.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{exportProgress.message}</p>
              {exportProgress.timeRemaining && (
                <p className="text-xs text-muted-foreground">
                  Estimated time remaining: {exportProgress.timeRemaining}
                </p>
              )}
              {exportProgress.percentage === 100 && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Video exported successfully!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Processing Progress Modal */}
      <ProcessingProgressModal />

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Media & AI Tools */}
        <div className="w-64 bg-card border-r border-border flex flex-col">
          {showAITools ? renderAIToolsSidebar() : (
            <div className="p-4 overflow-y-auto">
              <h2 className="text-sm font-semibold mb-4">Media Library</h2>
              <div className="space-y-2">
                {videos.map(video => (
                  <div
                    key={video.id}
                    className={`p-3 rounded-lg transition-colors ${
                      activeVideoId === video.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <FileVideo className="w-4 h-4 flex-shrink-0" />
                      <div 
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => setActiveVideoId(video.id)}
                      >
                        <div className="text-sm font-medium truncate">{video.name}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {video.type === 'dashboard' ? 'Dashboard' : 'Local'} • {formatTime(video.duration || 0)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(video.id);
                        }}
                        className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors flex-shrink-0"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {videos.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileVideo className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No media files</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center - Preview Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center p-4 min-h-0 relative">
            {activeVideoId && videos.find(v => v.id === activeVideoId) ? (
              <>
                <video
                  ref={videoRef}
                  className="max-w-full max-h-full object-contain"
                  onTimeUpdate={handleVideoTimeUpdate}
                  onLoadedMetadata={handleVideoLoadedMetadata}
                  onError={(e) => {
                    console.error('Video load error:', e);
                    const activeVideo = videos.find(v => v.id === activeVideoId);
                    if (activeVideo && videoRef.current) {
                      videoRef.current.src = activeVideo.url;
                      videoRef.current.load();
                    }
                  }}
                />
                {/* Caption Overlay */}
                {getCurrentCaption() && (
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-center max-w-3xl">
                    <p className="text-lg font-medium">{getCurrentCaption()}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <Film className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Import or select a video to start editing</p>
              </div>
            )}
          </div>

          {/* Video Controls */}
          <div className="bg-card border-t border-border p-4 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlayPause}
                disabled={!activeVideoId}
                className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <div className="flex-1 flex items-center space-x-2">
                <span className="text-sm w-12 text-right">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={!activeVideoId}
                  className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <span className="text-sm w-12">{formatTime(duration)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
              </div>
              
              <select
                value={playbackRate}
                onChange={handlePlaybackRateChange}
                className="bg-card text-foreground rounded px-2 py-1 text-sm border border-border"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-64 bg-card border-l border-border p-4">
          <h2 className="text-sm font-semibold mb-4">Properties</h2>
          {activeVideoId && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <h3 className="text-sm font-medium mb-2">Video Info</h3>
                <div className="space-y-1 text-xs">
                  <p className="text-muted-foreground">
                    Duration: <span className="text-foreground">{formatTime(videos.find(v => v.id === activeVideoId)?.duration || 0)}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Type: <span className="text-foreground">{videos.find(v => v.id === activeVideoId)?.type}</span>
                  </p>
                </div>
              </div>
              
              {appliedEffects[activeVideoId]?.map(effect => (
                <div key={effect} className="p-2 bg-primary/10 border border-primary/20 rounded text-xs">
                  <Check className="w-3 h-3 inline mr-1 text-primary" />
                  <span className="text-primary">{aiTools.find(t => t.id === effect)?.name}</span>
                  {effect === 'noise-removal' && (
                    <span className="text-muted-foreground ml-1">({enhancementOptions.noiseLevel})</span>
                  )}
                  {effect === 'voice-enhance' && (
                    <span className="text-muted-foreground ml-1">({enhancementOptions.voiceLevel} {enhancementOptions.voiceType})</span>
                  )}
                </div>
              ))}
              
              {/* Show processing indicator */}
              {processingEffect && (
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-600" />
                    <div>
                      <p className="text-xs font-medium text-yellow-600">Processing {aiTools.find(t => t.id === processingEffect)?.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {processingProgress.stage} - {processingProgress.percentage}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {generatedCaptions[activeVideoId] && generatedCaptions[activeVideoId].length > 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Generated Captions</h3>
                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>Found {generatedCaptions[activeVideoId].length} captions</p>
                    <p>Ready for export with burned-in subtitles</p>
                    <button
                      onClick={() => setShowCaptions(!showCaptions)}
                      className={`w-full mt-2 px-2 py-1 rounded text-xs transition-colors ${
                        showCaptions 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {showCaptions ? 'Hide Preview' : 'Show Preview'}
                    </button>
                  </div>
                </div>
              )}

              {processedAudioFiles[activeVideoId] && Object.keys(processedAudioFiles[activeVideoId]).length > 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Processed Audio</h3>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {Object.keys(processedAudioFiles[activeVideoId]).map(effect => (
                      <div key={effect} className="flex items-center space-x-1">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>{aiTools.find(t => t.id === effect)?.name}</span>
                      </div>
                    ))}
                    <p className="mt-2 text-green-600">Enhanced audio ready for export</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-[600px] max-h-[80vh] overflow-hidden flex flex-col border border-border shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Import Media</h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 overflow-y-auto flex-1">
              <button
                onClick={() => {
                  if (sessions.length === 0) {
                    fetchDashboardSessions();
                  }
                }}
                className="w-full p-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-left flex items-center space-x-3 transition-colors"
              >
                <Film className="w-5 h-5" />
                <div className="flex-1">
                  <div className="font-medium">Import from Dashboard</div>
                  <div className="text-sm text-muted-foreground">Access your recorded podcasts</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
              
              {loadingSessions && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">Loading sessions...</p>
                </div>
              )}
              
              {sessions.length > 0 && (
                <div className="space-y-2">
                  {sessions.map(session => (
                    <div key={session.id} className="bg-muted rounded-lg p-3">
                      <h4 className="font-medium mb-2">{session.roomName}</h4>
                      <div className="space-y-1">
                        {session.participants.map(participant => (
                          <button
                            key={participant.id}
                            onClick={() => importFromDashboard(
                              participant.id,
                              session.id,
                              participant.username
                            )}
                            disabled={participant.chunks.length === 0}
                            className="w-full p-2 bg-secondary hover:bg-secondary/80 disabled:bg-muted disabled:text-muted-foreground rounded text-left text-sm transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span>{participant.username}</span>
                              <span className="text-xs text-muted-foreground">
                                {participant.chunks.length} chunks
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <label className="w-full p-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-left flex items-center space-x-3 cursor-pointer transition-colors">
                <Upload className="w-5 h-5" />
                <div className="flex-1">
                  <div className="font-medium">Upload from Computer</div>
                  <div className="text-sm text-muted-foreground">Select video files from your device</div>
                </div>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => {
                    handleFileUpload(e);
                    setShowImportModal(false);
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectPage;