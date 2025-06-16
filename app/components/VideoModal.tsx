"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoModalProps {
  videoSrc?: string
  thumbnailSrc?: string
  className?: string
}

export function VideoModal({ 
  videoSrc = "/Vicast-Demo.mp4",
  thumbnailSrc = "/image.png",
  className = ""
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error)
        })
      }
    }
  }

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      const newTime = percentage * duration
      videoRef.current.currentTime = newTime
      setProgress((newTime / duration) * 100)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }
    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }
    const handleError = (e: Event) => {
      console.error('Video error:', e)
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('error', handleError)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div 
      className={`relative w-full aspect-video rounded-xl overflow-hidden bg-black group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover cursor-pointer"
        poster={thumbnailSrc}
        muted={isMuted}
        playsInline
        onClick={handlePlayPause}
      />

      {/* Overlay for initial play button */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 backdrop-blur-[2px] transition-all duration-300 z-10"
          onClick={handlePlayPause}
        >
          <div className="relative">
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 -m-4 rounded-full bg-white/20 animate-ping" />
            <button 
              className="relative bg-white/95 hover:bg-white rounded-full p-5 shadow-2xl transform transition-all duration-200 hover:scale-110"
              onClick={handlePlayPause}
            >
              <Play className="h-10 w-10 text-black fill-black ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Custom controls overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300 pointer-events-none ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top gradient for better visibility of any top controls */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/50 to-transparent" />
        
        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 pointer-events-auto">
          {/* Progress bar */}
          <div 
            ref={progressBarRef}
            className="relative h-1 bg-white/30 rounded-full cursor-pointer group/progress"
            onClick={handleProgressBarClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Play/Pause button */}
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-white" />
                ) : (
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                )}
              </button>

              {/* Volume button */}
              <button
                onClick={handleMuteToggle}
                className="text-white hover:text-white/80 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </button>

              {/* Time display */}
              <div className="text-white text-sm font-medium">
                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
              </div>
            </div>

            {/* Logo/Branding */}
            <div className="flex items-center gap-2 text-white/80">
              <span className="text-sm font-semibold">Vicast Demo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}