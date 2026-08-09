import { sendPurchaseMpEvent } from '@/lib/ga4-mp'
import { sendPurchaseCapiEvent } from '@/lib/meta-capi'
import { sendOwnerEmail, updateSoapLedgerPayment } from '@/lib/orders'

/**
 * Idempotently promotes a pending SoapLedger order to paid. Notifications and
 * analytics only run for the request that actually performs the transition.
 */
export async function confirmPaidOrder(params: {
  providerOrderId: string
  providerPaymentId: string
  origin: string
}) {
  const result = await updateSoapLedgerPayment({
    action: 'confirm',
    providerOrderId: params.providerOrderId,
    providerPaymentId: params.providerPaymentId,
  })
  const order = result.order

  if (result.transitioned) {
    const shipping = Number(order.shipping_charge)
    const total = Number(order.order_value)
    const identifiers = order.attribution?.identifiers
    const payload = {
      customer: {
        name: order.customer_name,
        phone: order.customer_phone,
        email: order.customer_email,
        address: order.customer_address,
      },
      items: order.items.map((item) => ({
        product_id: item.product_id,
        price: Number(item.price),
        qty: Number(item.qty),
      })),
      shipping,
      notes: order.notes,
      source: order.source || 'Website',
      attribution: order.attribution,
    }

    await Promise.all([
      sendOwnerEmail(order.id, order.ref, payload),
      sendPurchaseCapiEvent({
        eventId: order.ref,
        value: total,
        currency: 'INR',
        contentIds: order.items.map((item) => item.product_slug),
        numItems: order.items.reduce((sum, item) => sum + Number(item.qty), 0),
        phone: order.customer_phone,
        eventSourceUrl: `${params.origin}/order`,
        fbp: identifiers?.fbp,
        fbc: identifiers?.fbc,
      }),
      sendPurchaseMpEvent({
        transactionId: order.ref,
        value: total,
        currency: 'INR',
        shipping,
        items: order.items.map((item) => ({
          item_id: item.product_id,
          price: Number(item.price),
          quantity: Number(item.qty),
        })),
        clientId: identifiers?.ga_client_id,
        sessionId: identifiers?.ga_session_id,
      }),
    ])
  }

  return { ref: order.ref, transitioned: result.transitioned, order }
}
