// Run with: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { PAYMENT_FEE_RATE, payableWithFee, paymentFee, payablePaise } from './payment-fee.ts'

// Totals a real basket can produce: bundle prices, singles, and every
// shipping band from src/lib/shipping.ts.
const REAL_TOTALS = [1000, 1100, 599, 449, 549, 2000, 1249, 3750, 25_000]

test('charges 2.5 per cent', () => {
  assert.equal(PAYMENT_FEE_RATE, 0.025)
  assert.equal(payableWithFee(1000), 1025)
  assert.equal(paymentFee(1000), 25)
  assert.equal(payableWithFee(2000), 2050)
})

test('rounds the payable amount to the nearest rupee', () => {
  assert.equal(payableWithFee(1100), 1128)   // 1127.50 rounds up
  assert.equal(payableWithFee(599), 614)     // 613.975 rounds up
  assert.equal(payableWithFee(449), 460)     // 460.225 rounds down
  assert.equal(payableWithFee(1249), 1280)   // 1280.225 rounds down
})

test('never asks Razorpay for a fraction of a rupee', () => {
  for (const total of REAL_TOTALS) {
    const payable = payableWithFee(total)
    assert.equal(payable, Math.trunc(payable), `payable for ${total} is not whole`)
    assert.equal(payablePaise(total) % 100, 0, `paise for ${total} is not whole rupees`)
    assert.equal(payablePaise(total), payable * 100)
  }
})

test('the fee is the difference between the order total and what is charged', () => {
  for (const total of REAL_TOTALS) {
    assert.equal(total + paymentFee(total), payableWithFee(total))
    assert.ok(paymentFee(total) > 0, `no fee added to ${total}`)
    // 2.5 per cent, never off by more than the rupee we rounded by.
    assert.ok(Math.abs(paymentFee(total) - total * PAYMENT_FEE_RATE) <= 0.5)
  }
})

// The invariant the payment flow depends on: /api/razorpay/create-order sends
// payablePaise(total), and /verify and /reconcile recompute the expected paise
// from the value SoapLedger stored for the same order. They have to agree
// exactly or a genuine payment is rejected as a mismatch.
test('the amount charged is the amount verification expects', () => {
  for (const total of REAL_TOTALS) {
    const charged = payablePaise(total)
    // SoapLedger returns order_value as a numeric string.
    const expected = payablePaise(Number(`${total}.00`))
    assert.equal(charged, expected, `mismatch at order value ${total}`)
  }
})

test('handles order values that carry paise', () => {
  assert.equal(payableWithFee(1249.5), 1281)      // 1280.7375
  assert.equal(payablePaise(1249.5), 128_100)
  assert.equal(payableWithFee(999.99), 1025)      // 1024.98975
  assert.equal(payablePaise(999.99) % 100, 0)
})

test('an empty order asks for nothing', () => {
  assert.equal(payableWithFee(0), 0)
  assert.equal(paymentFee(0), 0)
  assert.equal(payablePaise(0), 0)
})
