"use client"

import { Lock, Star, Crown } from 'lucide-react'
import { redirectToPayment } from '@/lib/payment'

interface PremiumBlockProps {
  title: string
  description: string
  onUpgrade?: () => void
}

export default function PremiumBlock({ title, description, onUpgrade }: PremiumBlockProps) {
  const handleUpgradeClick = () => {
    // Redirecionar diretamente para o Mercado Pago
    redirectToPayment()
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-orange-200">
      <div className="bg-gradient-to-r from-orange-500 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Crown className="w-10 h-10 text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      
      <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-orange-600" />
          <span className="font-semibold text-orange-800">Conteúdo Premium</span>
        </div>
        <p className="text-orange-700 text-sm">
          Este conteúdo está disponível apenas para assinantes premium
        </p>
      </div>
      
      <div className="space-y-3 mb-6 text-left max-w-sm mx-auto">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-500" />
          <span className="text-gray-700 text-sm">Acesso completo a todos os treinos</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-500" />
          <span className="text-gray-700 text-sm">Planos de dieta personalizados</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-500" />
          <span className="text-gray-700 text-sm">Vídeos demonstrativos exclusivos</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-500" />
          <span className="text-gray-700 text-sm">Suporte prioritário 24/7</span>
        </div>
      </div>
      
      <button
        onClick={handleUpgradeClick}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-colors transform hover:scale-105"
      >
        Upgrade para Premium - R$ 19,90/mês
      </button>
    </div>
  )
}