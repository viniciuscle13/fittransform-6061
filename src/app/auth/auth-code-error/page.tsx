"use client"

import { AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Erro na Autenticação
        </h1>
        
        <p className="text-gray-600 mb-6">
          Houve um problema ao processar seu login. Por favor, tente novamente.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  )
}