import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getOrderAvailability, sendOwnerEmail, updateSoapLedgerPayment } from '@/lib/orders'
import { verifyFallbackToken } from '@/lib/razorpay'
import { sendLeadCapiEvent } from '@/lib/meta-capi'
import { sendLeadMpEvent } from '@/lib/ga4-mp'

const schema = z.object({
  provider_order_id: z.string().min(1),
  fallback_token: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json())
    if (!parsed.success) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    const { provider_order_id, fallback_token } = parsed.data
    if (!verifyFallbackToken(provider_order_id, fallback_token)) {
      return NextResponse.json({ error: 'Invalid fallback request' }, { status: 401 })
    }
    if (!await getOrderAvailability()) {
      return NextResponse.json(
        { error: 'Orders are temporarily paused while we catch up.', code: 'ORDERS_PAUSED' },
        { status: 503 }
      )
    }

    const result = await updateSoapLedgerPayment({ action: 'manual', providerOrderId: provider_order_id })
    const order = result.order
    if (result.transitioned) {
      const shipping = Number(order.shipping_charge)
      const total = Number(order.order_value)
      const identifiers = order.attribution?.identifiers
      await Promise.all([
        sendOwnerEmail(order.id, order.ref, {
          customer: { name: order.customer_name, phone: order.customer_phone, email: order.customer_email, address: order.customer_address },
          items: order.items.map((item) => ({ product_id: item.product_id, price: Number(item.price), qty: Number(item.qty) })),
          shipping,
          notes: order.notes,
          source: order.source || 'Website',
          attribution: order.attribution,
        }),
        sendLeadCapiEvent({
          eventId: order.ref, value: total, currency: 'INR',
          contentIds: order.items.map((item) => item.product_slug),
          numItems: order.items.reduce((sum, item) => sum + Number(item.qty), 0),
          phone: order.customer_phone, eventSourceUrl: `${req.nextUrl.origin}/order`,
          fbp: identifiers?.fbp, fbc: identifiers?.fbc,
        }),
        sendLeadMpEvent({
          leadId: order.ref, value: total, currency: 'INR',
          clientId: identifiers?.ga_client_id, sessionId: identifiers?.ga_session_id,
        }),
      ])
    }
    return NextResponse.json({ ref: order.ref })
  } catch (err) {
    console.error('[Razorpay fallback] failed', err)
    return NextResponse.json({ error: 'Could not switch to manual payment.' }, { status: 500 })
  }
}
