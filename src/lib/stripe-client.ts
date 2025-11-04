import { loadStripe } from '@stripe/stripe-js'

// Substitua pela sua chave pública do Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51...')

export const createCheckoutSession = async () => {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_1234567890', // Substitua pelo ID do preço do Stripe
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    })

    const session = await response.json()

    if (session.error) {
      throw new Error(session.error)
    }

    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe não carregou')
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error)
    throw error
  }
}

export default stripePromise