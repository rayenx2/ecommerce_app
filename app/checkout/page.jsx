import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
const stripePromise= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY)

function Checkout() {
    const options ={
        mode:'payement',
        currency: 'usd'
    }
  return (
    <div> Checkout</div>
  )
}

export default Checkout