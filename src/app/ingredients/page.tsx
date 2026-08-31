import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'
import { COMMERCE_ENABLED } from '@/lib/site-mode'
import WhatsAppNudge from '@/components/WhatsAppNudge'

export const metadata = buildMetadata({
  title: 'Soap Ingredients: What Goes Into Every Bar',
  description:
    'Every ingredient in a Healing Soil soap is chosen deliberately. Glycerin, goat milk, shea butter, neem, tulsi, kesar and more, and what each one does to the bar.',
  canonical: '/ingredients',
  images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Natural soap ingredients used by Healing Soil' }],
})

const ingredients = [
  {
    name: 'Coconut Oil',
    description:
      'Creates a rich, cleansing lather and helps the bar stay firm. One of the most common base oils in handmade soap, known for its clean rinse.',
  },
  {
    name: 'Glycerin',
    slug: 'glycerin',
    description:
      'A natural byproduct of the soap-making process. Most commercial makers extract it and sell it separately; we keep it in the bar, which gives it a moisturising feel and a light, clean rinse.',
  },
  {
    name: 'Shea Butter',
    slug: 'shea-butter',
    description:
      'A rich, nourishing oil pressed from the shea tree nut. Gives the bar a creamy feel and leaves the skin feeling soft after washing. Does not fully saponify, so some deposits on the skin during use.',
  },
  {
    name: 'Neem',
    slug: 'neem',
    description:
      'A traditional Indian botanical with a distinctive earthy scent. Used in Ayurvedic personal care for centuries. Adds a natural, herbal character to the bar.',
  },
  {
    name: 'Tulsi',
    slug: 'tulsi',
    description:
      'Holy basil, grown on our farm in South Goa. A familiar ingredient in Indian home remedies and traditional personal care. Has a fresh, slightly herbal fragrance.',
  },
  {
    name: 'Goat Milk',
    slug: 'goat-milk',
    description:
      'Replaces water in the soap base, giving the bar a naturally creamy lather. Contains natural fats that feel gentle on the skin. Leaves a soft, comfortable feeling after washing.',
  },
  {
    name: 'Honey',
    slug: 'honey',
    description:
      'A natural humectant that gives the bar a smooth, slightly glossy quality. Contributes to the overall feel of the lather and is used in traditional personal care across many cultures.',
  },
  {
    name: 'Oats',
    slug: 'oats',
    description:
      'Finely milled oats add a gentle texture to the bar and give the lather a milky, soft quality. A long-standing ingredient in traditional personal care routines.',
  },
  {
    name: 'Kesar (Saffron)',
    slug: 'kesar',
    description:
      'One of the most valued botanicals in Ayurveda. Used in traditional Indian personal care and known for its warm, distinctive colour and scent. A little goes a long way.',
  },
  {
    name: 'Haldi (Turmeric)',
    slug: 'haldi',
    description:
      'Used in Indian households and personal care traditions for generations. Gives the bar a warm, golden colour and a subtle earthy scent. A staple of Ayurvedic practice.',
  },
  {
    name: 'Ginger',
    slug: 'ginger',
    description:
      'Adds a warm, spicy note to the bar\'s scent. Used in traditional personal care for its invigorating quality. Gives the bar a distinctive, uplifting character.',
  },
  {
    name: 'Rosemary',
    slug: 'rosemary',
    description:
      'A hardy herb with a fresh, herbal scent. Used as a natural fragrance in the bar. Grown in home gardens and valued in traditional personal care across many cultures.',
  },
  {
    name: 'Rose',
    slug: 'rose',
    description:
      'Pure rose essential oil, never synthetic fragrance. Gives the bar a delicate floral scent. A botanical used in personal care traditions across many cultures.',
  },
  {
    name: 'Pomegranate',
    slug: 'pomegranate',
    description:
      'Sun-dried peel, ground and worked into the bar. Gives a deep natural colour and a lightly textured side. The part of the fruit most people throw away.',
  },
  {
    name: 'Orange',
    slug: 'orange',
    description:
      'Adds a bright citrus note to the bar. A fresh, uplifting scent that sits well in a lighter glycerin base.',
  },
  {
    name: 'Loofah',
    description:
      'A natural plant fibre embedded in the bar. Gives the soap a textured surface for a thorough wash. Fully plant-derived and biodegradable.',
  },
]

export default function IngredientsPage() {
  return (
    <div className="bg-[#F7F5F0]">
      {/* An <article> rather than a bare <div>: this page was being crawled but
          not indexed, and a link grid with no article semantics is a likely part
          of why. */}
      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6">

        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <h1 className="mb-4 font-serif text-5xl leading-tight text-[#1E5631]">
            What goes into every bar
          </h1>
          <p className="mb-4 font-sans text-lg leading-relaxed text-[#666666]">
            We use a clean glycerin, goat milk or shea butter base and add ingredients we know
            and trust. Here is what and why.
          </p>
          <p className="font-sans text-base leading-relaxed text-[#666666]">
            Every bar is made to order in small batches on our farm in South Goa, with no SLS,
            no parabens and no synthetic fragrance. Some ingredients, like neem, tulsi and
            lemongrass, are grown on the farm itself. Others, like shea butter and the soap
            bases, are sourced, and we would rather say so than pretend otherwise.
          </p>
        </div>

        {/* Ingredient grid */}
        <div className="mb-14 grid grid-cols-2 gap-5 md:grid-cols-3">
          {ingredients.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-[#D6CFC4] bg-white p-5"
            >
              <h3 className="mb-2 font-serif text-xl text-[#1E5631]">
                {item.slug && COMMERCE_ENABLED ? (
                  <Link href={`/ingredient/${item.slug}`} className="hover:underline">
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#666666]">
                {item.description}
              </p>
              {item.slug && COMMERCE_ENABLED && (
                <Link
                  href={`/ingredient/${item.slug}`}
                  className="mt-2 inline-block font-sans text-xs font-medium text-[#C9A84C] hover:underline"
                >
                  Read more →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        {COMMERCE_ENABLED ? (
          <div className="border-t border-[#D6CFC4] pt-10 text-center">
            <p className="mb-5 font-sans text-base text-[#1A1A14]">
              Every soap shows exactly which ingredients are in it.
            </p>
            <Link
              href="/shop"
              className="inline-block rounded bg-[#1E5631] px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
            >
              Shop by ingredient
            </Link>
          </div>
        ) : (
          <div className="border-t border-[#D6CFC4] pt-10">
            <WhatsAppNudge source="ingredients_page" />
          </div>
        )}

      </article>
    </div>
  )
}
