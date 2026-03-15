import { NextRequest, NextResponse } from 'next/server'
import { submitOrder, type OrderPayload } from '@/lib/orders'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, items, address, shipping, notes } = body

    // We need to submit first to get the human-readable ref
    const { order_id, ref } = await submitOrder({
      customer: {
        name: customer_name,
        phone: customer_phone,
        address: address,
      },
      items: items.map((i: any) => ({
        product_id: i.product_slug,
        price: i.price,
        qty: i.qty,
      })),
      shipping: shipping,
      notes: notes,
      source: 'Website Order',
    })

    // No need to update notes in SoapLedger via API here if it doesn't support it,
    // but the website and WhatsApp will now both have the consistent 'ref'.
    
    return NextResponse.json({ order_id, ref })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[POST /api/orders]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
