import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { confirmPaidOrder } from '@/lib/payment-confirmation'
import { getRazorpayClient } from '@/lib/razorpay'
import { updateSoapLedgerPayment } from '@/lib/orders'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

const reconcileSchema = z.object({
  soapledger_order_id: z.string().uuid(),
  provider_order_id: z.string().regex(/^order_[A-Za-z0-9]+$/),
  provider_payment_id: z.string().regex(/^pay_[A-Za-z0-9]+$/),
})

function secretMatches(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided)
  const expectedBuffer = Buffer.from(expected)
  return providedBuffer.length === expectedBuffer.length
    && timingSafeEqual(providedBuffer, expectedBuffer)
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!checkRateLimit(`razorpay-reconcile:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many reconciliation attempts.' }, { status: 429 })
  }

  const expectedKey = process.env.SOAPLEDGER_API_KEY
  const providedKey = req.headers.get('x-api-key') || ''
  if (!expectedKey) {
    console.error('[Razorpay reconcile] SOAPLEDGER_API_KEY is not configured')
    return NextResponse.json({ error: 'Reconciliation is not configured.' }, { status: 500 })
  }
  if (!secretMatches(providedKey, expectedKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const parsed = reconcileSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid Razorpay payment ID.' }, { status: 400 })
  }

  const { soapledger_order_id, provider_order_id, provider_payment_id } = parsed.data

  try {
    const ledger = await updateSoapLedgerPayment({ action: 'status', providerOrderId: provider_order_id })
    if (ledger.order.id !== soapledger_order_id) {
      return NextResponse.json({ error: 'This Razorpay order does not belong to the selected SoapLedger order.' }, { status: 409 })
    }

    if (ledger.order.payment_status === 'paid' && ledger.order.provider_payment_id === provider_payment_id) {
      return NextResponse.json({
        paid: true,
        already_confirmed: true,
        ref: ledger.order.ref,
        payment_id: provider_payment_id,
      })
    }

    let payment
    try {
      payment = await getRazorpayClient().payments.fetch(provider_payment_id)
    } catch (err) {
      console.error('[Razorpay reconcile] payment fetch failed', { provider_order_id, provider_payment_id, err })
      return NextResponse.json({ error: 'Razorpay could not find that payment ID.' }, { status: 404 })
    }

    const expectedAmount = Math.round(Number(ledger.order.order_value) * 100)
    if (String(payment.order_id || '') !== provider_order_id) {
      return NextResponse.json({ error: 'The payment belongs to a different Razorpay order.' }, { status: 409 })
    }
    if (Number(payment.amount) !== expectedAmount || payment.currency !== 'INR') {
      return NextResponse.json({ error: 'The payment amount or currency does not match this order.' }, { status: 409 })
    }
    if (payment.status !== 'captured') {
      return NextResponse.json({
        error: `Razorpay reports this payment as ${payment.status || 'unknown'}, not captured.`,
      }, { status: 409 })
    }
    if (ledger.order.payment_status === 'paid' && ledger.order.provider_payment_id !== provider_payment_id) {
      return NextResponse.json({
        error: 'This order is already linked to another payment. Review it for a possible duplicate charge.',
      }, { status: 409 })
    }

    const confirmed = await confirmPaidOrder({
      providerOrderId: provider_order_id,
      providerPaymentId: provider_payment_id,
      origin: req.nextUrl.origin,
    })

    return NextResponse.json({
      paid: true,
      already_confirmed: !confirmed.transitioned,
      ref: confirmed.ref,
      payment_id: provider_payment_id,
    }, { headers: { 'Cache-Control': 'no-store, private' } })
  } catch (err) {
    console.error('[Razorpay reconcile] failed', { soapledger_order_id, provider_order_id, provider_payment_id, err })
    return NextResponse.json({ error: 'Could not reconcile this payment.' }, { status: 502 })
  }
}
