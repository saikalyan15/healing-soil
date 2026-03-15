'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOrderStore } from '@/lib/store'

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false)
  const itemCount = useOrderStore((s) => s.itemCount)
  const pathname = usePathname()

  // Only show on home page if there are items in the cart
  useEffect(() => {
    const isHome = pathname === '/'
    if (isHome && itemCount > 0) {
      // Small delay for effect
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [pathname, itemCount])

  if (!visible) return null

  return (
    <div className="bg-[#1E5631] text-white">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
          <p className="font-sans text-sm font-medium">
            Welcome back! You have {itemCount} {itemCount === 1 ? 'item' : 'items'} waiting in your cart.
          </p>
          <Link
            href="/order"
            className="rounded bg-[#C9A84C] px-3 py-1 font-sans text-xs font-bold text-[#1A1A14] transition-colors hover:bg-white"
          >
            Finish Order →
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="ml-2 text-white/60 hover:text-white"
            aria-label="Close banner"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
