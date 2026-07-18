import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyPaymentSignature, isRazorpayEnabled } from '@/lib/razorpay'
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
      console.warn('[POST /api/razorpay/verify] rate limited', { ip })
      return NextResponse.json({ verified: false, error: 'Too many attempts. Please try again shortly.' }, { status: 429 })
    }

    const body = await req.json()
    const result = verifySchema.safeParse(body)

    if (!result.success) {
      console.warn('[POST /api/razorpay/verify] invalid request', { ip, issues: result.error.flatten() })
      return NextResponse.json({ verified: false, error: 'Invalid request' }, { status: 400 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = result.data

    const verified = verifyPaymentSignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!verified) {
      console.error('[POST /api/razorpay/verify] signature mismatch', { ip, razorpay_order_id, razorpay_payment_id })
      return NextResponse.json({ verified: false, error: 'Signature mismatch' }, { status: 400 })
    }

    return NextResponse.json({ verified: true, payment_id: razorpay_payment_id })
  } catch (err) {
    console.error('[POST /api/razorpay/verify] unexpected error', { ip, err })
    return NextResponse.json({ verified: false, error: 'Could not verify payment' }, { status: 500 })
  }
}
