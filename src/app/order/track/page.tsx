import type { Metadata } from 'next'
import Link from 'next/link'
import OrderTracker from '@/components/OrderTracker'

export const metadata: Metadata = {
  title: 'Track Your Order | Healing Soil',
  description: 'Check the status of your Healing Soil order.',
  robots: { index: false, follow: false },
}

type PageProps = { searchParams?: Promise<{ ref?: string }> }

export default async function TrackOrderPage({ searchParams }: PageProps) {
  const params = await searchParams
  const initialRef = typeof params?.ref === 'string' ? params.ref : ''

  return (
    <div className="min-h-[70vh] bg-[#F7F5F0] px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-4xl text-[#1E5631]">Track Your Order</h1>
          <p className="mb-8 font-sans text-base leading-relaxed text-[#666666]">
            Check payment confirmation, preparation, dispatch, and delivery status securely.
          </p>
        </div>

        <OrderTracker initialRef={initialRef} />

        <Link href="/shop" className="mt-12 block text-center font-sans text-sm text-[#1E5631] hover:underline">
          ← Back to the shop
        </Link>
      </div>
    </div>
  )
}
