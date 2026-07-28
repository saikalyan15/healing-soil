import type { Metadata } from 'next'

/**
 * Shared metadata builders.
 *
 * Before this existed, every route hand-rolled its own metadata object and the
 * root layout also applied a `title.template` of '%s | Healing Soil'. Pages and
 * data records had each independently added their own brand suffix, so the
 * brand rendered two or three times and 510 of 535 titles blew past the 60
 * character mark Google truncates at.
 *
 * The rule here: the brand suffix is appended once, and only when it fits.
 * The root layout must NOT set a title template, or this double-applies again.
 */

export const BRAND = 'Healing Soil'

export const SITE_URL = 'https://healingsoil.in'

/**
 * Schema.org requires absolute URLs for image fields. Product, ItemList and
 * BlogPosting were all emitting site-relative paths straight from the data
 * source (SoapLedger returns image_url as "/products/x.png", MDX frontmatter
 * uses "/blog/x.png"), which Google rejects as an invalid object and reports
 * as a rich-result error rather than silently ignoring.
 *
 * Pass-through for values that are already absolute, so this is safe to apply
 * to fields that may already be fully qualified.
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return ''
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

/** Google truncates titles around 600px, which is roughly 60 characters. */
export const TITLE_MAX = 60

/** Descriptions get truncated in SERPs beyond roughly 160 characters. */
export const DESCRIPTION_MAX = 160

const BRAND_SUFFIX = ` | ${BRAND}`

/**
 * Matches a trailing brand suffix in any separator style that ended up in the
 * codebase (pipe, em dash, en dash, hyphen), including variants carrying a
 * trailing location such as '| Healing Soil, Goa'.
 */
const TRAILING_BRAND = /\s*[|—–-]\s*Healing Soil(?:\s*,?\s*Goa)?\s*$/i

/**
 * Removes every trailing brand suffix, not just the last one. Several data
 * records carried the brand twice before the page template added a third.
 */
export function stripBrand(title: string): string {
  let out = title.trim()
  let previous: string

  do {
    previous = out
    out = out.replace(TRAILING_BRAND, '').trim()
  } while (out !== previous && out.length > 0)

  return out
}

/**
 * Appends the brand suffix only when the result stays within the title budget.
 * A bare, complete title beats a branded one that gets cut off mid phrase.
 */
export function buildTitle(pageTitle: string): string {
  const bare = stripBrand(pageTitle)
  if (!bare) return BRAND
  return bare.length + BRAND_SUFFIX.length <= TITLE_MAX ? `${bare}${BRAND_SUFFIX}` : bare
}

/**
 * Safety net for descriptions that slip past the budget. Cuts at the last
 * sentence boundary inside the limit where possible, otherwise the last whole
 * word, so a truncated description never ends mid word.
 *
 * This is a backstop. Descriptions should still be written to fit.
 */
export function buildDescription(text: string): string {
  const clean = text.trim().replace(/\s+/g, ' ')
  if (clean.length <= DESCRIPTION_MAX) return clean

  const slice = clean.slice(0, DESCRIPTION_MAX)

  const lastSentence = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('! '),
    slice.lastIndexOf('? ')
  )
  if (lastSentence > DESCRIPTION_MAX * 0.6) return slice.slice(0, lastSentence + 1)

  const lastSpace = slice.lastIndexOf(' ')
  return (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(/[,;:\-]$/, '')
}

type BuildMetadataInput = {
  title: string
  description: string
  /** Path or absolute URL. Sets both the canonical and the OpenGraph url. */
  canonical?: string
  ogType?: 'website' | 'article'
  images?: NonNullable<Metadata['openGraph']>['images']
}

/**
 * Builds a Metadata object with the title and description budgets applied and
 * the OpenGraph url kept in sync with the canonical. Keeping those two in sync
 * matters: a self referencing og:url alongside a canonical pointing elsewhere
 * is a contradictory signal.
 */
export function buildMetadata({
  title,
  description,
  canonical,
  ogType = 'website',
  images,
}: BuildMetadataInput): Metadata {
  const finalTitle = buildTitle(title)
  const finalDescription = buildDescription(description)

  return {
    title: finalTitle,
    description: finalDescription,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      ...(canonical ? { url: canonical } : {}),
      siteName: BRAND,
      type: ogType,
      ...(images ? { images } : {}),
    },
  }
}
