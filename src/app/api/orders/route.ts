import { NextRequest, NextResponse } from 'next/server'
import { submitOrder, type OrderPayload } from '@/lib/orders'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, items, address } = body

    const payload: OrderPayload = {
      customer_name,
      customer_phone,
      items,
      shipping_address: {
        name: customer_name,
        phone: customer_phone,
        address_line_1: address,
      },
      source: 'website',
    }

    const order_id = await submitOrder(payload)
    return NextResponse.json({ order_id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[POST /api/orders]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
