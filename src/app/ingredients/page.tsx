import Link from 'next/link'

export const metadata = {
  title: 'Ingredients — Healing Soil',
  description:
    'Every ingredient in a Healing Soil soap is chosen deliberately. Coconut oil, shea butter, neem, goat milk, and more — here is what we use and why.',
  alternates: { canonical: '/ingredients' },
  openGraph: {
    title: 'Ingredients — Healing Soil',
    description: 'Every ingredient in a Healing Soil soap is chosen deliberately. Here is what we use and why.',
    url: '/ingredients',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Natural soap ingredients used by Healing Soil' }],
    type: 'website',
  },
}

const ingredients = [
  {
    name: 'Coconut Oil',
    description:
      'Creates a rich, cleansing lather and helps the bar stay firm. One of the most common base oils in handmade soap, known for its clean rinse.',
  },
  {
    name: 'Shea Butter',
    description:
      'A rich, nourishing oil pressed from the shea tree nut. Gives the bar a creamy feel and leaves the skin feeling soft after washing. Does not fully saponify, so some deposits on the skin during use.',
  },
  {
    name: 'Neem',
    description:
      'A traditional Indian botanical with a distinctive earthy scent. Used in Ayurvedic personal care for centuries. Adds a natural, herbal character to the bar.',
  },
  {
    name: 'Tulsi',
    description:
      'Holy basil, grown on our farm in South Goa. A familiar ingredient in Indian home remedies and traditional personal care. Has a fresh, slightly herbal fragrance.',
  },
  {
    name: 'Goat Milk',
    description:
      'Replaces water in the soap base, giving the bar a naturally creamy lather. Contains natural fats that feel gentle on the skin. Leaves a soft, comfortable feeling after washing.',
  },
  {
    name: 'Honey',
    description:
      'A natural humectant that gives the bar a smooth, slightly glossy quality. Contributes to the overall feel of the lather and is used in traditional personal care across many cultures.',
  },
  {
    name: 'Oats',
    description:
      'Finely milled oats add a gentle texture to the bar and give the lather a milky, soft quality. A long-standing ingredient in traditional personal care routines.',
  },
  {
    name: 'Kesar (Saffron)',
    description:
      'One of the most valued botanicals in Ayurveda. Used in traditional Indian personal care and known for its warm, distinctive colour and scent. A little goes a long way.',
  },
  {
    name: 'Haldi (Turmeric)',
    description:
      'Used in Indian households and personal care traditions for generations. Gives the bar a warm, golden colour and a subtle earthy scent. A staple of Ayurvedic practice.',
  },
  {
    name: 'Ginger',
    description:
      'Adds a warm, spicy note to the bar\'s scent. Used in traditional personal care for its invigorating quality. Gives the bar a distinctive, uplifting character.',
  },
  {
    name: 'Rosemary',
    description:
      'A hardy herb with a fresh, herbal scent. Used as a natural fragrance in the bar. Grown in home gardens and valued in traditional personal care across many cultures.',
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
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">

        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <h1 className="mb-4 font-serif text-5xl leading-tight text-[#1E5631]">
            What goes into every bar
          </h1>
          <p className="font-sans text-lg leading-relaxed text-[#666666]">
            We use a clean glycerin or goat milk base and add ingredients we know and trust.
            Here is what and why.
          </p>
        </div>

        {/* Ingredient grid */}
        <div className="mb-14 grid grid-cols-2 gap-5 md:grid-cols-3">
          {ingredients.map((item) => (
            <div
              key={item.name}
              className="rounded-lg border border-[#D6CFC4] bg-white p-5"
            >
              <h3 className="mb-2 font-serif text-xl text-[#1E5631]">{item.name}</h3>
              <p className="font-sans text-sm leading-relaxed text-[#666666]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
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

      </div>
    </div>
  )
}
