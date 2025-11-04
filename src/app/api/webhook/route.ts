import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      
      // Atualizar usuário como premium no Supabase
      if (session.customer && session.subscription) {
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              is_premium: true,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              premium_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
              updated_at: new Date().toISOString(),
            })
            .eq('email', session.customer_details?.email)

          if (error) {
            console.error('Erro ao atualizar usuário:', error)
          }
        } catch (error) {
          console.error('Erro ao processar webhook:', error)
        }
      }
      break

    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription
      
      // Remover status premium do usuário
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            is_premium: false,
            premium_expires_at: null,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Erro ao remover premium:', error)
        }
      } catch (error) {
        console.error('Erro ao processar cancelamento:', error)
      }
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}