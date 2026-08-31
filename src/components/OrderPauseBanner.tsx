'use client'

import Link from 'next/link'
import { formatReopenDate, futureReopenDate, useOrderAvailability } from './OrderAvailabilityProvider'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

export default function OrderPauseBanner() {
  if (!COMMERCE_ENABLED) return null
  return <OrderPauseBannerInner />
}

function OrderPauseBannerInner() {
  const { acceptingOrders, reopenDate } = useOrderAvailability()
  if (acceptingOrders !== false) return null

  const futureDate = futureReopenDate(reopenDate)
  return (
    <div className="border-b border-[#E8D29B] bg-[#FFF3D6] text-[#5F4715]" role="status">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-3 text-center font-sans text-sm sm:flex-row sm:gap-2 sm:px-6">
        <span className="font-semibold">Website orders are currently paused.</span>
        <span>
          Browse and save the soaps you like
          {futureDate ? ` — we expect to reopen on ${formatReopenDate(futureDate)}.` : '.'}
        </span>
        <Link href="/shop" className="font-bold text-[#1E5631] underline underline-offset-2">
          Browse soaps
        </Link>
      </div>
    </div>
  )
}
