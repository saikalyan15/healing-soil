import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts } from '@/lib/products'
import { getSoapSquaresBoxDetail, isSoapSquaresProduct, soapSquaresBoxDetails } from '@/lib/soap-squares'
import { reviewsForProduct, featuredReviews } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import AddToCartButton from '@/components/AddToCartButton'
import ProductViewEvent from '@/components/ProductViewEvent'
import ProductImage from '@/components/ProductImage'
import ProductViewTracker from './ProductViewTracker'
import ProductCard from '@/components/ProductCard'
import { comparisons } from '@/data/comparisons'
import { canonicalSlugFor } from '@/lib/product-slugs'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

const INGREDIENT_SLUG: Record<string, string> = {
  'neem': 'neem',
  'tulsi': 'tulsi',
  'goat milk': 'goat-milk',
  'glycerin': 'glycerin',
  'glycerine': 'glycerin',
  'shea butter': 'shea-butter',
  'honey': 'honey',
  'oats': 'oats',
  'oat': 'oats',
  'kesar': 'kesar',
  'saffron': 'kesar',
  'haldi': 'haldi',
  'turmeric': 'haldi',
  'rose': 'rose',
  'pomegranate': 'pomegranate',
  'orange': 'orange',
  'ginger': 'ginger',
  'rosemary': 'rosemary',
}

function getIngredientSlug(name: string): string | null {
  const lower = name.toLowerCase().trim()
  if (INGREDIENT_SLUG[lower]) return INGREDIENT_SLUG[lower]
  for (const [key, slug] of Object.entries(INGREDIENT_SLUG)) {
    if (lower.includes(key)) return slug
  }
  return null
}

const PRODUCT_META_OVERRIDES: Record<string, { title: string; description: string }> = {
  'soap-squares-creamy-box': {
    title: 'Soap Squares Discovery Box - Creamy | Healing Soil',
    description: 'Four 50g goat milk Soap Squares in one kraft box. A simple way to try creamy-feeling handmade soaps, keep guest soaps, or gift a small-batch set.',
  },
  'soap-squares-light-box': {
    title: 'Soap Squares Discovery Box - Light | Healing Soil',
    description: 'Four 50g glycerin Soap Squares in one kraft box. A lighter way to try handmade soaps, keep guest soaps, or gift a small-batch set.',
  },
  'soap-squares-rich-box': {
    title: 'Soap Squares Discovery Box - Rich | Healing Soil',
    description: 'Four 50g Soap Squares in one kraft box, with a richer-feeling mix of shea butter and goat milk handmade soaps.',
  },
  'marigold-soap': {
    title: 'Marigold Soap India | Handmade Floral Bar from Goa',
    description: 'A small-batch marigold soap with golden petals, creamy lather, and a gentle floral feel. SLS-free and handmade in Goa.',
  },
  'neem-tulsi-glycerin-soap': {
    title: 'Neem Tulsi Glycerin Soap | Handmade in Goa | Healing Soil',
    description: 'Neem and tulsi in a pure glycerin base for a clean herbal feel. Made to order in South Goa. No SLS, no parabens. Ships across India.',
  },
  'neem-tulsi-goat-milk-soap': {
    title: 'Neem Tulsi Goat Milk Soap | Handmade in Goa | Healing Soil',
    description: 'Creamy goat milk with sun-dried neem and tulsi. Richer lather than glycerin, with a gentle herbal scent and moisturising finish. Made to order in South Goa.',
  },
  'honey-oats-glycerin-soap': {
    title: 'Honey Oats Glycerin Soap for Sensitive Skin | Healing Soil, Goa',
    description: 'Real honey and oat flakes in a glycerin soap base. A gentle daily bar with a soft, mild feel. Handmade in small batches in South Goa.',
  },
  'loofah-soaps': {
    title: 'Natural Loofah Soap | Handmade Glycerin Soap from Goa | Healing Soil',
    description: 'Natural loofah soap with a sun-dried loofah slice in a glycerin base. Textured body bar for feet, elbows, and knees. Handmade in Goa.',
  },
  'shea-butter-kesar-gulab': {
    title: 'Shea Butter Soap with Saffron and Rose | Handmade in Goa | Healing Soil',
    description: 'The most indulgent bar in our range. Shea butter, saffron, and rose — made to order in small batches in South Goa. No SLS or synthetic fragrance.',
  },
  'pomegranate-goat-milk-soap': {
    title: 'Pomegranate Goat Milk Soap | Handmade in Goa | Healing Soil',
    description: 'Rich goat milk with pomegranate peel. Creamy lather, deep wine-red colour. Made to order in South Goa, ships across India.',
  },
  'red-rose-soap': {
    title: 'Rose Shaped Handmade Soap | Pure Rose Essential Oil | Healing Soil Goa',
    description: 'A handmade soap shaped like a rose, made with pure rose essential oil and vitamin E. Soft, creamy lather with a delicate floral scent. Made to order in South Goa.',
  },
  'kesar-haldi-goat-milk-soap': {
    title: 'Kesar Haldi Goat Milk Soap | Saffron Turmeric Soap from Goa | Healing Soil',
    description: 'Saffron and turmeric in a creamy goat milk base — long celebrated in Indian skincare. Handmade in small batches in South Goa. No SLS, no parabens.',
  },
  'ginger-rosemary-glycerin-soap': {
    title: 'Ginger Rosemary Glycerin Soap | Handmade in Goa | Healing Soil',
    description: 'An invigorating 100g glycerin soap with ginger and rosemary. Warm herbal scent, light lather. Made to order in South Goa. Free shipping across India.',
  },
  'travel-soaps': {
    title: '30g Travel Soap Bars, No Spills or Liquid Limits | Healing Soil',
    description: 'Solid 30g soap bars for flights and travel bags, no liquid restrictions or leaks to worry about. Handmade, SLS-free, made in small batches in Goa.',
  },
}

const PRODUCT_SUPPORT_LINKS: Record<string, { href: string; label: string }[]> = {
  'travel-soaps': [
    { href: '/blog/small-travel-soap-bars-india', label: 'small soap for travel' },
    { href: '/occasion/travel-soap-india', label: 'travel soap India guide' },
    { href: '/blog/natural-soap-sensitive-skin-india', label: 'soap for sensitive skin in India' },
  ],
  'marigold-soap': [
    { href: '/blog/marigold-soap-benefits', label: 'marigold soap benefits' },
    { href: '/guide/handmade-soap-india', label: 'complete handmade soap guide' },
    { href: '/shop/red-rose-soap', label: 'rose shaped handmade soap' },
  ],
  'loofah-soaps': [
    { href: '/blog/loofah-soap-benefits-and-how-to-use', label: 'loofah soap benefits and how to use it' },
    { href: '/compare/loofah-soap-vs-regular-soap', label: 'loofah soap vs regular soap' },
  ],
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const canonicalSlug = canonicalSlugFor(product.slug)
  const override = PRODUCT_META_OVERRIDES[canonicalSlug]
  const title = override?.title ?? `${product.name} | Healing Soil, Goa`
  const description = override?.description ?? `${product.description} Made by hand in South Goa. ${product.price_range}.`

  return {
    title,
    description,
    alternates: { canonical: `/shop/${canonicalSlug}` },
    openGraph: {
      title,
      description,
      url: `/shop/${canonicalSlug}`,
      siteName: 'Healing Soil',
      images: product.image_url
        ? [{ url: product.image_url, alt: product.name }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Healing Soil handmade soaps' }],
      type: 'website',
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  const canonicalSlug = canonicalSlugFor(product.slug)

  const productSpecificReviews = reviewsForProduct(canonicalSlug)
  const displayReviews = productSpecificReviews.length > 0
    ? productSpecificReviews.slice(0, 2)
    : featuredReviews.slice(0, 2)

  const allProducts = await getProducts().catch(() => [])
  const related = allProducts
    .filter(p =>
      !isSoapSquaresProduct(p) &&
      canonicalSlugFor(p.slug) !== canonicalSlug &&
      p.base === product.base &&
      p.in_stock
    )
    .slice(0, 3)

  const today = new Date().toISOString().split('T')[0]
  const relevantComparisons = comparisons.filter(c =>
    c.publishedAt !== null &&
    c.publishedAt <= today &&
    (c.relatedProductsA.includes(canonicalSlug) || c.relatedProductsB.includes(canonicalSlug))
  )
  const supportingLinks = PRODUCT_SUPPORT_LINKS[canonicalSlug] ?? []
  const soapSquaresDetail = getSoapSquaresBoxDetail(canonicalSlug)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url || undefined,
    brand: { '@type': 'Brand', name: 'Healing Soil' },
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Healing Soil' },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 100,
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
    },
    ...(productSpecificReviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1,
        reviewCount: productSpecificReviews.length,
      },
      review: productSpecificReviews.slice(0, 2).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        reviewBody: r.comment,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
        },
      })),
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://healingsoil.in/shop' },
      { '@type': 'ListItem', position: 2, name: product.name, item: `https://healingsoil.in/shop/${canonicalSlug}` },
    ],
  }

  return (
    <>
      <ProductViewEvent product={product} />
    <div className="bg-[#F7F5F0] min-h-screen">
      <ProductViewTracker id={product.id} name={product.name} price={product.price} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 font-sans text-sm text-[#1E5631] hover:underline mb-8"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Shop
        </Link>

        {/* Breadcrumb */}
        <nav className="mb-6 font-sans text-xs text-[#999]" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-[#1A1A14]">{product.name}</li>
          </ol>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#EDE8E0]">
            <ProductImage src={product.image_url} alt={product.name} />
            {!product.in_stock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="font-sans text-sm font-medium text-white bg-black/60 px-4 py-1.5 rounded-full">
                  Out of stock
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="inline-block font-sans text-xs font-medium text-[#1E5631] bg-[#E8F0EB] px-2.5 py-1 rounded-full">
                  {product.base} Base
                </span>
                {(() => {
                  const textureLabels: Record<string, string> = {
                    smooth: 'Smooth',
                    'mildly-textured': 'Mildly Textured',
                    textured: 'Textured',
                    loofah: 'Loofah',
                  }
                  const label = (product.texture ? textureLabels[product.texture] : null) ?? 'Mixed'
                  return (
                    <span
                      title={label}
                      className="inline-block font-sans text-xs font-medium text-[#666666] border border-[#D6CFC4] bg-[#F7F5F0] px-2.5 py-1 rounded-full cursor-default"
                    >
                      {label}
                    </span>
                  )
                })()}
              </div>
              <h1 className="font-serif text-4xl leading-tight text-[#1A1A14]">
                {product.name}
              </h1>
            </div>

            <p className="font-sans text-2xl font-bold text-[#1E5631]">
              {product.price_range}
            </p>

            <p className="font-sans text-base leading-relaxed text-[#444]">
              {product.description}
            </p>

            <AddToCartButton product={product} />

            <p className="font-sans text-xs text-[#666] text-center">
              Free shipping across India · Made to order · Ships in 2 days
            </p>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/917483100651?text=Hi%2C%20I%27d%20like%20to%20order%20${encodeURIComponent(product.name)}%20from%20Healing%20Soil`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded border border-[#25D366] py-2.5 font-sans text-sm font-medium text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
        </div>

        {soapSquaresDetail && (
          <div className="mt-12 rounded-lg border border-[#D6CFC4] bg-white p-5 sm:p-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-[#C9A84C]">
                  {soapSquaresDetail.badge}
                </p>
                <h2 className="font-serif text-3xl leading-tight text-[#1A1A14]">
                  Pick the box by feel, not by comparing every soap.
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#666666]">
                  Each box includes four assorted Soap Squares from the selected base family.
                  We rotate the exact variants by the current batch, so you get variety without
                  needing to build a custom box.
                </p>

                <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ['4 Soap Squares', 'One kraft box'],
                    ['50g each', 'Mini handmade bars'],
                    ['200g total', 'Assorted variants'],
                  ].map(([term, desc]) => (
                    <div key={term} className="rounded border border-[#D6CFC4] bg-[#F7F5F0] p-3">
                      <dt className="font-sans text-sm font-bold text-[#1E5631]">{term}</dt>
                      <dd className="mt-1 font-sans text-xs text-[#666666]">{desc}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {soapSquaresBoxDetails.map((box) => {
                    const isActive = box.slug === canonicalSlug
                    return (
                      <Link
                        key={box.slug}
                        href={`/shop/${box.slug}`}
                        className={`rounded border p-3 transition-colors ${
                          isActive
                            ? 'border-[#1E5631] bg-[#E8F0EB]'
                            : 'border-[#D6CFC4] bg-white hover:border-[#1E5631]'
                        }`}
                      >
                        <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#C9A84C]">
                          {box.badge}
                        </p>
                        <p className="mt-1 font-serif text-xl leading-tight text-[#1A1A14]">
                          {box.shortLabel}
                        </p>
                        <p className="mt-1 font-sans text-xs leading-relaxed text-[#666666]">
                          {box.contents}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div>
                <p className="mb-3 font-sans text-sm font-semibold text-[#1A1A14]">
                  Possible colors and textures
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {soapSquaresDetail.supportImages.map((image) => (
                    <div
                      key={image.src}
                      className="relative aspect-square overflow-hidden rounded border border-[#D6CFC4] bg-[#F7F5F0]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 30vw, 160px"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 font-sans text-xs leading-relaxed text-[#666666]">
                  Images show real 50g Soap Square references. The exact mix may change with the
                  current batch, but the base family will match the box you choose.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients.length > 0 && (
          <div className="mt-12 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-4">Ingredients</h2>
            <ul className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => {
                const ingSlug = getIngredientSlug(ing)
                return ingSlug ? (
                  <li key={ing}>
                    <Link
                      href={`/ingredient/${ingSlug}`}
                      className="font-sans text-sm text-[#444] bg-white border border-[#D6CFC4] px-3 py-1 rounded-full hover:border-[#1E5631] hover:text-[#1E5631] transition-colors inline-block"
                    >
                      {ing}
                    </Link>
                  </li>
                ) : (
                  <li
                    key={ing}
                    className="font-sans text-sm text-[#444] bg-white border border-[#D6CFC4] px-3 py-1 rounded-full"
                  >
                    {ing}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* How it's made */}
        <div className="mt-10 border-t border-[#D6CFC4] pt-10">
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">How it is made</h2>
          <p className="font-sans text-base leading-relaxed text-[#444] max-w-2xl">
            {isSoapSquaresProduct(product)
              ? 'Made by hand in small batches on a farm in South Goa. Each Discovery Box is packed with four assorted 50g Soap Squares from the selected base family, wrapped and boxed for discovery, guest bathrooms, or gifting.'
              : `Made by hand in small batches on a farm in South Goa. We use a ${product.base.toLowerCase()} base, with herbs and botanicals grown on the farm or sourced from trusted suppliers. Scented with essential oils only, no synthetic fragrances.`}
          </p>
        </div>

        {/* Reviews */}
        {displayReviews.length > 0 && (
          <div className="mt-10 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-6">What customers say</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {displayReviews.map((r) => (
                <ReviewCard
                  key={r.id}
                  quote={r.comment}
                  name={r.author}
                  location={r.location}
                  occupation={r.occupation}
                  featured={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-10 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-6">
              More {product.base} soaps
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Comparison links */}
        {relevantComparisons.length > 0 && (
          <div className="mt-10 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-4">How does this compare?</h2>
            <ul className="space-y-2">
              {relevantComparisons.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.canonicalOverride ?? `/compare/${c.slug}`}
                    className="font-sans text-sm text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Supporting content */}
        {supportingLinks.length > 0 && (
          <div className="mt-10 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-4">Related reading</h2>
            <ul className="space-y-2">
              {supportingLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#1E5631] underline underline-offset-2 hover:text-[#C9A84C]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
    </>
  )
}
