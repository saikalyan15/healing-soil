// lib/orders.ts — Order submission and notification for Healing Soil

// ─── Types ─────────────────────────────────────────────────────────────────────

export type LineItem = {
  product_id: string       // Database ID from SoapLedger
  price: number            // Unit price
  qty: number
}

/** Specific type for the WhatsApp message which needs the human-readable name */
export type WhatsAppLineItem = LineItem & {
  product_name: string
}

/** Payload sent to SoapLedger /api/orders/incoming */
export type OrderPayload = {
  customer: {
    name: string
    phone: string
    address: string
  }
  items: LineItem[]
  shipping: number         // Shipping cost
  notes?: string           // Customer instructions
  source: string           // e.g. "Website Order"
}

export type ShippingAddress = {
  name: string
  phone: string
  address_line_1: string
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

// ─── Owner email notification via Resend ──────────────────────────────────────

/**
 * Sends an order notification email to the store owner via Resend.
 * NEVER throws — a failed notification must never block or lose an order.
 */
async function sendOwnerEmail(
  orderId: string,
  ref: string,
  payload: OrderPayload
): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.NOTIFY_EMAIL_TO

    if (!apiKey || !to) {
      console.warn('[Resend] RESEND_API_KEY or NOTIFY_EMAIL_TO not configured — skipping notification')
      return
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const subtotal = payload.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    const total = subtotal + payload.shipping
    const waLink = `https://wa.me/${payload.customer.phone.replace(/\D/g, '')}`

    await resend.emails.send({
      from: 'orders@healingsoil.in',
      to: to.split(',').map((e) => e.trim()),
      subject: `New Order — ${ref}`,
      html: `
        <h2 style="color:#1E5631">New Order: ${ref}</h2>
        <p><strong>Customer:</strong> ${payload.customer.name}</p>
        <p><strong>Phone:</strong> <a href="${waLink}">${payload.customer.phone}</a></p>
        <p><strong>Address:</strong> ${payload.customer.address}</p>
        <p><strong>Items:</strong> ${payload.items.length}</p>
        <p><strong>Total:</strong> ₹${total} (incl. ₹${payload.shipping} shipping)</p>
        ${payload.notes ? `<p><strong>Notes:</strong> ${payload.notes}</p>` : ''}
        <p><a href="https://soap-ledger.vercel.app/orders/${orderId}">View in SoapLedger →</a></p>
      `,
    })
  } catch (err) {
    // Log but never propagate — the order is already saved in SoapLedger
    console.error('[Resend] Unexpected error sending notification:', err)
  }
}

// ─── Order submission ──────────────────────────────────────────────────────────

/**
 * Submit a new order to SoapLedger, then fire an owner email notification via Resend.
 *
 * - If SoapLedger POST fails → throws (caller should show error to user)
 * - If Resend fails          → logs error, does NOT throw (order is never lost)
 *
 * @returns Object with order_id (UUID) and ref (human-readable)
 */
export async function submitOrder(payload: OrderPayload): Promise<{ order_id: string; ref: string }> {
  const body = JSON.stringify(payload)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[SoapLedger Request Payload]:', body)
  }

  // 1. POST to SoapLedger
  const res = await fetch(`${getApiBase()}/api/orders/incoming`, {
    method: 'POST',
    headers: getApiHeaders(),
    body,
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText)
    throw new Error(
      `Failed to submit order: ${res.status} — ${errorText}`
    )
  }

  const order: SoapLedgerOrderResponse = await res.json()

  // Fallback: if SoapLedger doesn't return a 'ref', create a simple one from timestamp
  const humanRef = order.ref || `WEB-${Date.now().toString().slice(-6)}`

  // 2. Fire owner email notification (non-blocking, errors are swallowed)
  await sendOwnerEmail(order.order_id, humanRef, payload)

  return { order_id: order.order_id, ref: humanRef }
}

// ─── WhatsApp deep-link builder ────────────────────────────────────────────────

/**
 * Builds the pre-filled WhatsApp message string for a wa.me deep link.
 *
 * Usage (in a Client Component):
 *   const msg = buildWhatsAppMessage(ref, customer, items, shipping)
 *   window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`)
 */
export function buildWhatsAppMessage(
  ref: string,
  customer: { name: string },
  items: WhatsAppLineItem[],
  shipping: ShippingAddress,
  shippingCost: number,
  notes?: string
): string {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const total = subtotal + shippingCost

  const itemLines = items
    .map((i) => `• ${i.product_name} ×${i.qty} — ₹${i.price * i.qty}`)
    .join('\n')

  return [
    `Hi Healing Soil! 🌿`,
    ``,
    `Order: #${ref}`,
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
    `${shipping.address_line_1}`,
    `Phone: ${shipping.phone}`,
    notes ? `` : '',
    notes ? `Note: ${notes}` : '',
  ]
    .filter((line) => line !== undefined)
    .join('\n')
    .trim()
}
