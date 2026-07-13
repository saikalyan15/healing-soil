export type MetaPixelEventParams = Record<string, string | number | string[]>

declare global {
  interface Window {
    fbq?: (
      action: 'track',
      eventName: string,
      params?: MetaPixelEventParams,
      options?: { eventID: string }
    ) => void
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: MetaPixelEventParams,
  eventId?: string
) {
  if (typeof window !== 'undefined') {
    window.fbq?.('track', eventName, params, eventId ? { eventID: eventId } : undefined)
  }
}

function trackMetaEventOnce(
  storageKey: string,
  eventName: string,
  params: MetaPixelEventParams,
  eventId?: string
) {
  try {
    if (window.sessionStorage.getItem(storageKey)) return
  } catch {
    // Storage can be unavailable in privacy modes; still send the event once.
  }

  trackMetaEvent(eventName, params, eventId)

  try {
    window.sessionStorage.setItem(storageKey, '1')
  } catch {
    // The in-memory success state still prevents another submit this page load.
  }
}

// orderId is passed as the Meta eventID too, so the browser pixel Purchase
// event dedupes against the server-side Conversions API Purchase event
// fired for the same order (see /api/orders route).
export function trackMetaPurchaseOnce(
  orderId: string,
  params: MetaPixelEventParams
) {
  trackMetaEventOnce(`meta-purchase-${orderId}`, 'Purchase', params, orderId)
}

// Keyed by cart contents so revisiting /order with the same cart doesn't
// re-fire, but a genuinely different cart (items added/removed since the
// last fire) still counts as a new checkout start.
export function trackMetaInitiateCheckoutOnce(
  cartSignature: string,
  params: MetaPixelEventParams
) {
  trackMetaEventOnce(`meta-checkout-${cartSignature}`, 'InitiateCheckout', params)
}
