# Execution Plan — Healing Soil Programmatic SEO

Last updated: 2026-05-02. Master document: read this when resuming any SEO session.

**Source documents (read these for context):**
- [growth-strategy.md](growth-strategy.md) — LP, audience, offer (Stage 1–4 done)
- [task-tracker.md](task-tracker.md) — current build status (tasks 3.15–3.17 are next)
- [programmatic-seo-plan.md](programmatic-seo-plan.md) — architecture and data model detail
- [competitive-analysis-bangalore.md](competitive-analysis-bangalore.md) — competitor breakdown
- [keyword-list.md](keyword-list.md) — 100 target keywords with GSC data

**Current state (2026-05-02):**
- 13 soap blog posts live, 1 hub page, 1 category page (`/shea-butter-soap`)
- Tasks 3.15–3.17 (goat milk, sensitive skin, glycerin category pages) = next in queue
- GSC: comparison queries already at positions 5–11 — fastest wins available

---

## The competitive edge in one sentence

Nobody in the Bangalore handmade soap market has comparison pages, ingredient pages, or city pages. The entire long-tail keyword space is uncontested.

---

## Phase 0 — Foundation (already done, verify before starting)

| Item | Status | File |
|---|---|---|
| Hub page `/guide/handmade-soap-india` | DONE | `src/app/guide/handmade-soap-india/page.tsx` |
| Category page template | DONE | `src/app/shea-butter-soap/page.tsx` — replicate this |
| FAQPage schema pattern | DONE | `src/app/blog/[slug]/page.tsx` |
| BlogInlineCTA component | DONE | `src/components/BlogInlineCTA.tsx` |
| `getProducts()` function | DONE | `src/lib/products.ts` |
| Internal linking: blog → hub | DONE | All 9 blog posts link to hub |
| SLS-free blog post | DONE | `content/blog/sls-free-soap-india.mdx` |

---

## Phase 1 — Technical infrastructure (Week 1, before any pages ship)

Build the 4 route templates and data files. No content yet — just the plumbing.

### 1A. Comparison page infrastructure

**New file:** `src/data/comparisons.ts`
```ts
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
  // entries go here — start with 5 GSC-confirmed
]
```

**New file:** `src/app/compare/[slug]/page.tsx`
- `generateStaticParams()` — filter `publishedAt <= today`
- `generateMetadata()` — title + description from data
- Render `ComparisonPage` component

**New file:** `src/components/programmatic/ComparisonPage.tsx`
Content sections:
1. Hero: H1 (the comparison question)
2. Comparison table: base, lather, feel, best for skin type, price
3. Section A: what it is, origin (farm/sourced), traditional use
4. Section B: same
5. Verdict + "which should you try?" (no therapeutic language)
6. Product grid A (filtered by base)
7. Product grid B (filtered by base)
8. FAQPage schema (3–5 Q&As)
9. Bundle CTA (`BlogInlineCTA` component)

### 1B. Ingredient page infrastructure

**New file:** `src/data/ingredients.ts`
```ts
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
```

**New file:** `src/app/ingredient/[slug]/page.tsx`
**New file:** `src/components/programmatic/IngredientPage.tsx`
Content sections: Hero → Origin story → What it feels like → Products containing it → FAQ → Bundle CTA

### 1C. City page infrastructure

**New file:** `src/data/cities.ts`
```ts
export type CityPage = {
  slug: string
  displayName: string
  state: string
  deliveryNote: string    // "Ships from Goa in 4 days, arrives in 3–7"
  reviewerNote?: string   // "We have customers in [city]..." — only if true
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}
```

**New file:** `src/app/soap/[city]/page.tsx`
**New file:** `src/components/programmatic/CityPage.tsx`
Content sections: Hero (city name + handmade soap from Goa) → How it ships to [city] → Products → Reviews → FAQ → Bundle CTA

### 1D. Sitemap extension

In `next-sitemap.config.js`, add `additionalPaths` for each dynamic route:
```js
additionalPaths: async (config) => {
  const today = new Date().toISOString()
  const comparisons = require('./src/data/comparisons').comparisons
  const ingredients = require('./src/data/ingredients').ingredients
  const cities = require('./src/data/cities').cities

  return [
    ...comparisons.filter(c => c.publishedAt && c.publishedAt <= today)
      .map(c => ({ loc: `/compare/${c.slug}` })),
    ...ingredients.filter(i => i.publishedAt && i.publishedAt <= today)
      .map(i => ({ loc: `/ingredient/${i.slug}` })),
    ...cities.filter(c => c.publishedAt && c.publishedAt <= today)
      .map(c => ({ loc: `/soap/${c.slug}` })),
  ]
}
```

---

## Phase 2 — First content wave: comparison pages + category pages (Week 2–3)

~30 pages. Fastest wins based on GSC data.

### 2A. 5 GSC-confirmed comparison pages (ship together)

| Slug | Primary keyword | GSC position |
|---|---|---|
| `glycerin-vs-goat-milk-soap` | glycerin vs goat milk soap base | 10.9 |
| `goat-milk-vs-shea-butter-soap` | goat milk vs shea butter soap base | 8.8 |
| `shea-butter-vs-glycerin-soap` | shea butter vs glycerin | 5.9 |
| `neem-vs-tulsi-soap` | neem vs tulsi soap | — (new territory) |
| `honey-vs-oats-soap` | honey vs oats soap | — (new territory) |

**CDSCO note for comparison pages:**
- Use "lighter lather", "creamy feel", "suitable for sensitive skin" (skin type)
- Never: "heals", "soothes irritation", "repairs skin barrier"

### 2B. Tasks 3.15–3.17 (already in task-tracker.md)

| Task | Slug | Template |
|---|---|---|
| 3.15 | `/goat-milk-soap` | `src/app/shea-butter-soap/page.tsx` |
| 3.16 | `/soap-for-sensitive-skin` | `src/app/shea-butter-soap/page.tsx` |
| 3.17 | `/glycerin-soap` | `src/app/shea-butter-soap/page.tsx` |

### 2C. SLS-free landing page (upgrade existing blog post)

The blog post at `content/blog/sls-free-soap-india.mdx` ranks at position 9.3 for "SLS free soap India." Build a dedicated landing page at `/sls-free-soap` with:
- Product grid (all SLS-free products = all Healing Soil products)
- Mechanism section: why SLS strips glycerin from skin
- FAQ schema: "what does SLS free mean", "is handmade soap SLS free", etc.
- Cross-link to and from the blog post

**Target keywords:** SLS free soap India, soap without SLS India, paraben free soap India, sulphate free soap India.

**After week 3:** submit sitemap to GSC. Check Coverage in 2 weeks.

---

## Phase 3 — Ingredient pages (Week 4–5)

~14 ingredient pages. Two batches of 7.

**Batch 3A (week 4)** — high-priority ingredients (products with most search signal):
1. `/ingredient/neem` — targets "neem soap India", "neem tulsi soap India"
2. `/ingredient/goat-milk` — targets "goat milk soap India" (cross-links to /goat-milk-soap)
3. `/ingredient/kesar` — targets "kesar haldi soap India", "turmeric soap India"
4. `/ingredient/honey` — targets "honey soap India", "honey glycerin soap India"
5. `/ingredient/shea-butter` — targets "shea butter soap India" (cross-links to /shea-butter-soap)
6. `/ingredient/glycerin` — targets "glycerin soap India" (cross-links to /glycerin-soap)
7. `/ingredient/oats` — targets "oatmeal soap India"

**Batch 3B (week 5)** — remaining ingredients:
8. `/ingredient/tulsi`
9. `/ingredient/rose`
10. `/ingredient/pomegranate`
11. `/ingredient/orange`
12. `/ingredient/ginger`
13. `/ingredient/rosemary`
14. `/ingredient/rice`

**For each ingredient page:**
- Origin line: "Grown on our Goa farm" (neem, tulsi) or "Sourced from [supplier type]"
- Traditional use: Ayurvedic framing — "used in Indian personal care for centuries"
- Feel: physical sensory description only ("gentle lather", "earthy scent", "creamy texture")
- Products: filtered grid showing all products containing this ingredient
- FAQ: 3–5 Q&As specific to the ingredient
- CTA: bundle picker link

**After week 5:** submit sitemap. 28 pages now indexed.

---

## Phase 4 — Occasion pages + more comparisons (Month 2, week 6–8)

~20 pages.

### 4A. Occasion/use-case pages (~8 pages)

| Slug | Primary keyword |
|---|---|
| `/gift-soap-india` | handmade soap gift India |
| `/travel-soap-india` | travel soap India |
| `/soap-for-dry-skin` | soap for dry skin India |
| `/natural-soap-for-her` | natural soap gift for her India |
| `/eco-friendly-soap-india` | eco friendly soap India |
| `/corporate-gift-soap` | corporate gift soap India |
| `/neem-tulsi-soap` | neem tulsi soap India |
| `/kesar-haldi-soap` | kesar haldi soap India |

CDSCO note for `/soap-for-dry-skin`: "suitable for dry skin" (skin type) — never "treats dry skin" (therapeutic).

### 4B. Second round of comparison pages (~10 pages)

| Slug | Keywords targeted |
|---|---|
| `/compare/glycerin-vs-shea-butter-soap` | glycerin vs shea butter soap |
| `/compare/neem-soap-vs-tulsi-soap` | neem soap vs tulsi soap India |
| `/compare/goat-milk-vs-honey-soap` | goat milk vs honey soap |
| `/compare/handmade-vs-commercial-soap` | handmade soap vs commercial soap India |
| `/compare/glycerin-vs-castile-soap` | glycerin soap vs castile soap India |

---

## Phase 5 — City pages Tier 1 (Month 3, week 9–12)

~7 pages, one per Tier 1 city. These are transactional landing pages, not editorial content.

**Content per city page:**
- H1: "Handmade Soap Delivered to [City]" (keyword-first)
- Origin line: "Made in small batches on our Goa farm, shipped across India."
- Delivery note: "Ships in 4 days from Goa. Arrives in 3–7 days depending on your city."
- Products: all in-stock products (same grid as /shop)
- Reviews: surface any named [City] reviewers from reviews.ts if they exist
- FAQ: 3–5 Q&As specific to delivery and buying from another city
- CTA: bundle picker

**City pages to ship:**
1. `/soap/bangalore` (highest priority — existing buyer base, Nivre is the competition here)
2. `/soap/mumbai`
3. `/soap/pune`
4. `/soap/delhi`
5. `/soap/hyderabad`
6. `/soap/chennai`
7. `/soap/goa` (origin story angle — "made here, can also ship here")

**Cross-link:** `/soap/bangalore` should link to and from the existing blog post `/blog/handmade-soap-bangalore`.

---

## Phase 6 — Combination pages (Month 3–4)

~18–35 pages. One page per product = one ingredient × base combination. These are the most specific long-tail pages.

Derive from the 18 existing products. Each product maps to 1–2 combination slugs:

| Product | Combination slug | Keyword |
|---|---|---|
| Honey Oats Glycerin Soap | `/honey-glycerin-soap` | honey glycerin soap India |
| Neem Tulsi Goat Milk Soap | `/neem-goat-milk-soap` | neem goat milk soap India |
| Kesar Haldi Goat Milk Soap | `/kesar-goat-milk-soap` | turmeric goat milk soap India |
| Ginger Rosemary Glycerin Soap | `/ginger-glycerin-soap` | ginger glycerin soap India |
| Shea Butter Kesar Gulab | `/kesar-shea-butter-soap` | kesar shea butter soap |
| Pomegranate Goat Milk Soap | `/pomegranate-goat-milk-soap` | pomegranate goat milk soap |
| ... (one per product) | | |

These pages are short — 200–300 words, a product hero, FAQ (3 Q&As), and bundle CTA. Their value is precision: a buyer searching "neem goat milk soap India" finds an exact match.

---

## Phase 7 — Tier 2 cities + Ayurvedic pages (Month 4–6)

### 7A. Tier 2 cities (~20 pages)
Use the same `CityPage` template. Release in two batches:
- Batch A: Kolkata, Ahmedabad, Jaipur, Kochi, Coimbatore, Mysore, Chandigarh, Indore, Lucknow, Nagpur
- Batch B: Vadodara, Bhubaneswar, Visakhapatnam, Dehradun + any new Tier 1 cities that gain signal

### 7B. Ayurvedic pages (~6 pages)
Route: `src/app/ayurvedic-soap/[slug]/page.tsx`

| Slug | Keywords |
|---|---|
| `/ayurvedic-soap` | Ayurvedic soap India, Ayurvedic handmade soap India |
| `/ayurvedic-soap/neem-tulsi` | Ayurvedic neem tulsi soap |
| `/ayurvedic-soap/kesar-haldi` | Ayurvedic kesar haldi soap |
| `/ayurvedic-soap/goat-milk` | Ayurvedic goat milk soap India |
| `/ayurvedic-soap/honey-oats` | traditional honey oats soap India |
| `/ayurvedic-soap/rose` | Ayurvedic rose soap India |

Content angle: traditional use in Indian personal care. Always frame as "traditionally used in Ayurvedic personal care for centuries" — never clinical or therapeutic.

---

## Path to 500–5,000 pages (months 6–18)

Once 200 pages are indexed and earning impressions:

| Scale target | What to build | Pages added |
|---|---|---|
| 500 | Ingredient × city cross-pages (top 10 ingredients × 10 cities) | +100 |
| 500 | Remaining ingredient × base combinations | +30 |
| 500 | Expanded city coverage (35 total cities) | +15 |
| 1,000 | Full ingredient × city matrix (14 × 35) | +490 |
| 5,000 | Three-way: ingredient × base × city (14 × 3 × 35) | +1,470 more |

**Do not start ingredient × city pages until:** at least 5 ingredient pages and 5 city pages are indexed with GSC impressions. This validates the templates work before multiplying them.

---

## Content rules (applies to all programmatic pages)

### CDSCO-safe language
| Safe | Never write |
|---|---|
| "traditionally used in Ayurvedic personal care" | "antibacterial", "antifungal", "anti-inflammatory" |
| "gentle lather", "creamy texture", "earthy scent" | "treats", "cures", "heals", "relieves" + any condition |
| "suitable for sensitive skin" (skin type) | "for eczema", "for psoriasis", "for dermatitis" (condition) |
| "no SLS, no parabens" | "removes toxins", "stimulates circulation" |
| "moisturising feel", "leaves skin feeling soft" | "repairs skin barrier", "reduces pigmentation" |
| "made with natural oils and botanicals" | "anti-aging", "slows signs of ageing" |

### No founder name in any public copy
Safety constraint — never name the maker in any page, including programmatic pages. See `memory/feedback_no_maker_name.md`.

### Tone
- No urgency (made to order = no valid scarcity)
- No superlatives ("best", "most")
- No em-dashes
- Soft invitation, not a hard sell

---

## Measurement framework

**Track monthly on the 1st (extends task 3.19):**

| Metric | Baseline (May 2026) | Target (Aug 2026) |
|---|---|---|
| Total GSC impressions | ~300/month | 2,000+/month |
| Comparison page impressions | 0 (not built yet) | 500+/month |
| Ingredient page impressions | 0 | 200+/month |
| City page impressions | 2 | 100+/month |
| SLS-free landing page impressions | ~14 | 100+/month |
| Programmatic pages indexed | 0 | 80+ |
| Website orders | 0/month | 8+/month |

**After each batch:**
1. Redeploy → auto-sitemap update → submit sitemap in GSC
2. Week +2: GSC Coverage report — are new URLs indexed?
3. Week +4: GSC Performance — any impressions on new pages?
4. If a page earns 10+ impressions in 30 days at position >20: deepen the content (add 200 words, more FAQs)
5. If a page earns 0 impressions after 60 days: check indexing, check internal links pointing to it

---

## Session resume checklist

When starting a new Claude session on this work:
1. Read `docs/task-tracker.md` — current build status
2. Read `docs/execution-plan.md` (this file) — where we are in the phases
3. Run `mcp__gsc__get_top_queries` — check for new keyword signals
4. Check which `publishedAt` entries are next in the data files
5. Pick up at the current phase

---

## File summary (all files involved)

### Already exists
- `src/app/shea-butter-soap/page.tsx` — category page template
- `src/app/guide/handmade-soap-india/page.tsx` — hub page
- `src/app/blog/[slug]/page.tsx` — FAQPage schema pattern
- `src/components/BlogInlineCTA.tsx` — CTA component
- `src/lib/products.ts` — product data
- `src/lib/reviews.ts` — review data
- `next-sitemap.config.js` — sitemap config (extend with additionalPaths)
- `content/blog/sls-free-soap-india.mdx` — upgrade to landing page in Phase 2

### To build (Phase 1)
- `src/data/comparisons.ts`
- `src/data/ingredients.ts`
- `src/data/cities.ts`
- `src/data/combinations.ts`
- `src/data/occasions.ts`
- `src/app/compare/[slug]/page.tsx`
- `src/app/ingredient/[slug]/page.tsx`
- `src/app/soap/[city]/page.tsx`
- `src/components/programmatic/ComparisonPage.tsx`
- `src/components/programmatic/IngredientPage.tsx`
- `src/components/programmatic/CityPage.tsx`
- `src/components/programmatic/CombinationPage.tsx`

### To build (later phases)
- `src/data/ayurvedic.ts`
- `src/app/ayurvedic-soap/[slug]/page.tsx`
- `src/components/programmatic/AyurvedicPage.tsx`
- `/sls-free-soap` — new landing page (upgrade from blog)
- `/gift-soap-india`, `/travel-soap-india`, `/soap-for-dry-skin` — flat occasion pages
