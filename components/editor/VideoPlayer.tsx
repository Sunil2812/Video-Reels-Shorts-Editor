'use client'

import { useRef, useEffect } from 'react'
import { useEditorStore } from '../../store/editorStore'

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const {
    clips,
    currentTime,
    isPlaying,
    setCurrentTime,
    setIsPlaying,
  } = useEditorStore((state) => ({
    clips: state.clips,
    currentTime: state.currentTime,
    isPlaying: state.isPlaying,
    setCurrentTime: state.setCurrentTime,
    setIsPlaying: state.setIsPlaying,
  }))

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    if (isPlaying) {
      video.play()
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    video.currentTime = currentTime
  }, [currentTime])

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
  }

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleEnded = () => setIsPlaying(false)

  if (clips.length === 0) {
    return (
      <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Drop a video file to start editing</p>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        src={clips[0].file ? URL.createObjectURL(clips[0].file) : ''}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-blue-400 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={videoRef.current?.duration || 100}
              value={currentTime}
              onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 