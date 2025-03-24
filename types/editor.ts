export interface VideoClip {
  id: string;
  file: File;
  startTime: number;
  endTime: number;
  speed: number;
  volume: number;
  filters: VideoFilter[];
}

export interface VideoFilter {
  type: 'brightness' | 'contrast' | 'saturation' | 'blur';
  value: number;
}

export interface TextOverlay {
  id: string;
  text: string;
  position: { x: number; y: number };
  style: TextStyle;
  animation: TextAnimation;
  startTime: number;
  duration: number;
}

export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
}

export interface TextAnimation {
  type: 'fade' | 'slide' | 'bounce' | 'scale';
  duration: number;
}

export interface AudioTrack {
  id: string;
  file: File;
  type: 'music' | 'voiceover' | 'effect';
  startTime: number;
  volume: number;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  category: 'reels' | 'shorts' | 'tiktok';
  duration: number;
  elements: (VideoClip | TextOverlay | AudioTrack)[];
} 