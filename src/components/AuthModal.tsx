"use client"

import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'
import { redirectToPayment } from '@/lib/payment'
import { X, Lock, Star, Check, CreditCard } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [view, setView] = useState<'auth' | 'premium'>('auth')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleAuthSuccess = () => {
    if (onSuccess) {
      onSuccess()
    }
    onClose()
  }

  const handlePremiumUpgrade = async () => {
    setLoading(true)
    try {
      // Redirecionar para o link do Mercado Pago
      redirectToPayment()
    } catch (error) {
      console.error('Erro ao abrir pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {view === 'auth' ? 'Entre na sua conta' : 'Upgrade Premium'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {view === 'auth' ? (
            <div>
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#9333ea',
                        brandAccent: '#7c3aed',
                      },
                    },
                  },
                }}
                providers={['google']}
                redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`}
                onlyThirdPartyProviders={false}
                magicLink={true}
                showLinks={true}
                localization={{
                  variables: {
                    sign_up: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'Seu email',
                      password_input_placeholder: 'Sua senha',
                      button_label: 'Criar conta',
                      loading_button_label: 'Criando conta...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Não tem conta? Cadastre-se',
                      confirmation_text: 'Verifique seu email para confirmar a conta'
                    },
                    sign_in: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'Seu email',
                      password_input_placeholder: 'Sua senha',
                      button_label: 'Entrar',
                      loading_button_label: 'Entrando...',
                      social_provider_text: 'Entrar com {{provider}}',
                      link_text: 'Já tem conta? Entre aqui'
                    },
                    magic_link: {
                      email_input_label: 'Email',
                      email_input_placeholder: 'Seu email',
                      button_label: 'Enviar link mágico',
                      loading_button_label: 'Enviando...',
                      link_text: 'Enviar um link mágico por email',
                      confirmation_text: 'Verifique seu email para o link de acesso'
                    },
                    forgotten_password: {
                      email_label: 'Email',
                      password_label: 'Senha',
                      email_input_placeholder: 'Seu email',
                      button_label: 'Enviar instruções',
                      loading_button_label: 'Enviando...',
                      link_text: 'Esqueceu sua senha?',
                      confirmation_text: 'Verifique seu email para redefinir a senha'
                    }
                  }
                }}
              />
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Acesso Limitado</span>
                </div>
                <p className="text-purple-700 text-sm mb-3">
                  Sem conta premium, você tem acesso apenas à calculadora e uma prévia de treino.
                </p>
                <button
                  onClick={() => setView('premium')}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors"
                >
                  Ver Planos Premium
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Acesso Premium</h3>
                <p className="text-gray-600">Desbloqueie todo o potencial do FitTransform</p>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">R$ 19,90</div>
                  <div className="text-purple-200">por mês</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'Acesso completo a todos os treinos',
                  'Planos de dieta personalizados',
                  'Desafio completo de 21 dias',
                  'Vídeos demonstrativos exclusivos',
                  'Acompanhamento de progresso',
                  'Suporte prioritário 24/7',
                  'Novos conteúdos toda semana'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePremiumUpgrade}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-colors mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Assinar Premium Agora
                  </>
                )}
              </button>

              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 mb-2">
                  Pagamento seguro processado pelo Mercado Pago
                </div>
                <div className="flex justify-center items-center gap-2 text-xs text-gray-400">
                  <span>🔒 SSL</span>
                  <span>•</span>
                  <span>💳 Cartão</span>
                  <span>•</span>
                  <span>📱 PIX</span>
                  <span>•</span>
                  <span>🏦 Boleto</span>
                </div>
              </div>

              <button
                onClick={() => setView('auth')}
                className="w-full text-purple-600 hover:text-purple-700 transition-colors"
              >
                ← Voltar para login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}