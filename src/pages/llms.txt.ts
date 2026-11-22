// /llms.txt for AI assistants, generated at build from the same data as the site so prices,
// soaps and methods cannot drift from the pages. Replaces the hand-written file.
import type { APIRoute } from 'astro'
import { SOAPS } from '../data/soaps'
import { SQUARES, LEAD_TIME, formatINR } from '../data/pricing'
import { giftHampers, formatRupees } from '../data/gift-hampers'
import { getPosts } from '../lib/posts'
import { SITE } from '../config/site'

const GUIDES: [string, string][] = [
  ['glycerin-vs-goat-milk-soap', 'Glycerine vs goat milk vs shea butter soap bases, by lather and after-wash feel.'],
  ['shea-butter-vs-glycerin-soap', 'Comparing the richest and lightest bases.'],
  ['natural-soap-sensitive-skin-india', 'How to read a label and choose a simple formula.'],
  ['sls-free-soap-india', 'What to look for on an ingredient list.'],
  ['what-makes-soap-chemical-free', 'What the phrase chemical-free soap means.'],
  ['best-soap-for-rainy-season-india', 'Choosing and storing soap in humid monsoon weather.'],
  ['small-travel-soap-bars-india', 'Travel-size bars: drying, storage and packing.'],
  ['goat-milk-soap-benefits', 'Goat milk soap: ingredients, lather and daily use.'],
  ['understanding-the-benefits-of-shea-butter-in-soap', 'Shea butter soap: ingredients, lather and feel.'],
  ['pomegranate-peel-soap', 'How pomegranate peel becomes soap.'],
  ['marigold-soap-benefits', 'How marigold soap is made.'],
  ['why-handmade-soap-lasts-longer', 'Use, drainage and storage guidance.'],
  ['gifting-handmade-soap', 'How to choose a soap for someone else.'],
]

export const GET: APIRoute = async () => {
  const live = new Set((await getPosts()).map((p) => p.id))
  const u = (path: string) => `${SITE.url}${path}`
  const retail = SOAPS.map((s) => `- [${s.name}, ${s.base.toLowerCase()}](${u('/soaps/' + s.slug)}): ${formatINR(s.price)}${s.weightGrams ? `, ${s.weightGrams}g` : ''}, ${s.method.toLowerCase()}.`).join('\n')
  const squares = SQUARES.soaps.filter((s) => s.price !== null).map((s) => `- ${s.name} (${String(s.base).toLowerCase()}): ${formatINR(s.price as number)} per ${SQUARES.weightGrams}g piece.`).join('\n')
  const hampers = giftHampers.map((h) => `- ${h.name}, ${formatRupees(h.price)}: ${h.summary}`).join('\n')
  const guides = GUIDES.filter(([slug]) => live.has(slug)).map(([slug, d]) => `- [${slug.replace(/-/g, ' ')}](${u('/blog/' + slug)}): ${d}`).join('\n')
  const today = new Date().toISOString().slice(0, 10)

  const body = `# Healing Soil

> Healing Soil is a small-batch handmade soap maker with a farm in South Goa, India. Soaps are made to order, without SLS, parabens or synthetic fragrance, and ship within India. Orders are placed on WhatsApp (${SITE.whatsappDisplay}); the website has no cart or checkout.

Soap is made two ways. Most bars start from a ready glycerine, goat milk, papaya cucumber or shea butter base that is melted and finished by hand with herbs, essential oils and vitamin E (melt and pour). Some bars are cold process, made from scratch from oils and lye. Each soap page states the method. The soaps are cosmetic cleansing bars, not medical products.

## How to order

Message ${SITE.whatsappDisplay} on WhatsApp: ${SITE.url}/contact. The bars, prices and bases are listed on the soaps pages below. Shipping is free on orders of ₹1,000 and above, ₹100 below that, or ₹150 for the North India states. Dispatch is within 2 business days of confirming an order; delivery takes about 4 to 7 business days.

## The soaps (retail, per bar)

${retail}

All soaps: ${u('/soaps')}

## Soap squares for events, hotels, homestays and gifts (wholesale)

50g soap squares, made to order, minimum ${SQUARES.minPerSoap} pieces per soap. Lead time ${LEAD_TIME}. Wrapping and custom packaging are quoted separately; shops that resell are quoted by message.

${squares}

- [Business page and rate card](${u('/wholesale')}), [rate card PDF](${u('/downloads/healing-soil-rate-card.pdf')}), [brochure PDF](${u('/downloads/healing-soil-brochure.pdf')}).

## Gift hampers

${hampers}

- [Gift hampers](${u('/gifting')})

## Choose a soap base

- [Glycerine soap](${u('/glycerin-soap')}): light lather and an easy-rinsing feel.
- [Goat milk soap](${u('/goat-milk-soap')}): creamy lather. The Kesar Haldi bar is a goat-milk-free option on a papaya cucumber base.
- [Shea butter soap](${u('/shea-butter-soap')}): rich lather and a conditioning feel.
- [Soap for sensitive skin types](${u('/soap-for-sensitive-skin')}): a label-first guide.
- [SLS-free soap](${u('/sls-free-soap')}): what SLS-free means and how to check a label.

## Ingredients and sourcing

- [Ingredients and where they come from](${u('/ingredients')}): neem, tulsi and marigold are grown on the farm; kokum is grown in Goa; honey is from Goa, saffron from Kashmir, and the rest from Indian farms or named sources.
- Essential oils change from batch to batch and can be left out on request, for unscented soap.
- [The complete guide to handmade soap in India](${u('/guide/handmade-soap-india')})

## Guides

${guides}

## Support

- [About](${u('/our-story')}), [FAQ](${u('/faq')}), [Contact](${u('/contact')}), [Reviews](${u('/reviews')})
- [Shipping policy](${u('/shipping-policy')}), [Cancellation and refunds](${u('/returns')})

## Business facts

- Location and production: South Goa, India.
- Process: small batch, made to order; melt and pour from ready bases, and cold process from scratch.
- Formula statements: no SLS, parabens or synthetic fragrance.
- Product scope: descriptions cover ingredients, process, scent, lather and texture only. The soaps make no medical or skin-treatment claims.
- Seasonal, made in limited numbers: a kokum lip balm (kokum grown in Goa) and an avocado body butter. Ask on WhatsApp what is ready.

Last updated: ${today}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
