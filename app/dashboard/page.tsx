// /dashboard/page.tsx - Optimized version

'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import fixWebmDuration from 'fix-webm-duration';

// Types remain the same
interface User {
  firstName: string;
  lastName: string | null;
  email: string;
}

interface Participant {
  id: string;
  username: string;
  joinedAt: string;
  leftAt: string | null;
  user: User;
}

interface Session {
  id: string;
  roomName: string;
  status: string;
  startTime: string;
  endTime: string | null;
  participants: Participant[];
  totalChunks: number;
}

interface RecordingChunk {
  id: string;
  chunkNumber: number;
  duration: number;
  fileSize: string;
  uploadedAt: string;
  downloadUrl: string;
}

interface ParticipantWithChunks extends Participant {
  chunks: RecordingChunk[];
  totalDuration: number;
  isComplete: boolean;
}

interface SessionDetails {
  id: string;
  roomName: string;
  status: string;
  startTime: string;
  endTime: string | null;
  participants: ParticipantWithChunks[];
}

interface MergeProgress {
  participantId: string;
  progress: number;
  status: 'downloading' | 'merging' | 'complete' | 'error';
}

interface EditorImportData {
  participantId: string;
  sessionId: string;
  participantName: string;
  timestamp: number;
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const SESSION_STORAGE_KEY = 'dashboard_sessions_cache';
const USER_ID_STORAGE_KEY = 'dashboard_user_id';

export default function RecordingDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionDetails, setSessionDetails] = useState<{ [key: string]: SessionDetails }>({});
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [processingVideo, setProcessingVideo] = useState<string | null>(null);
  const [mergedVideos, setMergedVideos] = useState<{ [key: string]: string }>({});
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [mergeProgress, setMergeProgress] = useState<{ [key: string]: MergeProgress }>({});
  const [loadingSessionDetails, setLoadingSessionDetails] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  // Refs for caching
  const lastFetchTime = useRef<number>(0);
  const fetchInProgress = useRef<boolean>(false);
  const sessionDetailsCache = useRef<{ [key: string]: { data: SessionDetails; timestamp: number } }>({});

  // Load cached data from sessionStorage
  const loadCachedData = useCallback(() => {
    try {
      // Load cached user ID
      const cachedUserId = sessionStorage.getItem(USER_ID_STORAGE_KEY);
      if (cachedUserId) {
        setCurrentUserId(parseInt(cachedUserId));
      }

      // Load cached sessions
      const cachedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cachedData) {
        const { sessions: cachedSessions, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        
        // Check if cache is still valid
        if (now - timestamp < CACHE_DURATION) {
          setSessions(cachedSessions);
          lastFetchTime.current = timestamp;
          return true;
        }
      }
    } catch (error) {
      console.error('Error loading cached data:', error);
    }
    return false;
  }, []);

  // Save data to cache
  const saveToCache = useCallback((sessionsData: Session[], userId: number) => {
    try {
      sessionStorage.setItem(USER_ID_STORAGE_KEY, userId.toString());
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
        sessions: sessionsData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, []);

  // Memoized fetch function with caching
  const fetchUserAndSessions = useCallback(async (forceRefresh = false) => {
    // Check if we're already fetching or if cache is still valid
    if (fetchInProgress.current) return;
    
    const now = Date.now();
    if (!forceRefresh && now - lastFetchTime.current < CACHE_DURATION) {
      setLoading(false);
      return;
    }

    fetchInProgress.current = true;

    try {
      // Get current user ID
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        console.error('No auth token found');
        setLoading(false);
        return;
      }

      let userId = currentUserId;
      
      // Only fetch user ID if we don't have it cached
      if (!userId) {
        const userResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/find-userId`, {
          token: authToken
        });
        
        if (!userResponse.data || !(userResponse.data as any).id) {
          console.error('Invalid user response');
          setLoading(false);
          return;
        }
        
        userId = (userResponse.data as any).id;
        setCurrentUserId(userId);
      }

      // Fetch user's sessions
      try {
        const sessionsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/user-sessions/${userId}`
        );
        
        if (sessionsResponse.data && (sessionsResponse.data as any).sessions) {
          const sessionsData = (sessionsResponse.data as any).sessions;
          setSessions(sessionsData);
          saveToCache(sessionsData, userId);
          lastFetchTime.current = now;
        }
      } catch (sessionError: any) {
        if (sessionError.response?.status === 404) {
          setSessions([]);
          saveToCache([], userId);
        } else {
          throw sessionError;
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Don't show alert on every error, just log it
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  }, [currentUserId, saveToCache]);

  // Initial load - try cache first, then fetch if needed
  useEffect(() => {
    const hasCachedData = loadCachedData();
    if (hasCachedData) {
      setLoading(false);
      // Still fetch in background to get latest data
      fetchUserAndSessions(false);
    } else {
      fetchUserAndSessions(true);
    }
  }, []);

  // Cleanup video URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(mergedVideos).forEach(url => {
        URL.revokeObjectURL(url);
      });
    };
  }, [mergedVideos]);

  // Memoized function to open in editor
  const openInEditor = useCallback(async (participant: ParticipantWithChunks, sessionId: string) => {
    const importData: EditorImportData = {
      participantId: participant.id,
      sessionId,
      participantName: participant.username,
      timestamp: Date.now()
    };
    
    sessionStorage.setItem('editorImport', JSON.stringify(importData));
    router.push('/dashboard/projects');
  }, [router]);

  // Fetch session details with better caching
  const fetchSessionDetails = useCallback(async (sessionId: string) => {
    // Check memory cache first
    if (sessionDetails[sessionId]) {
      return sessionDetails[sessionId];
    }

    // Check sessionStorage cache
    const cacheKey = `session_details_${sessionId}`;
    const cachedData = sessionDetailsCache.current[sessionId];
    if (cachedData) {
      const now = Date.now();
      if (now - cachedData.timestamp < CACHE_DURATION) {
        setSessionDetails(prev => ({ ...prev, [sessionId]: cachedData.data }));
        return cachedData.data;
      }
    }

    try {
      setLoadingSessionDetails(prev => ({ ...prev, [sessionId]: true }));
      
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/session/${sessionId}?userId=${currentUserId}`
      );
      
      const session = (response.data as any).session as SessionDetails;
      
      // Calculate total duration and completeness for each participant
      session.participants = session.participants.map(participant => ({
        ...participant,
        totalDuration: participant.chunks.reduce((acc, chunk) => acc + chunk.duration, 0),
        isComplete: participant.leftAt !== null && participant.chunks.length > 0
      }));
      
      // Cache the session details in memory and state
      sessionDetailsCache.current[sessionId] = {
        data: session,
        timestamp: Date.now()
      };
      setSessionDetails(prev => ({ ...prev, [sessionId]: session }));
      
      return session;
    } catch (error) {
      console.error('Error fetching session details:', error);
      return null;
    } finally {
      setLoadingSessionDetails(prev => ({ ...prev, [sessionId]: false }));
    }
  }, [sessionDetails, currentUserId]);

  // Optimized toggle function
  const toggleSessionExpansion = useCallback(async (sessionId: string) => {
    if (expandedSession === sessionId) {
      setExpandedSession(null);
    } else {
      setExpandedSession(sessionId);
      
      if (!sessionDetails[sessionId] && !loadingSessionDetails[sessionId]) {
        await fetchSessionDetails(sessionId);
      }
    }
  }, [expandedSession, sessionDetails, fetchSessionDetails, loadingSessionDetails]);

  // Memoized merge function
  const mergeParticipantChunks = useCallback(async (participantId: string, chunks: RecordingChunk[]) => {
    if (chunks.length === 0) {
      alert('No chunks available for this participant');
      return;
    }

    // Check if we already have a merged video
    if (mergedVideos[participantId] && mergeProgress[participantId]?.status === 'complete') {
      return;
    }

    setProcessingVideo(participantId);
    setMergeProgress(prev => ({
      ...prev,
      [participantId]: { participantId, progress: 0, status: 'downloading' }
    }));
    
    try {
      // Implementation remains the same as original
      setMergeProgress(prev => ({
        ...prev,
        [participantId]: { participantId, progress: 20, status: 'downloading' }
      }));

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/merge-chunks/${participantId}?userId=${currentUserId}&format=url`
      );

      if ((response.data as any).success) {
        const data = response.data as any;
        
        if (data.mergedVideo) {
          setMergeProgress(prev => ({
            ...prev,
            [participantId]: { participantId, progress: 90, status: 'downloading' }
          }));

          const videoResponse = await fetch(data.mergedVideo.url);
          let videoBlob = await videoResponse.blob();
          
          try {
            const totalDuration = data.mergedVideo.duration || chunks.reduce((acc, chunk) => acc + chunk.duration, 0);
            const durationInMilliseconds = totalDuration * 1000;
            
            videoBlob = await fixWebmDuration(videoBlob, durationInMilliseconds, {
              logger: false
            });
          } catch (fixError) {
            console.error('Error fixing WebM duration:', fixError);
          }
          
          if (mergedVideos[participantId]) {
            URL.revokeObjectURL(mergedVideos[participantId]);
          }
          
          const videoUrl = URL.createObjectURL(videoBlob);
          setMergedVideos(prev => ({ ...prev, [participantId]: videoUrl }));
        } 
        else if (data.chunks) {
          const sortedChunks = data.chunks.sort((a: any, b: any) => a.chunkNumber - b.chunkNumber);
          const totalDuration = data.totalDuration || sortedChunks.reduce((acc: number, chunk: any) => acc + chunk.duration, 0);
          
          const chunkBlobs: Blob[] = [];
          for (let i = 0; i < sortedChunks.length; i++) {
            const chunk = sortedChunks[i];
            const response = await fetch(chunk.url);
            
            if (!response.ok) {
              throw new Error(`Failed to download chunk ${chunk.chunkNumber}`);
            }
            
            const blob = await response.blob();
            chunkBlobs.push(blob);
            
            const progress = 30 + ((i + 1) / sortedChunks.length) * 50;
            setMergeProgress(prev => ({
              ...prev,
              [participantId]: { participantId, progress, status: 'downloading' }
            }));
          }

          setMergeProgress(prev => ({
            ...prev,
            [participantId]: { participantId, progress: 80, status: 'merging' }
          }));

          let combinedBlob = new Blob(chunkBlobs, { type: 'video/webm' });
          
          try {
            const durationInMilliseconds = totalDuration * 1000;
            combinedBlob = await fixWebmDuration(combinedBlob, durationInMilliseconds, {
              logger: false
            });
          } catch (fixError) {
            console.error('Error fixing WebM duration:', fixError);
          }
          
          if (mergedVideos[participantId]) {
            URL.revokeObjectURL(mergedVideos[participantId]);
          }
          
          const videoUrl = URL.createObjectURL(combinedBlob);
          setMergedVideos(prev => ({ ...prev, [participantId]: videoUrl }));
        }
        
        setMergeProgress(prev => ({
          ...prev,
          [participantId]: { participantId, progress: 100, status: 'complete' }
        }));
      } else {
        throw new Error('Failed to get video data');
      }
      
    } catch (error) {
      console.error('Error merging chunks:', error);
      setMergeProgress(prev => ({
        ...prev,
        [participantId]: { participantId, progress: 0, status: 'error' }
      }));
      alert('Failed to merge video chunks. Please try again.');
    } finally {
      setProcessingVideo(null);
    }
  }, [currentUserId, mergedVideos, mergeProgress]);

  // Memoized download function
  const downloadMergedVideo = useCallback(async (participant: ParticipantWithChunks) => {
    if (!mergedVideos[participant.id]) {
      await mergeParticipantChunks(participant.id, participant.chunks);
    }
    
    if (mergedVideos[participant.id]) {
      const response = await fetch(mergedVideos[participant.id]);
      let blob = await response.blob();
      
      try {
        const totalDuration = participant.totalDuration;
        const durationInMilliseconds = totalDuration * 1000;
        blob = await fixWebmDuration(blob, durationInMilliseconds, {
          logger: false
        });
      } catch (error) {
        console.error('Error fixing duration for download:', error);
      }
      
      const fixedUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = fixedUrl;
      link.download = `${participant.username}_${participant.user.firstName}_${participant.user.lastName || ''}_recording.webm`.replace(/\s+/g, '_');
      link.click();
      
      setTimeout(() => URL.revokeObjectURL(fixedUrl), 1000);
    }
  }, [mergedVideos, mergeParticipantChunks]);

  // Memoized download all function
  const downloadAllRecordings = useCallback(async (sessionId: string) => {
    const selectedSession = sessionDetails[sessionId];
    if (!selectedSession) return;
    
    try {
      for (const participant of selectedSession.participants) {
        if (participant.chunks.length > 0) {
          await downloadMergedVideo(participant);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error('Error downloading all recordings:', error);
      alert('Failed to download all recordings');
    }
  }, [sessionDetails, downloadMergedVideo]);

  // Memoized format duration function
  const formatDuration = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }, []);

  // Add manual refresh button
  const handleRefresh = useCallback(() => {
    fetchUserAndSessions(true);
  }, [fetchUserAndSessions]);

  // Loading state remains the same
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading skeleton remains the same */}
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-foreground/10 rounded-lg w-48 animate-pulse"></div>
          </div>

          {/* Sessions List Skeleton */}
          <div className="space-y-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="bg-background border border-foreground/10 rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-6 bg-foreground/10 rounded w-64 mb-3 animate-pulse"></div>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-foreground/10 rounded w-12 animate-pulse"></div>
                          <div className="h-6 bg-foreground/10 rounded-full w-20 animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-foreground/10 rounded w-16 animate-pulse"></div>
                          <div className="h-4 bg-foreground/10 rounded w-24 animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-foreground/10 rounded w-20 animate-pulse"></div>
                          <div className="h-4 bg-foreground/10 rounded w-8 animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 bg-foreground/10 rounded w-24 animate-pulse"></div>
                          <div className="h-4 bg-foreground/10 rounded w-12 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-6 bg-foreground/10 rounded-full w-20 animate-pulse"
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-9 h-9 bg-foreground/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-12">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
              <span className="text-foreground/60 text-lg">Loading your recording sessions...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 text-sm bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-md transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Rest of the component remains largely the same with the render logic */}
        {/* Sessions List */}
        <div className="space-y-6">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60">No recording sessions found</p>
              <p className="text-sm text-foreground/40 mt-2">
                Create a podcast and start recording to see your sessions here
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-background border border-foreground/10 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
              >
                {/* Session Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-foreground/5 transition-all duration-150 active:bg-foreground/10 select-none"
                  onClick={() => toggleSessionExpansion(session.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {session.roomName}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Status:</span>
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs transition-colors ${
                            session.status === 'COMPLETED' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Started:</span>
                          <span>{formatDistanceToNow(new Date(session.startTime), { addSuffix: true })}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Participants:</span>
                          <span>{session.participants.length}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-medium">Total Chunks:</span>
                          <span>{session.totalChunks}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {session.participants.map((participant) => (
                          <span
                            key={participant.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/10 text-foreground transition-colors hover:bg-foreground/20"
                          >
                            {participant.username}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <div className="p-2 rounded-full hover:bg-foreground/10 transition-all duration-150">
                        <svg 
                          className={`w-5 h-5 text-foreground/60 transition-transform duration-200 ease-out ${
                            expandedSession === session.id ? 'rotate-180' : 'rotate-0'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    expandedSession === session.id 
                      ? 'max-h-[2000px] opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-foreground/10 p-6 bg-foreground/5">
                    {loadingSessionDetails[session.id] ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-foreground/60"></div>
                          <span className="text-foreground/60">Loading session details...</span>
                        </div>
                      </div>
                    ) : sessionDetails[session.id] ? (
                      <>
                        {/* Session Actions */}
                        <div className="flex justify-end gap-3 mb-6">
                          <button
                            onClick={() => downloadAllRecordings(session.id)}
                            disabled={sessionDetails[session.id].participants.every(p => p.chunks.length === 0)}
                            className={`px-4 py-2 rounded-md transition-all duration-150 ${
                              sessionDetails[session.id].participants.every(p => p.chunks.length === 0)
                                ? 'bg-foreground/20 text-foreground/50 cursor-not-allowed'
                                : 'bg-foreground text-background hover:bg-foreground/90 hover:shadow-md active:scale-95'
                            }`}
                          >
                            Download All Recordings
                          </button>
                        </div>

                        {/* Session Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                          <div className="bg-background border border-foreground/10 p-4 rounded-lg hover:border-foreground/20 transition-colors">
                            <p className="font-medium text-foreground/70">Status</p>
                            <p className="mt-1 font-semibold text-foreground">
                              {sessionDetails[session.id].status}
                            </p>
                          </div>
                          
                          <div className="bg-background border border-foreground/10 p-4 rounded-lg hover:border-foreground/20 transition-colors">
                            <p className="font-medium text-foreground/70">Duration</p>
                            <p className="mt-1 font-semibold text-foreground">
                              {sessionDetails[session.id].endTime
                                ? `${Math.round(
                                    (new Date(sessionDetails[session.id].endTime!).getTime() - 
                                     new Date(sessionDetails[session.id].startTime).getTime()) / 60000
                                  )} minutes`
                                : 'Ongoing'}
                            </p>
                          </div>
                          
                          <div className="bg-background border border-foreground/10 p-4 rounded-lg hover:border-foreground/20 transition-colors">
                            <p className="font-medium text-foreground/70">Total Participants</p>
                            <p className="mt-1 font-semibold text-foreground">{sessionDetails[session.id].participants.length}</p>
                          </div>
                        </div>

                        {/* Participants and their recordings */}
                        <div className="space-y-4">
                          <h4 className="text-md font-semibold text-foreground">Participant Recordings</h4>
                          
                          {sessionDetails[session.id].participants.map((participant) => (
                            <div key={participant.id} className="bg-background border border-foreground/10 rounded-lg p-4 hover:border-foreground/20 transition-colors">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="font-medium text-foreground">
                                    {participant.username}
                                  </h5>
                                  <p className="text-sm text-foreground/70">
                                    {participant.user.firstName} {participant.user.lastName}
                                  </p>
                                  <div className="flex gap-4 text-xs text-foreground/50 mt-1">
                                    <span>Chunks: {participant.chunks.length}</span>
                                    <span>Duration: {formatDuration(participant.totalDuration)}</span>
                                    <span className={participant.isComplete ? 'text-green-400' : 'text-yellow-400'}>
                                      {participant.isComplete ? 'Complete' : 'Incomplete'}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => mergeParticipantChunks(participant.id, participant.chunks)}
                                    disabled={processingVideo === participant.id || participant.chunks.length === 0}
                                    className={`px-4 py-2 rounded-md transition-all duration-150 ${
                                      processingVideo === participant.id || participant.chunks.length === 0
                                        ? 'bg-foreground/20 text-foreground/50 cursor-not-allowed'
                                        : 'bg-foreground text-background hover:bg-foreground/90 hover:shadow-md active:scale-95'
                                    }`}
                                  >
                                    {processingVideo === participant.id 
                                      ? 'Processing...' 
                                      : participant.chunks.length === 0
                                      ? 'No Recording'
                                      : mergedVideos[participant.id]
                                      ? 'Reload Video'
                                      : 'Load Video'}
                                  </button>
                                  
                                  {participant.chunks.length > 0 && (
                                    <>
                                      <button
                                        onClick={() => downloadMergedVideo(participant)}
                                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 hover:shadow-md active:scale-95 transition-all duration-150"
                                      >
                                        Download
                                      </button>
                                      <button
                                        onClick={() => openInEditor(participant, session.id)}
                                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 hover:shadow-md active:scale-95 transition-all duration-150"
                                      >
                                        Edit in AI Editor
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Progress Bar */}
                              {mergeProgress[participant.id] && mergeProgress[participant.id].status !== 'complete' && (
                                <div className="mb-4">
                                  <div className="flex items-center justify-between text-xs text-foreground/70 mb-1">
                                    <span>{mergeProgress[participant.id].status === 'downloading' ? 'Downloading chunks...' : 'Merging video...'}</span>
                                    <span>{Math.round(mergeProgress[participant.id].progress)}%</span>
                                  </div>
                                  <div className="w-full bg-foreground/20 rounded-full h-2">
                                    <div 
                                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${mergeProgress[participant.id].progress}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Video Player */}
                              {mergedVideos[participant.id] && (
                                <div className="mt-4">
                                  <video
                                    controls
                                    className="w-full rounded-lg shadow-lg bg-black"
                                    src={mergedVideos[participant.id]}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                  
                                  <div className="mt-2 flex items-center justify-between text-sm">
                                    <span className="text-foreground/60">
                                      {participant.username} - {formatDuration(participant.totalDuration)}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-foreground/60">
                        Failed to load session details
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}