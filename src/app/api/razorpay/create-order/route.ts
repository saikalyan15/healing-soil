import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getProducts } from '@/lib/products'
import { getRazorpayClient, isRazorpayEnabled } from '@/lib/razorpay'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import {
  MAX_QTY_PER_ITEM,
  MAX_DISTINCT_ITEMS,
  MAX_ORDER_TOTAL_INR,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_PAYMENT_ATTEMPTS,
} from '@/lib/order-limits'

const createOrderSchema = z.object({
  items: z.array(z.object({
    product_id: z.string().min(1),
    qty: z.number().int().positive().max(MAX_QTY_PER_ITEM),
  })).min(1).max(MAX_DISTINCT_ITEMS),
  shipping: z.number().nonnegative(),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (!isRazorpayEnabled()) {
    return NextResponse.json({ error: 'Online payment is not available right now.' }, { status: 404 })
  }

  try {
    if (!checkRateLimit(`razorpay-create:${ip}`, RATE_LIMIT_PAYMENT_ATTEMPTS, RATE_LIMIT_WINDOW_MS)) {
      console.warn('[POST /api/razorpay/create-order] rate limited', { ip })
      return NextResponse.json(
        { error: 'Too many payment attempts. Please wait a few minutes and try again, or message us on WhatsApp.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const result = createOrderSchema.safeParse(body)

    if (!result.success) {
      console.warn('[POST /api/razorpay/create-order] invalid request', { ip, issues: result.error.flatten() })
      return NextResponse.json({ error: 'Invalid request', details: result.error.flatten() }, { status: 400 })
    }

    const { items, shipping } = result.data

    // Recompute the amount from the product catalog server-side — never trust
    // a price the client sends, since this figure becomes a real charge.
    const products = await getProducts()
    const priceById = new Map(products.map((p) => [p.id, p.price]))

    let subtotal = 0
    for (const item of items) {
      const price = priceById.get(item.product_id)
      if (price === undefined) {
        console.warn('[POST /api/razorpay/create-order] unknown product', { ip, product_id: item.product_id })
        return NextResponse.json({ error: `Unknown product: ${item.product_id}` }, { status: 400 })
      }
      subtotal += price * item.qty
    }

    const total = subtotal + shipping

    if (total <= 0) {
      return NextResponse.json({ error: 'Order total must be greater than zero' }, { status: 400 })
    }

    if (total > MAX_ORDER_TOTAL_INR) {
      console.warn('[POST /api/razorpay/create-order] order exceeds max total', { ip, total })
      return NextResponse.json(
        { error: `For orders above ₹${MAX_ORDER_TOTAL_INR.toLocaleString('en-IN')}, please message us on WhatsApp directly.` },
        { status: 400 }
      )
    }

    const razorpay = getRazorpayClient()
    const order = await razorpay.orders.create({
      amount: Math.round(total * 100), // paise
      currency: 'INR',
      // Razorpay receipts are capped at 40 characters
      receipt: `hs-${Date.now()}`,
    })

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (err) {
    console.error('[POST /api/razorpay/create-order] unexpected error', { ip, err })
    return NextResponse.json({ error: 'Could not start payment. Please try again.' }, { status: 500 })
  }
}
