import { NextResponse } from 'next/server'
import { getOrderAvailability } from '@/lib/orders'

export async function GET() {
  try {
    return NextResponse.json({ accepting_orders: await getOrderAvailability() })
  } catch (err) {
    console.error('[Order availability] failed', err)
    return NextResponse.json({ accepting_orders: false }, { status: 503 })
  }
}
