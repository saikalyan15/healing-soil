import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { submitOrder } from '@/lib/orders'

const orderSchema = z.object({
  customer_name: z.string().min(1),
  customer_phone: z.string().regex(/^(91)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  address: z.string().min(1),
  items: z.array(z.object({
    product_slug: z.string().min(1),
    price: z.number().positive(),
    qty: z.number().int().positive(),
  })).min(1),
  shipping: z.number().nonnegative(),
  notes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = orderSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid request', details: result.error.flatten() }, { status: 400 })
    }

    const { customer_name, customer_phone, items, address, shipping, notes } = result.data

    const { order_id, ref } = await submitOrder({
      customer: {
        name: customer_name,
        phone: customer_phone,
        address: address,
      },
      items: items.map((i) => ({
        product_id: i.product_slug,
        price: i.price,
        qty: i.qty,
      })),
      shipping: shipping,
      notes: notes,
      source: 'Website Order',
    })

    return NextResponse.json({ order_id, ref })
  } catch (err) {
    console.error('[POST /api/orders]', err)
    return NextResponse.json({ error: 'Order could not be processed. Please try again.' }, { status: 500 })
  }
}
