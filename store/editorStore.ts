import { create } from 'zustand'
import { VideoClip, TextOverlay, AudioTrack } from '../types/editor'

interface EditorState {
  clips: VideoClip[]
  textOverlays: TextOverlay[]
  audioTracks: AudioTrack[]
  currentTime: number
  isPlaying: boolean
  selectedElementId: string | null
  addClip: (clip: VideoClip) => void
  removeClip: (id: string) => void
  updateClip: (id: string, updates: Partial<VideoClip>) => void
  addTextOverlay: (overlay: TextOverlay) => void
  removeTextOverlay: (id: string) => void
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void
  addAudioTrack: (track: AudioTrack) => void
  removeAudioTrack: (id: string) => void
  updateAudioTrack: (id: string, updates: Partial<AudioTrack>) => void
  setCurrentTime: (time: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setSelectedElementId: (id: string | null) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  clips: [],
  textOverlays: [],
  audioTracks: [],
  currentTime: 0,
  isPlaying: false,
  selectedElementId: null,

  addClip: (clip) =>
    set((state) => ({ clips: [...state.clips, clip] })),

  removeClip: (id) =>
    set((state) => ({
      clips: state.clips.filter((clip) => clip.id !== id),
    })),

  updateClip: (id, updates) =>
    set((state) => ({
      clips: state.clips.map((clip) =>
        clip.id === id ? { ...clip, ...updates } : clip
      ),
    })),

  addTextOverlay: (overlay) =>
    set((state) => ({ textOverlays: [...state.textOverlays, overlay] })),

  removeTextOverlay: (id) =>
    set((state) => ({
      textOverlays: state.textOverlays.filter((overlay) => overlay.id !== id),
    })),

  updateTextOverlay: (id, updates) =>
    set((state) => ({
      textOverlays: state.textOverlays.map((overlay) =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      ),
    })),

  addAudioTrack: (track) =>
    set((state) => ({ audioTracks: [...state.audioTracks, track] })),

  removeAudioTrack: (id) =>
    set((state) => ({
      audioTracks: state.audioTracks.filter((track) => track.id !== id),
    })),

  updateAudioTrack: (id, updates) =>
    set((state) => ({
      audioTracks: state.audioTracks.map((track) =>
        track.id === id ? { ...track, ...updates } : track
      ),
    })),

  setCurrentTime: (time) => set({ currentTime: time }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSelectedElementId: (id) => set({ selectedElementId: id }),
})) 