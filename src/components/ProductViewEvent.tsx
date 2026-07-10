'use client'

import { useEffect } from 'react'
import { trackMetaEvent } from '@/lib/meta-pixel'

type Props = {
  product: {
    slug: string
    name: string
    price: number
  }
}

export default function ProductViewEvent({ product }: Props) {
  useEffect(() => {
    trackMetaEvent('ViewContent', {
      value: product.price,
      currency: 'INR',
      content_ids: [product.slug],
      content_name: product.name,
      content_type: 'product',
    })
  }, [product.name, product.price, product.slug])

  return null
}

