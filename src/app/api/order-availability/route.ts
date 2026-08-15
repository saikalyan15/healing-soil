import { NextResponse } from 'next/server'
import { getOrderAvailabilityDetails } from '@/lib/orders'

export async function GET() {
  try {
    return NextResponse.json(await getOrderAvailabilityDetails())
  } catch (err) {
    console.error('[Order availability] failed', err)
    return NextResponse.json({ accepting_orders: false, reopen_date: null }, { status: 503 })
  }
}
