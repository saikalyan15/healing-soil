/**
 * GA4 event names used by the storefront.
 *
 * Keep the key-event decision separate from event emission: GA4 key events are
 * configured in the property Admin UI, not in browser code.
 */
export const GA4_EVENT = {
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  GENERATE_LEAD: 'generate_lead',
  PURCHASE: 'purchase',
  WHATSAPP_SEND_CLICKED: 'whatsapp_send_clicked',
} as const

/** Only these events represent business outcomes and should be GA4 key events. */
export const GA4_KEY_EVENTS = [
  GA4_EVENT.GENERATE_LEAD,
  GA4_EVENT.PURCHASE,
] as const
