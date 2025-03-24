# AI Video Editor for Reels & Shorts

A powerful, AI-powered video editor for creating engaging social media content. Built with Next.js, TypeScript, and cutting-edge AI technologies.

## Features

- 🎬 Upload & Basic Editing
  - Support for MP4, MOV, WebM formats
  - Trim, cut, and merge video clips
  - Adjust playback speed
  
- 🤖 AI-Powered Enhancements
  - Auto Subtitle Generation
  - Background Noise Removal
  - Smart Auto-Crop for different platforms
  - AI Color Correction
  
- ✨ Text & Effects
  - Animated text overlays
  - Viral caption styles
  - Trending video effects & transitions
  
- 🎵 Music & Sound
  - Royalty-free music library
  - Auto sync to beat
  - AI voice generation
  
- 📱 Templates & Export
  - Platform-specific templates
  - HD export without watermark
  - Multi-platform optimization

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   OPENAI_API_KEY=your_openai_api_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- FFmpeg.wasm
- TensorFlow.js
- Cloudinary
- OpenAI API
- Framer Motion

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 