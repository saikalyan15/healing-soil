export type CombinationPage = {
  slug: string
  ingredient: string
  base: string
  title: string
  metaDescription: string
  tagline: string
  ingredientNote: string
  baseNote: string
  whyCombination: string
  feel: string
  relatedProducts: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const combinations: CombinationPage[] = [
  {
    slug: 'neem-goat-milk-soap',
    ingredient: 'Neem Tulsi',
    base: 'Goat Milk',
    title: 'Neem Tulsi Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Neem and tulsi in a creamy goat milk base. Farm-grown in Goa, handmade in small batches. No SLS, no synthetic fragrance. Ships across India.',
    tagline: 'Farm-grown neem and tulsi set in a creamy goat milk base. A classic Ayurvedic combination for a grounded, traditional daily wash.',
    ingredientNote: 'Neem and tulsi are both grown on our farm in South Goa, harvested by hand and sun-dried before each batch. They are among the most valued botanicals in Indian personal care tradition.',
    baseNote: 'Goat milk is used as the complete soap base rather than added as a supplement. Its natural fats create a creamy, dense lather that feels noticeably different from a standard bar.',
    whyCombination: 'Neem and tulsi carry an earthy, herbaceous character that pairs naturally with the soft, creamy base of goat milk. The botanicals provide grounding while the milk base keeps the bar gentle enough for everyday use.',
    feel: 'A rich, earthy lather with a natural farm scent. The goat milk base gives the bar a creamy quality that rinses cleanly and leaves skin feeling soft.',
    relatedProducts: ['neem-tulsi-goatmilk-soap'],
    faqs: [
      {
        q: 'What is neem tulsi goat milk soap?',
        a: 'It is a handmade bar combining farm-grown neem and tulsi with a creamy goat milk base. Made in small batches in Goa with no SLS or synthetic fragrance.',
      },
      {
        q: 'Is neem goat milk soap suitable for the face?',
        a: 'Yes. The goat milk base is gentle and we use no synthetic additives, making it suitable for daily face and body use.',
      },
      {
        q: 'Does it smell like neem?',
        a: 'Yes, it carries a mild earthy and herbaceous scent from the farm-grown neem and tulsi. It is natural and grounded, not overpowering.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'neem-glycerin-soap',
    ingredient: 'Neem Tulsi',
    base: 'Glycerin',
    title: 'Neem Tulsi Glycerin Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Farm-grown neem and tulsi in a natural glycerin base. Lightweight, clean lather with no SLS or synthetic fragrance. Small-batch from Goa.',
    tagline: 'Farm-grown neem and tulsi in a light glycerin base. A clean, grounded bar for those who prefer a lighter wash.',
    ingredientNote: 'Our neem and tulsi are grown on our farm in South Goa and added directly to each batch. They carry an earthy, herbaceous character valued in Indian personal care for generations.',
    baseNote: 'Natural glycerin is retained during the soap-making process rather than extracted. As a humectant, it draws moisture to the skin during the wash and keeps the lather light and clean.',
    whyCombination: 'The earthy, herbaceous neem and tulsi pair with a light glycerin base to create a bar that is grounded in tradition but clean in texture. It is a good choice for those who prefer a lighter lather over a creamy one.',
    feel: 'Light, clean lather with an earthy, natural scent. It rinses away easily and leaves skin feeling refreshed without heaviness.',
    relatedProducts: ['neem-tulsi-glycerin-soap'],
    faqs: [
      {
        q: 'What is the difference between neem goat milk soap and neem glycerin soap?',
        a: 'Neem goat milk soap has a creamier, denser lather because of the natural fats in the goat milk base. Neem glycerin soap has a lighter, cleaner lather suited to oily or normal skin.',
      },
      {
        q: 'Is neem glycerin soap good for oily skin?',
        a: 'Yes. The glycerin base is light and non-heavy, making it a suitable choice for those with oily or combination skin types.',
      },
      {
        q: 'Is there real neem in the soap?',
        a: 'Yes. Our neem is grown on our Goa farm, harvested and processed by hand, and added directly to each small batch.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'honey-goat-milk-soap',
    ingredient: 'Honey and Oats',
    base: 'Goat Milk',
    title: 'Honey Oats Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Real honey and finely processed oats in a creamy goat milk base. Handmade in Goa in small batches. No SLS, no synthetic fragrance.',
    tagline: 'Real honey and finely processed oats in a creamy goat milk base. A soft, gentle bar for a nourishing daily wash.',
    ingredientNote: 'We use real honey sourced locally in Goa, combined with finely processed oats that are gentle enough for daily use. Together they provide a mild, smooth wash experience.',
    baseNote: 'The goat milk base creates a dense, creamy lather with natural fats that make the bar feel distinctly richer than a standard soap. It is particularly comfortable for dry or sensitive skin types.',
    whyCombination: 'Honey and oats are both traditionally used for their mild, gentle qualities in personal care. Combined with a goat milk base, they create a bar with a creamy texture and a naturally sweet, soft scent.',
    feel: 'Creamy, smooth lather with a naturally mild sweetness. The oats add a gentle texture and the goat milk base leaves skin feeling soft after rinsing.',
    relatedProducts: ['honey-and-oats-goatmilk-soap'],
    faqs: [
      {
        q: 'What does honey goat milk soap feel like?',
        a: 'It has a rich, creamy lather with a mild natural sweetness. The oats add a very gentle texture and the goat milk base leaves a soft feel after rinsing.',
      },
      {
        q: 'Is honey goat milk soap good for dry skin?',
        a: 'Goat milk soap is traditionally preferred for dry skin because its natural fats create a more nourishing lather than standard bases.',
      },
      {
        q: 'Do you use real honey?',
        a: 'Yes. We source real honey from suppliers in Goa and use it directly in our soap batches. We do not use synthetic honey fragrance.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'honey-glycerin-soap',
    ingredient: 'Honey and Oats',
    base: 'Glycerin',
    title: 'Honey Oats Glycerin Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Real honey and oats in a natural glycerin base. Light, moisturising lather with no SLS or synthetic fragrance. Small-batch from Goa.',
    tagline: 'Real honey and oats in a light glycerin base. A gentle bar that cleanses without heaviness.',
    ingredientNote: 'Locally sourced honey and finely processed oats combine to create a mild, smooth wash. The honey draws moisture while the oats add a light, gentle texture.',
    baseNote: 'Natural glycerin is retained in the bar during soap-making. It is a humectant that draws moisture to the skin and creates a light, clean lather that rinses away easily.',
    whyCombination: 'The moisturising quality of honey pairs naturally with the humectant properties of a glycerin base. Together they create a bar that cleanses gently while helping skin retain moisture during the wash.',
    feel: 'Light and smooth lather with a very mild, natural sweetness. It rinses away cleanly and leaves skin feeling hydrated rather than stripped.',
    relatedProducts: ['honey-oats-glycerin-soap'],
    faqs: [
      {
        q: 'What is honey glycerin soap good for?',
        a: 'It is a gentle daily bar that combines the moisturising feel of real honey with the humectant properties of a glycerin base. Suitable for all skin types.',
      },
      {
        q: 'Is honey glycerin soap lighter than honey goat milk soap?',
        a: 'Yes. The glycerin base produces a lighter, cleaner lather while the goat milk base produces a creamier, denser one. Both use real honey and oats.',
      },
      {
        q: 'Does it have synthetic fragrance?',
        a: 'No. The mild sweetness comes from the real honey used in the batch. We do not use synthetic perfumes or additives.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'honey-shea-butter-soap',
    ingredient: 'Honey, Kesar and Haldi',
    base: 'Shea Butter',
    title: 'Honey Kesar Haldi Shea Butter Soap — Handmade | Healing Soil',
    metaDescription: 'Real honey, kesar and haldi in a rich shea butter base. A luxurious handmade bar from Goa. No SLS or synthetic fragrance.',
    tagline: 'Real honey, saffron and turmeric in a rich shea butter base. A warm, traditional bar for a deeply nourishing wash.',
    ingredientNote: 'Honey sourced locally in Goa, combined with kesar from Kashmir and haldi from Indian farms, creates a warm and traditionally rich combination. All three have been used in Ayurvedic personal care for generations.',
    baseNote: 'Shea butter provides the richest and most conditioning of our three bases. It creates a dense lather with a soft feel that is particularly suited to skin that needs more nourishment.',
    whyCombination: 'Honey, kesar and haldi are all traditionally used together in Indian personal care routines. Paired with a shea butter base, they create a bar with a warm, earthy character and a rich, luxurious feel.',
    feel: 'Rich, dense lather with a warm, earthy scent from the kesar and haldi. It rinses completely and leaves skin feeling soft and nourished.',
    relatedProducts: ['honey-kesar-haldi-sheabutter-soap'],
    faqs: [
      {
        q: 'What is in the honey shea butter soap?',
        a: 'It contains real honey, kesar (saffron from Kashmir), haldi (turmeric from Indian farms), and a shea butter base. No SLS or synthetic fragrance.',
      },
      {
        q: 'Is shea butter soap richer than goat milk?',
        a: 'Yes. Shea butter creates the most conditioning lather of our three bases. It is a good choice for very dry or mature skin types.',
      },
      {
        q: 'Will the turmeric stain my skin?',
        a: 'No. We use haldi in proportions that give the bar its warm colour but rinse away cleanly from skin during use.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'kesar-goat-milk-soap',
    ingredient: 'Kesar and Haldi',
    base: 'Goat Milk',
    title: 'Kesar Haldi Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Kesar from Kashmir and haldi from Indian farms in a creamy goat milk base. Traditional Ayurvedic combination, handmade in Goa. No SLS.',
    tagline: 'Kashmir kesar and Indian haldi in a creamy goat milk base. A traditional Ayurvedic pairing in a gentle, nourishing bar.',
    ingredientNote: 'Kesar is sourced from trusted producers in Kashmir and haldi from Indian farms. Together they form one of the most classic combinations in Ayurvedic personal care, valued for their warm, grounded presence.',
    baseNote: 'Goat milk is used as the complete soap base, contributing natural fats that make the lather richer and creamier than a standard bar. It is gentle and suitable for sensitive skin types.',
    whyCombination: 'Kesar and haldi have been combined in Indian personal care routines for centuries. The goat milk base adds a creamy softness that complements the warm, earthy character of the botanicals.',
    feel: 'Warm and earthy scent with a creamy, soft lather. It rinses completely and leaves skin feeling smooth and nourished.',
    relatedProducts: ['kesar-haldi-goat-milk-soap'],
    faqs: [
      {
        q: 'What is kesar haldi goat milk soap?',
        a: 'It is a handmade bar combining saffron (kesar from Kashmir) and turmeric (haldi) with a creamy goat milk base. A traditional Ayurvedic combination with no SLS or synthetic fragrance.',
      },
      {
        q: 'Will the turmeric stain my towel or skin?',
        a: 'The soap is made with haldi in proportions that give the bar its golden colour without leaving residue on skin or fabrics.',
      },
      {
        q: 'Is kesar goat milk soap suitable for daily use?',
        a: 'Yes. It is gentle enough for daily face and body use. The goat milk base and natural botanicals make it suitable for sensitive skin types.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'kesar-shea-butter-soap',
    ingredient: 'Kesar and Rose',
    base: 'Shea Butter',
    title: 'Kesar Rose Shea Butter Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Kesar from Kashmir and natural rose in a rich shea butter base. A luxurious handmade bar from Goa with no SLS or synthetic fragrance.',
    tagline: 'Kashmir kesar and natural rose in a rich shea butter base. A warm, floral bar for a deeply conditioning wash.',
    ingredientNote: 'Kesar is sourced from Kashmir where it is traditionally grown and harvested. Natural rose (gulab) adds a delicate floral note, valued in Indian personal care for its gentle and pleasing presence.',
    baseNote: 'Shea butter creates the richest base we use. It produces a dense, conditioning lather that feels luxurious and leaves skin feeling very soft after rinsing.',
    whyCombination: 'Kesar and rose are a classic pairing in Ayurvedic personal care — the warm earthiness of saffron balanced by the gentle floral note of rose. The shea butter base adds depth and richness to the wash.',
    feel: 'Rich, creamy lather with a warm floral scent. It rinses completely and leaves skin feeling very soft and nourished.',
    relatedProducts: ['sheabutter-kesar-gulab'],
    faqs: [
      {
        q: 'What does kesar rose shea butter soap smell like?',
        a: 'It has a warm, earthy base from the kesar with a gentle floral note from the natural rose. The scent is soft and natural, not synthetic.',
      },
      {
        q: 'Is shea butter soap good for dry skin?',
        a: 'Yes. Shea butter is the most conditioning of our bases. It provides a rich lather that is traditionally preferred for dry or mature skin types.',
      },
      {
        q: 'Does it have real rose or synthetic fragrance?',
        a: 'We use natural rose botanicals in our batches, not synthetic rose fragrance. The scent is authentic and mild.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'orange-goat-milk-soap',
    ingredient: 'Orange',
    base: 'Goat Milk',
    title: 'Orange Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Natural orange oil in a creamy goat milk base. A bright, uplifting handmade soap from Goa. No SLS or synthetic fragrance. Ships across India.',
    tagline: 'Natural orange oil in a creamy goat milk base. A bright, uplifting bar for a fresh morning wash.',
    ingredientNote: 'We use natural orange oil derived from Indian citrus fruits. The scent is bright and authentic, providing an uplifting aromatic experience that comes directly from the citrus rather than from synthetic perfumes.',
    baseNote: 'The goat milk base creates a creamy, dense lather with natural fats. It pairs well with the bright orange scent, grounding it in a soft, nourishing wash experience.',
    whyCombination: 'The fresh, bright citrus character of orange contrasts pleasantly with the creamy, mild goat milk base. The result is a bar that feels uplifting and fresh while remaining gentle and nourishing.',
    feel: 'Creamy lather with a bright, natural citrus scent. It rinses cleanly and leaves skin feeling refreshed and soft.',
    relatedProducts: ['orange-goatmilk-soap'],
    faqs: [
      {
        q: 'What does orange goat milk soap smell like?',
        a: 'It has a fresh, natural citrus scent from real orange oil. It is bright and uplifting without being overpowering, and free of synthetic fragrance.',
      },
      {
        q: 'Is orange soap suitable for sensitive skin?',
        a: 'Yes. We use natural orange oil in balanced proportions within a gentle goat milk base, making it suitable for sensitive skin types.',
      },
      {
        q: 'Can I use it every day?',
        a: 'Yes. It is made for daily face and body use. The goat milk base is gentle enough for everyday use.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'pomegranate-goat-milk-soap',
    ingredient: 'Pomegranate',
    base: 'Goat Milk',
    title: 'Pomegranate Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Pomegranate in a creamy goat milk base. A nourishing handmade soap from Goa. No SLS or synthetic fragrance. Ships across India.',
    tagline: 'Pomegranate and goat milk — a rich, nourishing combination for a deep and satisfying daily wash.',
    ingredientNote: 'Pomegranate is sourced from Indian farms and processed to retain its natural qualities before being added to our soap batches. It contributes a deep, fruity richness to the bar.',
    baseNote: 'Goat milk creates a dense, creamy lather as the full soap base. Its natural fats make the bar feel richer and more nourishing than a standard glycerin bar.',
    whyCombination: 'Pomegranate\'s rich, deep character pairs well with the creamy softness of a goat milk base. Together they create a bar that feels indulgent but remains gentle enough for daily use.',
    feel: 'Dense, creamy lather with a subtle, fruity undertone. It rinses completely and leaves skin feeling soft and nourished.',
    relatedProducts: ['pomegranate-goatmilk-soap'],
    faqs: [
      {
        q: 'What does pomegranate goat milk soap feel like?',
        a: 'It has a dense, creamy lather from the goat milk base, with a subtle fruity depth from the pomegranate. It rinses cleanly and leaves skin feeling soft.',
      },
      {
        q: 'Is pomegranate soap suitable for all skin types?',
        a: 'Yes. We use a gentle goat milk base with no SLS or synthetic fragrances, making it suitable for oily, normal, and dry skin types.',
      },
      {
        q: 'How does pomegranate goat milk differ from pomegranate glycerin soap?',
        a: 'The goat milk version has a creamier, denser lather due to the natural fats in the base. The glycerin version is lighter and cleaner in texture.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'pomegranate-glycerin-soap',
    ingredient: 'Pomegranate',
    base: 'Glycerin',
    title: 'Pomegranate Glycerin Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Pomegranate in a natural glycerin base. A light, nourishing handmade soap from Goa. No SLS or synthetic fragrance. Ships across India.',
    tagline: 'Pomegranate in a light glycerin base. A clean, gentle bar with a subtle fruity depth.',
    ingredientNote: 'Pomegranate from Indian farms brings a rich, deep fruity presence to the bar. It is added to our soap batches to provide a nourishing, natural quality to each wash.',
    baseNote: 'Natural glycerin is retained in the bar during the soap-making process. As a humectant, it draws moisture during the wash and creates a light, clean lather that rinses away without heaviness.',
    whyCombination: 'Pomegranate\'s rich character is balanced by the clean, light nature of a glycerin base. The result is a bar that feels nourishing without being heavy — a good choice for oily or normal skin types.',
    feel: 'Light, clean lather with a subtle, fruity depth from the pomegranate. It rinses away completely and leaves skin feeling refreshed.',
    relatedProducts: ['pomegranate-glycerine'],
    faqs: [
      {
        q: 'What is pomegranate glycerin soap?',
        a: 'It is a handmade bar combining pomegranate with a natural glycerin base. Made in small batches in Goa with no SLS or synthetic fragrance.',
      },
      {
        q: 'Is pomegranate glycerin soap lighter than the goat milk version?',
        a: 'Yes. Glycerin creates a lighter, cleaner lather, while the goat milk version is creamier and denser. Both use the same pomegranate ingredient.',
      },
      {
        q: 'Is it suitable for oily skin?',
        a: 'Yes. The glycerin base is non-heavy and provides a thorough clean without adding oils, making it a suitable choice for oily or combination skin types.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'rose-goat-milk-soap',
    ingredient: 'Rose and Rice',
    base: 'Goat Milk',
    title: 'Rose Rice Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Rose and rice in a creamy goat milk base. A soft, floral handmade soap from Goa. No SLS or synthetic fragrance. Ships across India.',
    tagline: 'Natural rose and rice in a creamy goat milk base. A soft, delicately scented bar for a gentle, floral wash.',
    ingredientNote: 'We use natural rose oil and rose botanicals sourced from Indian producers. Rice is added for its mild, gentle texture. Together they provide a soft, floral, and traditionally grounded wash.',
    baseNote: 'Goat milk as the full soap base creates a creamy, soft lather with natural fats. It pairs gently with the delicate floral notes of rose for a nourishing daily experience.',
    whyCombination: 'Rose and rice are traditional pairings in Indian personal care — the floral note of rose complemented by the mild texture of rice. The goat milk base adds creaminess and softness to complete the bar.',
    feel: 'Creamy, soft lather with a delicate natural rose scent. It rinses completely and leaves skin feeling very soft.',
    relatedProducts: ['rice-rose-goatmilk-soap'],
    faqs: [
      {
        q: 'What does rose goat milk soap smell like?',
        a: 'It has a delicate, natural rose scent that is soft and not overpowering. The scent comes from natural rose botanicals, not synthetic fragrance.',
      },
      {
        q: 'Is rose soap suitable for sensitive skin?',
        a: 'Yes. Rose is traditionally valued for its gentle qualities, and the goat milk base is particularly suited to sensitive skin types.',
      },
      {
        q: 'What does the rice do in the soap?',
        a: 'Rice is added for its mild and gentle texture, providing a soft feel during the wash without being scratchy.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'ginger-glycerin-soap',
    ingredient: 'Ginger and Rosemary',
    base: 'Glycerin',
    title: 'Ginger Rosemary Glycerin Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Ginger and rosemary in a natural glycerin base. A warming, invigorating handmade soap from Goa. No SLS or synthetic fragrance.',
    tagline: 'Warming ginger and clean rosemary in a light glycerin base. An invigorating bar for a fresh, aromatic wash.',
    ingredientNote: 'Ginger is sourced from Indian farms for its warming, spicy aromatic quality. Rosemary is sourced from Indian herb producers for its clean, woody scent. Together they create an invigorating aromatic experience.',
    baseNote: 'The glycerin base retains natural humectants from the soap-making process, creating a light and clean lather that lets the ginger and rosemary botanicals stand out. It rinses away without heaviness.',
    whyCombination: 'Ginger and rosemary are a classic aromatic pairing — the warmth of ginger complemented by the clean, woody notes of rosemary. A glycerin base keeps the lather light, allowing the botanicals to lead.',
    feel: 'Light lather with a warming, aromatic scent. Invigorating during the wash and clean after rinsing. Skin feels refreshed and soft.',
    relatedProducts: ['ginger-rosemary-glycerin-soap'],
    faqs: [
      {
        q: 'What does ginger rosemary soap smell like?',
        a: 'It has a warming, spicy note from the ginger paired with a clean, woody note from the rosemary. The combination is invigorating and natural.',
      },
      {
        q: 'Is ginger glycerin soap good for the morning?',
        a: 'Many customers use it as a morning bar because the aromatic combination of ginger and rosemary provides an invigorating start to the day.',
      },
      {
        q: 'Is it suitable for sensitive skin?',
        a: 'Yes. We use no SLS or synthetic fragrances, and the glycerin base is gentle. If you prefer a creamier feel, we also offer a goat milk version of this bar.',
      },
    ],
    publishedAt: null,
  },
  {
    slug: 'ginger-goat-milk-soap',
    ingredient: 'Ginger and Rosemary',
    base: 'Goat Milk',
    title: 'Ginger Rosemary Goat Milk Soap — Handmade in Goa | Healing Soil',
    metaDescription: 'Ginger and rosemary in a creamy goat milk base. A warming, nourishing handmade soap from Goa. No SLS or synthetic fragrance.',
    tagline: 'Warming ginger and rosemary in a creamy goat milk base. An invigorating yet gentle bar for a fresh, nourishing wash.',
    ingredientNote: 'Indian farm-sourced ginger and rosemary bring a warming, aromatic character to this bar. Both are traditionally valued in personal care for their fresh, invigorating scent and grounded presence.',
    baseNote: 'The goat milk base contributes natural fats that create a creamier, more nourishing lather than the glycerin version. It is particularly suitable for dry or sensitive skin types.',
    whyCombination: 'Ginger and rosemary provide an invigorating aromatic experience while the goat milk base ensures the bar remains gentle and nourishing. A good pairing for those who want an energising wash without dryness.',
    feel: 'Creamy lather with a warming, woody-spicy scent. It rinses completely and leaves skin feeling soft and nourished.',
    relatedProducts: ['ginger-rosemary-goat-milk-soap'],
    faqs: [
      {
        q: 'What is the difference between ginger glycerin and ginger goat milk soap?',
        a: 'The goat milk version has a creamier, denser lather due to the natural fats in the base. The glycerin version is lighter and cleaner. Both use the same ginger and rosemary botanicals.',
      },
      {
        q: 'Is ginger goat milk soap suitable for dry skin?',
        a: 'Yes. The goat milk base is traditionally preferred for dry skin because its natural fats create a more nourishing lather than a standard base.',
      },
      {
        q: 'Does ginger make the soap feel spicy on skin?',
        a: 'No. The ginger provides a mild warming sensation during the wash, not a sharp spicy feeling. It is balanced by the gentle goat milk base.',
      },
    ],
    publishedAt: null,
  },
]
