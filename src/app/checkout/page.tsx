import type { Metadata } from 'next'
import OrderPreferences from '@/components/OrderPreferences'

export const metadata: Metadata = {
  title: 'Checkout — Healing Soil',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="mb-8 font-serif text-4xl text-[#1E5631]">Checkout</h1>
      <OrderPreferences />
    </div>
  )
}
