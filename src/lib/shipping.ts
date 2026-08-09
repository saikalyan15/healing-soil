export const FREE_SHIPPING_THRESHOLD = 1000
export const SHIPPING_STANDARD = 100
export const SHIPPING_NORTH = 150

export const NORTH_INDIA_STATES = [
  'Delhi', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Ladakh',
  'Punjab', 'Rajasthan', 'Uttar Pradesh', 'Uttarakhand',
] as const

export function calculateShipping(subtotal: number, state: string): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return NORTH_INDIA_STATES.includes(state as (typeof NORTH_INDIA_STATES)[number])
    ? SHIPPING_NORTH
    : SHIPPING_STANDARD
}
