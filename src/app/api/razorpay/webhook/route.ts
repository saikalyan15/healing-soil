import { NextRequest, NextResponse } from 'next/server'
import { confirmPaidOrder } from '@/lib/payment-confirmation'
import { verifyWebhookSignature } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature') || ''
  try {
    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(rawBody) as {
      event?: string
      payload?: { payment?: { entity?: { id?: string; order_id?: string; status?: string } } }
    }
    if (!['order.paid', 'payment.captured'].includes(event.event || '')) {
      return NextResponse.json({ received: true, ignored: true })
    }

    const payment = event.payload?.payment?.entity
    if (!payment?.id || !payment.order_id || (payment.status && payment.status !== 'captured')) {
      return NextResponse.json({ received: true, ignored: true })
    }

    await confirmPaidOrder({
      providerOrderId: payment.order_id,
      providerPaymentId: payment.id,
      origin: req.nextUrl.origin,
    })
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[Razorpay webhook] failed', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
