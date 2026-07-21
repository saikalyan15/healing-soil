const MEASUREMENT_ID = 'G-EWQR3K5MW7'

// gtag.js names the GA4 session cookie `_ga_<suffix>`, where suffix is the
// measurement ID with its "G-" prefix stripped.
export const GA4_SESSION_COOKIE_NAME = `_ga_${MEASUREMENT_ID.replace(/^G-/, '')}`

type PurchaseMpItem = {
  item_id: string
  price: number
  quantity: number
}

type PurchaseMpParams = {
  transactionId: string
  value: number
  currency: string
  shipping: number
  items: PurchaseMpItem[]
  clientId?: string
  sessionId?: string
}

/**
 * Sends a Purchase event to GA4 via the Measurement Protocol as a server-side
 * backup for the browser gtag event fired in OrderForm — it still lands even
 * when an ad blocker or tracking prevention silently drops the client-side
 * hit. Shares the same transaction_id as the gtag call so GA4 dedupes the two.
 *
 * NEVER throws — a failed MP call must never block or lose an order.
 */
export async function sendPurchaseMpEvent(params: PurchaseMpParams): Promise<void> {
  try {
    const apiSecret = process.env.GA4_MP_API_SECRET
    if (!apiSecret) {
      console.warn('[GA4 MP] GA4_MP_API_SECRET not configured — skipping')
      return
    }
    if (!params.clientId) {
      console.warn('[GA4 MP] no _ga client_id cookie on request — skipping')
      return
    }

    const res = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: params.clientId,
          events: [
            {
              name: 'purchase',
              params: {
                transaction_id: params.transactionId,
                currency: params.currency,
                value: params.value,
                shipping: params.shipping,
                items: params.items,
                ...(params.sessionId
                  ? { session_id: params.sessionId, engagement_time_msec: 1 }
                  : {}),
              },
            },
          ],
        }),
      }
    )

    if (!res.ok) {
      const errorText = await res.text().catch(() => res.statusText)
      console.error('[GA4 MP] Purchase event rejected:', res.status, errorText)
    }
  } catch (err) {
    console.error('[GA4 MP] Unexpected error sending Purchase event:', err)
  }
}

/** Parses the client_id out of the `_ga` cookie (format `GA1.1.<id1>.<id2>`). */
export function parseGaClientId(gaCookie?: string): string | undefined {
  if (!gaCookie) return undefined
  const parts = gaCookie.split('.')
  if (parts.length < 4) return undefined
  return `${parts[2]}.${parts[3]}`
}

/**
 * Parses the session_id out of the `_ga_<suffix>` session cookie
 * (format `GS1.1.<session_id>.<session_number>.<engaged>.<last_engagement>.<n>`).
 */
export function parseGaSessionId(gaSessionCookie?: string): string | undefined {
  if (!gaSessionCookie) return undefined
  const parts = gaSessionCookie.split('.')
  if (parts.length < 3) return undefined
  return parts[2]
}
