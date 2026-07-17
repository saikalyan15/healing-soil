// lib/rate-limit.ts — in-memory sliding-window rate limiter
//
// Note: this state lives per serverless instance, so it's a deterrent against
// scripted abuse (bulk/rogue orders, payment-endpoint hammering) rather than a
// hard guarantee — a determined attacker spread across many cold instances can
// get around it. If real abuse shows up, upgrade to a shared store (e.g.
// Upstash Redis) so the limit holds across all instances.

const hits = new Map<string, number[]>()

// Periodically drop stale keys so this map doesn't grow unbounded on a
// long-lived instance.
const MAX_TRACKED_KEYS = 5000

export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs)

  if (timestamps.length >= limit) {
    hits.set(key, timestamps)
    return false
  }

  timestamps.push(now)
  hits.set(key, timestamps)

  if (hits.size > MAX_TRACKED_KEYS) {
    const cutoff = now - windowMs
    for (const [k, v] of hits) {
      if (v.every((t) => t < cutoff)) hits.delete(k)
    }
  }

  return true
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
