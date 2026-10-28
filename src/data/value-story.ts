// data/value-story.ts — why a bar costs what it does, in one shared list.
//
// Shown wherever a price is shown (the homepage, /gift-hampers), so the answer
// to "why is this more than supermarket soap" sits next to the number rather
// than in a WhatsApp reply after the fact. It explains where the money goes; it
// does not argue that the price is low.
//
// Every line is sourced from copy the owner has already signed off:
//   farm-grown botanicals   src/data/ingredients.ts origins, WhatsAppLanding gallery (marigold)
//   ingredient origins      src/data/ingredients.ts
//   essential oils, vit. E  content/blog/gifting-handmade-soap.mdx
// No batch size is quoted because none is recorded. No superlatives, no
// therapeutic claims, no benefit claimed for vitamin E beyond its presence.

export type ValuePoint = { t: string; d: string }

export const valuePoints: ValuePoint[] = [
  {
    t: 'Grown on our farm',
    d: 'Neem, tulsi, lemongrass and marigold are grown on our farm in South Goa, picked by hand and sun-dried before they go into a bar. Buying them in would be quicker.',
  },
  {
    t: 'Sourced, and we say from where',
    d: 'The bases are sourced: goat milk from farms near ours, shea butter from West Africa. Honey comes from Goa, saffron from Kashmir. Every ingredient page names its origin.',
  },
  {
    t: 'Scented with essential oils',
    d: 'The scent comes from essential oils and the botanicals themselves, never synthetic fragrance. Essential oils cost more, which is why so much commercial soap uses fragrance instead.',
  },
  {
    t: 'Vitamin E in every bar',
    d: 'We add vitamin E to each bar, and keep the glycerin that forms in the base rather than extracting it to sell separately. No SLS, no parabens.',
  },
  {
    t: 'Poured by hand, after you order',
    d: 'Each batch is hand-poured in small numbers once an order comes in. There is no warehouse and no factory line, so we can only make so many.',
  },
]

export const VALUE_CLOSE =
  'That is why a bar costs more than one from a supermarket shelf, and why we can only make so many.'
