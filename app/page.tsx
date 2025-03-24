'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Create Amazing Videos with AI
            </h1>
            <p className="text-xl mb-8">
              Professional video editing made easy with artificial intelligence
            </p>
            <Link
              href="/editor"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start Editing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '🎬',
    title: 'AI-Powered Editing',
    description: 'Automatically enhance your videos with smart AI features',
  },
  {
    icon: '🎵',
    title: 'Music & Effects',
    description: 'Add trending music and effects to make your content stand out',
  },
  {
    icon: '📱',
    title: 'Multi-Platform Export',
    description: 'Export for Instagram Reels, TikTok, and YouTube Shorts',
  },
  {
    icon: '🎨',
    title: 'Templates',
    description: 'Choose from hundreds of pre-made templates',
  },
  {
    icon: '🔊',
    title: 'Voice Features',
    description: 'Auto subtitles and AI voice generation',
  },
  {
    icon: '✨',
    title: 'Special Effects',
    description: 'Apply trending effects and transitions',
  },
] 