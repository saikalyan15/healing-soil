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
  },
  {
    slug: 'neem-tulsi-vs-kesar-haldi-soap',
    title: 'Neem Tulsi vs Kesar Haldi Soap: Two Ayurvedic Favourites',
    h1: 'Neem Tulsi vs Kesar Haldi: Choosing Your Soap',
    metaDescription: 'Comparing two traditional Ayurvedic blends. Learn the difference between the earthy feel of Neem Tulsi and the warm presence of Kesar Haldi.',
    subjectA: {
      name: 'Neem & Tulsi',
      slug: 'ingredient/neem',
      tagline: 'Farm-grown herbs combined for a traditional wash. This blend pairs the earthy presence of neem with the herbaceous scent of tulsi.',
      pros: ['Uses farm-grown Goa herbs', 'Earthy and herbal scent', 'Traditionally used in Indian care'],
      feel: 'Earthy and herbal'
    },
    subjectB: {
      name: 'Kesar & Haldi',
      slug: 'ingredient/kesar',
      tagline: 'Warm and golden ingredients from Ayurvedic tradition. Kesar and haldi are valued for their gentle feel and traditional presence in personal care.',
      pros: ['Warm Ayurvedic tradition', 'Natural golden colour', 'Gentle feel on skin'],
      feel: 'Warm and golden'
    },
    verdict: 'The choice between these two depends on the experience you prefer. Neem and tulsi offer an earthy, herbaceous wash that feels grounded and fresh. Kesar and haldi provide a warmer, more traditional feel that many find gentle for daily use. Both are available in our goat milk and glycerin bases.',
    relatedProductsA: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    relatedProductsB: ['kesar-haldi-goat-milk-soap', 'sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Which one is better for daily use?',
        a: 'Both blends are gentle enough for daily use on the face and body. The choice often comes down to whether you prefer an earthy or a warm scent profile.'
      },
      {
        q: 'Do these soaps have synthetic colours?',
        a: 'No, the colours come from the natural ingredients themselves. The golden hue of the kesar and haldi bars is derived from the traditional botanicals used in the batch.'
      },
      {
        q: 'Are the herbs farm-grown?',
        a: 'Our neem and tulsi are grown on our farm in South Goa. We harvest and sun-dry them by hand before they are added to our small-batch soap orders.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'ginger-rosemary-vs-neem-tulsi-soap',
    title: 'Ginger Rosemary vs Neem Tulsi Soap: Scent and Feel Compared',
    h1: 'Ginger Rosemary vs Neem Tulsi: Which Scent is Right for You?',
    metaDescription: 'Comparing the uplifting Ginger Rosemary blend with the earthy Neem Tulsi. Find the right scent profile for your morning routine.',
    subjectA: {
      name: 'Ginger & Rosemary',
      slug: 'ingredient/ginger',
      tagline: 'An uplifting and aromatic combination. The warmth of ginger pairs with the fresh, woody notes of rosemary for an invigorating wash.',
      pros: ['Uplifting aromatic scent', 'Warming feel on skin', 'Invigorating morning wash'],
      feel: 'Warm and aromatic'
    },
    subjectB: {
      name: 'Neem & Tulsi',
      slug: 'ingredient/neem',
      tagline: 'Farm-grown herbs combined for a traditional wash. This blend pairs the earthy presence of neem with the herbaceous scent of tulsi.',
      pros: ['Uses farm-grown Goa herbs', 'Earthy and herbal scent', 'Traditionally used in Indian care'],
      feel: 'Earthy and herbal'
    },
    verdict: 'Ginger and rosemary provide an aromatic, uplifting experience that is excellent for a morning shower. Neem and tulsi offer a more grounded, traditional wash with an earthy scent profile. Both options provide a gentle lather that cleans without stripping the skin.',
    relatedProductsA: ['ginger-rosemary-glycerin-soap'],
    relatedProductsB: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'Does ginger feel spicy on the skin?',
        a: 'The ginger provides a mild warming sensation rather than a spicy one. It contributes to an invigorating feel during the wash without being harsh.'
      },
      {
        q: 'Is rosemary good for the hair?',
        a: 'Rosemary is traditionally valued in personal care for its clean, woody scent. While our bars are primarily for the body and face, many people enjoy the aromatic presence of rosemary in their routine.'
      },
      {
        q: 'Which one is more traditional?',
        a: 'Neem and tulsi are staples of traditional Ayurvedic personal care in India. Ginger and rosemary offer a more contemporary aromatic profile while still using natural ingredients.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'honey-oats-vs-kesar-haldi-soap',
    title: 'Honey Oats vs Kesar Haldi Soap: Smooth vs Warm',
    h1: 'Honey Oats vs Kesar Haldi: Two Gentle Choices',
    metaDescription: 'Comparing the smooth, moisturising feel of Honey Oats with the warm tradition of Kesar Haldi. Both suitable for sensitive skin.',
    subjectA: {
      name: 'Honey & Oats',
      slug: 'ingredient/honey',
      tagline: 'A smooth and moisturising combination. Honey acts as a natural humectant while finely processed oats provide a very gentle texture.',
      pros: ['Honey as a natural humectant', 'Gentle texture from oats', 'Softening feel after wash'],
      feel: 'Smooth and moisturising'
    },
    subjectB: {
      name: 'Kesar & Haldi',
      slug: 'ingredient/kesar',
      tagline: 'Warm and golden ingredients from Ayurvedic tradition. Kesar and haldi are valued for their gentle feel and traditional presence in personal care.',
      pros: ['Warm Ayurvedic tradition', 'Natural golden colour', 'Gentle feel on skin'],
      feel: 'Warm and golden'
    },
    verdict: 'Honey and oats are ideal if you prefer a bar with a very mild texture and a moisturising feel. Kesar and haldi are for those who value traditional Ayurvedic ingredients and a warm, smooth wash. Both are excellent choices for those seeking a gentle alternative to commercial soap.',
    relatedProductsA: ['honey-oats-glycerin-soap', 'honey-and-oats-goatmilk-soap'],
    relatedProductsB: ['kesar-haldi-goat-milk-soap', 'sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Is the honey real?',
        a: 'Yes, we use real honey in our soap batches. It is valued for its natural humectant properties, which help to draw moisture to the skin.'
      },
      {
        q: 'Are the oats scratchy?',
        a: 'No, the oats are finely processed to ensure they provide a gentle, soft texture rather than a scratchy one. They are suitable for sensitive skin.'
      },
      {
        q: 'Which one smells sweeter?',
        a: 'Honey and oats have a very mild, naturally sweet scent. Kesar and haldi have a warmer, more herbaceous and earthy aromatic profile.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'pomegranate-vs-orange-soap',
    title: 'Pomegranate vs Orange Soap: Two Fruit Ingredients Compared',
    h1: 'Pomegranate vs Orange Soap: Which Fruit Ingredient to Choose?',
    metaDescription: 'Comparing the rich feel of pomegranate with the bright scent of orange. Learn how these fruit-based ingredients behave in handmade soap.',
    subjectA: {
      name: 'Pomegranate',
      slug: 'ingredient/pomegranate',
      tagline: 'A rich and deep ingredient for a nourishing wash. Pomegranate is valued for its presence in traditional care and its contribution to a dense lather.',
      pros: ['Rich and nourishing feel', 'Deep and natural presence', 'Gentle on all skin types'],
      feel: 'Rich and deep'
    },
    subjectB: {
      name: 'Orange',
      slug: 'ingredient/orange',
      tagline: 'A bright and fresh citrus experience. Orange oil provides a natural, uplifting scent that makes for a refreshing wash.',
      pros: ['Natural citrus scent', 'Fresh and clean feel', 'Uplifting morning wash'],
      feel: 'Bright and fresh'
    },
    verdict: 'Pomegranate is the choice for those who want a richer, more grounded feel during their wash. Orange is ideal for those who prefer a bright, citrusy scent to start their day. Both are available in our nourishing goat milk base, providing a creamy lather.',
    relatedProductsA: ['pomegranate-glycerine', 'pomegranate-goatmilk-soap'],
    relatedProductsB: ['orange-goatmilk-soap'],
    faqs: [
      {
        q: 'Do these soaps use synthetic scents?',
        a: 'No, the scents come from natural oils and ingredients. The orange bar uses natural citrus oil for its bright and fresh aromatic profile.'
      },
      {
        q: 'Is pomegranate good for the face?',
        a: 'Yes, our pomegranate bars are gentle enough for use on both the face and the body, providing a nourishing feel without being heavy.'
      },
      {
        q: 'Which one lathers more?',
        a: 'Both ingredients are used in bases that produce a creamy, soft lather. The pomegranate in goat milk base provides a particularly dense and soft foam.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'handmade-vs-commercial-soap',
    title: 'Handmade vs Commercial Soap: What Is the Difference?',
    h1: 'Handmade vs Commercial Soap: What Changes When You Switch',
    metaDescription: 'Learn why handmade soap feels different on your skin. We compare natural glycerin retention and SLS-free bases with commercial detergent bars.',
    subjectA: {
      name: 'Handmade Soap',
      slug: '',
      tagline: 'Traditionally made in small batches. These bars retain natural glycerin and use SLS-free bases for a wash that feels soft and conditioning.',
      pros: ['Retains natural glycerin', 'No SLS or synthetic fragrance', 'Made in small batches in Goa'],
      feel: 'Soft and conditioning'
    },
    subjectB: {
      name: 'Commercial Soap',
      slug: '',
      tagline: 'Mass-produced for a long shelf life. Often classified as detergent bars, these use SLS for fast foam and typically remove natural glycerin.',
      pros: ['Widely available', 'Consistent fast lather', 'Very long shelf life'],
      feel: 'Clean but stripping'
    },
    verdict: 'The primary difference between the two is glycerin. Commercial manufacturers typically remove the natural glycerin to sell separately, replacing it with SLS for lather. Handmade soap keeps the glycerin in the bar, providing a humectant wash that leaves skin feeling soft rather than stripped.',
    relatedProductsA: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap', 'pomegranate-glycerine', 'neem-tulsi-goatmilk-soap', 'kesar-haldi-goat-milk-soap', 'honey-and-oats-goatmilk-soap', 'orange-goatmilk-soap', 'rice-rose-goatmilk-soap', 'pomegranate-goatmilk-soap', 'sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    relatedProductsB: [],
    faqs: [
      {
        q: 'Why does handmade soap feel different?',
        a: 'Handmade soap feels different because it still contains natural glycerin. Glycerin is a humectant that draws moisture to the skin, which is why your skin feels soft after washing instead of tight.'
      },
      {
        q: 'Is the lather weaker in handmade soap?',
        a: 'The lather is different but not weaker. Commercial soap uses SLS to create an aggressive, airy foam, while handmade soap produces a creamier, denser lather from natural oils.'
      },
      {
        q: 'Why is commercial soap cheaper?',
        a: 'Commercial soap is mass-produced using inexpensive synthetic detergents and the valuable glycerin is removed to be sold separately. Handmade soap uses higher-quality bases and retains all its natural benefits.'
      },
      {
        q: 'Does handmade soap last as long?',
        a: 'If kept dry between uses, a handmade bar can last as long as a commercial one. Because they are rich in glycerin, they should not be left sitting in a pool of water.'
      }
    ],
    publishedAt: '2026-05-02'
  }
]
