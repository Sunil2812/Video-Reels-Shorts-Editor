'use client'

import { useState } from 'react'
import { useEditorStore } from '../../store/editorStore'

export default function ToolPanel() {
  const {
    clips,
    textOverlays,
    audioTracks,
    selectedElementId,
    updateClip,
    updateTextOverlay,
    updateAudioTrack,
  } = useEditorStore((state) => ({
    clips: state.clips,
    textOverlays: state.textOverlays,
    audioTracks: state.audioTracks,
    selectedElementId: state.selectedElementId,
    updateClip: state.updateClip,
    updateTextOverlay: state.updateTextOverlay,
    updateAudioTrack: state.updateAudioTrack,
  }))

  const selectedClip = clips.find((clip) => clip.id === selectedElementId)
  const selectedText = textOverlays.find((text) => text.id === selectedElementId)
  const selectedAudio = audioTracks.find((audio) => audio.id === selectedElementId)

  const [activeTab, setActiveTab] = useState<'video' | 'text' | 'audio'>('video')

  if (!selectedElementId) {
    return (
      <div className="p-4">
        <p className="text-gray-400">Select an element to edit</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'video' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
          onClick={() => setActiveTab('video')}
        >
          Video
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'text' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'audio' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
          onClick={() => setActiveTab('audio')}
        >
          Audio
        </button>
      </div>

      {/* Video Controls */}
      {activeTab === 'video' && selectedClip && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Speed</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={selectedClip.speed}
              onChange={(e) =>
                updateClip(selectedClip.id, {
                  speed: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
            <span className="text-sm">{selectedClip.speed}x</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectedClip.volume}
              onChange={(e) =>
                updateClip(selectedClip.id, {
                  volume: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          {/* AI Enhancement Controls */}
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700">
              Auto Color Correct
            </button>
            <button className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700">
              Remove Background Noise
            </button>
            <button className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700">
              Generate Subtitles
            </button>
          </div>
        </div>
      )}

      {/* Text Controls */}
      {activeTab === 'text' && selectedText && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Text</label>
            <input
              type="text"
              value={selectedText.text}
              onChange={(e) =>
                updateTextOverlay(selectedText.id, { text: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Font Size</label>
            <input
              type="range"
              min="12"
              max="72"
              value={selectedText.style.fontSize}
              onChange={(e) =>
                updateTextOverlay(selectedText.id, {
                  style: {
                    ...selectedText.style,
                    fontSize: parseInt(e.target.value),
                  },
                })
              }
              className="w-full"
            />
          </div>

          {/* Animation Controls */}
          <div>
            <label className="block text-sm font-medium mb-1">Animation</label>
            <select
              value={selectedText.animation.type}
              onChange={(e) =>
                updateTextOverlay(selectedText.id, {
                  animation: {
                    ...selectedText.animation,
                    type: e.target.value as any,
                  },
                })
              }
              className="w-full px-3 py-2 bg-gray-700 rounded"
            >
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="bounce">Bounce</option>
              <option value="scale">Scale</option>
            </select>
          </div>
        </div>
      )}

      {/* Audio Controls */}
      {activeTab === 'audio' && selectedAudio && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectedAudio.volume}
              onChange={(e) =>
                updateAudioTrack(selectedAudio.id, {
                  volume: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          {/* AI Audio Features */}
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
              Remove Background Noise
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 rounded hover:bg-purple-700">
              Auto-Sync to Beat
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 