// lib/order-limits.ts — shared sanity caps against rogue/bulk orders
//
// These are deliberately generous for a genuine bulk-gifting customer, but
// bounded enough to stop scripted abuse (e.g. qty: 99999) and card-testing
// (many small/rapid payment attempts) from doing real damage.

export const MAX_QTY_PER_ITEM = 10
export const MAX_DISTINCT_ITEMS = 20
export const MAX_ORDER_TOTAL_INR = 25_000

export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
export const RATE_LIMIT_PAYMENT_ATTEMPTS = 5   // /api/razorpay/create-order
export const RATE_LIMIT_ORDER_ATTEMPTS = 8     // /api/orders
