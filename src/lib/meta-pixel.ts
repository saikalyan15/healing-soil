export type MetaPixelEventParams = Record<string, string | number | string[]>

declare global {
  interface Window {
    fbq?: (
      action: 'track',
      eventName: string,
      params?: MetaPixelEventParams
    ) => void
  }
}

export function trackMetaEvent(eventName: string, params?: MetaPixelEventParams) {
  if (typeof window !== 'undefined') {
    window.fbq?.('track', eventName, params)
  }
}

function trackMetaEventOnce(
  storageKey: string,
  eventName: string,
  params: MetaPixelEventParams
) {
  try {
    if (window.sessionStorage.getItem(storageKey)) return
  } catch {
    // Storage can be unavailable in privacy modes; still send the event once.
  }

  trackMetaEvent(eventName, params)

  try {
    window.sessionStorage.setItem(storageKey, '1')
  } catch {
    // The in-memory success state still prevents another submit this page load.
  }
}

export function trackMetaPurchaseOnce(
  orderId: string,
  params: MetaPixelEventParams
) {
  trackMetaEventOnce(`meta-purchase-${orderId}`, 'Purchase', params)
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
