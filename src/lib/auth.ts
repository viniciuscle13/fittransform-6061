import { supabase } from './supabase'

export interface User {
  id: string
  email: string
  is_premium: boolean
  premium_expires_at?: string
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Buscar dados do usuário na tabela profiles
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // Se não existe perfil, criar um
    if (profileError && profileError.code === 'PGRST116') {
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          is_premium: false
        })
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
        return {
          id: user.id,
          email: user.email || '',
          is_premium: false
        }
      }

      profile = newProfile
    } else if (profileError) {
      console.error('Error fetching profile:', profileError)
      return {
        id: user.id,
        email: user.email || '',
        is_premium: false
      }
    }

    return {
      id: user.id,
      email: user.email || '',
      is_premium: profile?.is_premium || false,
      premium_expires_at: profile?.premium_expires_at
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

export const checkPremiumStatus = (user: User | null): boolean => {
  if (!user || !user.is_premium) {
    return false
  }

  // Se tem data de expiração, verificar se ainda é válida
  if (user.premium_expires_at) {
    const expirationDate = new Date(user.premium_expires_at)
    const now = new Date()
    return expirationDate > now
  }

  // Se não tem data de expiração, considerar premium permanente
  return true
}

// Função para atualizar status premium do usuário
export const updatePremiumStatus = async (userId: string, isPremium: boolean, expiresAt?: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      is_premium: isPremium,
      premium_expires_at: expiresAt,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) {
    console.error('Error updating premium status:', error)
    throw error
  }
}

// Função para simular upgrade premium (para demonstração)
export const simulatePremiumUpgrade = async (userId: string) => {
  try {
    const expirationDate = new Date()
    expirationDate.setMonth(expirationDate.getMonth() + 1) // 1 mês
    
    await updatePremiumStatus(userId, true, expirationDate.toISOString())
    return true
  } catch (error) {
    console.error('Error simulating premium upgrade:', error)
    return false
  }
}