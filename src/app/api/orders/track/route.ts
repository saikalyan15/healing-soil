import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { RATE_LIMIT_TRACK_ATTEMPTS, RATE_LIMIT_WINDOW_MS } from '@/lib/order-limits'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { trackSoapLedgerOrder } from '@/lib/orders'

const lookupSchema = z.object({
  ref: z.string().trim().regex(/^HS-[0-9A-F]{8}$/i),
  phone: z.string().trim().min(10).max(20),
})

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits
  if (digits.length === 11 && digits.startsWith('0')) return `91${digits.slice(1)}`
  return `91${digits.slice(-10)}`
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (!checkRateLimit(`order-track:${ip}`, RATE_LIMIT_TRACK_ATTEMPTS, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait a few minutes and try again.' },
      { status: 429 }
    )
  }

  const parsed = lookupSchema.safeParse(await req.json().catch(() => null))
  const normalizedPhone = parsed.success ? normalizePhone(parsed.data.phone) : ''
  if (!parsed.success || !/^91[6-9]\d{9}$/.test(normalizedPhone)) {
    return NextResponse.json(
      { error: 'Enter a valid order reference and registered mobile number.' },
      { status: 400 }
    )
  }

  try {
    const order = await trackSoapLedgerOrder(parsed.data.ref.toUpperCase(), normalizedPhone)
    if (!order) {
      return NextResponse.json(
        { error: 'We could not find an order matching those details.' },
        { status: 404 }
      )
    }
    return NextResponse.json(order, { headers: { 'Cache-Control': 'no-store, private' } })
  } catch (err) {
    console.error('[Order tracking] lookup failed', { ip, err })
    return NextResponse.json(
      { error: 'We could not check your order right now. Please try again shortly.' },
      { status: 500 }
    )
  }
}
