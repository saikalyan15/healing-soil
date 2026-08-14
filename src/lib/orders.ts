// lib/orders.ts — Order submission and notification for Healing Soil

import type { OrderAttribution } from '@/lib/attribution'

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
    email?: string
    address: string
  }
  items: LineItem[]
  shipping: number         // Shipping cost
  notes?: string           // Customer instructions
  source: string           // e.g. "Website Order"
  attribution?: OrderAttribution
  payment?: {
    provider: 'razorpay'
    provider_order_id: string
  }
  intent?: 'interest'
  consent?: boolean
}

export type ShippingAddress = {
  name: string
  phone: string
  address_line_1: string
}

/** Shape of the SoapLedger order creation response */
export type SoapLedgerOrderResponse = {
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
export async function sendOwnerEmail(
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
    const escapeHtml = (value: unknown) => String(value ?? '')
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#039;')

    await resend.emails.send({
      from: 'orders@healingsoil.in',
      to: to.split(',').map((e) => e.trim()),
      subject: `New Order — ${ref}`,
      html: `
        <h2 style="color:#1E5631">New Order: ${ref}</h2>
        <p><strong>Customer:</strong> ${escapeHtml(payload.customer.name)}</p>
        <p><strong>Phone:</strong> <a href="${waLink}">${escapeHtml(payload.customer.phone)}</a></p>
        ${payload.customer.email ? `<p><strong>Email:</strong> ${escapeHtml(payload.customer.email)}</p>` : ''}
        <p><strong>Address:</strong> ${escapeHtml(payload.customer.address)}</p>
        <p><strong>Items:</strong> ${payload.items.length}</p>
        <p><strong>Total:</strong> ₹${total} (incl. ₹${payload.shipping} shipping)</p>
        ${payload.notes ? `<p><strong>Notes:</strong> ${escapeHtml(payload.notes)}</p>` : ''}
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
export async function submitOrder(
  payload: OrderPayload,
  options: { notifyOwner?: boolean } = {}
): Promise<{ order_id: string; ref: string; status?: string; payment_status?: string }> {
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
  if (options.notifyOwner !== false) {
    await sendOwnerEmail(order.order_id, humanRef, payload)
  }

  return { ...order, ref: humanRef }
}

export async function getOrderAvailability(): Promise<boolean> {
  const res = await fetch(`${getApiBase()}/api/order-availability`, {
    headers: getApiHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Could not check order availability: ${res.status}`)
  const data = await res.json()
  return data.accepting_orders === true
}

export type SoapLedgerPaymentOrder = {
  id: string
  ref: string
  status: string
  payment_status: string
  provider_order_id?: string
  provider_payment_id?: string
  order_value: string | number
  shipping_charge: string | number
  customer_name: string
  customer_phone: string
  customer_email?: string
  customer_address: string
  notes?: string
  source?: string
  attribution?: OrderAttribution
  items: Array<{
    product_id: string
    product_slug: string
    product_name: string
    price: string | number
    qty: string | number
  }>
}

export async function updateSoapLedgerPayment(params: {
  action: 'confirm' | 'failed' | 'manual' | 'status'
  providerOrderId: string
  providerPaymentId?: string
  failureReason?: string
  failureDetails?: {
    paymentId?: string
    method?: string
    code?: string
    source?: string
    step?: string
    reason?: string
  }
}): Promise<{ transitioned: boolean; order: SoapLedgerPaymentOrder }> {
  const res = await fetch(`${getApiBase()}/api/orders/payment`, {
    method: 'POST',
    headers: getApiHeaders(),
    body: JSON.stringify({
      action: params.action,
      provider_order_id: params.providerOrderId,
      provider_payment_id: params.providerPaymentId,
      failure_reason: params.failureReason,
      failure_details: params.failureDetails ? {
        payment_id: params.failureDetails.paymentId,
        method: params.failureDetails.method,
        code: params.failureDetails.code,
        source: params.failureDetails.source,
        step: params.failureDetails.step,
        reason: params.failureDetails.reason,
      } : undefined,
    }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Could not update payment: ${res.status} — ${await res.text()}`)
  return res.json()
}

export type TrackedOrder = {
  ref: string
  status: string
  payment_status: 'unpaid' | 'pending' | 'failed' | 'manual' | 'paid'
  is_interest: boolean
  order_date: string
  created_at: string
  paid_at: string | null
  payment_failed_at: string | null
  total: number
  shipping: number
  items: Array<{ name: string; quantity: number }>
  shipments: Array<{
    status: string
    dispatched_at: string | null
    delivered_at: string | null
  }>
}

export async function trackSoapLedgerOrder(ref: string, phone: string): Promise<TrackedOrder | null> {
  const res = await fetch(`${getApiBase()}/api/orders/track`, {
    method: 'POST',
    headers: getApiHeaders(),
    body: JSON.stringify({ ref, phone }),
    cache: 'no-store',
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Could not track order: ${res.status}`)
  return res.json()
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
  notes?: string,
  paymentId?: string
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
    paymentId ? `I've just placed and paid for an order:` : `I'd like to place an order:`,
    ``,
    itemLines,
    ``,
    `Subtotal: ₹${subtotal}`,
    `Shipping: ${shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}`,
    `Total: ₹${total}`,
    paymentId ? `Payment: PAID ✓ (Razorpay ${paymentId})` : '',
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
