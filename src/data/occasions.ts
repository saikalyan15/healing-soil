export type OccasionPage = {
  slug: string
  title: string
  metaDescription: string
  h1: string
  tagline: string
  content: string
  relatedProducts: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

const allProductSlugs = [
  'honey-oats-glycerin-soap',
  'neem-tulsi-glycerin-soap',
  'ginger-rosemary-glycerin-soap',
  'pomegranate-glycerine',
  'neem-tulsi-goatmilk-soap',
  'kesar-haldi-goat-milk-soap',
  'honey-and-oats-goatmilk-soap',
  'orange-goatmilk-soap',
  'rice-rose-goatmilk-soap',
  'pomegranate-goatmilk-soap',
  'sheabutter-kesar-gulab',
  'honey-kesar-haldi-sheabutter-soap',
]

export const occasions: OccasionPage[] = [
  {
    slug: 'gift-soap-india',
    title: 'Handmade Soap Gift India: Thoughtful and Personal | Healing Soil',
    metaDescription: 'Find the perfect handmade soap gift in India. Small-batch, natural soaps from Goa that make a thoughtful and personal gift for any occasion.',
    h1: 'Handmade soap gift India',
    tagline: 'A thoughtful and personal way to show you care. Handmade soap is more than just a utility; it is a sensory experience crafted with intention.',
    content: 'Choosing a handmade soap as a gift shows a preference for quality and mindfulness. Each bar from our Goa farm is made to order, ensuring your gift is fresh and unique. Whether for a birthday, anniversary, or a simple gesture of thanks, our natural soap collection offers something special for everyone.',
    relatedProducts: allProductSlugs,
    faqs: [
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes, we provide elegant and eco-friendly packaging options suitable for gifting. Each order is packed with care to ensure it arrives looking beautiful.'
      },
      {
        q: 'Can I include a personal note?',
        a: 'Certainly. You can add a custom message during the checkout process, and we will include a handwritten note with your gift order.'
      },
      {
        q: 'Is handmade soap a good corporate gift?',
        a: 'Yes, it is a practical yet luxurious choice for corporate gifting. It reflects a commitment to natural products and supports small-batch craftsmanship.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'travel-soap-india',
    title: 'Travel Soap India: Compact and Natural | Healing Soil',
    metaDescription: 'Discover compact handmade soap for travel in India. SLS-free, natural bars that are easy to pack and gentle on your skin while on the move.',
    h1: 'Travel soap India',
    tagline: 'Natural care that fits in your bag. Our handmade soap bars are ideal for travel, providing a reliable and gentle wash wherever your journey takes you.',
    content: 'Traveling can be taxing on the skin, and commercial hotel soaps are often harsh. Bringing your own handmade soap ensures you maintain your natural routine. Our bars are compact, long-lasting, and free from the synthetic detergents that can leave your skin feeling dry during travel.',
    relatedProducts: allProductSlugs,
    faqs: [
      {
        q: 'How should I carry soap while traveling?',
        a: 'We recommend using a small tin or a perforated soap pouch. This keeps the bar dry between uses and protects your other travel essentials.'
      },
      {
        q: 'Are your bars flight-friendly?',
        a: 'Yes, since they are solid bars, they are not subject to liquid restrictions for carry-on luggage, making them very convenient for air travel.'
      },
      {
        q: 'Do you have smaller sizes for travel?',
        a: 'Our standard bars are designed to be efficient and compact. You can also easily cut a bar into smaller pieces if you prefer a custom travel size.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'soap-for-dry-skin',
    title: 'Soap for Dry Skin: Nourishing Natural Bases | Healing Soil',
    metaDescription: 'Find the best natural soap for dry skin in India. Our shea butter and goat milk bases provide a moisturising feel and gentle lather.',
    h1: 'Soap for dry skin',
    tagline: 'Gentle cleansing with a moisturising feel. We use nourishing bases like shea butter and goat milk to ensure your skin feels soft after every wash.',
    content: 'Dry skin requires a soap that cleans without stripping away natural oils. Our small-batch process retains glycerin, a natural humectant that helps skin stay hydrated. By using bases rich in natural fats, we provide a creamy lather that contributes to a soft and comfortable skin feel.',
    relatedProducts: [
      'sheabutter-kesar-gulab',
      'honey-kesar-haldi-sheabutter-soap',
      'neem-tulsi-goatmilk-soap',
      'kesar-haldi-goat-milk-soap',
      'honey-and-oats-goatmilk-soap',
      'orange-goatmilk-soap',
      'rice-rose-goatmilk-soap',
      'pomegranate-goatmilk-soap',
    ],
    faqs: [
      {
        q: 'Which base is best for very dry skin?',
        a: 'Our shea butter base is the richest and most conditioning option we offer. It is ideal for skin that feels particularly tight or dry.'
      },
      {
        q: 'Does your soap help with seasonal dryness?',
        a: 'Yes, the natural fats in our goat milk and shea butter bars provide a nourishing feel that is very helpful during drier months.'
      },
      {
        q: 'Is it safe for daily use on dry skin?',
        a: 'Our soaps are formulated without SLS or harsh detergents, making them gentle enough for daily use even on dry or sensitive skin.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'natural-soap-for-her',
    title: 'Natural Soap for Her: Floral and Nourishing | Healing Soil',
    metaDescription: 'Explore our collection of natural soap for her. From rose to honey, discover gentle and aromatic bars handmade in Goa for a personal touch.',
    h1: 'Natural soap for her',
    tagline: 'A sensory journey through natural botanicals. Discover our collection of gentle, aromatic bars designed for a nourishing personal care routine.',
    content: 'Our collection for her features soft floral notes and moisturising ingredients. Each bar is a blend of traditional care and modern mindfulness, handmade on our Goa farm. From the delicate scent of rose to the rich feel of honey and kesar, these soaps provide a gentle wash and a moment of daily luxury.',
    relatedProducts: [
      'rice-rose-goatmilk-soap',
      'sheabutter-kesar-gulab',
      'pomegranate-goatmilk-soap',
      'pomegranate-glycerine',
      'honey-and-oats-goatmilk-soap',
      'honey-oats-glycerin-soap',
      'honey-kesar-haldi-sheabutter-soap',
      'kesar-haldi-goat-milk-soap',
    ],
    faqs: [
      {
        q: 'Which scents are most popular?',
        a: 'Our rose and kesar haldi bars are very popular for their gentle floral and warm aromatic profiles.'
      },
      {
        q: 'Are these soaps suitable for the face?',
        a: 'Yes, all our bars are made with gentle, natural ingredients and are suitable for use on both the face and the body.'
      },
      {
        q: 'Do you use real flower petals?',
        a: 'Yes, our rose bars include sun-dried petals for a gentle texture and an authentic botanical experience.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'eco-friendly-soap-india',
    title: 'Eco-Friendly Soap India: Mindful Small-Batch Care | Healing Soil',
    metaDescription: 'Discover eco-friendly soap in India. Our handmade bars are made to order in Goa with natural ingredients and minimal waste packaging.',
    h1: 'Eco-friendly soap India',
    tagline: 'Sustainable care from farm to home. We prioritise natural ingredients, small-batch making, and mindful packaging to reduce our environmental impact.',
    content: 'Being eco-friendly means looking at the entire lifecycle of a product. We make our soap to order in Goa, which eliminates the need for large-scale warehousing and reduces waste. Our formulas are free from synthetic chemicals and our packaging is designed to be minimal and recyclable, supporting a more sustainable routine.',
    relatedProducts: allProductSlugs,
    faqs: [
      {
        q: 'Is your packaging plastic-free?',
        a: 'We use minimal packaging and prioritise materials that are recyclable or biodegradable, aiming to reduce plastic waste in every order.'
      },
      {
        q: 'Do you use palm oil?',
        a: 'We are mindful of our ingredient sourcing and focus on using oils that are sustainable and traditionally used in soap-making.'
      },
      {
        q: 'Why is small-batch making better for the environment?',
        a: 'Small-batch production allows us to manage resources efficiently, avoid overproduction, and ensure that every bar is made with care and minimal waste.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'corporate-gift-soap',
    title: 'Corporate Gift Soap India: Custom Natural Selections | Healing Soil',
    metaDescription: 'Elevate your corporate gifting with handmade soap in India. Customisable natural soap selections from Goa for a unique and personal gift.',
    h1: 'Corporate gift soap India',
    tagline: 'A unique and high-quality gifting solution. Our handmade soaps offer a personal and professional way to show appreciation to clients and partners.',
    content: 'Corporate gifting should reflect your values. By choosing our handmade soaps, you support small-batch craftsmanship and provide a gift that is both practical and luxurious. We offer customisable selections and bulk ordering options to suit your specific corporate needs, all shipped from our Goa workshop.',
    relatedProducts: allProductSlugs,
    faqs: [
      {
        q: 'Can we customise the soap selection for bulk orders?',
        a: 'Yes, we can work with you to curate a selection of bars that fits your gifting requirements and brand identity.'
      },
      {
        q: 'Do you offer bulk pricing?',
        a: 'We provide competitive rates for larger orders. Please contact us directly to discuss your corporate gifting needs.'
      },
      {
        q: 'How much lead time is needed for corporate orders?',
        a: 'Since our soap is made to order and needs time to cure, we recommend reaching out at least three to four weeks in advance for bulk orders.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'neem-tulsi-soap',
    title: 'Neem Tulsi Soap India: Traditional Farm-Grown Herbs | Healing Soil',
    metaDescription: 'Experience the traditional wash of neem tulsi soap in India. Using farm-grown herbs from Goa for an earthy and grounded personal care routine.',
    h1: 'Neem tulsi soap India',
    tagline: 'A cornerstone of traditional personal care. Our neem and tulsi are grown on our farm in South Goa, harvested and sun-dried for each batch.',
    content: 'Neem and tulsi are two of the most respected botanicals in Indian tradition. Combined in our gentle soap bases, they provide a wash that feels grounded and fresh. Whether you choose our creamy goat milk base or our light glycerin base, you experience the authentic aromatic profile of these farm-grown herbs.',
    relatedProducts: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'Are the herbs real or just fragrance?',
        a: 'We use real neem and tulsi leaves grown on our own farm. They are harvested, dried, and added by hand to our soap batches.'
      },
      {
        q: 'What does the soap smell like?',
        a: 'It has a natural, earthy, and herbaceous scent. It is clean and grounded, without the artificial sweetness of synthetic perfumes.'
      },
      {
        q: 'Is it suitable for the face?',
        a: 'Yes, our neem tulsi bars are made with gentle bases and are suitable for daily use on both the face and the body.'
      }
    ],
    publishedAt: null
  },
  {
    slug: 'kesar-haldi-soap',
    title: 'Kesar Haldi Soap India: Warm Ayurvedic Tradition | Healing Soil',
    metaDescription: 'Discover the warmth of kesar haldi soap in India. Traditional Ayurvedic ingredients in a gentle handmade base for a golden and soft wash.',
    h1: 'Kesar haldi soap India',
    tagline: 'Warmth and tradition in every bar. Kesar and haldi are valued in Ayurvedic personal care for their gentle feel and traditional presence.',
    content: 'The combination of saffron and turmeric is a time-honoured tradition in Indian care. Our kesar haldi soaps provide a warm, golden wash that leaves skin feeling soft and refreshed. Made in small batches in Goa, these bars represent an honest approach to traditional personal care without the use of SLS or parabens.',
    relatedProducts: [
      'kesar-haldi-goat-milk-soap',
      'sheabutter-kesar-gulab',
      'honey-kesar-haldi-sheabutter-soap',
    ],
    faqs: [
      {
        q: 'Where do you source your kesar?',
        a: 'We source our saffron from Kashmir to ensure we use high-quality botanicals in our traditional soap batches.'
      },
      {
        q: 'Does the soap stain the skin?',
        a: 'No, the natural colours from kesar and haldi are used in specific amounts that rinse away cleanly while providing a golden hue to the bar.'
      },
      {
        q: 'Is this soap suitable for sensitive skin?',
        a: 'Yes, our kesar haldi soaps are built on gentle bases like goat milk and shea butter, which are suitable for sensitive skin types.'
      }
    ],
    publishedAt: null
  },
]
