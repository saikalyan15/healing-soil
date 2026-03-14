// lib/products.ts — SoapLedger API integration for Healing Soil products

// ─── Types ─────────────────────────────────────────────────────────────────────

/** Matches the SoapLedger API product response shape */
export type Product = {
  id: string
  name: string
  slug: string
  base: string              // e.g. "Goat Milk", "Shea Butter", "Castile"
  price: number             // base price in INR
  price_range: string       // display string e.g. "₹250 – ₹350"
  description: string
  ingredients: string[]
  image_url: string
  in_stock: boolean
  is_featured: boolean
  category: string          // e.g. "face", "body", "hair", "gift"
}

/** Envelope the SoapLedger list endpoint returns */
type SoapLedgerProductsResponse = {
  data: Product[]
  total: number
}

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

// ─── Data fetching ─────────────────────────────────────────────────────────────

/**
 * Fetch all products from SoapLedger.
 * Cached with ISR — revalidates once every 24 hours.
 */
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${getApiBase()}/api/products`, {
    headers: getApiHeaders(),
    next: { revalidate: 86400 }, // 24 hours
  })

  if (!res.ok) {
    throw new Error(
      `SoapLedger getProducts failed: ${res.status} ${res.statusText}`
    )
  }

  const json: SoapLedgerProductsResponse = await res.json()
  return json.data ?? []
}

/**
 * Fetch only featured products (is_featured === true), capped at 4.
 * Used for the homepage hero/featured section.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts()
  return all.filter((p) => p.is_featured).slice(0, 4)
}

/**
 * Find a single product by its slug.
 * Returns null if the slug is not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts()
  return all.find((p) => p.slug === slug) ?? null
}
