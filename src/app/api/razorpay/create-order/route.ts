import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { z } from 'zod'
import { getProducts } from '@/lib/products'
import { createFallbackToken, getRazorpayClient, isRazorpayEnabled } from '@/lib/razorpay'
import { COMMERCE_ENABLED } from '@/lib/site-mode'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { calculateShipping } from '@/lib/shipping'
import { payablePaise, payableWithFee } from '@/lib/payment-fee'
import { getOrderAvailability, getSoapLedgerCheckoutSession, submitOrder, type SoapLedgerOrderResponse } from '@/lib/orders'
import { confirmPaidOrder } from '@/lib/payment-confirmation'
import { classifyOrderSource } from '@/lib/order-attribution'
import { parseGaClientId, parseGaSessionId, GA4_SESSION_COOKIE_NAME } from '@/lib/ga4-mp'
import {
  MAX_QTY_PER_ITEM,
  MAX_DISTINCT_ITEMS,
  MAX_ORDER_TOTAL_INR,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_PAYMENT_ATTEMPTS,
} from '@/lib/order-limits'
import type { OrderAttribution } from '@/lib/attribution'

const touchSchema = z.object({
  source: z.string().min(1).max(100), medium: z.string().min(1).max(100),
  campaign: z.string().max(200).optional(), content: z.string().max(200).optional(),
  term: z.string().max(200).optional(), campaign_id: z.string().max(200).optional(),
  fbclid: z.string().max(500).optional(), landing_page: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(), captured_at: z.string().datetime(),
})

const createOrderSchema = z.object({
  checkout_session_id: z.string().uuid(),
  customer_name: z.string().trim().min(1).max(120),
  customer_phone: z.string().regex(/^91[6-9]\d{9}$/),
  customer_email: z.string().email().max(254).optional(),
  address: z.string().trim().min(5).max(1000),
  state: z.string().trim().min(1).max(100),
  notes: z.string().max(1000).optional(),
  items: z.array(z.object({
    product_id: z.string().min(1),
    qty: z.number().int().positive().max(MAX_QTY_PER_ITEM),
  })).min(1).max(MAX_DISTINCT_ITEMS),
  attribution: z.object({ version: z.literal(1), first_touch: touchSchema, last_touch: touchSchema }).optional(),
})

function checkoutFingerprint(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

export async function POST(req: NextRequest) {
  if (!COMMERCE_ENABLED) {
    return NextResponse.json({ error: 'Website ordering is closed.' }, { status: 410 })
  }
  const ip = getClientIp(req)
  if (!isRazorpayEnabled()) {
    return NextResponse.json({ error: 'Online payment is not available right now.' }, { status: 404 })
  }

  try {
    if (!checkRateLimit(`razorpay-create:${ip}`, RATE_LIMIT_PAYMENT_ATTEMPTS, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json({ error: 'Too many payment attempts. Please wait a few minutes and try again.' }, { status: 429 })
    }

    if (!await getOrderAvailability()) {
      return NextResponse.json(
        { error: 'Orders are temporarily paused while we catch up.', code: 'ORDERS_PAUSED' },
        { status: 503 }
      )
    }

    const result = createOrderSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json({ error: 'Please check your order details.', details: result.error.flatten() }, { status: 400 })
    }
    const data = result.data
    const products = await getProducts()
    const productById = new Map(products.map((product) => [product.id, product]))
    let subtotal = 0
    const ledgerItems = []
    for (const item of data.items) {
      const product = productById.get(item.product_id)
      if (!product) return NextResponse.json({ error: 'A product in your cart is no longer available.' }, { status: 400 })
      subtotal += product.price * item.qty
      ledgerItems.push({ product_id: product.id, price: product.price, qty: item.qty })
    }

    const shipping = calculateShipping(subtotal, data.state)
    const total = subtotal + shipping
    // Razorpay collects the order total plus the online payment charge.
    const payable = payableWithFee(total)
    if (total <= 0 || total > MAX_ORDER_TOTAL_INR) {
      return NextResponse.json({ error: 'This order cannot be paid online. Please contact us.' }, { status: 400 })
    }

    const fingerprint = checkoutFingerprint({
      customer: {
        name: data.customer_name,
        phone: data.customer_phone,
        email: data.customer_email?.toLowerCase(),
        address: data.address,
        state: data.state,
      },
      notes: data.notes || '',
      items: ledgerItems
        .map((item) => ({ product_id: item.product_id, price: item.price, qty: item.qty }))
        .sort((a, b) => a.product_id.localeCompare(b.product_id)),
      shipping,
      total,
    })

    const razorpay = getRazorpayClient()
    const responseForLedgerOrder = async (ledgerOrder: SoapLedgerOrderResponse) => {
      const providerOrderId = ledgerOrder.provider_order_id
      if (!providerOrderId) throw new Error('Checkout session is missing its Razorpay order')
      const [providerOrder, payments] = await Promise.all([
        razorpay.orders.fetch(providerOrderId),
        razorpay.orders.fetchPayments(providerOrderId),
      ])
      if (Number(providerOrder.amount) !== payablePaise(total) || providerOrder.currency !== 'INR') {
        throw new Error('Stored checkout amount does not match the current basket')
      }

      const captured = payments.items.find((payment) => payment.status === 'captured')
      if (captured && ledgerOrder.payment_status !== 'paid') {
        await confirmPaidOrder({
          providerOrderId,
          providerPaymentId: captured.id,
          origin: req.nextUrl.origin,
          paymentDetails: {
            status: captured.status,
            method: captured.method,
            amountPaise: Number(captured.amount),
            currency: captured.currency,
            createdAt: captured.created_at,
          },
        })
      }
      const paymentPending = !captured && (
        providerOrder.status === 'paid'
        || payments.items.some((payment) => payment.status === 'authorized')
      )
      return NextResponse.json({
        order_id: providerOrderId,
        amount: providerOrder.amount,
        currency: providerOrder.currency,
        ref: ledgerOrder.ref,
        fallback_token: createFallbackToken(providerOrderId),
        shipping,
        total,
        payable,
        reused: true,
        already_paid: Boolean(captured || ledgerOrder.payment_status === 'paid'),
        payment_pending: paymentPending,
      })
    }

    const existingCheckout = await getSoapLedgerCheckoutSession(data.checkout_session_id, fingerprint)
    if (existingCheckout) return responseForLedgerOrder(existingCheckout)

    const razorpayOrder = await razorpay.orders.create({
      amount: payablePaise(total),
      currency: 'INR',
      receipt: `hs-${data.checkout_session_id}`,
    })

    const fbp = req.cookies.get('_fbp')?.value
    const fbc = req.cookies.get('_fbc')?.value
    const attribution: OrderAttribution | undefined = data.attribution ? {
      ...data.attribution,
      identifiers: {
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
        ...(parseGaClientId(req.cookies.get('_ga')?.value) ? { ga_client_id: parseGaClientId(req.cookies.get('_ga')?.value) } : {}),
        ...(parseGaSessionId(req.cookies.get(GA4_SESSION_COOKIE_NAME)?.value) ? { ga_session_id: parseGaSessionId(req.cookies.get(GA4_SESSION_COOKIE_NAME)?.value) } : {}),
      },
    } : undefined

    const ledgerOrder = await submitOrder({
      customer: {
        name: data.customer_name,
        phone: data.customer_phone,
        email: data.customer_email,
        address: `${data.address}, ${data.state}`,
      },
      items: ledgerItems,
      shipping,
      notes: data.notes,
      source: classifyOrderSource(attribution),
      attribution,
      payment: {
        provider: 'razorpay',
        provider_order_id: razorpayOrder.id,
        checkout_session_id: data.checkout_session_id,
        checkout_fingerprint: fingerprint,
      },
    }, { notifyOwner: false })

    // A concurrent duplicate request can lose the unique-session race after it
    // has created a Razorpay order. SoapLedger returns the winning order, and
    // only that order is ever exposed to Checkout.
    if (ledgerOrder.provider_order_id && ledgerOrder.provider_order_id !== razorpayOrder.id) {
      return responseForLedgerOrder(ledgerOrder)
    }

    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      ref: ledgerOrder.ref,
      fallback_token: createFallbackToken(razorpayOrder.id),
      shipping,
      total,
      payable,
      reused: false,
      already_paid: false,
      payment_pending: false,
    })
  } catch (err) {
    console.error('[POST /api/razorpay/create-order] unexpected error', { ip, err })
    return NextResponse.json({ error: 'Could not start payment. Please try again.' }, { status: 500 })
  }
}
