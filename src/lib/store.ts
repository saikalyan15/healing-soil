import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from './products'

export type OrderItem = {
  product_id: string
  product_name: string
  qty: number
  price: number
  image_url: string
}

type OrderStore = {
  items: OrderItem[]
  addItem: (product: Product) => void
  removeItem: (product_id: string) => void
  updateQty: (product_id: string, qty: number) => void
  clearOrder: () => void
  total: number
  itemCount: number
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find((i) => i.product_id === product.id)
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product_id === product.id ? { ...i, qty: i.qty + 1 } : i
            ),
          }))
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                product_id: product.id,
                product_name: product.name,
                qty: 1,
                price: product.price,
                image_url: product.image_url,
              },
            ],
          }))
        }
      },

      removeItem: (product_id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product_id !== product_id),
        })),

      updateQty: (product_id, qty) => {
        if (qty <= 0) {
          get().removeItem(product_id)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product_id === product_id ? { ...i, qty } : i
          ),
        }))
      },

      clearOrder: () => set({ items: [] }),

      // Derived — computed from items on each access
      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.qty, 0)
      },
    }),
    {
      name: 'healing-soil-order',
      // Only persist the items array; derived values recompute on access
      partialize: (state) => ({ items: state.items }),
    }
  )
)
