'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

type AvailabilityContextValue = {
  acceptingOrders: boolean | null
  reopenDate: string | null
  refresh: () => Promise<void>
}

const OrderAvailabilityContext = createContext<AvailabilityContextValue | null>(null)

function validDate(value: unknown): string | null {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null
}

export function indiaDateString(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date)
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${value.year}-${value.month}-${value.day}`
}

export function futureReopenDate(value: string | null): string | null {
  return value && value >= indiaDateString() ? value : null
}

export function formatReopenDate(value: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  }).format(new Date(`${value}T12:00:00+05:30`))
}

export function OrderAvailabilityProvider({ children }: { children: React.ReactNode }) {
  const [acceptingOrders, setAcceptingOrders] = useState<boolean | null>(null)
  const [reopenDate, setReopenDate] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    // Outside the 'full' site mode there is no storefront to be open or closed.
    if (!COMMERCE_ENABLED) {
      setAcceptingOrders(false)
      setReopenDate(null)
      return
    }
    try {
      const response = await fetch('/api/order-availability', { cache: 'no-store' })
      const data = await response.json().catch(() => ({}))
      setAcceptingOrders(data.accepting_orders === true)
      setReopenDate(validDate(data.reopen_date))
    } catch {
      // Fail closed. Checkout APIs independently enforce the same rule.
      setAcceptingOrders(false)
      setReopenDate(null)
    }
  }, [])

  useEffect(() => {
    void refresh()
    if (!COMMERCE_ENABLED) return
    const onFocus = () => void refresh()
    const onVisibility = () => {
      if (document.visibilityState === 'visible') void refresh()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [refresh])

  const value = useMemo(
    () => ({ acceptingOrders, reopenDate, refresh }),
    [acceptingOrders, reopenDate, refresh],
  )

  return <OrderAvailabilityContext.Provider value={value}>{children}</OrderAvailabilityContext.Provider>
}

export function useOrderAvailability() {
  const value = useContext(OrderAvailabilityContext)
  if (!value) throw new Error('useOrderAvailability must be used inside OrderAvailabilityProvider')
  return value
}
