// lib/products.ts — SoapLedger API integration for Healing Soil products

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
  category: string          // e.g. "face", "body", "hair", "gift"
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
  category: string
}

/** Envelope the SoapLedger list endpoint returns */
type SoapLedgerProductsResponse = {
  value: SoapLedgerProduct[] // API uses "value", not "data"
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

/** Map a raw SoapLedger product to the normalised Product type */
function normalise(raw: SoapLedgerProduct): Product {
  const price = parseFloat(raw.price) || 0
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    base: raw.base_type,
    price,
    price_range: raw.price_range ?? `₹${price}`,
    description: raw.short_description,
    ingredients: raw.ingredients ?? [],
    image_url: raw.image_url ?? '',
    in_stock: raw.in_stock,
    is_featured: raw.is_featured,
    category: raw.category,
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
  return (json.value ?? []).map(normalise)
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
