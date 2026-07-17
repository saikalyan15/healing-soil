import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { submitOrder } from '@/lib/orders'
import { sendPurchaseCapiEvent } from '@/lib/meta-capi'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import {
  MAX_QTY_PER_ITEM,
  MAX_DISTINCT_ITEMS,
  MAX_ORDER_TOTAL_INR,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_ORDER_ATTEMPTS,
} from '@/lib/order-limits'

const orderSchema = z.object({
  customer_name: z.string().min(1),
  customer_phone: z.string().regex(/^(91)?[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  address: z.string().min(1),
  items: z.array(z.object({
    product_id: z.string().min(1),
    product_slug: z.string().min(1),
    price: z.number().positive(),
    qty: z.number().int().positive().max(MAX_QTY_PER_ITEM),
  })).min(1).max(MAX_DISTINCT_ITEMS),
  shipping: z.number().nonnegative(),
  notes: z.string().optional(),
  payment_id: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  try {
    if (!checkRateLimit(`orders:${ip}`, RATE_LIMIT_ORDER_ATTEMPTS, RATE_LIMIT_WINDOW_MS)) {
      console.warn('[POST /api/orders] rate limited', { ip })
      return NextResponse.json(
        { error: 'Too many order attempts. Please wait a few minutes and try again, or message us on WhatsApp.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const result = orderSchema.safeParse(body)

    if (!result.success) {
      console.warn('[POST /api/orders] invalid request', { ip, issues: result.error.flatten() })
      return NextResponse.json({ error: 'Invalid request', details: result.error.flatten() }, { status: 400 })
    }

    const { customer_name, customer_phone, items, address, shipping, notes, payment_id } = result.data

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const total = subtotal + shipping

    if (total > MAX_ORDER_TOTAL_INR) {
      console.warn('[POST /api/orders] order exceeds max total', { ip, total })
      return NextResponse.json(
        { error: `For orders above ₹${MAX_ORDER_TOTAL_INR.toLocaleString('en-IN')}, please message us on WhatsApp directly.` },
        { status: 400 }
      )
    }

    const combinedNotes = payment_id
      ? [`Paid via Razorpay — payment_id: ${payment_id}`, notes].filter(Boolean).join(' | ')
      : notes

    const { order_id, ref } = await submitOrder({
      customer: {
        name: customer_name,
        phone: customer_phone,
        address: address,
      },
      items: items.map((i) => ({
        product_id: i.product_id,
        price: i.price,
        qty: i.qty,
      })),
      shipping: shipping,
      notes: combinedNotes,
      source: 'Website Order',
    })

    await sendPurchaseCapiEvent({
      eventId: ref || order_id,
      value: subtotal + shipping,
      currency: 'INR',
      contentIds: items.map((i) => i.product_slug),
      numItems: items.reduce((sum, i) => sum + i.qty, 0),
      phone: customer_phone,
      eventSourceUrl: req.nextUrl.origin + '/order',
      clientIpAddress: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
      clientUserAgent: req.headers.get('user-agent') ?? undefined,
      fbp: req.cookies.get('_fbp')?.value,
      fbc: req.cookies.get('_fbc')?.value,
    })

    return NextResponse.json({ order_id, ref })
  } catch (err) {
    console.error('[POST /api/orders] unexpected error', { ip, err })
    return NextResponse.json({ error: 'Order could not be processed. Please try again.' }, { status: 500 })
  }
}
