import { createHash } from 'crypto'

const PIXEL_ID = '1321242129962420'
const GRAPH_API_VERSION = 'v21.0'

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

type PurchaseCapiParams = {
  eventId: string
  value: number
  currency: string
  contentIds: string[]
  numItems: number
  phone: string // normalized, digits only, e.g. 917483100651
  eventSourceUrl: string
  clientIpAddress?: string
  clientUserAgent?: string
  fbp?: string
  fbc?: string
}

/**
 * Sends a Purchase event to Meta's Conversions API as a server-side backup
 * for the browser pixel event fired in OrderForm. Shares the same eventId
 * (order ref) with the pixel call so Meta deduplicates the two.
 *
 * NEVER throws — a failed CAPI call must never block or lose an order.
 */
export async function sendPurchaseCapiEvent(params: PurchaseCapiParams): Promise<void> {
  try {
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN
    if (!accessToken) {
      console.warn('[Meta CAPI] META_CAPI_ACCESS_TOKEN not configured — skipping')
      return
    }

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name: 'Purchase',
              event_time: Math.floor(Date.now() / 1000),
              event_id: params.eventId,
              action_source: 'website',
              event_source_url: params.eventSourceUrl,
              user_data: {
                ph: [sha256(params.phone)],
                client_ip_address: params.clientIpAddress,
                client_user_agent: params.clientUserAgent,
                fbp: params.fbp,
                fbc: params.fbc,
              },
              custom_data: {
                currency: params.currency,
                value: params.value,
                content_ids: params.contentIds,
                content_type: 'product',
                num_items: params.numItems,
              },
            },
          ],
        }),
      }
    )

    if (!res.ok) {
      const errorText = await res.text().catch(() => res.statusText)
      console.error('[Meta CAPI] Purchase event rejected:', res.status, errorText)
    }
  } catch (err) {
    console.error('[Meta CAPI] Unexpected error sending Purchase event:', err)
  }
}
