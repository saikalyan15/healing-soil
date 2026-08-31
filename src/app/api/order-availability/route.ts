import { NextResponse } from 'next/server'
import { getOrderAvailabilityDetails } from '@/lib/orders'
import { COMMERCE_ENABLED } from '@/lib/site-mode'

export async function GET() {
  // Storefront closed (site mode content-only / dark): nothing to be open.
  if (!COMMERCE_ENABLED) {
    return NextResponse.json({ accepting_orders: false, reopen_date: null })
  }
  try {
    return NextResponse.json(await getOrderAvailabilityDetails())
  } catch (err) {
    console.error('[Order availability] failed', err)
    return NextResponse.json({ accepting_orders: false, reopen_date: null }, { status: 503 })
  }
}
