import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'
import { timingSafeEqual } from 'crypto'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

/**
 * On-demand revalidation endpoint.
 *
 * Called by SoapLedger's revalidateProductsAction() with:
 *   POST /api/revalidate { "tag": "products", "secret": "..." }
 *
 * Only POST is exported, so GET/HEAD/PUT/DELETE get a 405 from the framework and
 * cannot be triggered by a crawler following a link.
 *
 * No loop risk: this handler only touches the Next.js cache. It never calls back
 * into SoapLedger, and revalidation does not itself emit a webhook.
 */

/** Tags this endpoint is allowed to purge. */
const ALLOWED_TAGS = new Set(['products'])

/**
 * Paths this endpoint is allowed to purge. An allowlist rather than free-form
 * input, so a leaked secret cannot be used to purge the entire route cache
 * repeatedly and force expensive full re-renders.
 */
const ALLOWED_PATHS = new Set(['/', '/shop'])

/** Compare in constant time so the secret cannot be recovered by timing. */
function secretMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  // timingSafeEqual throws on length mismatch, which would itself leak length.
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  // Cheap deterrent against someone hammering the endpoint with bad secrets to
  // burn function invocations. Keyed by IP, same limiter the order routes use.
  const ip = getClientIp(request)
  if (!checkRateLimit(`revalidate:${ip}`, 20, 60_000)) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 })
  }

  const expected = process.env.SOAPLEDGER_API_KEY
  if (!expected) {
    // Never reveal which side is misconfigured.
    console.error('[Revalidate] SOAPLEDGER_API_KEY is not set')
    return NextResponse.json({ message: 'Not configured' }, { status: 500 })
  }

  let secret: unknown
  let tag: unknown
  let path: unknown

  try {
    const body = await request.json()
    secret = body?.secret
    tag = body?.tag
    path = body?.path
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof secret !== 'string' || !secretMatches(secret, expected)) {
    // Log the source but never the supplied or expected secret.
    console.error(`[Revalidate] Unauthorized attempt from ${ip}`)
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (tag !== undefined && (typeof tag !== 'string' || !ALLOWED_TAGS.has(tag))) {
    return NextResponse.json({ message: 'Unsupported tag' }, { status: 400 })
  }
  if (path !== undefined && (typeof path !== 'string' || !ALLOWED_PATHS.has(path))) {
    return NextResponse.json({ message: 'Unsupported path' }, { status: 400 })
  }
  if (!tag && !path) {
    return NextResponse.json({ message: 'Missing tag or path' }, { status: 400 })
  }

  try {
    if (typeof tag === 'string') {
      // Purges the tagged Data Cache entry in src/lib/products.ts and, with it,
      // every statically rendered page whose output depended on that entry.
      // Next 16 requires the second profile argument; {} means expire now.
      revalidateTag(tag, {})
      console.log(`[Revalidate] Tag purged: ${tag}`)
    }
    if (typeof path === 'string') {
      revalidatePath(path)
      console.log(`[Revalidate] Path purged: ${path}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      target: tag ?? path,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Revalidate Error]', message)
    // Generic response so internal detail is not echoed to the caller.
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}
