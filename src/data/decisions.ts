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
    metaDescription: 'Dry skin needs a soap that cleans without stripping. Shea butter and goat milk bases retain natural glycerin and leave skin feeling soft — no SLS, handmade in Goa.',
    intro: 'Dry skin feels tight after washing because most commercial soaps contain SLS, a detergent that strips the skin\'s natural oils. Switching the base changes the experience completely. The right soap leaves skin feeling soft and conditioned rather than stripped.',
    primaryBase: 'Shea Butter',
    recommendation: 'Shea butter is the richest base we make. It contains natural fats that survive the soap-making process and are deposited on skin during the wash, leaving a conditioning feel behind. Goat milk is the lighter option — still nourishing, better for mild dryness. Start with shea butter if your skin feels tight after every shower.',
    recommendedProducts: ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap', 'neem-tulsi-goat-milk-soap'],
    relatedComparisons: ['goat-milk-vs-shea-butter-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'Which soap base is best for dry skin?',
        a: 'Shea butter is the richest base and provides the most conditioning feel after washing. It is particularly well suited to skin that feels dry or tight after a shower. Goat milk is the second option — creamier than glycerin but lighter than shea butter, good for mild dryness.'
      },
      {
        q: 'Why does my skin feel dry after using soap?',
        a: 'Most commercial soap bars contain SLS (sodium lauryl sulfate), a synthetic detergent that strips the skin\'s natural oil barrier. The tightness you feel after washing is the barrier being disrupted. Switching to an SLS-free bar with a nourishing base like shea butter or goat milk typically reduces this within a week or two.'
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
    metaDescription: 'Oily skin needs a soap that cleanses without over-stripping. Glycerin base retains natural moisture, rinses clean, and does not trigger rebound oiliness. SLS-free, made in Goa.',
    intro: 'Oily skin is often made worse by harsh soaps. When SLS strips too much oil, the skin compensates by producing more. A gentle, SLS-free glycerin base cleanses without over-stripping, which helps skin find its balance rather than swinging between oily and dry.',
    primaryBase: 'Glycerin',
    recommendation: 'Glycerin is the lightest of our three bases. It cleanses thoroughly, retains natural moisture, and rinses away completely without leaving a heavy feel. It does not add oils to the skin, which makes it the cleanest option for oily or combination skin types.',
    recommendedProducts: ['neem-tulsi-glycerin-soap', 'honey-oats-glycerin-soap', 'ginger-rosemary-glycerin-soap'],
    relatedComparisons: ['glycerin-vs-goat-milk-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'Is glycerin soap good for oily skin?',
        a: 'Yes. Glycerin is a humectant — it draws moisture from the air to the skin without adding oil. It cleanses without stripping, which prevents the rebound oiliness that often comes from using harsh soaps. It rinses cleanly and leaves no residue.'
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
        a: 'Commercial manufacturers often remove the natural glycerin from soap to sell separately. The bar that remains relies on SLS for lather and can strip the skin. Healing Soil glycerin soap retains all its natural glycerin, providing a gentle wash that cleanses without disrupting the skin\'s moisture balance.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'mature-skin',
    title: 'Best Soap for Mature Skin | Healing Soil',
    h1: 'Best Soap for Mature Skin',
    metaDescription: 'Mature skin benefits from a richer, more conditioning wash. Shea butter and goat milk bases provide a nourishing lather without harsh detergents. Handmade in Goa, SLS-free.',
    intro: 'As skin matures it tends to feel drier and less supple after washing. This is partly because natural oil production slows, and partly because SLS-based soaps accelerate moisture loss. A richer soap base makes a noticeable difference — the skin feels soft after washing rather than tight.',
    primaryBase: 'Shea Butter',
    recommendation: 'Shea butter provides the most conditioning wash of our three bases. The natural fats in shea butter survive the soap-making process and are left on skin during the wash, providing a soft, nourished feel without a separate moisturising step. For those who prefer something slightly lighter, goat milk is the second choice.',
    recommendedProducts: ['shea-butter-kesar-gulab', 'honey-kesar-haldi-shea-butter-soap', 'rice-rose-goat-milk-soap'],
    relatedComparisons: ['goat-milk-vs-shea-butter-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'What kind of soap suits mature skin?',
        a: 'Mature skin benefits from a soap that cleans without stripping. A shea butter base provides the richest, most conditioning wash. Goat milk is a slightly lighter option that still feels nourishing. Both are SLS-free, which means they do not disrupt the skin\'s moisture balance the way commercial detergent bars do.'
      },
      {
        q: 'Is handmade soap better for mature skin than commercial soap?',
        a: 'For most people, yes. Commercial soaps contain SLS which strips natural oils, leaving skin feeling tight. Handmade soap with a shea butter or goat milk base retains natural glycerin and provides a conditioning wash — which is particularly welcome when skin naturally produces fewer oils.'
      },
      {
        q: 'Can I use shea butter soap on my face?',
        a: 'Yes. Our shea butter soaps are gentle enough for daily face use. Shea butter has a low comedogenic rating, meaning it provides a conditioning feel without blocking pores — which makes it suitable for the face as well as the body.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'men',
    title: 'Best Handmade Soap for Men Switching from Commercial Soap | Healing Soil',
    h1: 'Best Soap for Men Switching from Commercial Soap',
    metaDescription: 'If your skin feels dry or tight after your current soap, the SLS is likely the reason. Ginger rosemary and neem tulsi glycerin bases provide a clean wash without synthetic detergents. Made in Goa.',
    intro: 'The difference between handmade and commercial soap is not about gender — it is about what is in the bar. Most commercial soap marketed to men contains SLS and synthetic fragrance. The result is a clean that comes at the cost of stripping the skin\'s natural barrier. These soaps feel different: a complete clean, no stripped feeling, no synthetic scent that lingers all day.',
    primaryBase: 'Glycerin',
    recommendation: 'Ginger and rosemary is the most popular choice for those who want a clean, aromatic wash without synthetic fragrance. The scent is natural and fades after the wash — it does not linger like a perfumed commercial bar. Neem and tulsi is the earthy alternative, grounded and traditional. Both are in a glycerin base for a thorough, light clean.',
    recommendedProducts: ['ginger-rosemary-glycerin-soap', 'neem-tulsi-glycerin-soap', 'neem-tulsi-goat-milk-soap'],
    relatedComparisons: ['handmade-vs-commercial-soap', 'glycerin-vs-goat-milk-soap'],
    faqs: [
      {
        q: 'What is the best soap for men with dry skin?',
        a: 'If your skin feels tight or dry after washing, the SLS in your current soap is likely the cause. Switching to an SLS-free goat milk or shea butter base typically resolves this. Goat milk is a good starting point — it provides a nourishing wash without feeling heavy.'
      },
      {
        q: 'Is handmade soap good for men with oily skin?',
        a: 'Yes. A glycerin base is particularly well suited to oily skin — it cleanses thoroughly without stripping, which prevents the rebound oiliness that can come from using harsh detergent soaps. Neem and tulsi in a glycerin base is a popular combination for this.'
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
    metaDescription: 'Skin that prefers a richer, conditioning wash benefits from shea butter or goat milk base. No SLS, no synthetic fragrance. Kesar, rose, and traditional Ayurvedic ingredients. Made in Goa.',
    intro: 'Skin in its forties tends to prefer a more nourishing wash. Not because it needs medical treatment — but because the daily stripping of natural oils by SLS-based soaps accumulates over years, and a gentler bar makes the difference immediately noticeable. These soaps use traditional Ayurvedic ingredients — kesar, rose, goat milk — chosen for the richness of the wash they provide.',
    primaryBase: 'Shea Butter',
    recommendation: 'The kesar and gulab shea butter bar is our most nourishing option — shea butter with saffron and rose, three ingredients with a long history in traditional Indian personal care. The rice and rose goat milk bar is lighter but still conditioning, with a gentle floral presence. Both are SLS-free and made without synthetic fragrance.',
    recommendedProducts: ['shea-butter-kesar-gulab', 'rice-rose-goat-milk-soap', 'honey-kesar-haldi-shea-butter-soap'],
    relatedComparisons: ['goat-milk-vs-shea-butter-soap', 'shea-butter-vs-glycerin-soap'],
    faqs: [
      {
        q: 'What soap base is best for skin that feels drier than it used to?',
        a: 'Shea butter is the richest option — it provides a conditioning wash that leaves skin feeling soft without a separate moisturising step. Goat milk is the lighter alternative, still nourishing but with a less heavy feel. Both are significantly gentler than SLS-based commercial soap.'
      },
      {
        q: 'What makes kesar and rose good ingredients in soap?',
        a: 'Kesar (saffron) and rose have been used in traditional Indian personal care for generations. In soap, they contribute a warm, gentle feel and a natural floral presence. There are no synthetic fragrances in these bars — the scent comes from the botanicals themselves and fades gently after the wash.'
      },
      {
        q: 'Can I use these soaps on my face?',
        a: 'Yes. All Healing Soil soaps are gentle enough for daily face use. The shea butter and goat milk bases are particularly suitable for the face — they clean without stripping and leave skin feeling soft rather than tight.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'best-handmade-soap-india',
    title: 'Best Handmade Soap in India | Healing Soil, Goa',
    h1: 'Best Handmade Soap in India',
    metaDescription: 'What separates a genuinely handmade soap from a commercial bar? Natural glycerin, SLS-free bases, small batches, real botanicals. Our most popular bars, made to order in South Goa.',
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
        a: 'Yes. The soap is made and cured on our farm in South Goa. The botanicals we describe as farm-grown — neem and tulsi — are grown on our property, harvested by hand, and sun-dried before being added to each batch. We make to order, so your bar was made for your order, not pulled from old stock.'
      },
      {
        q: 'Which Healing Soil soap should I start with?',
        a: 'If you have never used handmade soap before, start with the goat milk base — it is the most versatile and suits most skin types. Neem tulsi goat milk is our most popular bar. If you prefer something lighter, the honey oats glycerin bar is a good entry point. The starter bundle covers multiple bases and is the easiest way to find what works for your skin.'
      },
      {
        q: 'Does Healing Soil ship across India?',
        a: 'Yes. We ship pan-India from Goa. Orders are dispatched in two days and typically arrive in four to seven days depending on your city. Free shipping is included on all orders.'
      }
    ],
    publishedAt: '2026-06-18'
  },
  {
    slug: 'goa-humidity',
    title: 'Best Soap for Goa Humidity | Healing Soil',
    h1: 'Best Soap for Goa\'s Humid Climate',
    metaDescription: 'High humidity in Goa means heavier soaps can feel uncomfortable. A light glycerin or goat milk base cleanses without leaving residue — and it is made right here in South Goa.',
    intro: 'Goa\'s coastal humidity is relentless for much of the year. Heavy soaps that leave a conditioning film on the skin feel uncomfortable in this climate — you want something that cleanses thoroughly and rinses clean. The good news is that the answer is a gentler soap, not a harsher one.',
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
    title: 'Best Soap for Monsoon Skin Care in India | Healing Soil',
    h1: 'Best Soap for Monsoon',
    metaDescription: 'Monsoon brings humidity, sweat, and skin that needs a thorough but gentle clean. Neem, tulsi, and glycerin base — traditional botanicals for the Indian rainy season. Made in Goa.',
    intro: 'Monsoon in India changes what your skin needs. The combination of humidity, sweat, and frequent washing calls for a soap that cleanses thoroughly without over-stripping. Neem and tulsi have been staples of Indian personal care during the rainy season for generations — both are traditionally valued for their role in a clean, grounded daily wash.',
    primaryBase: 'Glycerin',
    recommendation: 'Neem and tulsi glycerin is the monsoon bar we reach for first. The glycerin base rinses clean in humidity, and neem and tulsi are traditional Ayurvedic botanicals with a long history in Indian personal care during the rainy season. For those who prefer a creamier wash, neem tulsi goat milk provides the same botanicals in a richer base.',
    recommendedProducts: ['neem-tulsi-glycerin-soap', 'neem-tulsi-goat-milk-soap', 'kesar-haldi-goat-milk-soap'],
    relatedComparisons: ['glycerin-vs-goat-milk-soap', 'neem-vs-tulsi-soap', 'handmade-vs-commercial-soap'],
    faqs: [
      {
        q: 'Why does skin feel different during monsoon?',
        a: 'Monsoon brings a combination of high humidity, heat, and sweat. Skin can feel simultaneously oily and irritated. The humidity means skin is rarely truly dry, but the increased sweating and frequent washing with harsh soaps can disrupt the skin\'s barrier. A gentle, SLS-free soap removes sweat and dirt without stripping the barrier further.'
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
  }
]
