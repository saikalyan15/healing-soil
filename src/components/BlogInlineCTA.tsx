import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/products'

type Props = {
  /**
   * The most relevant product for the post this CTA sits inside. When present,
   * the CTA points at that product page instead of the homepage bundle anchor.
   *
   * This matters more than it looks. The CTA always linked to /#bundle, so a
   * reader who had just been told which bar suits the monsoon was sent to the
   * homepage to assemble a four-soap bundle from scratch. It also meant the
   * main call to action on every post could never fire view_item, which only
   * fires on /shop/[slug]. Blog traffic is the largest source on the site and
   * almost none of it reached a product page.
   */
  product?: Product
}

export default function BlogInlineCTA({ product }: Props) {
  // No mapped product for this post, so fall back to the bundle.
  if (!product) {
    return (
      <div className="my-8 flex flex-col gap-3 rounded-lg border border-[#D6CFC4] bg-[#F0EDE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg text-[#1E5631]">Try the starter bundle</p>
          <p className="font-sans text-sm text-[#666666]">
            Four soaps, ₹1,000. SLS-free, made to order from Goa.
          </p>
        </div>
        <Link
          href="/#bundle"
          className="shrink-0 rounded bg-[#1E5631] px-5 py-2 text-center font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
        >
          See the bundle
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
