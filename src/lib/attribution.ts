export type AttributionTouch = {
  source: string
  medium: string
  campaign?: string
  content?: string
  term?: string
  campaign_id?: string
  fbclid?: string
  landing_page: string
  referrer?: string
  captured_at: string
}

export type OrderAttribution = {
  version: 1
  first_touch: AttributionTouch
  last_touch: AttributionTouch
  identifiers?: {
    fbp?: string
    fbc?: string
  }
}

const STORAGE_KEY = 'healing_soil_attribution_v1'
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000
const MAX_VALUE_LENGTH = 500

function clean(value: string | null | undefined, max = MAX_VALUE_LENGTH): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed.slice(0, max) : undefined
}

function readStored(): OrderAttribution | undefined {
  if (typeof window === 'undefined') return undefined

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '') as OrderAttribution
    const capturedAt = Date.parse(parsed?.last_touch?.captured_at)
    if (parsed?.version !== 1 || !Number.isFinite(capturedAt) || Date.now() - capturedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(STORAGE_KEY)
      return undefined
    }
    return parsed
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return undefined
  }
}

function externalReferrer(): string | undefined {
  const referrer = clean(document.referrer)
  if (!referrer) return undefined

  try {
    const url = new URL(referrer)
    return url.origin === window.location.origin ? undefined : referrer
  } catch {
    return undefined
  }
}

function touchFromLocation(): { touch: AttributionTouch; explicitSignal: boolean } {
  const params = new URLSearchParams(window.location.search)
  const referrer = externalReferrer()
  const utmSource = clean(params.get('utm_source'), 100)
  const utmMedium = clean(params.get('utm_medium'), 100)
  const fbclid = clean(params.get('fbclid'))

  let source = utmSource
  let medium = utmMedium

  if (!source && fbclid) source = 'facebook'
  if (!medium && fbclid) medium = 'paid_social'

  if (!source && referrer) {
    try {
      source = new URL(referrer).hostname.replace(/^www\./, '')
      medium = medium || 'referral'
    } catch {
      // The referrer was already validated; fall back to direct if parsing fails.
    }
  }

  const explicitSignal = Boolean(utmSource || utmMedium || fbclid || referrer)

  return {
    explicitSignal,
    touch: {
      source: source || 'direct',
      medium: medium || 'none',
      campaign: clean(params.get('utm_campaign'), 200),
      content: clean(params.get('utm_content'), 200),
      term: clean(params.get('utm_term'), 200),
      campaign_id: clean(params.get('utm_id'), 200),
      fbclid,
      landing_page: `${window.location.pathname}${window.location.search}`.slice(0, MAX_VALUE_LENGTH),
      referrer,
      captured_at: new Date().toISOString(),
    },
  }
}

/** Capture first-touch and GA-style last non-direct attribution for this visitor. */
export function captureAttribution(): OrderAttribution | undefined {
  if (typeof window === 'undefined') return undefined

  const stored = readStored()
  const { touch, explicitSignal } = touchFromLocation()
  const next: OrderAttribution = stored
    ? { ...stored, last_touch: explicitSignal ? touch : stored.last_touch }
    : { version: 1, first_touch: touch, last_touch: touch }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage can be disabled; checkout must continue without attribution.
  }

  return next
}

export function getStoredAttribution(): OrderAttribution | undefined {
  return readStored() || captureAttribution()
}
