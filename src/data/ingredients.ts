export type IngredientPage = {
  slug: string
  name: string
  title: string
  metaDescription: string
  tagline: string
  origin: string         // "Grown on our Goa farm" or "Sourced from..."
  traditionalUse: string // Ayurvedic framing only, CDSCO-safe
  feel: string           // "gentle lather", "creamy texture"
  relatedProducts: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const ingredients: IngredientPage[] = [
  {
    slug: 'neem',
    name: 'Neem',
    title: 'Neem in Handmade Soap: Farm-Grown in Goa | Healing Soil',
    metaDescription: 'Learn about the traditional use of neem in handmade soap. Farm-grown in Goa and harvested by hand for a grounded, earthy wash.',
    tagline: 'A traditional staple of Indian personal care. Neem is valued for its earthy presence and its long history of use in handmade soap.',
    origin: 'Grown on our farm in South Goa, harvested by hand, and sun-dried before adding to our small-batch soap orders.',
    traditionalUse: 'Neem has been used in Ayurvedic personal care for centuries. It is one of the most widely used botanicals in traditional Indian care for a grounded, fresh wash.',
    feel: 'Earthy, natural scent that lingers gently. It provides a clean lather and pairs well with both goat milk and glycerin bases.',
    relatedProducts: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'Does neem soap smell strong?',
        a: 'Our neem soap has a mild, earthy scent that is natural and grounded. It is not overpowering and provides a fresh aromatic experience.'
      },
      {
        q: 'Is neem soap suitable for sensitive skin?',
        a: 'Yes, our neem soaps are made with gentle bases that are suitable for sensitive skin. We use no SLS or synthetic fragrances.'
      },
      {
        q: 'Where is your neem from?',
        a: 'All the neem used in our soaps is grown right here on our farm in South Goa, harvested and processed by hand.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'tulsi',
    name: 'Tulsi',
    title: 'Tulsi (Holy Basil) in Handmade Soap: Farm-Grown in Goa | Healing Soil',
    metaDescription: 'Discover the herbaceous presence of tulsi in our handmade soaps. Grown on our Goa farm and paired with neem for a traditional wash.',
    tagline: 'The "Holy Basil" of personal care. Tulsi is valued for its clean, herbaceous scent and its traditional presence in Ayurvedic routines.',
    origin: 'Grown on our farm in South Goa alongside our neem trees, harvested by hand and sun-dried for each batch.',
    traditionalUse: 'Tulsi is traditionally used in Ayurvedic personal care for its herbaceous qualities. It is often paired with neem to create a balanced, traditional wash.',
    feel: 'Herbaceous and clean scent that provides a refreshing experience. It contributes to a gentle lather that leaves skin feeling soft.',
    relatedProducts: ['neem-tulsi-goatmilk-soap', 'neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'What does tulsi soap smell like?',
        a: 'Tulsi has a fresh, herbaceous, and slightly spicy scent. It provides a clean and uplifting aromatic profile during your wash.'
      },
      {
        q: 'Is tulsi the same as basil?',
        a: 'Tulsi is also known as Holy Basil. While related to culinary basil, it has a distinct aromatic profile and a long history in traditional Indian personal care.'
      },
      {
        q: 'Do you use synthetic fragrance?',
        a: 'No, the scent in our tulsi bars comes from the natural botanicals grown on our farm. We use no synthetic perfumes or additives.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'goat-milk',
    name: 'Goat Milk',
    title: 'Goat Milk Soap: What It Is and Why It Feels Different | Healing Soil',
    metaDescription: 'Learn why goat milk is a preferred base for sensitive skin. Our small-batch soap uses natural fats for a creamy, nourishing lather.',
    tagline: 'A versatile and gentle complete soap base. Goat milk is used as the foundation of the bar, providing a creamy lather that feels nourishing.',
    origin: 'Sourced from local farms near our property in Goa. We use goat milk as a complete base rather than adding it to a pre-made mix.',
    traditionalUse: 'Goat milk has been used in personal care for centuries. Its natural fats and vitamins survive the soap-making process and contribute to a soft, creamy wash.',
    feel: 'Creamy and soft lather that feels distinctly richer than a standard glycerin base. It is particularly suitable for sensitive or dry skin.',
    relatedProducts: ['neem-tulsi-goatmilk-soap', 'kesar-haldi-goat-milk-soap', 'honey-and-oats-goatmilk-soap', 'orange-goatmilk-soap', 'rice-rose-goatmilk-soap', 'pomegranate-goatmilk-soap'],
    faqs: [
      {
        q: 'Why use goat milk instead of water?',
        a: 'Using goat milk as the base creates a bar with natural fats and vitamins. This results in a creamier lather that helps skin feel soft after washing.'
      },
      {
        q: 'Is goat milk soap good for sensitive skin?',
        a: 'Yes, goat milk soap is traditionally used for sensitive skin because its pH is closer to the skin\'s natural range than many commercial soaps.'
      },
      {
        q: 'Does it smell like milk?',
        a: 'No, the soap does not have a milky scent. It carries the natural, mild aroma of the other botanicals and oils used in the batch.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'glycerin',
    name: 'Glycerin',
    title: 'Glycerin in Handmade Soap: Why It Matters | Healing Soil',
    metaDescription: 'Understand why we retain natural glycerin in our soap. Learn how this humectant keeps your skin hydrated and soft after washing.',
    tagline: 'A natural humectant retained in every bar. Glycerin is a byproduct of traditional soap-making that we choose to keep for its moisturising feel.',
    origin: 'Glycerin is not an added ingredient; it forms naturally during the saponification process and is kept intact in all Healing Soil soaps.',
    traditionalUse: 'Glycerin is a humectant that draws moisture from the air to the skin. Retaining it in the bar is a hallmark of traditional, small-batch soap-making.',
    feel: 'Light, clean lather that rinses away easily. It leaves the skin feeling hydrated and soft rather than stripped or tight.',
    relatedProducts: ['honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap', 'ginger-rosemary-glycerin-soap', 'pomegranate-glycerine'],
    faqs: [
      {
        q: 'Why do commercial brands remove glycerin?',
        a: 'Commercial manufacturers often extract glycerin to sell it as a separate, more expensive ingredient for lotions and creams. We keep it in the bar where it benefits your skin.'
      },
      {
        q: 'Is glycerin soap good for oily skin?',
        a: 'Yes, our glycerin-based soaps provide a thorough clean without adding heavy oils, making them ideal for oily or combination skin types.'
      },
      {
        q: 'Does it make the soap soft?',
        a: 'Glycerin is a humectant, so it can attract moisture. To make your bar last longer, keep it in a well-draining soap dish between uses.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'shea-butter',
    name: 'Shea Butter',
    title: 'Shea Butter Soap: Rich Conditioning Base | Healing Soil',
    metaDescription: 'Discover the richness of shea butter as a soap base. Perfect for dry or mature skin that needs a conditioning, moisturising wash.',
    tagline: 'A rich and conditioning soap base for intensive care. Shea butter provides a dense lather and a moisturising feel that stays with you.',
    origin: 'Sourced from West Africa where it is traditionally extracted from the nuts of the shea tree using time-honoured methods.',
    traditionalUse: 'Shea butter has been used in personal care for generations. In soap, it contributes to a rich feel that is highly valued for mature or very dry skin.',
    feel: 'Rich, dense lather that provides a conditioning sensation. It is the most nourishing of our three bases and leaves skin feeling very soft.',
    relatedProducts: ['sheabutter-kesar-gulab', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Will shea butter soap clog my pores?',
        a: 'No, shea butter is non-comedogenic, meaning it provides a rich, conditioning feel without clogging pores.'
      },
      {
        q: 'Is it better than goat milk for dry skin?',
        a: 'Shea butter is generally richer and more conditioning than goat milk. It is the right choice if your skin feels particularly dry or tight after washing.'
      },
      {
        q: 'Does it have a strong scent?',
        a: 'Raw shea butter has a mild, nutty aroma. In our soaps, the scent is very gentle and primarily influenced by the other botanicals in the bar.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'honey',
    name: 'Honey',
    title: 'Honey in Handmade Soap: Natural Humectant | Healing Soil',
    metaDescription: 'Learn about the moisturising benefits of real honey in handmade soap. Locally sourced in Goa for a gentle and soft wash.',
    tagline: 'A natural humectant for a soft and gentle wash. Real honey is added to our batches to help draw moisture to the skin as you clean.',
    origin: 'Locally sourced from suppliers in Goa. We use real honey in our soap batches, never synthetic honey fragrances or extracts.',
    traditionalUse: 'Honey has been used in personal care since ancient times. It is valued for its ability to draw moisture to the skin and its gentle presence in handmade soap.',
    feel: 'Smooth texture with a very mild, naturally sweet scent. It leaves the skin feeling soft and moisturised after every wash.',
    relatedProducts: ['honey-oats-glycerin-soap', 'honey-and-oats-goatmilk-soap', 'honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'Can I use honey soap on my face?',
        a: 'Yes, our honey soaps are very gentle and suitable for use on the face. They provide a soft wash that does not strip natural oils.'
      },
      {
        q: 'Is the honey scent synthetic?',
        a: 'No, we do not use synthetic fragrances. The mild sweetness you may notice comes from the real honey used in the soap batch.'
      },
      {
        q: 'Is it suitable for sensitive skin?',
        a: 'Yes, honey is a very mild ingredient that is traditionally used in care routines for sensitive skin types.'
      }
    ],
    publishedAt: '2026-05-02'
  },
  {
    slug: 'oats',
    name: 'Oats',
    title: 'Oats in Handmade Soap: Gentle Texture | Healing Soil',
    metaDescription: 'Discover the gentle texture of oats in our handmade soaps. Finely processed for a thorough yet mild wash suitable for sensitive skin.',
    tagline: 'Gentle texture for a mild and thorough wash. Finely processed oats are added to our batches to provide a light, textured feel that is not scratchy.',
    origin: 'Finely processed oats added directly to our soap batches. They are selected and prepared to be gentle enough for daily use.',
    traditionalUse: 'Oats have a long history in personal care for their mild and soothing properties. In soap, they provide a very light texture that helps with a gentle clean.',
    feel: 'Mildly textured feel that many find helpful for a thorough wash. It is suitable for sensitive skin and often paired with honey for a soft finish.',
    relatedProducts: ['honey-oats-glycerin-soap', 'honey-and-oats-goatmilk-soap'],
    faqs: [
      {
        q: 'Are the oats scratchy on skin?',
        a: 'No, the oats are finely processed so they provide a gentle, soft texture. They are designed to be used daily on both the face and body.'
      },
      {
        q: 'Which base is best for oat soap?',
        a: 'We offer oats in both our goat milk and glycerin bases. Goat milk offers a creamier wash, while glycerin provides a lighter feel.'
      },
      {
        q: 'Why add oats to soap?',
        a: 'Oats provide a mild physical texture to the wash, which many people find helpful for a more thorough feeling of cleanliness that remains very gentle.'
      }
    ],
    publishedAt: '2026-05-02'
  }
]
