"use client"

import { CheckCircle, Home, Crown } from 'lucide-react'
import Link from 'next/link'

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Pagamento Realizado!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Seu pagamento foi processado com sucesso. Você agora tem acesso premium ao FitTransform!
        </p>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-lg mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">Status Premium Ativo</span>
          </div>
          <p className="text-sm text-orange-100">
            Aproveite todos os recursos premium disponíveis!
          </p>
        </div>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          Começar a Usar
        </Link>
      </div>
    </div>
  )
}