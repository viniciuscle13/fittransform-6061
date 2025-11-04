"use client"

import { Play, Lock } from 'lucide-react'
import { redirectToPayment } from '@/lib/payment'

interface PremiumVideoProps {
  title: string
  description: string
  videoUrl?: string
}

export default function PremiumVideo({ title, description, videoUrl }: PremiumVideoProps) {
  const handleWatchClick = () => {
    if (videoUrl) {
      // Se tiver URL do vídeo, abrir em nova aba
      window.open(videoUrl, '_blank')
    } else {
      // Se não tiver vídeo, mostrar que é premium
      redirectToPayment()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl relative overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleWatchClick}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors group"
          >
            <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Overlay Premium */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Premium
        </div>
        
        {/* Título do vídeo */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
          <p className="text-white/80 text-sm">{description}</p>
        </div>
      </div>
      
      <div className="text-center">
        <button
          onClick={handleWatchClick}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Assistir Vídeo Premium
        </button>
      </div>
    </div>
  )
}