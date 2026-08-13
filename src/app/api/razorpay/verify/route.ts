import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { confirmPaidOrder } from '@/lib/payment-confirmation'
import { getRazorpayClient, isRazorpayEnabled, verifyPaymentSignature } from '@/lib/razorpay'
import { updateSoapLedgerPayment } from '@/lib/orders'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_PAYMENT_ATTEMPTS } from '@/lib/order-limits'

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!isRazorpayEnabled()) {
    return NextResponse.json({ verified: false, error: 'Online payment is not available right now.' }, { status: 404 })
  }

  try {
    if (!checkRateLimit(`razorpay-verify:${ip}`, RATE_LIMIT_PAYMENT_ATTEMPTS, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json({ verified: false, error: 'Too many attempts. Please try again shortly.' }, { status: 429 })
    }
    const parsed = verifySchema.safeParse(await req.json())
    if (!parsed.success) return NextResponse.json({ verified: false, error: 'Invalid request' }, { status: 400 })
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data

    if (!verifyPaymentSignature({ orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature: razorpay_signature })) {
      return NextResponse.json({ verified: false, error: 'Signature mismatch' }, { status: 400 })
    }

    const [payment, ledger] = await Promise.all([
      getRazorpayClient().payments.fetch(razorpay_payment_id),
      updateSoapLedgerPayment({ action: 'status', providerOrderId: razorpay_order_id }),
    ])
    const paymentOrderId = String(payment.order_id || '')
    const paymentAmount = Number(payment.amount)
    const expectedAmount = Math.round(Number(ledger.order.order_value) * 100)
    if (paymentOrderId !== razorpay_order_id || paymentAmount !== expectedAmount || payment.currency !== 'INR') {
      console.error('[Razorpay verify] payment/order mismatch', { razorpay_order_id, razorpay_payment_id })
      return NextResponse.json({ verified: false, error: 'Payment details did not match the order.' }, { status: 400 })
    }

    if (payment.status !== 'captured') {
      return NextResponse.json({ verified: true, pending: true, ref: ledger.order.ref }, { status: 202 })
    }

    const confirmed = await confirmPaidOrder({
      providerOrderId: razorpay_order_id,
      providerPaymentId: razorpay_payment_id,
      origin: req.nextUrl.origin,
    })
    return NextResponse.json({ verified: true, paid: true, payment_id: razorpay_payment_id, ref: confirmed.ref })
  } catch (err) {
    console.error('[POST /api/razorpay/verify] unexpected error', { ip, err })
    return NextResponse.json({ verified: false, error: 'Could not verify payment' }, { status: 500 })
  }
}
