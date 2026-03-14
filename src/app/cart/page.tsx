import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart — Healing Soil',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary">Your Cart</h1>
    </div>
  )
}
