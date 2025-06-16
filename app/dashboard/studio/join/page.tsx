// dashboard/studio/join/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import {
  LiveKitRoom,
  formatChatMessageLinks,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ConnectionStateToast,
  FocusLayout,
  FocusLayoutContainer,
  CarouselLayout,
  LayoutContextProvider,
  Chat,
  ControlBar,
  useRoomContext,
} from '@livekit/components-react';
import { Track, RoomEvent, Room } from 'livekit-client';
import { 
  isEqualTrackRef, 
  isTrackReference, 
  isWeb, 
  log,
  type TrackReferenceOrPlaceholder,
  type WidgetState 
} from '@livekit/components-core';
import { useCreateLayoutContext, usePinnedTracks, useTracks } from '@livekit/components-react';
import * as React from 'react';
import '@livekit/components-styles';
import axios from 'axios';
import { useToast } from '@/app/hooks/use-toast';

// Recording Manager Class (same as create page)
class RecordingManager {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private chunkNumber = 0;
  private sessionId: string | null = null;
  private participantId: string | null = null;
  private userId: number | null = null;
  private isRecording = false;
  private uploadInterval: NodeJS.Timeout | null = null;
  private recordingStartTime: number = 0;
  private lastChunkTime: number = 0;
  private chunkStartTime: number = 0;

  constructor(
    private onError: (error: string) => void,
    private onStatusChange: (status: string) => void
  ) {}

  async startRecording(sessionId: string, participantId: string, userId: number) {
    try {
      this.sessionId = sessionId;
      this.participantId = participantId;
      this.userId = userId;
      this.chunkNumber = 0;
      this.recordingStartTime = Date.now();
      this.lastChunkTime = this.recordingStartTime;
      this.chunkStartTime = this.recordingStartTime;
      
      // Get user media (audio and video)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      // Create MediaRecorder
      const options: MediaRecorderOptions = {
        mimeType: 'video/webm;codecs=vp9,opus'
      };

      // Fallback to VP8 if VP9 not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        options.mimeType = 'video/webm;codecs=vp8,opus';
      }

      // Final fallback
      if (!MediaRecorder.isTypeSupported(options.mimeType!)) {
        options.mimeType = 'video/webm';
      }

      this.mediaRecorder = new MediaRecorder(stream, options);
      this.recordedChunks = [];

      // Handle data available
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // Handle recording stop
      this.mediaRecorder.onstop = async () => {
        // Only upload if we have chunks
        if (this.recordedChunks.length > 0) {
          await this.uploadCurrentChunk();
        }
      };

      // Start recording WITHOUT timeslice first
      // We'll manually stop and restart to ensure proper chunks
      this.mediaRecorder.start();
      
      this.isRecording = true;
      this.onStatusChange('Recording started');

      // Set up interval to create chunks every 30 seconds
      this.uploadInterval = setInterval(() => {
        this.createAndUploadChunk();
      }, 30000); // 30 seconds

    } catch (error) {
      console.error('Error starting recording:', error);
      this.onError('Failed to start recording: ' + (error as Error).message);
    }
  }

  private async createAndUploadChunk() {
    if (!this.mediaRecorder || !this.isRecording) return;
    
    // Store the current state to avoid TypeScript issues
    const currentState = this.mediaRecorder.state;
    
    // Check if MediaRecorder is in recording state
    if (currentState !== 'recording') {
      console.log('MediaRecorder not in recording state:', currentState);
      return;
    }

    try {
      // Mark the time before stopping
      this.chunkStartTime = this.lastChunkTime;
      
      // Stop current recording to get the chunk
      this.mediaRecorder.stop();
      
      // Wait for the stop event to process and upload
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Restart recording for the next chunk if still recording
      // We need to check if mediaRecorder still exists and we're still recording
      if (this.isRecording && this.mediaRecorder) {
        // Check state again after the delay
        if (this.mediaRecorder.state === 'inactive') {
          // Clear chunks for next recording
          this.recordedChunks = [];
          this.mediaRecorder.start();
        }
      }
    } catch (error) {
      console.error('Error creating chunk:', error);
      this.onError('Failed to create recording chunk');
    }
  }

  private async uploadCurrentChunk() {
    if (this.recordedChunks.length === 0) return;

    try {
      // Create a properly formatted WebM blob from chunks
      const blob = new Blob(this.recordedChunks, { 
        type: this.mediaRecorder?.mimeType || 'video/webm' 
      });
      
      this.chunkNumber++;
      
      // Calculate accurate duration based on actual time elapsed
      const currentTime = Date.now();
      const duration = Math.round((currentTime - this.chunkStartTime) / 1000); // Convert to seconds
      this.lastChunkTime = currentTime;

      console.log(`Uploading chunk ${this.chunkNumber} with duration: ${duration}s`);

      // Create FormData for upload
      const formData = new FormData();
      formData.append('chunk', blob, `chunk-${this.chunkNumber}.webm`);
      formData.append('sessionId', this.sessionId!);
      formData.append('participantId', this.participantId!);
      formData.append('userId', this.userId!.toString());
      formData.append('chunkNumber', this.chunkNumber.toString());
      formData.append('duration', duration.toString());

      // Upload to your API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/upload-chunk`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if ((response.data as any).success) {
        this.onStatusChange(`Chunk ${this.chunkNumber} uploaded successfully`);
        console.log(`Chunk ${this.chunkNumber} uploaded:`, response.data);
      } else {
        throw new Error('Upload failed');
      }

      // Clear the recorded chunks for the next batch
      this.recordedChunks = [];

    } catch (error) {
      console.error('Error uploading chunk:', error);
      this.onError(`Failed to upload chunk ${this.chunkNumber}`);
    }
  }

  async stopRecording() {
    try {
      this.isRecording = false;

      // Clear the upload interval
      if (this.uploadInterval) {
        clearInterval(this.uploadInterval);
        this.uploadInterval = null;
      }

      // Stop the media recorder and upload final chunk
      if (this.mediaRecorder) {
        // Store the current state
        const currentState = this.mediaRecorder.state;
        
        if (currentState === 'recording') {
          // Mark the final chunk start time
          this.chunkStartTime = this.lastChunkTime;
          
          this.mediaRecorder.stop();
          
          // Wait for the final chunk to be processed
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else if (currentState === 'paused') {
          // Resume first, then stop
          this.mediaRecorder.resume();
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Check state again after resume
          if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        // If already 'inactive', nothing to do
      }

      // Stop all tracks
      if (this.mediaRecorder?.stream) {
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      }

      // Finalize the participant's recording session
      if (this.sessionId && this.participantId) {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/finalize-participant`, {
            sessionId: this.sessionId,
            participantId: this.participantId
          });
        } catch (error) {
          console.error('Error finalizing participant recording:', error);
        }
      }

      this.onStatusChange('Recording stopped');
      
      // Clean up
      this.mediaRecorder = null;
      this.recordedChunks = [];

    } catch (error) {
      console.error('Error stopping recording:', error);
      this.onError('Failed to stop recording');
    }
  }

  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }
}

// Recording State Manager Component for ALL participants (including creator)
// Fixed Recording State Manager Component for ALL participants (including creator)
function RecordingStateManager({ 
  roomKey, 
  currentUserId,
  username,
  onSessionDetails,
  isCreator
}: { 
  roomKey: string;
  currentUserId: number;
  username: string;
  onSessionDetails: (details: { sessionId: string; participantId: string }) => void;
  isCreator: boolean;
}) {
  const room = useRoomContext();
  const [isRecordingActive, setIsRecordingActive] = React.useState(false);
  const [recordingStatus, setRecordingStatus] = React.useState<string>('');
  const [recordingError, setRecordingError] = React.useState<string>('');
  const recordingManagerRef = React.useRef<RecordingManager | null>(null);
  const sessionDetailsRef = React.useRef<{ sessionId: string; participantId: string } | null>(null);
  
  // Use refs to maintain stable references
  const isRecordingRef = React.useRef(false);
  const roomKeyRef = React.useRef(roomKey);
  const currentUserIdRef = React.useRef(currentUserId);
  const usernameRef = React.useRef(username);

  // Update refs when props change
  React.useEffect(() => {
    roomKeyRef.current = roomKey;
    currentUserIdRef.current = currentUserId;
    usernameRef.current = username;
  }, [roomKey, currentUserId, username]);

  React.useEffect(() => {
    // Initialize recording manager
    recordingManagerRef.current = new RecordingManager(
      (error) => setRecordingError(error),
      (status) => setRecordingStatus(status)
    );

    // Set up room event listeners for recording commands
    const handleDataReceived = async (payload: Uint8Array, participant?: any) => {
      try {
        const decoder = new TextDecoder();
        const message = JSON.parse(decoder.decode(payload));
        console.log('[RecordingStateManager] Received message:', message);
        
        if (message.type === 'RECORDING_COMMAND') {
          if (message.action === 'START' && message.sessionId) {
            console.log('[RecordingStateManager] Starting recording with sessionId:', message.sessionId);
            console.log('[RecordingStateManager] Current recording state:', isRecordingRef.current);
            
            // Don't start if already recording
            if (!isRecordingRef.current && recordingManagerRef.current) {
              isRecordingRef.current = true;
              setIsRecordingActive(true);
              
              try {
                // Participant joining existing session
                console.log('[RecordingStateManager - Participant] Joining session:', message.sessionId);
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/join-session`, {
                  userId: currentUserIdRef.current,
                  username: usernameRef.current,
                  sessionKey: roomKeyRef.current,
                  sessionId: message.sessionId
                });
                
                if ((response.data as any).success) {
                  const sessionDetails = {
                    sessionId: (response.data as any).session.id,
                    participantId: (response.data as any).session.participantId
                  };
                  console.log('[RecordingStateManager - Participant] Joined session:', sessionDetails);
                  
                  sessionDetailsRef.current = sessionDetails;
                  onSessionDetails(sessionDetails);
                  
                  // Start local recording
                  await recordingManagerRef.current.startRecording(
                    sessionDetails.sessionId,
                    sessionDetails.participantId,
                    currentUserIdRef.current
                  );
                  
                  console.log('[RecordingStateManager] Recording started successfully');
                } else {
                  throw new Error('Failed to join session');
                }
              } catch (error) {
                console.error('[RecordingStateManager] Error starting recording:', error);
                isRecordingRef.current = false;
                setIsRecordingActive(false);
                setRecordingError('Failed to start recording');
              }
            }
          } else if (message.action === 'STOP') {
            console.log('[RecordingStateManager] Stopping recording...');
            console.log('[RecordingStateManager] Current recording state:', isRecordingRef.current);
            
            // Stop recording if active
            if (isRecordingRef.current && recordingManagerRef.current) {
              isRecordingRef.current = false;
              setIsRecordingActive(false);
              
              try {
                await recordingManagerRef.current.stopRecording();
                console.log('[RecordingStateManager] Recording stopped successfully');
              } catch (error) {
                console.error('[RecordingStateManager] Error stopping recording:', error);
                setRecordingError('Failed to stop recording');
              }
            }
          }
        }
      } catch (error) {
        console.error('[RecordingStateManager] Error handling data message:', error);
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    console.log('[RecordingStateManager] Event listener attached');

    return () => {
      console.log('[RecordingStateManager] Cleaning up...');
      room.off(RoomEvent.DataReceived, handleDataReceived);
      
      // Cleanup on unmount
      if (recordingManagerRef.current?.isCurrentlyRecording()) {
        recordingManagerRef.current.stopRecording();
      }
    };
  }, [room, onSessionDetails]); // Remove isRecordingActive from dependencies

  const handleStartRecording = async (sessionId?: string) => {
    if (isRecordingRef.current || !recordingManagerRef.current) {
      console.log('[RecordingStateManager] Already recording or no manager');
      return;
    }

    try {
      let sessionDetails;
      
      if (isCreator && !sessionId) {
        // Creator initiating recording
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/start-session`, {
          userId: currentUserId,
          username,
          roomName: roomKey,
          sessionKey: roomKey
        });
        
        if ((response.data as any).success) {
          sessionDetails = {
            sessionId: (response.data as any).session.id,
            participantId: (response.data as any).session.participantId
          };
          
          sessionDetailsRef.current = sessionDetails;
          onSessionDetails(sessionDetails);
          
          // Start local recording first
          isRecordingRef.current = true;
          setIsRecordingActive(true);
          
          await recordingManagerRef.current.startRecording(
            sessionDetails.sessionId,
            sessionDetails.participantId,
            currentUserId
          );
          
          // Then broadcast to all participants
          const encoder = new TextEncoder();
          const data = encoder.encode(JSON.stringify({
            type: 'RECORDING_COMMAND',
            action: 'START',
            sessionId: sessionDetails.sessionId,
            roomKey
          }));
          
          await room.localParticipant.publishData(data, { reliable: true });
          console.log('[RecordingStateManager - Creator] Start command broadcasted');
        }
      }
    } catch (error) {
      console.error('[RecordingStateManager] Error starting recording:', error);
      isRecordingRef.current = false;
      setIsRecordingActive(false);
      setRecordingError('Failed to start recording');
    }
  };

  const handleStopRecording = async () => {
    if (!isRecordingRef.current || !recordingManagerRef.current) {
      console.log('[RecordingStateManager] Not recording or no manager');
      return;
    }

    try {
      console.log('[RecordingStateManager] Stopping recording...');
      
      if (isCreator) {
        // Broadcast stop command first
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify({
          type: 'RECORDING_COMMAND',
          action: 'STOP',
          roomKey,
          sessionId: sessionDetailsRef.current?.sessionId
        }));
        
        await room.localParticipant.publishData(data, { reliable: true });
        console.log('[RecordingStateManager - Creator] Stop command broadcasted');
        
        // Give participants time to receive the message
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Stop local recording
      isRecordingRef.current = false;
      setIsRecordingActive(false);
      await recordingManagerRef.current.stopRecording();
      console.log('[RecordingStateManager] Recording stopped');
      
      if (isCreator && sessionDetailsRef.current) {
        // Finalize the entire session
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recording/finalize-session`, {
            sessionId: sessionDetailsRef.current.sessionId,
            participantId: sessionDetailsRef.current.participantId
          });
          console.log('[RecordingStateManager - Creator] Session finalized:', response.data);
        } catch (error: any) {
          console.error('[RecordingStateManager - Creator] Error finalizing session:', error.response?.data || error);
        }
      }
    } catch (error) {
      console.error('[RecordingStateManager] Error stopping recording:', error);
      setRecordingError('Failed to stop recording');
    }
  };

  return {
    isRecordingActive,
    recordingStatus,
    recordingError,
    handleStartRecording,
    handleStopRecording,
    setRecordingError
  };
}

// Custom VideoConference component for joining
interface CustomVideoConferenceProps {
  chatMessageFormatter?: any;
  showRecordButton: boolean;
  roomKey: string;
  currentUserId: number;
  username: string;
}

function CustomVideoConference({ 
  chatMessageFormatter,
  showRecordButton,
  roomKey,
  currentUserId,
  username
}: CustomVideoConferenceProps) {
  const [widgetState, setWidgetState] = React.useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
    showSettings: false,
  });
  
  const [sessionDetails, setSessionDetails] = React.useState<{
    sessionId: string;
    participantId: string;
  } | null>(null);
  
  const lastAutoFocusedScreenShareTrack = React.useRef<TrackReferenceOrPlaceholder | null>(null);

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false },
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug('updating widget state', state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const screenShareTracks = tracks
    .filter(isTrackReference)
    .filter((track) => track.publication.source === Track.Source.ScreenShare);

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

  React.useEffect(() => {
    if (
      screenShareTracks.some((track) => track.publication.isSubscribed) &&
      lastAutoFocusedScreenShareTrack.current === null
    ) {
      log.debug('Auto set screen share focus:', { newScreenShareTrack: screenShareTracks[0] });
      layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (
      lastAutoFocusedScreenShareTrack.current &&
      !screenShareTracks.some(
        (track) =>
          track.publication.trackSid ===
          lastAutoFocusedScreenShareTrack.current?.publication?.trackSid,
      )
    ) {
      log.debug('Auto clearing screen share focus.');
      layoutContext.pin.dispatch?.({ msg: 'clear_pin' });
      lastAutoFocusedScreenShareTrack.current = null;
    }
    if (focusTrack && !isTrackReference(focusTrack)) {
      const updatedFocusTrack = tracks.find(
        (tr) =>
          tr.participant.identity === focusTrack.participant.identity &&
          tr.source === focusTrack.source,
      );
      if (updatedFocusTrack !== focusTrack && isTrackReference(updatedFocusTrack)) {
        layoutContext.pin.dispatch?.({ msg: 'set_pin', trackReference: updatedFocusTrack });
      }
    }
  }, [
    screenShareTracks
      .map((ref) => `${ref.publication.trackSid}_${ref.publication.isSubscribed}`)
      .join(),
    focusTrack?.publication?.trackSid,
    tracks,
  ]);

  // Recording State Manager
  const recordingManager = RecordingStateManager({
    roomKey,
    currentUserId,
    username,
    onSessionDetails: setSessionDetails,
    isCreator: showRecordButton
  });

  return (
    <div className="lk-video-conference w-full h-full">
      {/* Recording Status */}
      {recordingManager.recordingStatus && (
        <div className="fixed top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50">
          {recordingManager.recordingStatus}
        </div>
      )}
      
      {/* Recording Error */}
      {recordingManager.recordingError && (
        <div className="fixed top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50">
          {recordingManager.recordingError}
          <button 
            onClick={() => recordingManager.setRecordingError('')}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
      
      {/* Recording Indicator */}
      {recordingManager.isRecordingActive && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50 flex items-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          Recording in progress
        </div>
      )}

      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner w-full h-full flex flex-col">
            {/* Main video area - takes remaining space */}
            <div className="flex-1 w-full overflow-hidden relative">
              {!focusTrack ? (
                <div className="lk-grid-layout-wrapper w-full h-full">
                  <GridLayout tracks={tracks}>
                    <ParticipantTile />
                  </GridLayout>
                </div>
              ) : (
                <div className="lk-focus-layout-wrapper w-full h-full">
                  <FocusLayoutContainer>
                    <CarouselLayout tracks={carouselTracks}>
                      <ParticipantTile />
                    </CarouselLayout>
                    {focusTrack && <FocusLayout trackRef={focusTrack} />}
                  </FocusLayoutContainer>
                </div>
              )}
            </div>
            
            {/* Control bar - fixed at bottom */}
            <div className="w-full flex-shrink-0 bg-gray-900 border-t border-gray-700">
              <CustomControlBar 
                showRecordButton={showRecordButton}
                isRecording={recordingManager.isRecordingActive}
                onStartRecording={() => recordingManager.handleStartRecording()}
                onStopRecording={recordingManager.handleStopRecording}
              />
            </div>
          </div>
          
          {/* Chat overlay - responsive positioning */}
          <div 
            className={`
              ${widgetState.showChat ? 'flex' : 'hidden'}
              fixed z-50 bg-white shadow-lg
              sm:right-4 sm:top-4 sm:bottom-20 sm:w-80 sm:rounded-lg sm:border
              max-sm:inset-x-4 max-sm:bottom-20 max-sm:top-4 max-sm:rounded-lg max-sm:border
            `}
          >
            <div className="flex flex-col w-full h-full">
              {/* Chat header with close button */}
              <div className="flex items-center justify-between p-3 border-b bg-gray-50 rounded-t-lg">
                <h3 className="font-medium text-gray-900">Chat</h3>
                <button
                  onClick={() => setWidgetState(prev => ({ ...prev, showChat: false }))}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Chat content */}
              <div className="flex-1 overflow-hidden">
                <Chat
                  style={{ height: '100%', display: 'grid' }}
                  messageFormatter={chatMessageFormatter}
                />
              </div>
            </div>
          </div>
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
}

// Custom ControlBar with conditional recording button (only for creator)
interface CustomControlBarProps {
  showRecordButton: boolean;
  isRecording: boolean;
  onStartRecording: () => Promise<void>;
  onStopRecording: () => Promise<void>;
}

function CustomControlBar({ 
  showRecordButton, 
  isRecording,
  onStartRecording,
  onStopRecording
}: CustomControlBarProps) {
  const handleRecordingToggle = async () => {
    if (isRecording) {
      await onStopRecording();
    } else {
      await onStartRecording();
    }
  };

  return (
    <div className="w-full px-4 py-3">
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {/* Default LiveKit controls */}
        <div className="flex items-center justify-center">
          <ControlBar controls={{ chat: true, camera: true, microphone: true, screenShare: true }} />
        </div>
        
        {/* Custom recording button - only visible for creator */}
        {showRecordButton && (
          <button
            onClick={handleRecordingToggle}
            className={`
              ${isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
              }
              px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200
              flex items-center gap-2 whitespace-nowrap min-w-0 flex-shrink-0
              border-2 border-transparent hover:scale-105 active:scale-95
            `}
          >
            <div className={`
              w-3 h-3 rounded-full flex-shrink-0
              ${isRecording ? 'bg-white animate-pulse' : 'bg-white'}
            `} />
            <span className="hidden xs:inline">
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </span>
            <span className="xs:hidden">
              {isRecording ? 'Stop' : 'Record'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function JoinPodcastPage() {
  const [token, setToken] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [roomInput, setRoomInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isCheckingCreator, setIsCheckingCreator] = useState(false);

  const { toast } = useToast();

  // Get current user ID on component mount
  useEffect(() => {
    const getCurrentUserId = async () => {
      const authToken = localStorage.getItem('auth_token');
      if (authToken) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/find-userId`, {
            token: authToken
          });
          setCurrentUserId((response.data as any).id);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };
    
    getCurrentUserId();
  }, []);

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || '';

  // Check if current user is the creator of the podcast
  const checkIfCreator = async (roomKey: string) => {
    if (!currentUserId || !roomKey) return;

    setIsCheckingCreator(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/find-userId-from-key`, {
        key: roomKey
      });
      
      const creatorUserId = (response.data as any).userId;
      setIsCreator(currentUserId === creatorUserId);
    } catch (error) {
      console.error('Error checking creator status:', error);
      setIsCreator(false);
    } finally {
      setIsCheckingCreator(false);
    }
  };

  const generateToken = async (room: string, participant: string) => {
    try {
      setIsConnecting(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-participant-token`, {
        room,
        username: participant,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to get token');
      }

      setToken((response.data as any).token);
      setIsJoined(true);
    } catch (error) {
      console.error('Error getting token:', error);
      toast({
            title: "Room Error",
            description: "Failed to join room. Please try again.",
            variant: "destructive"
          });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleJoinRoom = async () => {
    if (roomInput.trim() && userInput.trim()) {
      // Check if user is creator before joining
      await checkIfCreator(roomInput.trim());
      // Generate token to join the room
      await generateToken(roomInput.trim(), userInput.trim());
    }
  };

  const handleLeaveRoom = () => {
    setToken('');
    setIsJoined(false);
    setIsCreator(false);
  };

  if (isJoined && token) {
    return (
      <div className="w-full h-screen overflow-hidden bg-gray-900">
        <style jsx global>{`
          /* Custom breakpoint for very small screens */
          @media (min-width: 480px) {
            .xs\\:inline { display: inline !important; }
            .xs\\:hidden { display: none !important; }
          }
          
          /* Ensure video elements are responsive */
          .lk-participant-tile video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          
          /* Fix control bar spacing on small screens */
          .lk-control-bar {
            gap: 0.5rem !important;
          }
          
          /* Ensure buttons don't shrink too much */
          .lk-control-bar > * {
            flex-shrink: 0 !important;
          }
          
          /* Chat responsive fixes */
          .lk-chat {
            height: 100% !important;
          }
          
          /* Grid layout responsive */
          .lk-grid-layout {
            height: 100% !important;
            width: 100% !important;
          }
          
          /* Focus layout responsive */
          .lk-focus-layout {
            height: 100% !important;
            width: 100% !important;
          }
        `}</style>
        
        <LiveKitRoom
          video={true}
          audio={true}
          token={token}
          serverUrl={serverUrl}
          data-lk-theme="default"
          style={{ height: '100%', width: '100%' }}
          onDisconnected={handleLeaveRoom}
        >
          <CustomVideoConference 
            chatMessageFormatter={formatChatMessageLinks}
            showRecordButton={isCreator} // Only show to creator
            roomKey={roomInput}
            currentUserId={currentUserId}
            username={userInput}
          />
        </LiveKitRoom>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Join Podcast
          </h1>
          <p className="text-foreground/60 text-sm sm:text-base">
            Enter room details to join the podcast
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="room" className="block text-sm font-medium text-foreground mb-2">
              Room Key
            </label>
            <input
              id="room"
              type="text"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground/50 text-foreground text-sm sm:text-base"
              placeholder="Enter podcast room key"
              disabled={isConnecting || isCheckingCreator}
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <input
              id="username"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-foreground/20 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground/50 text-foreground text-sm sm:text-base"
              placeholder="Enter your name"
              disabled={isConnecting || isCheckingCreator}
            />
          </div>

          <button
            onClick={handleJoinRoom}
            disabled={!roomInput.trim() || !userInput.trim() || isConnecting || isCheckingCreator}
            className="w-full bg-foreground text-background disabled:bg-foreground/40 hover:bg-foreground/90 disabled:cursor-not-allowed font-medium py-2.5 sm:py-3 px-4 rounded-md duration-200 text-sm sm:text-base"
          >
            {isConnecting || isCheckingCreator ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-background mr-2"></div>
                {isCheckingCreator ? 'Checking...' : 'Joining...'}
              </div>
            ) : (
              'Join Podcast'
            )}
          </button>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-foreground/50">
            Make sure you have camera and microphone permissions enabled
          </p>
        </div>
      </div>
    </div>
  );
}