import type { Metadata } from 'next'
import OrderPageClient from '@/components/OrderPageClient'
import { getOrderAvailabilityDetails, type OrderAvailability } from '@/lib/orders'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Place Your Order | Healing Soil',
  description:
    'Review your selected soaps and place an order or save your interest.',
  robots: { index: false, follow: false },
}

export default async function OrderPage() {
  let availability: OrderAvailability = { accepting_orders: false, reopen_date: null }
  try {
    availability = await getOrderAvailabilityDetails()
  } catch (err) {
    console.error('[Order page] could not load order availability', err)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-8 font-serif text-4xl text-[#1E5631]">Place Your Order</h1>
        <OrderPageClient
          acceptingOrders={availability.accepting_orders}
          reopenDate={availability.reopen_date}
        />
      </div>
    </div>
  )
}
