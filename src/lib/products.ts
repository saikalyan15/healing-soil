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
 * Fetch featured products for the homepage, capped at 4.
 * Prefers products marked is_featured === true in SoapLedger, and among those
 * the ones actually in stock — a sold-out card is a dead slot in a four-card row,
 * so it only keeps its place if we cannot fill the row any other way.
 * Falls back to the rest of the catalogue if none are marked featured,
 * so the section never renders empty.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts()
  const featured = all.filter((p) => p.is_featured)
  const pool = featured.length > 0 ? featured : all
  const inPool = new Set(pool.map((p) => p.id))

  const ranked = [
    ...pool.filter((p) => p.in_stock),
    ...all.filter((p) => p.in_stock && !inPool.has(p.id)), // top the row back up
    ...pool.filter((p) => !p.in_stock),
    ...all.filter((p) => !p.in_stock && !inPool.has(p.id)),
  ]

  return ranked.slice(0, 4)
}

/**
 * Find a single product by its slug.
 * Returns null if the slug is not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts()
  return all.find((p) => productSlugMatches(p.slug, slug)) ?? null
}
