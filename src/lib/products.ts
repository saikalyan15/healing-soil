// Products data fetching — integrate with SoapLedger API
// API base: process.env.SOAPLEDGER_API_URL
// Auth: x-api-key header with process.env.SOAPLEDGER_API_KEY

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  ingredients: string[]
  stock: number
  category: string
}

export async function getProducts(): Promise<Product[]> {
  // TODO: fetch from SoapLedger API
  return []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // TODO: fetch single product from SoapLedger API
  return null
}
