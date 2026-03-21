'use client'
import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

type Props = { id: string; name: string; price: number }

export default function ProductViewTracker({ id, name, price }: Props) {
  useEffect(() => {
    sendGAEvent('event', 'view_item', {
      currency: 'INR',
      value: price,
      items: [{ item_id: id, item_name: name, price, quantity: 1 }],
    })
  }, [id, name, price])
  return null
}
