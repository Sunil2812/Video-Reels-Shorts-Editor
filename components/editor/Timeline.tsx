'use client'

import { useRef, useState } from 'react'
import { useEditorStore } from '../../store/editorStore'
import { motion } from 'framer-motion'

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const {
    clips,
    textOverlays,
    audioTracks,
    currentTime,
    setCurrentTime,
    selectedElementId,
    setSelectedElementId,
  } = useEditorStore((state) => ({
    clips: state.clips,
    textOverlays: state.textOverlays,
    audioTracks: state.audioTracks,
    currentTime: state.currentTime,
    setCurrentTime: state.setCurrentTime,
    selectedElementId: state.selectedElementId,
    setSelectedElementId: state.setSelectedElementId,
  }))

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return

    const rect = timelineRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x / rect.width
    const maxDuration = clips.reduce((max, clip) => Math.max(max, clip.endTime), 0)
    setCurrentTime(percent * maxDuration)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Timeline</h3>
      </div>

      {/* Timeline Ruler */}
      <div
        ref={timelineRef}
        className="relative h-8 bg-gray-700 rounded cursor-pointer"
        onClick={handleTimelineClick}
      >
        {/* Current Time Indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-blue-500"
          style={{
            left: `${(currentTime / (clips[0]?.endTime || 1)) * 100}%`,
          }}
        />
      </div>

      {/* Tracks */}
      <div className="mt-4 space-y-2">
        {/* Video Tracks */}
        {clips.map((clip) => (
          <motion.div
            key={clip.id}
            layoutId={clip.id}
            className={`relative h-12 bg-gray-700 rounded ${
              selectedElementId === clip.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedElementId(clip.id)}
          >
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded"
              style={{
                width: `${((clip.endTime - clip.startTime) / (clips[0]?.endTime || 1)) * 100}%`,
                left: `${(clip.startTime / (clips[0]?.endTime || 1)) * 100}%`,
              }}
            />
          </motion.div>
        ))}

        {/* Text Overlay Tracks */}
        {textOverlays.map((overlay) => (
          <motion.div
            key={overlay.id}
            layoutId={overlay.id}
            className={`relative h-8 bg-gray-700 rounded ${
              selectedElementId === overlay.id ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedElementId(overlay.id)}
          >
            <div
              className="absolute top-0 left-0 h-full bg-green-600 rounded"
              style={{
                width: `${(overlay.duration / (clips[0]?.endTime || 1)) * 100}%`,
                left: `${(overlay.startTime / (clips[0]?.endTime || 1)) * 100}%`,
              }}
            />
          </motion.div>
        ))}

        {/* Audio Tracks */}
        {audioTracks.map((track) => (
          <motion.div
            key={track.id}
            layoutId={track.id}
            className={`relative h-8 bg-gray-700 rounded ${
              selectedElementId === track.id ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedElementId(track.id)}
          >
            <div
              className="absolute top-0 left-0 h-full bg-purple-600 rounded"
              style={{
                width: `${(track.duration / (clips[0]?.endTime || 1)) * 100}%`,
                left: `${(track.startTime / (clips[0]?.endTime || 1)) * 100}%`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
} 