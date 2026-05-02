export type AyurvedicPage = {
  slug: string
  name: string
  title: string
  metaDescription: string
  h1: string
  intro: string          // 3-4 sentences, CDSCO-safe
  traditionalContext: string  // Ayurvedic framing only
  relatedProducts: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const ayurvedic: AyurvedicPage[] = [
  {
    slug: 'neem-tulsi',
    name: 'Neem Tulsi',
    title: 'Ayurvedic Neem Tulsi Soap: Farm-Grown in Goa | Healing Soil',
    metaDescription: 'Experience the traditional wash of Ayurvedic neem tulsi soap. Made in small batches in Goa with farm-grown herbs for an earthy and grounded feel.',
    h1: 'Ayurvedic neem tulsi soap',
    intro: 'Neem and tulsi are foundational botanicals in traditional care routines across India. Our small-batch soap combines these farm-grown herbs in gentle bases to provide a wash that respects your skin\'s natural balance. By avoiding SLS and synthetic additives, we ensure an authentic personal care experience.',
    traditionalContext: 'In traditional Ayurvedic personal care, neem is valued for its grounded presence and cleansing qualities. Tulsi, or Holy Basil, is traditionally used for its herbaceous aromatic profile. Together, they create a balanced wash that has been a staple of Indian care routines for generations.',
    relatedProducts: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'Are the neem and tulsi leaves fresh?',
        a: 'We use leaves grown on our own farm in South Goa. They are harvested by hand and sun-dried before being added to our soap batches to maintain their natural qualities.'
      },
      {
        q: 'Is this soap suitable for the face?',
        a: 'Yes, our neem tulsi bars are made with gentle bases like goat milk and glycerin, making them suitable for daily use on both the face and the body.'
      },
      {
        q: 'Does it have a strong scent?',
        a: 'The soap has a natural, earthy, and herbaceous scent derived from the botanicals themselves. It is mild and grounded, not overpowering like synthetic perfumes.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'kesar-haldi',
    name: 'Kesar Haldi',
    title: 'Ayurvedic Kesar Haldi Soap: Warm Golden Tradition | Healing Soil',
    metaDescription: 'Discover the warmth of Ayurvedic kesar haldi soap. Traditional ingredients in a gentle handmade base for a golden and soft wash. Made in Goa.',
    h1: 'Ayurvedic kesar haldi soap',
    intro: 'Kesar and haldi represent one of the most cherished combinations in traditional Indian personal care. Our handmade bars use real saffron and turmeric to provide a warm, golden wash that leaves your skin feeling soft and refreshed. Crafted in small batches, these soaps avoid harsh detergents like SLS.',
    traditionalContext: 'Kesar (saffron) and haldi (turmeric) have been cornerstones of Ayurvedic personal care for centuries. Saffron is traditionally valued for its gentle nature and golden hue, while turmeric is used for its grounded presence. This combination is traditionally preferred for a soft and radiant skin feel.',
    relatedProducts: ['kesar-haldi-goat-milk-soap', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Where do you source your kesar?',
        a: 'We source high-quality saffron from trusted producers in Kashmir to ensure our traditional soap batches maintain their authentic quality.'
      },
      {
        q: 'Will haldi stain my skin?',
        a: 'No, the turmeric is used in specific amounts to provide a natural colour to the bar while ensuring it rinses away cleanly from your skin.'
      },
      {
        q: 'Is it safe for sensitive skin?',
        a: 'Yes, our kesar haldi soaps are built on nourishing bases like goat milk and shea butter, which are traditionally used for their gentle and soft feel.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'goat-milk',
    name: 'Goat Milk',
    title: 'Ayurvedic Goat Milk Soap India: Creamy Natural Care | Healing Soil',
    metaDescription: 'Experience the creamy lather of Ayurvedic goat milk soap in India. Handmade in small batches in Goa for a gentle and nourishing personal care routine.',
    h1: 'Ayurvedic goat milk soap India',
    intro: 'Goat milk is a versatile and traditional base for natural personal care. Our soaps use goat milk as a foundation, providing a creamier lather and a more nourishing feel than standard water-based bars. Made in small batches in Goa, these bars are genuinely SLS-free and suitable for sensitive skin.',
    traditionalContext: 'Goat milk has a long history in personal care across various cultures, including its use in traditional Indian routines. Its natural fats and vitamins are valued for their ability to provide a soft and moisturising feel. In an Ayurvedic context, it is preferred for its gentle nature and closeness to the skin\'s natural range.',
    relatedProducts: [
      'neem-tulsi-goatmilk-soap',
      'kesar-haldi-goat-milk-soap',
      'honey-and-oats-goatmilk-soap',
      'orange-goatmilk-soap',
      'rice-rose-goatmilk-soap',
      'pomegranate-goatmilk-soap',
    ],
    faqs: [
      {
        q: 'Why choose goat milk soap?',
        a: 'Goat milk soap provides a noticeably creamier lather and a more nourishing feel due to the natural fats in the milk, making it ideal for sensitive or dry skin.'
      },
      {
        q: 'Is it suitable for daily use?',
        a: 'Yes, our goat milk bars are very gentle and are formulated for daily use on the whole body, including the face.'
      },
      {
        q: 'Do you use synthetic fragrance?',
        a: 'No, we use only natural essential oils and botanicals to provide our goat milk soaps with their unique and gentle aromatic profiles.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'honey-oats',
    name: 'Honey Oats',
    title: 'Ayurvedic Honey Soap: Smooth and Textured Care | Healing Soil',
    metaDescription: 'Discover our Ayurvedic honey soap with a gentle oat texture. Handmade in Goa using natural humectants for a soft and thorough personal care wash.',
    h1: 'Ayurvedic honey soap',
    intro: 'The combination of honey and oats provides a balanced personal care experience. Real honey acts as a natural humectant, while finely processed oats offer a very gentle texture for a thorough wash. Our handmade bars are crafted with intention in Goa, ensuring a soft and moisturised feel without synthetic additives.',
    traditionalContext: 'Honey has been used in personal care since ancient times, valued in traditional routines for its ability to draw moisture to the skin. Oats are traditionally used for their mild and soothing properties. In an Ayurvedic framing, this combination provides a gentle yet thorough clean that respects the skin\'s natural oils.',
    relatedProducts: [
      'honey-oats-glycerin-soap',
      'honey-and-oats-goatmilk-soap',
      'honey-kesar-haldi-sheabutter-soap',
    ],
    faqs: [
      {
        q: 'Are the oats scratchy?',
        a: 'No, the oats are finely processed to ensure they provide a gentle, soft texture that is suitable for daily use even on sensitive skin.'
      },
      {
        q: 'Is the honey real?',
        a: 'Yes, we use real honey in our soap batches to ensure we provide the natural humectant benefits traditionally associated with the ingredient.'
      },
      {
        q: 'Is it suitable for oily skin?',
        a: 'Our honey and oats combination in a glycerin base is a light and clean option that is very well-suited for oily or combination skin types.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'shea-butter',
    name: 'Shea Butter',
    title: 'Natural Ayurvedic Soap for Dry Skin: Shea Butter | Healing Soil',
    metaDescription: 'Find natural Ayurvedic soap for dry skin with our rich shea butter base. Handmade in small batches in Goa for intensive conditioning and soft feel.',
    h1: 'Natural Ayurvedic soap for dry skin',
    intro: 'For skin that feels dry or tight, our shea butter base provides a rich and conditioning personal care solution. We use traditional soap-making methods to ensure that natural glycerin is retained, contributing to a moisturising feel after every wash. These small-batch soaps from Goa are free from SLS and harsh detergents.',
    traditionalContext: 'While shea butter is traditionally sourced from West Africa, its use in personal care has become a global standard for rich conditioning. In traditional care routines, it is valued for its high fat content and its ability to leave a soft, protective feel on the skin. It is an ideal choice for mature or very dry skin types.',
    relatedProducts: ['sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Which base is best for very dry skin?',
        a: 'Our shea butter base is the richest and most conditioning option we offer, making it the preferred choice for skin that feels particularly dry.'
      },
      {
        q: 'Does it clog pores?',
        a: 'No, shea butter is non-comedogenic, meaning it provides a rich, conditioning feel without clogging your skin\'s pores.'
      },
      {
        q: 'How long does it take to ship?',
        a: 'Our soaps are made and cured in Goa. Orders are typically dispatched within 7 to 10 days to ensure you receive a high-quality, recently cured bar.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'ginger-rosemary',
    name: 'Ginger Rosemary',
    title: 'Aromatic Ayurvedic Soap India: Warming Care | Healing Soil',
    metaDescription: 'Experience our aromatic Ayurvedic soap with ginger and rosemary. Handmade in Goa for an invigorating wash with a clean and woody scent.',
    h1: 'Aromatic Ayurvedic soap India',
    intro: 'Ginger and rosemary combine to create an invigorating and aromatic personal care routine. The warmth of ginger pairs with the clean, woody notes of rosemary for a wash that feels refreshing and grounded. Our handmade glycerin-based bars are genuinely SLS-free and crafted with care on our Goa farm.',
    traditionalContext: 'Ginger has long been used in Ayurvedic personal care for its warming and aromatic qualities. Rosemary is traditionally valued for its clean and woody scent. Together, these botanicals provide an invigorating experience that is traditionally preferred for a fresh start to the day.',
    relatedProducts: ['ginger-rosemary-glycerin-soap'],
    faqs: [
      {
        q: 'What does the soap smell like?',
        a: 'It has a warm, aromatic, and slightly woody scent derived from natural essential oils. It is an invigorating and fresh aromatic profile.'
      },
      {
        q: 'Does ginger feel spicy on the skin?',
        a: 'No, it provides a mild warming sensation that many find invigorating during their wash, without being harsh or sharp.'
      },
      {
        q: 'Is it suitable for daily use?',
        a: 'Yes, our ginger rosemary bars are built on a gentle glycerin base that is suitable for daily use on both the face and the body.'
      }
    ],
    publishedAt: null
  },
]
