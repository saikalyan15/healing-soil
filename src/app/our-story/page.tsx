import Image from 'next/image'
import Link from 'next/link'
import ReviewCard from '@/components/ReviewCard'

export const metadata = {
  title: 'Our Story — Healing Soil',
  description:
    'From Bangalore to a farm in South Goa: how Healing Soil began and why we make soap the way we do.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    title: 'Our Story — Healing Soil',
    description: 'From Bangalore to a farm in South Goa: how Healing Soil began and why we make soap the way we do.',
    url: '/our-story',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Deepanjali, founder of Healing Soil' }],
    type: 'website',
  },
}

export default function OurStoryPage() {
  return (
    <div className="bg-[#F7F5F0]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">

        {/* Heading */}
        <h1 className="mb-10 font-serif text-5xl leading-tight text-[#1E5631]">
          From the city to the farm
        </h1>

        {/* Intro with founder photo */}
        <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-start">
          <p className="flex-1 font-sans text-lg leading-relaxed text-[#1A1A14]">
            We moved from Bangalore to a farm in South Goa in September 2023. What started as a
            search for slower, quieter living turned into something we did not expect: making soap.
            The land, the pace, and the ingredients around us made it feel inevitable.
          </p>
          <div className="flex-shrink-0 self-start sm:self-auto">
            <Image
              src="/founder.jpg"
              alt="Deepanjali, founder of Healing Soil"
              width={280}
              height={280}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Section 1 — The farm */}
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">The farm</h2>
          <p className="font-sans text-base leading-relaxed text-[#1A1A14]">
            We grow vegetables and tend to the land. The same ingredients that go into our kitchen
            go into our soaps. Neem from our tree. Herbs from our garden. When you hold a bar of
            Healing Soil soap, you are holding something that came from the same soil we walk on
            every morning.
          </p>
        </section>

        {/* Lisha's review — between Section 1 (farm) and Section 2 (chemicals) */}
        <div className="mb-12">
          <ReviewCard
            quote="I absolutely love your handmade soaps. They are not just beautiful but genuinely high in quality and gentle on the skin. What makes Healing Soil soaps even better is the thoughtful approach towards reducing plastic and mindful waste. It truly reflects your values, and that makes your products even more meaningful and worth supporting. I am for sure going to be your loyal customer and I have strongly recommended your soaps to my friends as well."
            name="Lisha"
            location="Bangalore"
            featured={true}
          />
        </div>

        {/* Section 2 — Why no chemicals */}
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Why no chemicals</h2>
          <p className="font-sans text-base leading-relaxed text-[#1A1A14]">
            Commercial soaps strip the skin. They are detergents with fragrance, not soap. We use
            glycerin and goat milk bases, then add real ingredients. Nothing synthetic. Nothing
            harsh. Your skin knows the difference. Once you switch, it is very hard to go back.
          </p>
        </section>

        {/* Section 3 — Made to order */}
        <section className="mb-14">
          <h2 className="mb-4 font-serif text-3xl text-[#1E5631]">Made to order</h2>
          <p className="font-sans text-base leading-relaxed text-[#1A1A14]">
            We do not stock shelves. Every bar is made after you order it. That means it is fresh,
            it is made for you, and we never waste. Small batch, slow process, made by hand. That
            is the only way we know how to do it.
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="inline-block rounded bg-[#1E5631] px-7 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
          >
            Shop Our Soaps
          </Link>
          <Link
            href="/ingredients"
            className="inline-block rounded border border-[#1E5631] px-7 py-3 font-sans text-sm font-medium text-[#1E5631] transition-colors hover:bg-[#1E5631] hover:text-white"
          >
            Read about our ingredients
          </Link>
        </div>

      </div>
    </div>
  )
}
