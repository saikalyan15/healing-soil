export type DecisionPage = {
  slug: string
  title: string
  h1: string
  metaDescription: string
  intro: string
  primaryBase: string
  recommendation: string
  recommendedProducts: string[]
  relatedComparisons: string[]
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}

export const decisions: DecisionPage[] = [
  {
    slug: 'dry-skin',
    title: 'Best Soap for Dry Skin in India | Healing Soil',
    h1: 'Best Soap for Dry Skin',
    metaDescription: 'Compare rich shea butter and creamy goat milk soap for dry-feeling skin. SLS-free bars made in small batches in Goa.',
    intro: 'If your skin often feels dry after washing, the texture of the soap base matters. Shea butter gives the richest, most conditioning feel in our range, while goat milk provides a creamier but lighter wash.',
    primaryBase: 'Shea Butter',
    recommendation: 'Shea butter is the richest base we make and leaves a conditioning feel after rinsing. Goat milk is the lighter option with a creamy lather. Start with shea butter if you enjoy a full, nourishing wash.',
    recommendedProducts: ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap', 'neem-tulsi-goat-milk-soap'],
    relatedComparisons: ['goat-milk-vs-shea-butter-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'Which soap base is best for dry skin?',
        a: 'Shea butter is the richest base and provides the most conditioning feel after washing. It is particularly well suited to skin that feels dry or tight after a shower. Goat milk is the second option — creamier than glycerin but lighter than shea butter, good for mild dryness.'
      },
      {
        q: 'Why does my skin feel dry after using soap?',
        a: 'Water temperature, weather, washing frequency, and the product formula can all affect the after-wash feel. Try lukewarm water, use a small amount of soap, and compare a creamy goat milk or rich shea butter base.'
      },
      {
        q: 'Is shea butter soap too heavy for daily use?',
        a: 'No. Shea butter soap is designed to rinse away cleanly while leaving a conditioning feel. It is gentle enough for daily use on both face and body. Because it is richer, it is particularly welcome during winter or in air-conditioned environments where skin loses moisture faster.'
      },
      {
        q: 'Do Healing Soil soaps contain SLS?',
        a: 'No. All Healing Soil soaps are SLS-free and paraben-free. The lather comes from the natural soap-making process, not from synthetic foaming agents.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'oily-skin',
    title: 'Best Soap for Oily Skin in India | Healing Soil',
    h1: 'Best Soap for Oily Skin',
    metaDescription: 'A light glycerin soap guide for oily and combination skin types. Easy-rinsing, SLS-free handmade bars from Goa.',
    intro: 'For oily or combination skin types, many people prefer a light bar that rinses easily and does not leave a rich after-feel. Glycerin is the lightest of our three bases.',
    primaryBase: 'Glycerin',
    recommendation: 'Glycerin is the lightest of our three bases. It cleanses thoroughly, retains natural moisture, and rinses away completely without leaving a heavy feel. It does not add oils to the skin, which makes it the cleanest option for oily or combination skin types.',
    recommendedProducts: ['neem-tulsi-glycerin-soap', 'honey-oats-glycerin-soap', 'ginger-rosemary-glycerin-soap'],
    relatedComparisons: ['glycerin-vs-goat-milk-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'Is glycerin soap good for oily skin?',
        a: 'Glycerin soap is a popular option for oily skin because the lather feels light and rinses easily without a heavy finish.'
      },
      {
        q: 'Will goat milk soap make oily skin worse?',
        a: 'Not necessarily, but goat milk is a richer base with natural fats. For oily skin, glycerin is a better starting point — it provides a clean, light wash without the additional richness. If your skin is combination (oily in the T-zone, normal elsewhere), goat milk may still suit the drier parts of your face.'
      },
      {
        q: 'What is the best soap for combination skin?',
        a: 'Glycerin suits combination skin well. It cleanses thoroughly without stripping dry patches and does not add richness to oily areas. If your skin leans more dry than oily, goat milk is a good middle ground.'
      },
      {
        q: 'How is handmade glycerin soap different from commercial soap?',
        a: 'Healing Soil glycerin soap is selected for its light lather and smooth feel. The bars contain no SLS, parabens, or synthetic fragrance and are hand-poured in small batches.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'mature-skin',
    title: 'Best Soap for Mature Skin | Healing Soil',
    h1: 'Best Soap for Mature Skin',
    metaDescription: 'Mature skin suits a richer, more conditioning wash. Shea butter and goat milk bases give a nourishing lather without harsh detergents. SLS-free, made in Goa.',
    intro: 'If your skin prefers a richer wash, the base can make a noticeable difference to texture and after-feel. Shea butter is our fullest-feeling option, with goat milk as a slightly lighter alternative.',
    primaryBase: 'Shea Butter',
    recommendation: 'Shea butter provides the most conditioning wash of our three bases and leaves skin feeling soft. For those who prefer something slightly lighter, goat milk is the second choice.',
    recommendedProducts: ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap', 'rice-rose-goat-milk-soap'],
    relatedComparisons: ['goat-milk-vs-shea-butter-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'What kind of soap suits mature skin?',
        a: 'A shea butter base provides the richest, most conditioning wash. Goat milk is a slightly lighter option that still feels nourishing. Both Healing Soil bases are made without SLS, parabens, or synthetic fragrance.'
      },
      {
        q: 'Is handmade soap better for mature skin than commercial soap?',
        a: 'Handmade describes the making method, not a guaranteed result. Compare the full label: Healing Soil uses shea butter and goat milk bases for a conditioning feel and makes each bar without SLS, parabens, or synthetic fragrance.'
      },
      {
        q: 'Can I use shea butter soap on my face?',
        a: 'Our shea butter soap can be used on the face and body. Use light pressure, avoid the eye area, and patch test first if your skin is sensitive.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'men',
    title: 'Best Handmade Soap for Men Switching from Commercial Soap | Healing Soil',
    h1: 'Best Soap for Men Switching from Commercial Soap',
    metaDescription: 'Compare light glycerin soaps with ginger, rosemary, neem, and tulsi. SLS-free handmade bars with natural scent, made in Goa.',
    intro: 'Choosing soap is less about gender and more about the lather, scent, and after-wash feel you prefer. These glycerin bars feel light and use botanicals and essential oils instead of synthetic fragrance.',
    primaryBase: 'Glycerin',
    recommendation: 'Ginger and rosemary is the most popular choice for those who want a clean, aromatic wash without synthetic fragrance. The scent is natural and fades after the wash — it does not linger like a perfumed commercial bar. Neem and tulsi is the earthy alternative, grounded and traditional. Both are in a glycerin base for a thorough, light clean.',
    recommendedProducts: ['ginger-rosemary-glycerin-soap', 'neem-tulsi-glycerin-soap', 'neem-tulsi-goat-milk-soap'],
    relatedComparisons: ['handmade-vs-commercial-soap', 'glycerin-vs-goat-milk-soap'],
    faqs: [
      {
        q: 'What is the best soap for men with dry skin?',
        a: 'For a richer wash, compare goat milk and shea butter bases. Goat milk is a creamy starting point, while shea butter has the most conditioning feel.'
      },
      {
        q: 'Is handmade soap good for men with oily skin?',
        a: 'Yes. A glycerin base is particularly well suited to oily skin — it cleanses thoroughly without a heavy after-feel. Neem and tulsi in a glycerin base is a popular combination for this.'
      },
      {
        q: 'Do these soaps have a strong scent?',
        a: 'No. The scent in all Healing Soil soaps comes from natural botanicals and essential oils, not synthetic fragrance. The ginger rosemary bar has a warm, woody scent that fades after the wash. The neem tulsi bar has an earthy, herbal scent. Neither lingers the way synthetic perfume does.'
      },
      {
        q: 'How long does a bar last?',
        a: 'A full-size bar lasts approximately four to five weeks with daily use. Keeping the bar on a draining soap dish between uses extends its life significantly — the bar dissolves faster when left sitting in water than it does through use.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'women-over-40',
    title: 'Best Soap for Women Over 40 | Healing Soil',
    h1: 'Best Soap for Women Over 40',
    metaDescription: 'Skin that prefers a richer, conditioning wash suits a shea butter or goat milk base. Kesar, rose and traditional Ayurvedic ingredients. SLS-free, made in Goa.',
    intro: 'Some people prefer a more nourishing wash over time. These soaps use kesar, rose, goat milk, and shea butter for a rich texture and gentle botanical presence.',
    primaryBase: 'Shea Butter',
    recommendation: 'The kesar and gulab shea butter bar is our most nourishing option — shea butter with saffron and rose, three ingredients with a long history in traditional Indian personal care. The rice and rose goat milk bar is lighter but still conditioning, with a gentle floral presence. Both are SLS-free and made without synthetic fragrance.',
    recommendedProducts: ['shea-butter-kesar-gulab', 'rice-rose-goat-milk-soap', 'honey-kesar-haldi-shea-butter-soap'],
    relatedComparisons: ['goat-milk-vs-shea-butter-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'What soap base is best for skin that feels drier than it used to?',
        a: 'Shea butter is the richest option and leaves a conditioning feel. Goat milk is the lighter alternative, with a creamy lather and less weight after rinsing.'
      },
      {
        q: 'What makes kesar and rose good ingredients in soap?',
        a: 'Kesar (saffron) and rose have been used in traditional Indian personal care for generations. In soap, they contribute a warm, gentle feel and a natural floral presence. There are no synthetic fragrances in these bars — the scent comes from the botanicals themselves and fades gently after the wash.'
      },
      {
        q: 'Can I use these soaps on my face?',
        a: 'They can be used on the face and body. Use light pressure, avoid the eye area, and patch test a new bar before regular use.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'best-handmade-soap-india',
    title: 'Best Handmade Soap in India | Healing Soil, Goa',
    h1: 'Best Handmade Soap in India',
    metaDescription: 'What separates a genuinely handmade soap from a commercial bar? Natural glycerin, SLS-free bases, small batches, real botanicals. Made to order in South Goa.',
    intro: 'The handmade soap market in India has grown considerably, but the word "handmade" is not regulated — commercial brands use it loosely. Genuinely handmade soap is made in small batches, retains natural glycerin, uses no SLS or synthetic fragrance, and is made to order rather than held in warehouse stock. This is what we make in South Goa.',
    primaryBase: 'Goat Milk',
    recommendation: 'Our most popular bars reflect the range: neem and tulsi goat milk for those who want traditional Ayurvedic botanicals with a creamy base; kesar and haldi goat milk for a warm, golden wash; honey and oats glycerin for a light, gentle daily bar. Each is made to order, shipped in two days.',
    recommendedProducts: ['neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap', 'honey-oats-glycerin-soap', 'shea-butter-kesar-gulab'],
    relatedComparisons: ['handmade-vs-commercial-soap', 'glycerin-vs-goat-milk-soap', 'goat-milk-vs-shea-butter-soap'],
    faqs: [
      {
        q: 'What makes handmade soap different from commercial soap?',
        a: 'The primary difference is glycerin. Commercial soap manufacturers extract the natural glycerin produced during soap-making and sell it separately. The bar that remains relies on SLS for lather. Handmade soap retains its glycerin, which is a natural humectant that keeps skin feeling soft after washing. No SLS is needed.'
      },
      {
        q: 'Is Healing Soil soap actually made in Goa?',
        a: 'Yes. The soap is melted and hand-poured on our farm in South Goa. The botanicals we describe as farm-grown — neem and tulsi — are grown on our property, harvested by hand, and sun-dried before being added to each batch. We make to order, so your bar was made for your order, not pulled from old stock.'
      },
      {
        q: 'Which Healing Soil soap should I start with?',
        a: 'If you have never used handmade soap before, start with the goat milk base — it is the most versatile and suits most skin types. Neem tulsi goat milk is our most popular bar. If you prefer something lighter, the honey oats glycerin bar is a good entry point. The starter bundle covers multiple bases and is the easiest way to find what works for your skin.'
      },
      {
        q: 'Does Healing Soil ship across India?',
        a: 'Yes. We ship pan-India from Goa. Orders are dispatched in two days and typically arrive in four to seven days depending on your city. Shipping is free on orders of ₹1,000 and above.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'goa-humidity',
    // Ranks 1.7 for "best soap for humid weather kolkata west bengal" (27
    // impressions) and 3.2 for "best soap for humid weather chennai bangalore"
    // (31), both at 0 clicks. The old 65-char title truncated mid city-list.
    // Shorter and complete, with the cities moved into the description.
    title: 'Best Soap for Humid Weather in India',
    h1: 'Best Soap for India\'s Humid Climate',
    metaDescription: 'In Chennai, Bangalore, Mumbai and Kolkata humidity, heavier soaps can feel uncomfortable. A light glycerin or goat milk base rinses clean. Handmade in Goa.',
    intro: 'Humidity across India\'s coastal and southern cities is relentless for much of the year. Heavy soaps that leave a conditioning film on the skin feel uncomfortable in this climate — you want something that cleanses thoroughly and rinses clean. The good news is that the answer is a gentler soap, not a harsher one.',
    primaryBase: 'Glycerin',
    recommendation: 'In Goa\'s humidity, glycerin is the right base — it cleanses thoroughly and rinses away completely without leaving any residue. The orange goat milk bar is a popular choice for those who want something slightly richer: the natural citrus scent is uplifting and the goat milk base is light enough to wear well in a coastal climate. Neem and tulsi in glycerin is the daily workhorse.',
    recommendedProducts: ['orange-goat-milk-soap', 'neem-tulsi-glycerin-soap', 'honey-oats-glycerin-soap'],
    relatedComparisons: ['glycerin-vs-goat-milk-soap', 'handmade-vs-commercial-soap'],
    faqs: [
      {
        q: 'What soap works best in a humid coastal climate?',
        a: 'A lighter soap base that rinses clean works best in humidity. Glycerin is ideal — it cleanses without leaving a heavy feel. Goat milk is a reasonable middle ground. Shea butter, while excellent for dry skin, can feel heavy in high-humidity conditions.'
      },
      {
        q: 'Is Healing Soil soap made in Goa?',
        a: 'Yes. The soap is made on our farm in South Goa. We are familiar with the local climate — it informed our decision to keep the glycerin base as a core offering alongside the richer shea butter and goat milk options.'
      },
      {
        q: 'Does humidity affect how handmade soap lasts?',
        a: 'Yes. Handmade soap contains natural glycerin, which attracts moisture. In humid conditions, leaving the bar in a puddle of water will dissolve it faster. Keep the bar on a well-draining soap dish and store spare bars somewhere cool and dry. With proper storage, a bar lasts four to five weeks.'
      },
      {
        q: 'Can I get Healing Soil soap if I live in Goa?',
        a: 'Yes. We ship across India including Goa. Since the farm is in South Goa, deliveries within Goa are among the fastest — typically two to three days total.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'monsoon',
    title: 'Soap for Monsoon in India | Rainy Season Handmade Bars',
    h1: 'Soap for Monsoon in India',
    metaDescription: 'A quick guide to light SLS-free handmade soap for humid rainy season weather, with neem, tulsi, and glycerin bars made in Goa.',
    intro: 'Monsoon in India changes how soap feels. The combination of humidity, sweat, and frequent washing calls for a bar that rinses clean and stays gentle. Neem and tulsi have been staples of Indian personal care during the rainy season for generations — both are traditionally valued for a clean, grounded daily wash.',
    primaryBase: 'Glycerin',
    recommendation: 'Neem and tulsi glycerin is the monsoon bar we reach for first. The glycerin base rinses clean in humidity, and neem and tulsi are traditional Ayurvedic botanicals with a long history in Indian personal care during the rainy season. For those who prefer a creamier wash, neem tulsi goat milk provides the same botanicals in a richer base. If you are packing for wet-weather travel, add small travel soaps so your routine stays consistent away from home.',
    recommendedProducts: ['neem-tulsi-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'travel-soaps', 'kesar-haldi-goat-milk-soap'],
    relatedComparisons: ['glycerin-vs-goat-milk-soap', 'glycerin-soap-vs-regular-soap', 'neem-vs-tulsi-soap', 'handmade-vs-commercial-soap'],
    faqs: [
      {
        q: 'Why does skin feel different during monsoon?',
        a: 'Monsoon brings a combination of high humidity, heat, and sweat. Skin can feel simultaneously oily and uncomfortable. A gentle, SLS-free soap rinses clean after sweat and humidity without a harsh after-feel.'
      },
      {
        q: 'Why are neem and tulsi good for monsoon?',
        a: 'Neem and tulsi have been used in Indian personal care during the monsoon for centuries. Both are valued in Ayurvedic tradition for their role in a thorough, grounded daily wash. In soap form, they provide a clean, earthy lather that suits the demands of a humid season.'
      },
      {
        q: 'Is glycerin soap better than goat milk in monsoon?',
        a: 'For most people, yes. Glycerin rinses away completely and does not leave a conditioning film, which can feel uncomfortable in high humidity. Goat milk is richer and better suited to drier months. If your skin tends to be dry even in monsoon, goat milk may still be the right choice.'
      },
      {
        q: 'How should I store handmade soap during monsoon?',
        a: 'Keep the bar on a well-draining soap dish and store spare bars in a cool, dry spot — not in the bathroom where humidity is highest. Handmade soap contains natural glycerin which attracts moisture, so storage matters more in humid seasons. A bar kept dry between uses lasts four to five weeks.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'loofah-body-soap',
    title: 'Loofah Body Soap | Textured Handmade Bar | Healing Soil',
    h1: 'Loofah Body Soap',
    metaDescription: 'A textured loofah body soap for feet, elbows, and knees. Glycerin base, natural loofah slice, SLS-free, handmade in Goa.',
    intro: 'Loofah body soap is for people who enjoy a textured wash. The natural loofah slice adds grip to the bar, making it useful for areas like feet, elbows, and knees rather than delicate areas or daily face use.',
    primaryBase: 'Glycerin',
    recommendation: 'Our loofah soap uses a glycerin base because glycerin rinses clean and keeps the bar feeling light. Use light pressure and let the texture do the work. For everyday full-body bathing, keep a smooth glycerin or goat milk bar alongside it.',
    recommendedProducts: ['loofah-soaps', 'honey-oats-glycerin-soap', 'neem-tulsi-glycerin-soap'],
    relatedComparisons: ['loofah-soap-vs-regular-soap', 'glycerin-soap-vs-regular-soap'],
    faqs: [
      {
        q: 'Is loofah soap good for daily use?',
        a: 'It can be used as often as your skin is comfortable with the texture, but many people prefer it on feet, elbows, and knees. A smooth bar is better for daily full-body use.'
      },
      {
        q: 'Should I use loofah soap on my face?',
        a: 'We recommend using loofah soap as a body bar. For the face, a smooth glycerin or goat milk soap is the better choice.'
      },
      {
        q: 'How do I store loofah soap?',
        a: 'Keep it on a draining soap dish and let it dry between uses. The loofah holds water, so avoid leaving the bar in a puddle.'
      },
      {
        q: 'What is the difference between loofah soap and regular soap?',
        a: 'Loofah soap has a natural textured insert for a more thorough-feeling wash. Regular soap is smooth and better suited to everyday full-body bathing.'
      }
    ],
    publishedAt: '2026-06-29'
  }
]
