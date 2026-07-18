// lib/razorpay.ts — Razorpay client + signature verification helpers

import Razorpay from 'razorpay'
import crypto from 'crypto'

// Feature toggle — mirrors the client-side flag in OrderForm.tsx. Keeps the
// payment endpoints refusing to operate while the feature is hidden, even if
// something calls them directly.
export function isRazorpayEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_RAZORPAY === 'true'
}

function getKeyId(): string {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  if (!key) throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not set')
  return key
}

function getKeySecret(): string {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error('RAZORPAY_KEY_SECRET is not set')
  return secret
}

let client: Razorpay | null = null

export function getRazorpayClient(): Razorpay {
  if (!client) {
    client = new Razorpay({ key_id: getKeyId(), key_secret: getKeySecret() })
  }
  return client
}

/**
 * Verifies the signature Razorpay returns after a successful checkout.
 * Per Razorpay docs: signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
 */
export function verifyPaymentSignature(params: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const expected = crypto
    .createHmac('sha256', getKeySecret())
    .update(`${params.orderId}|${params.paymentId}`)
    .digest('hex')

  const expectedBuf = Buffer.from(expected)
  const actualBuf = Buffer.from(params.signature)
  if (expectedBuf.length !== actualBuf.length) return false

  return crypto.timingSafeEqual(expectedBuf, actualBuf)
}
