import { COMMERCE_ENABLED } from '@/lib/site-mode'

/**
 * Renders its children only when the storefront is live (site mode 'full').
 * Used to hide product grids, buy buttons and bundle CTAs on the content pages
 * that stay published in 'content-only' mode without touching their copy or
 * structured data.
 */
export default function CommerceOnly({ children }: { children: React.ReactNode }) {
  return COMMERCE_ENABLED ? <>{children}</> : null
}
