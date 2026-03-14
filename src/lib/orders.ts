// Orders data fetching — integrate with SoapLedger API
// API base: process.env.SOAPLEDGER_API_URL

export type Order = {
  id: string
  items: { productId: string; quantity: number; price: number }[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string
  customerPhone: string
}

export async function getOrderById(id: string): Promise<Order | null> {
  // TODO: fetch order from SoapLedger API
  return null
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order | null> {
  // TODO: post new order to SoapLedger API
  return null
}
