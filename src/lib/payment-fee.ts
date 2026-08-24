// lib/payment-fee.ts — online payment charge on Razorpay checkouts

// Razorpay's charge on an online payment is passed on to the customer. It is
// taken on the order total (items plus shipping) and the amount collected is
// rounded to the nearest rupee, so Checkout always asks for a whole number.
//
// SoapLedger keeps recording the order at its own value, so every amount check
// against a stored order has to run the payment through here first. Orders paid
// on WhatsApp never carry this charge.
export const PAYMENT_FEE_RATE = 0.025

/** What Razorpay collects for an order worth `total` rupees. */
export function payableWithFee(total: number): number {
  return Math.round(total * (1 + PAYMENT_FEE_RATE))
}

/** The charge on its own, for showing as a line in the order summary. */
export function paymentFee(total: number): number {
  return payableWithFee(total) - total
}

/** Paise amount to send to, or expect back from, Razorpay. */
export function payablePaise(total: number): number {
  return Math.round(payableWithFee(total) * 100)
}
