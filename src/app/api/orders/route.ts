import { NextRequest, NextResponse } from 'next/server'
import { submitOrder, type OrderPayload } from '@/lib/orders'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, items, address, shipping } = body

    const payload: OrderPayload = {
      customer: {
        name: customer_name,
        phone: customer_phone,
        address: address,
      },
      items: items.map((i: any) => ({
        product_id: i.product_id,
        price: i.price,
        qty: i.qty,
      })),
      shipping: shipping,
      source: 'Website Order',
    }

    const order_id = await submitOrder(payload)
    return NextResponse.json({ order_id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[POST /api/orders]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
