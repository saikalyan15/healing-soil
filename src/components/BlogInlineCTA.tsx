import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import { COMMERCE_ENABLED } from '@/lib/site-mode'
import WhatsAppNudge from './WhatsAppNudge'

type Props = {
  /**
   * The most relevant product for the post this CTA sits inside. When present,
   * the CTA points at that product page; otherwise it points at /shop. Blog
   * traffic is the largest source on the site, so the CTA should land the
   * reader on a page that can fire view_item rather than a generic hub.
   */
  product?: Product
}

export default function BlogInlineCTA({ product }: Props) {
  // Storefront closed: no bundle or product link, just a soft WhatsApp line.
  if (!COMMERCE_ENABLED) return <WhatsAppNudge source="blog_inline" />

  // No mapped product for this post, so point at the full range.
  if (!product) {
    return (
      <div className="my-8 flex flex-col gap-3 rounded-lg border border-[#D6CFC4] bg-[#F0EDE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg text-[#1E5631]">See the soaps</p>
          <p className="font-sans text-sm text-[#666666]">
            SLS-free, made to order from our farm in South Goa.
          </p>
        </div>
        <Link
          href="/shop"
          className="shrink-0 rounded bg-[#1E5631] px-5 py-2 text-center font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
        >
          Browse all soaps
        </Link>
      </div>
    )
  }

  return (
    <div className="my-8 flex flex-col gap-4 rounded-lg border border-[#D6CFC4] bg-[#F0EDE6] px-5 py-4 sm:flex-row sm:items-center">
      {product.image_url && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white/60">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#C9A84C]">
          The bar from this article
        </p>
        <p className="font-serif text-lg leading-snug text-[#1E5631]">{product.name}</p>
        <p className="font-sans text-sm text-[#666666]">
          {product.price_range || `₹${product.price}`} · Made to order in South Goa
        </p>
      </div>

      <Link
        href={`/shop/${product.slug}`}
        className="shrink-0 rounded bg-[#1E5631] px-5 py-2 text-center font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
      >
        See this soap
      </Link>
    </div>
  )
}
