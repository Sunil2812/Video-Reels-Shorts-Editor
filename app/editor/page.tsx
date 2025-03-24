'use client'

import { useState, useRef, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useEditorStore } from '../../store/editorStore'
import VideoPlayer from '../../components/editor/VideoPlayer'
import Timeline from '../../components/editor/Timeline'
import ToolPanel from '../../components/editor/ToolPanel'
import { v4 as uuidv4 } from 'uuid'

export default function Editor() {
  const [isDragging, setIsDragging] = useState(false)
  const addClip = useEditorStore((state) => state.addClip)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith('video/')) {
        const clip = {
          id: uuidv4(),
          file,
          startTime: 0,
          endTime: 0, // Will be updated once video metadata is loaded
          speed: 1,
          volume: 1,
          filters: [],
        }
        addClip(clip)
      }
    })
  }, [addClip])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.webm']
    },
    noClick: true,
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Editor Area */}
          <div className="col-span-9">
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <VideoPlayer />
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <Timeline />
            </div>
          </div>

          {/* Tools Panel */}
          <div className="col-span-3">
            <div className="bg-gray-800 rounded-lg p-4">
              <ToolPanel />
            </div>
          </div>
        </div>

        {/* Drop Zone Overlay */}
        <div
          {...getRootProps()}
          className={`fixed inset-0 bg-blue-600 bg-opacity-50 transition-opacity pointer-events-none flex items-center justify-center ${
            isDragging ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-white text-2xl font-bold">
            Drop video files here
          </div>
        </div>
      </div>
    </div>
  )
} 