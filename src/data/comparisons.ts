export type ComparisonPage = {
  slug: string
  title: string
  h1: string
  metaDescription: string
  canonicalOverride?: string  // if set, rel=canonical points here instead of /compare/[slug]
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
    title: 'Glycerin vs Goat Milk Soap Base: Side-by-Side for Your Skin Type',
    h1: 'Glycerin vs Goat Milk Soap Base: Pick the Right One for Your Skin',
    metaDescription: 'Goat milk base is creamier, with natural fats. Glycerin base is lighter and rinses clean. Which suits your skin, compared here. Handmade in Goa, no SLS.',
    canonicalOverride: '/blog/glycerin-vs-goat-milk-soap',
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
    relatedProductsA: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap', 'pomegranate-glycerin-soap'],
    relatedProductsB: ['neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap', 'honey-oats-goat-milk-soap', 'orange-goat-milk-soap'],
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
    title: 'Goat Milk vs Shea Butter Soap Base: Dry or Sensitive Skin?',
    h1: 'Goat Milk vs Shea Butter Soap Base: Choosing the Right Bar',
    metaDescription: 'Goat milk is creamy and gentle. Shea butter is richer for dry skin. Compare lather, feel, and skin type fit before choosing your soap.',
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
    relatedProductsA: ['neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap', 'rice-rose-goat-milk-soap', 'pomegranate-goat-milk-soap'],
    relatedProductsB: ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap'],
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
    title: 'Shea Butter vs Glycerin Soap: Which Base Should You Use?',
    h1: 'Shea Butter vs Glycerin Soap Base: Pick the Right One',
    metaDescription: 'Shea butter base is rich and leaves a conditioning feel. Glycerin base is lighter and rinses clean. They sit at opposite ends of the feel spectrum. Handmade in Goa.',
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
    relatedProductsA: ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap'],
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
    relatedProductsA: ['neem-tulsi-goat-milk-soap', 'neem-tulsi-glycerin-soap'],
    relatedProductsB: ['neem-tulsi-goat-milk-soap', 'neem-tulsi-glycerin-soap'],
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
    relatedProductsA: ['honey-oats-goat-milk-soap', 'honey-oats-glycerin-soap', 'honey-kesar-haldi-shea-butter-soap'],
    relatedProductsB: ['honey-oats-goat-milk-soap', 'honey-oats-glycerin-soap'],
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
    relatedProductsA: ['neem-tulsi-goat-milk-soap', 'neem-tulsi-glycerin-soap'],
    relatedProductsB: ['kesar-haldi-goat-milk-soap', 'shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap'],
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
    relatedProductsB: ['neem-tulsi-goat-milk-soap', 'neem-tulsi-glycerin-soap'],
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
    relatedProductsA: ['honey-oats-glycerin-soap', 'honey-oats-goat-milk-soap'],
    relatedProductsB: ['kesar-haldi-goat-milk-soap', 'shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap'],
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
    relatedProductsA: ['pomegranate-glycerin-soap', 'pomegranate-goat-milk-soap'],
    relatedProductsB: ['orange-goat-milk-soap'],
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
    relatedProductsA: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap', 'pomegranate-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap', 'honey-oats-goat-milk-soap', 'orange-goat-milk-soap', 'rice-rose-goat-milk-soap', 'pomegranate-goat-milk-soap', 'shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap'],
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
  },
  {
    slug: 'sheep-milk-vs-goat-milk-soap',
    title: 'Sheep Milk vs Goat Milk Soap: What Is the Difference?',
    h1: 'Sheep Milk vs Goat Milk Soap: A Simple Comparison',
    metaDescription: 'Comparing sheep milk and goat milk soap bases. Learn about the fat content, lather, and feel of each, and which suits your skin type.',
    subjectA: {
      name: 'Goat Milk Base',
      slug: 'goat-milk-soap',
      tagline: 'Widely available and gentle for everyday use.',
      pros: ['Creamy, soft lather', 'Naturally occurring vitamins and fats', 'Suitable for sensitive skin'],
      feel: 'Soft and nourishing'
    },
    subjectB: {
      name: 'Sheep Milk Base',
      slug: '',
      tagline: 'Richer in fat content, less commonly found.',
      pros: ['Higher fat content than goat milk', 'Very creamy texture', 'Traditional use in some European soaps'],
      feel: 'Very rich and creamy'
    },
    verdict: 'Both goat milk and sheep milk soap are gentle alternatives to standard commercial bars. Sheep milk has a slightly higher fat content, which can make the bar feel richer. Goat milk is more commonly used in Indian handmade soap and is widely recognised for its gentle, nourishing lather. Our soaps use a goat milk base sourced for quality and consistency.',
    relatedProductsA: ['neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap', 'honey-oats-goat-milk-soap', 'orange-goat-milk-soap', 'rice-rose-goat-milk-soap', 'pomegranate-goat-milk-soap'],
    relatedProductsB: [],
    faqs: [
      {
        q: 'Is sheep milk soap better than goat milk soap?',
        a: 'Both are gentle and nourishing. Sheep milk has a higher fat content, which can make the lather feel richer. Goat milk is more widely used and equally gentle for sensitive skin.'
      },
      {
        q: 'Do you sell sheep milk soap?',
        a: 'We use a goat milk base in our handmade bars. Goat milk is well-suited to Indian skin types and is available throughout our range in combination with ingredients like neem, tulsi, kesar, and honey.'
      },
      {
        q: 'Is goat milk soap suitable for sensitive skin?',
        a: 'Yes, goat milk soap is traditionally used for its gentle nature. Our goat milk bars are free from SLS and synthetic fragrance, making them suitable for sensitive skin types.'
      }
    ],
    publishedAt: '2026-05-16'
  },
  {
    slug: 'loofah-soap-vs-regular-soap',
    title: 'Loofah Soap vs Regular Soap: Texture or Smooth Daily Wash?',
    h1: 'Loofah Soap vs Regular Soap: Which One Should You Use?',
    metaDescription: 'Loofah soap adds natural texture for feet, elbows, and knees. Regular soap is smoother for daily full-body use. Compare both before choosing.',
    subjectA: {
      name: 'Loofah Soap',
      slug: 'loofah-soap',
      tagline: 'A textured body bar with a natural loofah slice inside. Best used where you want more grip and a more thorough-feeling wash.',
      pros: ['Natural loofah texture', 'Useful for feet, elbows, and knees', 'No separate scrub accessory needed'],
      feel: 'Textured and scrubby'
    },
    subjectB: {
      name: 'Regular Soap',
      slug: '',
      tagline: 'A smooth bar for everyday full-body washing. Better when you want a gentler, simpler bath bar without added texture.',
      pros: ['Smooth daily wash', 'Easy to use on most body areas', 'Available in glycerin, goat milk, and shea butter bases'],
      feel: 'Smooth and familiar'
    },
    verdict: 'Use regular soap as your daily full-body bar, and use loofah soap when you specifically want texture on areas like feet, elbows, or knees. Loofah soap is not a replacement for every wash; it is a practical textured option for people who like a more thorough-feeling body cleanse.',
    relatedProductsA: ['loofah-soaps'],
    relatedProductsB: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap'],
    faqs: [
      {
        q: 'Can I use loofah soap every day?',
        a: 'Use it as often as your skin is comfortable with the texture. Many people prefer it a few times a week for feet, elbows, and knees, while using a smooth soap for daily full-body bathing.'
      },
      {
        q: 'Is loofah soap for the face?',
        a: 'We recommend loofah soap as a body bar. For the face, choose a smooth glycerin or goat milk bar and use light pressure.'
      },
      {
        q: 'How do I make loofah soap last longer?',
        a: 'Keep it on a draining soap dish and let air reach the bar between uses. The loofah holds water, so storage matters more than it does with a smooth bar.'
      }
    ],
    publishedAt: '2026-06-29'
  },
  {
    slug: 'glycerin-soap-vs-regular-soap',
    title: 'Glycerin Soap vs Regular Soap: What Feels Different?',
    h1: 'Glycerin Soap vs Regular Soap: Light Wash or Standard Bar?',
    metaDescription: 'Glycerin soap keeps natural glycerin in the bar for a light, clean wash. Regular commercial soap often feels more stripping. Compare the difference.',
    subjectA: {
      name: 'Glycerine Base',
      slug: 'glycerin-soap',
      tagline: 'A light soap base that retains natural glycerin and rinses clean. It suits people who dislike heavy or creamy bars.',
      pros: ['Light clean feel', 'Retains natural glycerin', 'Good for humid weather and oily skin'],
      feel: 'Light and clean'
    },
    subjectB: {
      name: 'Regular Soap',
      slug: '',
      tagline: 'A broad category that often includes commercial detergent bars. The feel depends heavily on whether glycerin is retained or removed.',
      pros: ['Easy to find', 'Familiar foam', 'Many price points'],
      feel: 'Varies; often squeaky clean'
    },
    verdict: 'Choose glycerin soap if you want a lighter bar that cleans without a heavy after-feel. Regular soap is too broad to judge as one category, but many commercial bars rely on synthetic detergents for fast foam. If your current bar leaves skin feeling tight, a glycerin base is a practical first switch.',
    relatedProductsA: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap', 'pomegranate-glycerin-soap'],
    relatedProductsB: [],
    faqs: [
      {
        q: 'Is glycerin soap the same as regular soap?',
        a: 'No. Glycerin soap is defined by the retained glycerin and the light, clean feel it gives. Regular soap can mean many things, including commercial detergent bars.'
      },
      {
        q: 'Is glycerin soap good in humid weather?',
        a: 'Yes. Glycerin soap is one of the lightest bases we make, so it rinses clean and does not feel heavy in humid weather.'
      },
      {
        q: 'Which Healing Soil glycerin soap should I start with?',
        a: 'Neem tulsi glycerin is the best starting point for a clean herbal wash. Honey oats glycerin is softer and milder in feel, while ginger rosemary is more aromatic.'
      }
    ],
    publishedAt: '2026-06-29'
  },
  {
    slug: 'goat-milk-soap-vs-commercial-soap',
    title: 'Goat Milk Soap vs Commercial Soap: Creamy or Detergent-Style?',
    h1: 'Goat Milk Soap vs Commercial Soap: What Changes in the Wash?',
    metaDescription: 'Goat milk soap gives a creamier, softer wash. Commercial soap often relies on detergent-style foam. Compare the feel, lather, and skin-fit.',
    subjectA: {
      name: 'Goat Milk Base',
      slug: 'goat-milk-soap',
      tagline: 'A creamy handmade soap base made with goat milk instead of water. It feels softer and richer than a light glycerin bar.',
      pros: ['Creamy lather', 'Soft after-wash feel', 'Versatile for dry or sensitive-feeling skin'],
      feel: 'Creamy and soft'
    },
    subjectB: {
      name: 'Commercial Soap',
      slug: '',
      tagline: 'Mass-market bars are usually built for fast foam, long shelf life, and strong fragrance. The wash can feel very clean but less conditioning.',
      pros: ['Widely available', 'Fast foam', 'Consistent shelf-stable bar'],
      feel: 'Foamy and often stripping'
    },
    verdict: 'Choose goat milk soap if you want a creamier handmade bar and a softer after-wash feel. Choose a commercial bar only if you prefer strong foam and fragrance over a gentler handmade bathing experience. For most people switching from detergent-style bars, goat milk is the easiest handmade base to start with.',
    relatedProductsA: ['neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap', 'honey-oats-goat-milk-soap', 'orange-goat-milk-soap', 'rice-rose-goat-milk-soap', 'pomegranate-goat-milk-soap'],
    relatedProductsB: [],
    faqs: [
      {
        q: 'Does goat milk soap smell like milk?',
        a: 'No. Goat milk soap does not smell milky. The scent comes from the botanicals and essential oils used in the bar.'
      },
      {
        q: 'Is goat milk soap heavy?',
        a: 'Goat milk is creamier than glycerin but lighter than shea butter. It is a useful middle option if you want softness without the richest possible bar.'
      },
      {
        q: 'Which goat milk soap should I start with?',
        a: 'Neem tulsi goat milk is the most versatile daily bar. Kesar haldi goat milk feels warmer and more traditional, while orange goat milk is brighter and fresher.'
      }
    ],
    publishedAt: '2026-06-29'
  }
]
