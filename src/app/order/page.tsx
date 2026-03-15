import type { Metadata } from 'next'
import OrderPageClient from '@/components/OrderPageClient'

export const metadata: Metadata = {
  title: 'Place Your Order — Healing Soil',
  description:
    'Review your order and send it through. Healing Soil will confirm availability before any payment is taken.',
  robots: { index: false, follow: false },
}

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-8 font-serif text-4xl text-[#1E5631]">Place Your Order</h1>
        <OrderPageClient />
      </div>
    </div>
  )
}
