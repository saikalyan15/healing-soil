'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOrderStore } from '@/lib/store'

export default function OrderTray() {
  const items = useOrderStore((s) => s.items)
  const total = useOrderStore((s) => s.total)
  const itemCount = useOrderStore((s) => s.itemCount)
  const pathname = usePathname()

  if (itemCount === 0 || pathname === '/order') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[#C9A84C] bg-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <span className="font-sans text-sm font-medium text-[#1A1A14]">
          <span className="text-[#1E5631] font-bold">{itemCount}</span>
          {' '}
          {itemCount === 1 ? 'item' : 'items'}
          <span className="mx-1 text-[#D6CFC4]">—</span>
          <span className="font-bold">₹{total.toLocaleString('en-IN')}</span>
        </span>
        <Link
          href="/order"
          className="rounded bg-[#1E5631] px-5 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}
