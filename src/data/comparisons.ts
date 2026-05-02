export type ComparisonPage = {
  slug: string
  title: string
  h1: string
  metaDescription: string
  subjectA: { name: string; slug: string; tagline: string; pros: string[]; feel: string }
  subjectB: { name: string; slug: string; tagline: string; pros: string[]; feel: string }
  verdict: string
  relatedProductsA: string[]  // product slugs filtered to base A
  relatedProductsB: string[]  // product slugs filtered to base B
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const comparisons: ComparisonPage[] = [
  {
    slug: 'glycerin-vs-goat-milk-soap',
    title: 'Glycerin vs Goat Milk Soap Base: Which to Choose?',
    h1: 'Glycerin vs Goat Milk Soap: A Simple Guide',
    metaDescription: 'Comparing glycerin and goat milk soap bases. Learn about the lather, feel, and which suits your skin type best. Handmade in Goa.',
    subjectA: {
      name: 'Glycerine Base',
      slug: 'glycerin-soap',
      tagline: 'Light and cleansing with a clear finish.',
      pros: ['Retains natural glycerin', 'Light, gentle lather', 'Suitable for oily and normal skin'],
      feel: 'Clean and light'
    },
    subjectB: {
      name: 'Goat Milk Base',
      slug: 'goat-milk-soap',
      tagline: 'Creamy and nourishing with natural fats.',
      pros: ['Creamy, soft lather', 'Rich in natural vitamins', 'Suitable for sensitive skin'],
      feel: 'Soft and creamy'
    },
    verdict: 'If you prefer a light wash that leaves skin feeling clean without heaviness, glycerin is a practical choice. If you want a creamier lather and a more nourishing feel, goat milk is traditionally preferred for sensitive or dry skin.',
    relatedProductsA: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap', 'pomegranate-glycerine'],
    relatedProductsB: ['neem-tulsi-goatmilk-soap', 'kesar-haldi-goat-milk-soap', 'honey-and-oats-goatmilk-soap', 'orange-goatmilk-soap'],
    faqs: [
      {
        q: 'Is glycerin soap better for oily skin?',
        a: 'Glycerin soap is a humectant that draws moisture to the skin without adding heavy oils, making it a suitable choice for oily or combination skin types.'
      },
      {
        q: 'Is goat milk soap suitable for sensitive skin?',
        a: 'Yes, goat milk soap is traditionally used in personal care for its gentle nature and creamy texture, which many people with sensitive skin find agreeable.'
      },
      {
        q: 'Which one lathers more?',
        a: 'Glycerin soap typically produces a lighter, bubbly lather, while goat milk soap produces a denser, creamier lather due to the natural fats in the milk.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'goat-milk-vs-shea-butter-soap',
    title: 'Goat Milk vs Shea Butter Soap: Comparing the Bases',
    h1: 'Goat Milk vs Shea Butter: Choosing Your Soap Base',
    metaDescription: 'Understand the difference between goat milk and shea butter soap. Compare the texture, conditioning properties, and skin feel.',
    subjectA: {
      name: 'Goat Milk Base',
      slug: 'goat-milk-soap',
      tagline: 'Versatile and gentle daily care.',
      pros: ['Soft, creamy lather', 'Naturally occurring vitamins', 'Suitable for most skin types'],
      feel: 'Nourishing'
    },
    subjectB: {
      name: 'Shea Butter Base',
      slug: 'shea-butter-soap',
      tagline: 'Intensive conditioning for dry skin.',
      pros: ['Rich conditioning feel', 'High in natural fats', 'Suitable for mature or very dry skin'],
      feel: 'Very rich'
    },
    verdict: 'Goat milk is an excellent all-rounder for daily use on sensitive skin. Shea butter is the richer option, providing a more intensive conditioning feel that is helpful when skin feels particularly dry or tight.',
    relatedProductsA: ['neem-tulsi-goatmilk-soap', 'kesar-haldi-goat-milk-soap', 'rice-rose-goatmilk-soap', 'pomegranate-goatmilk-soap'],
    relatedProductsB: ['sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Which is better for very dry skin?',
        a: 'Shea butter soap has a higher fat content that remains on the skin after washing, providing a more moisturising feel for very dry skin.'
      },
      {
        q: 'Can I use goat milk soap every day?',
        a: 'Yes, goat milk soap is gentle enough for daily use on the face and body and is traditionally used for its mild cleansing properties.'
      },
      {
        q: 'Do these soaps contain SLS?',
        a: 'No, all Healing Soil soap bases are made without SLS or parabens, relying on traditional soap-making methods for their lather.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'shea-butter-vs-glycerin-soap',
    title: 'Shea Butter vs Glycerin Soap: Rich vs Light',
    h1: 'Shea Butter vs Glycerin: A Comparison',
    metaDescription: 'Comparing the richness of shea butter with the lightness of glycerin soap. Find the right balance for your daily wash.',
    subjectA: {
      name: 'Shea Butter Base',
      slug: 'shea-butter-soap',
      tagline: 'The richest base for a conditioning wash.',
      pros: ['Leaves a moisturising feel', 'Rich, dense lather', 'Suitable for dry patches'],
      feel: 'Conditioning'
    },
    subjectB: {
      name: 'Glycerine Base',
      slug: 'glycerin-soap',
      tagline: 'The lightest base for a clean feel.',
      pros: ['Retains natural moisture', 'Rinses clean easily', 'Suitable for all skin types'],
      feel: 'Light'
    },
    verdict: 'These two bases sit at opposite ends of the feel spectrum. Shea butter is for those who want their soap to leave a conditioning layer behind. Glycerin is for those who want a simple, light wash that cleans without residue.',
    relatedProductsA: ['sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    relatedProductsB: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap'],
    faqs: [
      {
        q: 'Does glycerin soap dry out skin?',
        a: 'Glycerin is a natural humectant that helps retain moisture. When made without harsh detergents like SLS, glycerin soap is a gentle choice that does not strip the skin.'
      },
      {
        q: 'Is shea butter soap heavy?',
        a: 'Shea butter soap has a richer feel than other bases, but it is designed to rinse away cleanly while leaving a soft, conditioned feel on the skin.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'neem-vs-tulsi-soap',
    title: 'Neem vs Tulsi Soap: Traditional Ayurvedic Ingredients',
    h1: 'Neem vs Tulsi: Which One for Your Skin?',
    metaDescription: 'Comparing two farm-grown favorites: Neem and Tulsi. Learn about their traditional uses in handmade soap. Made in Goa.',
    subjectA: {
      name: 'Neem',
      slug: 'ingredient/neem',
      tagline: 'A traditional staple for skin care.',
      pros: ['Earthy, natural scent', 'Traditionally used in India', 'Farm-grown in Goa'],
      feel: 'Clean and fresh'
    },
    subjectB: {
      name: 'Tulsi',
      slug: 'ingredient/tulsi',
      tagline: 'The "Holy Basil" of personal care.',
      pros: ['Herbaceous, natural scent', 'Traditionally used in Ayurveda', 'Sun-dried on our farm'],
      feel: 'Herbaceous and clean'
    },
    verdict: 'Neem and Tulsi are often used together because they complement each other well. Neem is traditionally used for its cleansing properties, while Tulsi is valued for its herbaceous presence in Ayurvedic personal care.',
    relatedProductsA: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    relatedProductsB: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'Where do you source your Neem and Tulsi?',
        a: 'Both Neem and Tulsi are grown on our farm in South Goa, harvested by hand, and sun-dried before being added to our soap batches.'
      },
      {
        q: 'Are these soaps suitable for sensitive skin?',
        a: 'Yes, both are available in our goat milk and glycerin bases, both of which are suitable for sensitive skin and free from SLS.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'honey-vs-oats-soap',
    title: 'Honey vs Oats Soap: Smooth vs Textured',
    h1: 'Honey vs Oats: Choosing Your Gentle Soap',
    metaDescription: 'Comparing the moisturising feel of honey with the gentle texture of oats. Learn how these ingredients behave in handmade soap.',
    subjectA: {
      name: 'Honey',
      slug: 'ingredient/honey',
      tagline: 'Natural humectant for a soft wash.',
      pros: ['Draws moisture to skin', 'Mild, sweet scent', 'Smooth texture'],
      feel: 'Moisturising'
    },
    subjectB: {
      name: 'Oats',
      slug: 'ingredient/oats',
      tagline: 'Gentle texture for a mild wash.',
      pros: ['Mildly textured feel', 'Traditionally used for skin', 'Soothing presence'],
      feel: 'Textured and soft'
    },
    verdict: 'Honey is ideal if you want a smooth bar that leaves skin feeling moisturised. Oats provide a very mild texture to the wash that many find helpful for a thorough yet gentle clean.',
    relatedProductsA: ['honey-and-oats-goatmilk-soap', 'honey-oats-glycerin-soap', 'honey-kesar-haldi-sheabutter-soap'],
    relatedProductsB: ['honey-and-oats-goatmilk-soap', 'honey-oats-glycerin-soap'],
    faqs: [
      {
        q: 'Do you use real honey?',
        a: 'Yes, we use real honey in our batches, valued for its natural humectant properties that help keep skin feeling soft.'
      },
      {
        q: 'Are the oats scratchy?',
        a: 'No, the oats are finely processed to provide a very gentle textured feel that is suitable for sensitive skin.'
      }
    ],
    publishedAt: '2026-05-02'
  }
]
