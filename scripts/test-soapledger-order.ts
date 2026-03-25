/**
 * Integration test: verifies a test order can be inserted into SoapLedger.
 *
 * Run with:  npx tsx scripts/test-soapledger-order.ts
 *
 * Uses the same payload structure as the live order flow.
 * Prints pass/fail and the order ref on success.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually
const envPath = resolve(process.cwd(), '.env.local')
for (const line of readFileSync(envPath, 'utf8').split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '')
}

const API_URL = process.env.SOAPLEDGER_API_URL?.replace(/\/$/, '')
const API_KEY = process.env.SOAPLEDGER_API_KEY

if (!API_URL || !API_KEY) {
  console.error('❌  SOAPLEDGER_API_URL or SOAPLEDGER_API_KEY not set in .env.local')
  process.exit(1)
}

const payload = {
  customer: {
    name: 'Test Customer',
    phone: '919999999999',
    address: '123 Test Street, Bengaluru, Karnataka 560001',
  },
  items: [
    {
      product_id: 'red-rose-soap',
      price: 249,
      qty: 1,
    },
  ],
  shipping: 100,
  notes: '[TEST ORDER — safe to delete]',
  source: 'Website Order',
}

async function run() {
  console.log('→ Sending test order to SoapLedger...')
  console.log('  URL:', `${API_URL}/api/orders/incoming`)
  console.log('  Payload:', JSON.stringify(payload, null, 2))
  console.log()

  const res = await fetch(`${API_URL}/api/orders/incoming`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const text = await res.text()
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }

  console.log('  Status:', res.status)
  console.log('  Response:', JSON.stringify(data, null, 2))
  console.log()

  if (res.ok) {
    const order = data as { order_id?: string; ref?: string }
    console.log('✅  Order created successfully')
    console.log('   order_id:', order.order_id)
    console.log('   ref:     ', order.ref)
    console.log()
    console.log('⚠️   This was a test order. Delete it from SoapLedger if needed.')
  } else {
    console.error('❌  Order creation failed')
    process.exit(1)
  }
}

run().catch((err) => {
  console.error('❌  Unexpected error:', err)
  process.exit(1)
})
