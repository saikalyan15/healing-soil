import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './products'

export type OrderItem = {
  product_id: string
  product_name: string
  product_slug: string
  qty: number
  price: number
  image_url: string
}

type OrderStore = {
  items: OrderItem[]
  total: number
  itemCount: number
  addItem: (product: Product) => void
  removeItem: (product_id: string) => void
  updateQty: (product_id: string, qty: number) => void
  clearOrder: () => void
}

const calculateTotals = (items: OrderItem[]) => ({
  total: items.reduce((sum, i) => sum + i.price * i.qty, 0),
  itemCount: items.reduce((sum, i) => sum + i.qty, 0),
})

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product) => {
        const { items } = get()
        const existing = items.find((i) => i.product_id === product.id)
        let nextItems: OrderItem[]

        if (existing) {
          nextItems = items.map((i) =>
            i.product_id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        } else {
          nextItems = [
            ...items,
            {
              product_id: product.id,
              product_name: product.name,
              product_slug: product.slug,
              qty: 1,
              price: product.price,
              image_url: product.image_url,
            },
          ]
        }
        set({ items: nextItems, ...calculateTotals(nextItems) })
      },

      removeItem: (product_id) => {
        const nextItems = get().items.filter((i) => i.product_id !== product_id)
        set({ items: nextItems, ...calculateTotals(nextItems) })
      },

      updateQty: (product_id, qty) => {
        if (qty <= 0) {
          get().removeItem(product_id)
          return
        }
        const nextItems = get().items.map((i) =>
          i.product_id === product_id ? { ...i, qty } : i
        )
        set({ items: nextItems, ...calculateTotals(nextItems) })
      },

      clearOrder: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: 'healing-soil-order',
      // Persist the essential state
      partialize: (state) => ({ 
        items: state.items,
        total: state.total,
        itemCount: state.itemCount 
      }),
    }
  )
)
