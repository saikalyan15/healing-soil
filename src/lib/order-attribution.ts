import type { OrderAttribution } from '@/lib/attribution'

export function classifyOrderSource(attribution?: OrderAttribution): string {
  if (!attribution) return 'Website'

  const source = attribution.last_touch.source.toLowerCase()
  const medium = attribution.last_touch.medium.toLowerCase()
  const hasMetaClick = Boolean(
    attribution.last_touch.fbclid ||
    attribution.identifiers?.fbc ||
    /(^|\.)facebook\.com$/.test(source) ||
    /(^|\.)instagram\.com$/.test(source) ||
    ['facebook', 'instagram', 'meta', 'fb', 'ig'].includes(source)
  )

  if (hasMetaClick && ['paid_social', 'cpc', 'ppc', 'paid'].includes(medium)) return 'Meta Paid'
  if (hasMetaClick) return 'Meta'
  if (['paid_social', 'cpc', 'ppc', 'paid'].includes(medium)) return 'Paid Campaign'
  if (medium === 'organic') return 'Organic Search'
  if (medium === 'email') return 'Email'
  if (medium === 'referral') return 'Referral'
  if (source === 'direct' && medium === 'none') return 'Direct'
  return 'Website'
}

export function safeEventSourceUrl(origin: string, attribution?: OrderAttribution): string {
  const landingPage = attribution?.last_touch.landing_page
  if (!landingPage) return `${origin}/order`

  try {
    const url = new URL(landingPage, origin)
    return url.origin === origin ? url.toString() : `${origin}/order`
  } catch {
    return `${origin}/order`
  }
}
