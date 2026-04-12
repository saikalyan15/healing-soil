import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/products'
import { reviewsForProduct } from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import AddToCartButton from '@/components/AddToCartButton'
import ProductImage from '@/components/ProductImage'
import ProductViewTracker from './ProductViewTracker'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const title = `${product.name} | Healing Soil, Goa`
  const description = `${product.description} Made by hand in South Goa. ${product.price_range}.`

  return {
    title,
    description,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      title,
      description,
      url: `/shop/${slug}`,
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

  const allProductReviews = reviewsForProduct(slug)
  const productReviews = allProductReviews.slice(0, 2)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url || undefined,
    brand: { '@type': 'Brand', name: 'Healing Soil' },
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
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 2,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
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
            minValue: 3,
            maxValue: 5,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5,
      bestRating: 5,
      worstRating: 1,
      reviewCount: allProductReviews.length,
    },
    review: productReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewBody: r.comment,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Shop', item: 'https://healingsoil.in/shop' },
      { '@type': 'ListItem', position: 2, name: product.name, item: `https://healingsoil.in/shop/${slug}` },
    ],
  }

  return (
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
              <span className="inline-block font-sans text-xs font-medium text-[#1E5631] bg-[#E8F0EB] px-2.5 py-1 rounded-full mb-3">
                {product.base} Base
              </span>
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

        {/* Ingredients */}
        {product.ingredients.length > 0 && (
          <div className="mt-12 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-4">Ingredients</h2>
            <ul className="flex flex-wrap gap-2">
              {product.ingredients.map((ing) => (
                <li
                  key={ing}
                  className="font-sans text-sm text-[#444] bg-white border border-[#D6CFC4] px-3 py-1 rounded-full"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* How it's made */}
        <div className="mt-10 border-t border-[#D6CFC4] pt-10">
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">How it is made</h2>
          <p className="font-sans text-base leading-relaxed text-[#444] max-w-2xl">
            Made by hand in small batches on a farm in South Goa. We use a {product.base.toLowerCase()} base,
            with herbs and botanicals grown on the farm or sourced from trusted suppliers.
            Scented with essential oils only, no synthetic fragrances.
          </p>
        </div>

        {/* Reviews */}
        {productReviews.length > 0 && (
          <div className="mt-10 border-t border-[#D6CFC4] pt-10">
            <h2 className="font-serif text-2xl text-[#1A1A14] mb-6">What customers say</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {productReviews.map((r) => (
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

      </div>
    </div>
  )
}
