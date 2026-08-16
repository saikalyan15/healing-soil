import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getOrderAvailability, submitOrder } from '@/lib/orders'
import { getProducts } from '@/lib/products'
import { calculateShipping } from '@/lib/shipping'
import { sendLeadCapiEvent } from '@/lib/meta-capi'
import { sendLeadMpEvent, parseGaClientId, parseGaSessionId, GA4_SESSION_COOKIE_NAME } from '@/lib/ga4-mp'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { MAX_QTY_PER_ITEM, MAX_DISTINCT_ITEMS, MAX_ORDER_TOTAL_INR, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_ORDER_ATTEMPTS } from '@/lib/order-limits'
import type { OrderAttribution } from '@/lib/attribution'
import { classifyOrderSource, safeEventSourceUrl } from '@/lib/order-attribution'

const touchSchema = z.object({
  source: z.string().min(1).max(100), medium: z.string().min(1).max(100),
  campaign: z.string().max(200).optional(), content: z.string().max(200).optional(),
  term: z.string().max(200).optional(), campaign_id: z.string().max(200).optional(),
  fbclid: z.string().max(500).optional(), landing_page: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(), captured_at: z.string().datetime(),
})

const itemSchema = z.object({
  product_id: z.string().min(1),
  product_slug: z.string().min(1),
  qty: z.number().int().positive().max(MAX_QTY_PER_ITEM),
})

const sharedFields = {
  customer_name: z.string().trim().min(1).max(120),
  customer_phone: z.string().regex(/^91[6-9]\d{9}$/),
  items: z.array(itemSchema).min(1).max(MAX_DISTINCT_ITEMS),
  notes: z.string().max(1000).optional(),
  attribution: z.object({ version: z.literal(1), first_touch: touchSchema, last_touch: touchSchema }).optional(),
}

const standardOrderSchema = z.object({
  ...sharedFields,
  customer_email: z.string().email().max(254).optional(),
  address: z.string().trim().min(5).max(1000),
  state: z.string().trim().min(1).max(100),
  intent: z.undefined().optional(),
  consent: z.boolean().optional(),
})

const interestSchema = z.object({
  ...sharedFields,
  intent: z.literal('interest'),
  consent: z.literal(true),
})

const orderSchema = z.union([interestSchema, standardOrderSchema])

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  try {
    if (!checkRateLimit(`orders:${ip}`, RATE_LIMIT_ORDER_ATTEMPTS, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json({ error: 'Too many attempts. Please wait a few minutes and try again.' }, { status: 429 })
    }
    const result = orderSchema.safeParse(await req.json())
    if (!result.success) return NextResponse.json({ error: 'Please check your order details.', details: result.error.flatten() }, { status: 400 })
    const data = result.data
    const isInterest = data.intent === 'interest'
    const acceptingOrders = await getOrderAvailability()
    if (!isInterest && !acceptingOrders) {
      return NextResponse.json({ error: 'Orders are temporarily paused while we catch up.', code: 'ORDERS_PAUSED' }, { status: 503 })
    }
    if (isInterest && acceptingOrders) {
      return NextResponse.json({ error: 'Ordering is open. Please place your order through checkout.', code: 'ORDERS_OPEN' }, { status: 409 })
    }

    const products = await getProducts()
    const byId = new Map(products.map((product) => [product.id, product]))
    const ledgerItems = []
    let subtotal = 0
    for (const item of data.items) {
      const product = byId.get(item.product_id)
      if (!product) return NextResponse.json({ error: 'A product in your cart is no longer available.' }, { status: 400 })
      subtotal += product.price * item.qty
      ledgerItems.push({ product_id: product.id, price: product.price, qty: item.qty })
    }
    const shipping = isInterest ? 0 : calculateShipping(subtotal, data.state)
    if (subtotal + shipping > MAX_ORDER_TOTAL_INR) {
      return NextResponse.json({ error: 'This order is above the website limit. Please contact us.' }, { status: 400 })
    }

    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value
    const attribution: OrderAttribution | undefined = data.attribution ? {
      ...data.attribution,
      identifiers: {
        ...(fbp ? { fbp } : {}), ...(fbc ? { fbc } : {}),
        ...(parseGaClientId(req.cookies.get('_ga')?.value) ? { ga_client_id: parseGaClientId(req.cookies.get('_ga')?.value) } : {}),
        ...(parseGaSessionId(req.cookies.get(GA4_SESSION_COOKIE_NAME)?.value) ? { ga_session_id: parseGaSessionId(req.cookies.get(GA4_SESSION_COOKIE_NAME)?.value) } : {}),
      },
    } : undefined

    const order = await submitOrder({
      customer: {
        name: data.customer_name,
        phone: data.customer_phone,
        ...(!isInterest ? {
          email: data.customer_email,
          address: `${data.address}, ${data.state}`,
        } : {}),
      },
      items: ledgerItems,
      shipping,
      notes: data.notes,
      source: classifyOrderSource(attribution),
      attribution,
      intent: data.intent,
      consent: data.consent,
      consent_channel: isInterest ? 'whatsapp' : undefined,
    }, { notifyOwner: !isInterest })

    if (!isInterest) {
      await Promise.all([
        sendLeadCapiEvent({
          eventId: order.ref, value: subtotal + shipping, currency: 'INR',
          contentIds: data.items.map((item) => item.product_slug),
          numItems: data.items.reduce((sum, item) => sum + item.qty, 0),
          phone: data.customer_phone, eventSourceUrl: safeEventSourceUrl(req.nextUrl.origin, attribution),
          clientIpAddress: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
          clientUserAgent: req.headers.get('user-agent') ?? undefined, fbp, fbc,
        }),
        sendLeadMpEvent({
          leadId: order.ref, value: subtotal + shipping, currency: 'INR',
          clientId: attribution?.identifiers?.ga_client_id,
          sessionId: attribution?.identifiers?.ga_session_id,
        }),
      ])
    }

    return NextResponse.json({ ...order, interest: isInterest })
  } catch (err) {
    console.error('[POST /api/orders] unexpected error', { ip, err })
    return NextResponse.json({ error: 'Order could not be processed. Please try again.' }, { status: 500 })
  }
}
