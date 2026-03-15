// lib/orders.ts — Order submission and notification for Healing Soil

// ─── Types ─────────────────────────────────────────────────────────────────────

export type LineItem = {
  product_id: string
  product_name: string
  slug: string
  quantity: number
  unit_price: number       // INR
}

export type ShippingAddress = {
  name: string
  phone: string            // E.164 without + e.g. "917483100651"
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  pincode: string
}

/** Payload sent to SoapLedger /api/orders/incoming */
export type OrderPayload = {
  customer_name: string
  customer_phone: string   // E.164 without +
  customer_email?: string
  items: LineItem[]
  shipping_address: ShippingAddress
  notes?: string
  source: 'website'        // literal — always "website" for this integration
}

/** Shape of the SoapLedger order creation response */
type SoapLedgerOrderResponse = {
  order_id: string
  ref: string              // human-readable ref e.g. "HS-2025-0042"
  status: string
}

// ─── Internal helpers ──────────────────────────────────────────────────────────

function getApiBase(): string {
  const url = process.env.SOAPLEDGER_API_URL
  if (!url) throw new Error('SOAPLEDGER_API_URL is not set')
  return url.replace(/\/$/, '')
}

function getApiHeaders(): HeadersInit {
  const key = process.env.SOAPLEDGER_API_KEY
  if (!key) throw new Error('SOAPLEDGER_API_KEY is not set')
  return {
    'x-api-key': key,
    'Content-Type': 'application/json',
  }
}

function orderTotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
}

// ─── CallMeBot notification ────────────────────────────────────────────────────

/**
 * Sends a WhatsApp notification via CallMeBot to the store owner.
 * NEVER throws — a failed notification must never block or lose an order.
 */
async function sendCallMeBotNotification(
  orderId: string,
  ref: string,
  payload: OrderPayload
): Promise<void> {
  try {
    const apiKey = process.env.CALLMEBOT_API_KEY
    const phone = process.env.CALLMEBOT_PHONE

    if (!apiKey || !phone) {
      console.warn('[CallMeBot] API key or phone not configured — skipping notification')
      return
    }

    const total = orderTotal(payload.items)

    const itemLines = payload.items
      .map((i) => `  • ${i.product_name} ×${i.quantity} @ ₹${i.unit_price}`)
      .join('\n')

    const message = [
      `🧼 New Order — ${ref}`,
      `Customer: ${payload.customer_name} (${payload.customer_phone})`,
      `Items:\n${itemLines}`,
      `Total: ₹${total}`,
      `View: https://soap-ledger.vercel.app/orders/${orderId}`,
    ].join('\n')

    const url = new URL('https://api.callmebot.com/whatsapp.php')
    url.searchParams.set('phone', phone)
    url.searchParams.set('text', message)
    url.searchParams.set('apikey', apiKey)

    const res = await fetch(url.toString(), { method: 'GET' })

    if (!res.ok) {
      console.error(
        `[CallMeBot] Notification failed: ${res.status} ${res.statusText}`
      )
    }
  } catch (err) {
    // Log but never propagate — the order is already saved in SoapLedger
    console.error('[CallMeBot] Unexpected error sending notification:', err)
  }
}

// ─── Order submission ──────────────────────────────────────────────────────────

/**
 * Submit a new order to SoapLedger, then fire a CallMeBot WhatsApp alert.
 *
 * - If SoapLedger POST fails → throws (caller should show error to user)
 * - If CallMeBot fails      → logs error, does NOT throw (order is never lost)
 *
 * @returns The SoapLedger `order_id` string on success
 */
export async function submitOrder(payload: OrderPayload): Promise<string> {
  // 1. POST to SoapLedger
  const res = await fetch(`${getApiBase()}/api/orders/incoming`, {
    method: 'POST',
    headers: getApiHeaders(),
    body: JSON.stringify({ ...payload, source: 'website' }),
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText)
    throw new Error(
      `Failed to submit order: ${res.status} — ${errorText}`
    )
  }

  const order: SoapLedgerOrderResponse = await res.json()

  // 2. Fire CallMeBot notification (non-blocking, errors are swallowed)
  await sendCallMeBotNotification(order.order_id, order.ref, payload)

  return order.order_id
}

// ─── WhatsApp deep-link builder ────────────────────────────────────────────────

/**
 * Builds the pre-filled WhatsApp message string for a wa.me deep link.
 *
 * Usage (in a Client Component):
 *   const msg = buildWhatsAppMessage(orderId, customer, items, shipping)
 *   window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`)
 */
export function buildWhatsAppMessage(
  orderId: string,
  customer: { name: string; email?: string },
  items: LineItem[],
  shipping: ShippingAddress,
  shippingCost: number,
  notes?: string
): string {
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0)
  const total = subtotal + shippingCost

  const itemLines = items
    .map((i) => `• ${i.product_name} ×${i.quantity} — ₹${i.unit_price * i.quantity}`)
    .join('\n')

  const addressLines = [
    shipping.address_line_1,
    shipping.address_line_2,
    `${shipping.city}, ${shipping.state} — ${shipping.pincode}`,
  ]
    .filter(Boolean)
    .join(', ')

  return [
    `Hi Healing Soil! 🌿`,
    ``,
    `I'd like to place an order:`,
    ``,
    itemLines,
    ``,
    `Subtotal: ₹${subtotal}`,
    `Shipping: ${shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}`,
    `Total: ₹${total}`,
    ``,
    `Deliver to:`,
    `${shipping.name}`,
    `${addressLines}`,
    `Phone: ${shipping.phone}`,
    ``,
    notes ? `Note: ${notes}` : '',
    notes ? `` : '',
    `Order ref: ${orderId}`,
    customer.email ? `Email: ${customer.email}` : '',
  ]
    .filter((line) => line !== undefined)
    .join('\n')
    .trim()
}
