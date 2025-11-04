import { loadStripe } from '@stripe/stripe-js'

// Substitua pela sua chave pública do Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...')

export default stripePromise