import { NextRequest, NextResponse } from 'next/server'
import { confirmPaidOrder } from '@/lib/payment-confirmation'
import { verifyWebhookSignature } from '@/lib/razorpay'
import { updateSoapLedgerPayment } from '@/lib/orders'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-razorpay-signature') || ''
  try {
    if (!signature || !verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(rawBody) as {
      event?: string
      payload?: { payment?: { entity?: {
        id?: string
        order_id?: string
        status?: string
        method?: string
        error_code?: string
        error_description?: string
        error_source?: string
        error_step?: string
        error_reason?: string
        amount?: number | string
        currency?: string
        created_at?: number
      } } }
    }
    if (!['order.paid', 'payment.captured', 'payment.failed'].includes(event.event || '')) {
      return NextResponse.json({ received: true, ignored: true })
    }

    const payment = event.payload?.payment?.entity
    if (!payment?.id || !payment.order_id) {
      return NextResponse.json({ received: true, ignored: true })
    }

    if (event.event === 'payment.failed') {
      await updateSoapLedgerPayment({
        action: 'failed',
        providerOrderId: payment.order_id,
        providerPaymentId: payment.id,
        failureReason: payment.error_description || payment.error_reason || 'Payment was not completed',
        failureDetails: {
          paymentId: payment.id,
          method: payment.method,
          code: payment.error_code,
          source: payment.error_source,
          step: payment.error_step,
          reason: payment.error_reason,
          description: payment.error_description,
        },
        paymentDetails: {
          status: payment.status,
          method: payment.method,
          amountPaise: Number(payment.amount),
          currency: payment.currency,
          createdAt: payment.created_at,
        },
      })
      return NextResponse.json({ received: true })
    }

    if (payment.status && payment.status !== 'captured') {
      return NextResponse.json({ received: true, ignored: true })
    }

    await confirmPaidOrder({
      providerOrderId: payment.order_id,
      providerPaymentId: payment.id,
      origin: req.nextUrl.origin,
      paymentDetails: {
        status: payment.status || 'captured',
        method: payment.method,
        amountPaise: Number(payment.amount),
        currency: payment.currency,
        createdAt: payment.created_at,
      },
    })
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[Razorpay webhook] failed', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
