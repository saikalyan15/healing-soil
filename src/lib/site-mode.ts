// lib/site-mode.ts — reversible site posture switch
//
// One build-time env var, NEXT_PUBLIC_SITE_MODE, decides how much of the site is
// live. Set it in the deploy environment; nothing here is destructive and every
// difference is gated on the value below.
//
//   full          the complete site: storefront, cart, checkout, product pages,
//                 programmatic SEO pages, order APIs. This is the default.
//   content-only  no storefront. The homepage becomes a one-page brand + WhatsApp
//                 landing; /shop, cart, checkout, product and programmatic routes
//                 redirect to /; blog, guides, brand and legal pages stay live
//                 and indexed with every buy CTA removed; order APIs return 410.
//   dark          a bare holding page at /. Everything except / and assets
//                 redirects to /. Meant as a short hold, not a resting state.
//
// Reversal is a one-line env change plus redeploy.

export type SiteMode = 'full' | 'content-only' | 'dark'

/** Guarded read of NEXT_PUBLIC_SITE_MODE. Anything unrecognised falls back to 'full'. */
export function siteMode(): SiteMode {
  const raw = process.env.NEXT_PUBLIC_SITE_MODE
  return raw === 'content-only' || raw === 'dark' ? raw : 'full'
}

export const SITE_MODE: SiteMode = siteMode()

/** Storefront, cart, checkout, product pages, programmatic SEO pages, order APIs. */
export const COMMERCE_ENABLED = SITE_MODE === 'full'

/** Blog, guides, brand and legal pages serve normally rather than redirecting to /. */
export const CONTENT_ENABLED = SITE_MODE !== 'dark'

/** Only the holding page at / is served. */
export const SITE_DARK = SITE_MODE === 'dark'
