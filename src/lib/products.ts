// lib/products.ts — SoapLedger API integration for Healing Soil products
import { unstable_cache } from 'next/cache'
import { canonicalProductName, canonicalSlugFor, productSlugMatches } from './product-slugs'

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Normalised product shape used throughout the app */
export type Product = {
  id: string
  name: string
  slug: string
  base: string              // e.g. "Goat Milk", "Shea Butter", "Glycerine"
  price: number             // base price in INR
  price_range: string       // display string e.g. "₹250 – ₹350"
  description: string
  ingredients: string[]
  image_url: string
  in_stock: boolean
  is_featured: boolean
  is_gift: boolean          // surfaces under the "Shop Gifts" filter; set in SoapLedger
  category: string          // e.g. "face", "body", "hair", "gift"
  display_order: number     // controls sort order in the shop
  texture: 'smooth' | 'mildly-textured' | 'textured' | 'loofah' | null
  units_sold: number        // lifetime units sold, cancelled orders excluded
}

/** Raw shape returned by the SoapLedger API — field names differ from our internal type */
type SoapLedgerProduct = {
  id: string
  name: string
  slug: string
  base_type: string         // API calls it base_type, we normalise to base
  price: string             // API returns a numeric string e.g. "250.00"
  price_range: string | null
  short_description: string // API calls it short_description, we normalise to description
  ingredients: string[]
  image_url: string
  in_stock: boolean
  is_featured: boolean
  is_gift: boolean
  category: string
  display_order: number | null
  texture: 'smooth' | 'mildly-textured' | 'textured' | 'loofah' | null
  units_sold?: number       // added by SoapLedger; optional so an older API still parses
}

// The SoapLedger list endpoint returns a plain JSON array (no envelope)

// ─── Internal helpers ──────────────────────────────────────────────────────────

function getApiBase(): string {
  const url = process.env.SOAPLEDGER_API_URL
  if (!url) throw new Error('SOAPLEDGER_API_URL is not set')
  return url.replace(/\/$/, '') // strip trailing slash
}

function getApiHeaders(): HeadersInit {
  const key = process.env.SOAPLEDGER_API_KEY
  if (!key) throw new Error('SOAPLEDGER_API_KEY is not set')
  return {
    'x-api-key': key,
    'Content-Type': 'application/json',
  }
}

/** Map a raw SoapLedger product to the normalised Product type */
function normalise(raw: SoapLedgerProduct): Product {
  const price = parseFloat(raw.price) || 0
  return {
    id: raw.id,
    name: canonicalProductName(raw.name),
    slug: canonicalSlugFor(raw.slug),
    base: raw.base_type,
    price,
    price_range: raw.price_range ?? `₹${price}`,
    description: raw.short_description,
    ingredients: raw.ingredients ?? [],
    image_url: raw.image_url ?? '',
    in_stock: raw.in_stock,
    is_featured: raw.is_featured,
    is_gift: raw.is_gift ?? false,
    category: raw.category,
    display_order: raw.display_order ?? 9999,
    texture: (['smooth', 'mildly-textured', 'textured', 'loofah'] as const).includes(raw.texture as never)
      ? raw.texture
      : null,
    // Defaults to 0 if SoapLedger has not shipped the field yet, in which case
    // every product ties and the featured row falls back to its old ordering.
    units_sold: raw.units_sold ?? 0,
  }
}

// ─── Data fetching ─────────────────────────────────────────────────────────────

/**
 * Fetch all products from SoapLedger.
 * Cached in the Data Cache for 6 hours, or busted on demand via revalidateTag('products').
 *
 * Pages using this are statically rendered. The 'products' tag propagates from
 * this entry to the Full Route Cache, so revalidateTag('products') rebuilds both
 * the data and every page that renders it. Do not add force-dynamic to those
 * pages: it runs a Vercel Function per request and was the cause of the Fluid
 * Active CPU spend.
 *
 * Product data is edited rarely and SoapLedger pushes revalidateTag('products')
 * automatically after every edit, so the TTL is only a safety net. Long is
 * correct — see the note on the revalidate value below.
 */
export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const res = await fetch(`${getApiBase()}/api/products`, {
      headers: getApiHeaders(),
      cache: 'no-store', // unstable_cache owns the caching layer
    })

    if (!res.ok) {
      throw new Error(
        `SoapLedger getProducts failed: ${res.status} ${res.statusText}`
      )
    }

    const json: SoapLedgerProduct[] = await res.json()

    // Throw rather than return [] on a malformed or empty payload. Callers render
    // statically now, so an empty array would be cached as an empty storefront on
    // the homepage, /shop and every product page. Throwing leaves the previous
    // good cache entry in place. Revisit only if a genuinely empty catalogue
    // becomes a real state worth rendering.
    if (!Array.isArray(json) || json.length === 0) {
      throw new Error(
        `SoapLedger getProducts returned no usable products (${Array.isArray(json) ? 'empty array' : typeof json})`
      )
    }

    return json
      .map(normalise)
      .sort((a, b) => a.display_order - b.display_order)
  },
  ['products'],
  {
    // 24-hour fallback TTL. This is only a backstop for a webhook that failed
    // silently — SoapLedger now POSTs revalidateTag('products') automatically on
    // every product mutation, so that is the primary path.
    //
    // The route-level revalidate is derived from this value, so every page that
    // renders products goes stale on this cadence and regenerates on the next
    // request. At 6h that was up to 4 regenerations per page per day across ~568
    // pages; 24h cuts that by 4x. Do not lower it without a reason: see the Neon
    // note below.
    //
    // Neon compute on the Free plan has a fixed 5-minute scale-to-zero delay.
    // Every cache miss wakes it for a full 5 billed minutes regardless of how
    // little work the query does, so short TTLs burn CU-hours fast.
    revalidate: 86400,
    tags: ['products'], // bust with revalidateTag('products') from SoapLedger
  }
)

/**
 * Fetch the products for the homepage "Most Loved by Our Community" row, capped
 * at 4.
 *
 * That heading and its "best-sellers" subhead are claims about what people
 * actually buy, so the row is ranked by units_sold from real order lines
 * (cancelled orders excluded, computed in SoapLedger's /api/products).
 * It used to be driven by a manual is_featured checkbox, which meant a bar
 * nobody had ordered could sit under a best-seller heading.
 *
 * is_featured and display_order now only break ties. Neither can lift a product
 * above one that has genuinely sold more, so the claim stays true.
 *
 * In-stock bars always outrank sold-out ones regardless of sales: a sold-out
 * card is a dead slot in a four-card row. Sold-out best-sellers still backfill
 * the remaining slots so the section never renders short on a small catalogue.
 *
 * With no order history every product ties at 0 and this degrades to the old
 * is_featured then display_order ordering.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts()

  const bySales = (a: Product, b: Product) =>
    b.units_sold - a.units_sold ||
    Number(b.is_featured) - Number(a.is_featured) ||
    a.display_order - b.display_order

  const inStock = all.filter((p) => p.in_stock).sort(bySales)
  const soldOut = all.filter((p) => !p.in_stock).sort(bySales)

  return [...inStock, ...soldOut].slice(0, 4)
}

/**
 * Find a single product by its slug.
 * Returns null if the slug is not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts()
  return all.find((p) => productSlugMatches(p.slug, slug)) ?? null
}
