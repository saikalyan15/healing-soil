import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { submitOrder } from '@/lib/orders'
import { sendLeadCapiEvent, sendPurchaseCapiEvent } from '@/lib/meta-capi'
import {
  sendLeadMpEvent,
  sendPurchaseMpEvent,
  parseGaClientId,
  parseGaSessionId,
  GA4_SESSION_COOKIE_NAME,
} from '@/lib/ga4-mp'
import { isRazorpayEnabled, verifyPaymentSignature } from '@/lib/razorpay'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import {
  MAX_QTY_PER_ITEM,
  MAX_DISTINCT_ITEMS,
  MAX_ORDER_TOTAL_INR,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_ORDER_ATTEMPTS,
} from '@/lib/order-limits'
import type { OrderAttribution } from '@/lib/attribution'
import { classifyOrderSource, safeEventSourceUrl } from '@/lib/order-attribution'

const attributionTouchSchema = z.object({
  source: z.string().min(1).max(100),
  medium: z.string().min(1).max(100),
  campaign: z.string().max(200).optional(),
  content: z.string().max(200).optional(),
  term: z.string().max(200).optional(),
  campaign_id: z.string().max(200).optional(),
  fbclid: z.string().max(500).optional(),
  landing_page: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(),
  captured_at: z.string().datetime(),
})

const attributionSchema = z.object({
  version: z.literal(1),
  first_touch: attributionTouchSchema,
  last_touch: attributionTouchSchema,
})

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
  attribution: attributionSchema.optional(),
  payment: z.object({
    razorpay_order_id: z.string().min(1),
    razorpay_payment_id: z.string().min(1),
    razorpay_signature: z.string().min(1),
  }).optional(),
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

    const { customer_name, customer_phone, items, address, shipping, notes, payment } = result.data
    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value
    const attribution: OrderAttribution | undefined = result.data.attribution
      ? {
          ...result.data.attribution,
          identifiers: {
            ...(fbp ? { fbp } : {}),
            ...(fbc ? { fbc } : {}),
          },
        }
      : undefined

    if (payment && (!isRazorpayEnabled() || !verifyPaymentSignature({
      orderId: payment.razorpay_order_id,
      paymentId: payment.razorpay_payment_id,
      signature: payment.razorpay_signature,
    }))) {
      console.warn('[POST /api/orders] rejected unverified payment', { ip })
      return NextResponse.json({ error: 'Payment could not be verified' }, { status: 400 })
    }

    const isPaid = Boolean(payment)

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const total = subtotal + shipping

    if (total > MAX_ORDER_TOTAL_INR) {
      console.warn('[POST /api/orders] order exceeds max total', { ip, total })
      return NextResponse.json(
        { error: `For orders above ₹${MAX_ORDER_TOTAL_INR.toLocaleString('en-IN')}, please message us on WhatsApp directly.` },
        { status: 400 }
      )
    }

    const combinedNotes = payment
      ? [`Paid via Razorpay — payment_id: ${payment.razorpay_payment_id}`, notes].filter(Boolean).join(' | ')
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
      source: classifyOrderSource(attribution),
      attribution,
    })

    const eventId = ref || order_id
    const clientId = parseGaClientId(req.cookies.get('_ga')?.value)
    const sessionId = parseGaSessionId(req.cookies.get(GA4_SESSION_COOKIE_NAME)?.value)
    const metaEvent = {
      eventId: ref || order_id,
      value: subtotal + shipping,
      currency: 'INR',
      contentIds: items.map((i) => i.product_slug),
      numItems: items.reduce((sum, i) => sum + i.qty, 0),
      phone: customer_phone,
      eventSourceUrl: safeEventSourceUrl(req.nextUrl.origin, attribution),
      clientIpAddress: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
      clientUserAgent: req.headers.get('user-agent') ?? undefined,
      fbp,
      fbc,
    }

    if (isPaid) {
      await sendPurchaseCapiEvent(metaEvent)
      await sendPurchaseMpEvent({
        transactionId: eventId,
        value: subtotal + shipping,
        currency: 'INR',
        shipping,
        items: items.map((i) => ({ item_id: i.product_id, price: i.price, quantity: i.qty })),
        clientId,
        sessionId,
      })
    } else {
      await sendLeadCapiEvent(metaEvent)
      await sendLeadMpEvent({
        leadId: eventId,
        value: subtotal + shipping,
        currency: 'INR',
        clientId,
        sessionId,
      })
    }

    return NextResponse.json({ order_id, ref })
  } catch (err) {
    console.error('[POST /api/orders] unexpected error', { ip, err })
    return NextResponse.json({ error: 'Order could not be processed. Please try again.' }, { status: 500 })
  }
}
