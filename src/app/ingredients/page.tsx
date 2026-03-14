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
      'Creates a rich, cleansing lather that removes dirt without stripping the skin\'s natural oils. Its antibacterial properties make it especially good for acne-prone or sensitive skin.',
  },
  {
    name: 'Shea Butter',
    description:
      'Deeply moisturising and packed with fatty acids that repair the skin barrier. Leaves the skin soft and supple long after you step out of the shower.',
  },
  {
    name: 'Neem',
    description:
      'An ancient remedy for skin conditions — neem is antifungal, antibacterial, and anti-inflammatory. Particularly effective for oily skin, acne, and scalp health.',
  },
  {
    name: 'Tulsi',
    description:
      'Holy basil has powerful purifying properties that cleanse the skin deep in the pores. It also calms redness and helps even out skin tone with regular use.',
  },
  {
    name: 'Goat Milk',
    description:
      'Naturally rich in lactic acid, goat milk gently exfoliates dead skin cells and brightens the complexion. It is also intensely nourishing — ideal for dry or sensitive skin.',
  },
  {
    name: 'Honey',
    description:
      'A natural humectant that draws moisture into the skin and locks it in. Raw honey is also antibacterial, making it excellent for blemish-prone skin.',
  },
  {
    name: 'Oats',
    description:
      'Finely milled oats soothe irritated, itchy, or inflamed skin on contact. They form a protective film that calms the skin while providing gentle physical exfoliation.',
  },
  {
    name: 'Kesar (Saffron)',
    description:
      'One of the most prized skin ingredients in Ayurveda — saffron brightens the complexion and reduces pigmentation over time. A little goes a long way.',
  },
  {
    name: 'Haldi (Turmeric)',
    description:
      'Curcumin in turmeric is a potent anti-inflammatory and antioxidant that helps fade dark spots and even skin tone. Used in Indian skincare for centuries.',
  },
  {
    name: 'Ginger',
    description:
      'Stimulates circulation and helps remove toxins from the surface of the skin. Ginger\'s warming effect can help reduce puffiness and give the skin a healthy glow.',
  },
  {
    name: 'Rosemary',
    description:
      'Rich in antioxidants that protect the skin from environmental damage and slow the signs of ageing. Its natural fragrance is uplifting without being synthetic.',
  },
  {
    name: 'Loofah',
    description:
      'Natural loofah fibres provide physical exfoliation that removes dead skin and improves texture over time. Far gentler than synthetic scrubs and fully biodegradable.',
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
            We use a clean base — either glycerin or goat milk — and add ingredients we know and
            trust. Here is what and why.
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
