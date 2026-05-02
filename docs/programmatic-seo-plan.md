# Programmatic SEO Plan — Healing Soil (healingsoil.in)

Last updated: 2026-05-02. Status: Strategy approved, implementation not started.
Read `task-tracker.md` for current task status. Read `growth-strategy.md` for LP and audience context.

---

## Context

The site has 13 soap blog posts, 1 hub page (`/guide/handmade-soap-india`), and 3 planned category pages (tasks 3.15–3.17). Programmatic SEO adds a long-tail layer: hundreds of targeted pages generated from structured data files, published in weekly batches of 20–50.

**GSC signal (last 28 days) drives the priority order:**
- Comparison queries (glycerin vs goat milk, shea butter vs glycerin) already appear at positions 5–11. Fastest page-1 wins.
- "Shea butter soap" has 30 impressions at position 41 — category page needed.
- City queries have almost no signal yet — long-tail volume play for months 3–6.

**Scale target:** 200 quality pages in 6 months, data model scales to 5,000 via three-way combinations (ingredient × base × city) later. SKUs stay roughly fixed at 18.

---

## Page taxonomy (7 types, ~500 pages at maturity)

### Type 1 — Comparison pages (~20 pages) — ship first
Route: `src/app/compare/[slug]/page.tsx`
URL pattern: `/compare/glycerin-vs-goat-milk-soap`
Data file: `src/data/comparisons.ts`

Start with the 5 GSC-confirmed queries:

| Query | Impressions | Position |
|---|---|---|
| glycerin vs goat milk soap base | 44 | 10.9 |
| goat milk vs shea butter soap base | 20 | 8.8 |
| shea butter vs glycerin | 19 | 5.9 |
| glycerin soap vs goat milk soap | 15 | 7.5 |
| shea butter vs goat milk soap | 14 | 18.6 |

Content structure per page: H1 (comparison question) → comparison table (base, lather, feel, best skin type) → section on each side → verdict → filtered product grid → FAQPage schema (3–5 Q&As) → bundle CTA.

Then expand to 15 more base/ingredient comparisons (neem vs tulsi, glycerin vs shea butter, honey vs oats, etc.).

### Type 2 — Base/ingredient category pages (~10 pages)
Already planned as tasks 3.15–3.17. Template exists at `src/app/shea-butter-soap/page.tsx`.

Planned: `/goat-milk-soap`, `/glycerin-soap`, `/soap-for-sensitive-skin`
Extend to: `/neem-tulsi-soap`, `/honey-oats-soap`, `/kesar-haldi-soap`, `/travel-soap`, `/gift-soap-india`

CDSCO note on sensitive skin page: "suitable for sensitive skin" (skin type) — never "for eczema/psoriasis" (condition).

### Type 3 — Ingredient detail pages (~15 pages)
Route: `src/app/ingredient/[slug]/page.tsx`
URL: `/ingredient/neem`, `/ingredient/goat-milk`
Data file: `src/data/ingredients.ts`
Keywords: "[ingredient] soap India", "soap with [ingredient]"

Ingredients to cover (from product data): neem, tulsi, goat milk, glycerin, shea butter, honey, oats, kesar, haldi/turmeric, rose, pomegranate, orange, ginger, rosemary.

Data shape per ingredient:
```ts
{
  slug: string
  name: string
  tagline: string           // "Used in Ayurvedic personal care for centuries"
  origin: string            // "Grown on the Goa farm" | "Sourced from..."
  traditionalUse: string    // CDSCO-safe framing only
  feel: string              // "gentle lather", "earthy scent"
  relatedProducts: string[] // product slugs
  faqs: { q: string; a: string }[]
  publishedAt: string | null
}
```

### Type 4 — City delivery pages (~35 pages)
Route: `src/app/soap/[city]/page.tsx`
URL: `/soap/bangalore`, `/soap/mumbai`
Data file: `src/data/cities.ts`
Keywords: "handmade soap [city]", "natural soap delivered [city]"

Tier 1 cities (ship month 3): Bangalore, Mumbai, Pune, Delhi, Hyderabad, Chennai, Goa
Tier 2 cities (ship month 4–6): Kolkata, Ahmedabad, Jaipur, Surat, Lucknow, Kochi, Coimbatore, Indore, Bhopal, Nagpur, Chandigarh, Bhubaneswar, Guwahati, Dehradun, Mysore, Vadodara, Visakhapatnam...

Note: `/handmade-soap-bangalore` already exists as a blog post (editorial). City landing pages are transactional — they coexist and cross-link.

### Type 5 — Ingredient × base combination pages (~30–50 pages)
Route: `src/app/[slug]/page.tsx` (flat keyword-rich URL)
URL: `/neem-goat-milk-soap`, `/honey-glycerin-soap`, `/kesar-shea-butter-soap`
Data file: `src/data/combinations.ts`
Keywords: "neem goat milk soap India", "honey glycerin soap India"

GSC already shows "glycerin neem soap" at position 69. Derive ~35 combinations from the 18 existing products (each product is one ingredient+base pair).

### Type 6 — Occasion/use-case pages (~12 pages)
Route: `src/app/[slug]/page.tsx` (flat)
URL: `/gift-soap-india`, `/travel-soap-india`, `/natural-soap-gift-india`
Data file: `src/data/occasions.ts`
Keywords: "handmade soap gift India", "travel soap India", "eco-friendly soap India"

Low complexity — mostly static content with a product grid filter. Ship in month 2.

### Type 7 — Ayurvedic/traditional pages (~12 pages)
Route: `src/app/ayurvedic-soap/[slug]/page.tsx`
URL: `/ayurvedic-soap/neem-tulsi`, `/ayurvedic-soap/kesar-haldi`
Keywords: "Ayurvedic soap India", "traditional Indian neem soap"

Content angle: traditional use in Indian personal care. Ship months 5–6.

---

## Technical architecture

### Staggered release mechanism

Every data entry has a `publishedAt` field. `generateStaticParams()` filters to published entries only:

```ts
// src/data/comparisons.ts (same pattern for all data files)
export const comparisons: ComparisonPage[] = [
  {
    slug: "glycerin-vs-goat-milk-soap",
    publishedAt: "2026-05-10",   // set this date to publish
  },
  {
    slug: "neem-vs-tulsi-soap",
    publishedAt: null,           // null = draft, not live
  },
]

// src/app/compare/[slug]/page.tsx
export async function generateStaticParams() {
  const today = new Date().toISOString()
  return comparisons
    .filter(c => c.publishedAt && c.publishedAt <= today)
    .map(c => ({ slug: c.slug }))
}
```

To release a weekly batch: set `publishedAt` to today on 20–50 entries and redeploy. No code changes needed.

### File structure

```
src/data/
  comparisons.ts     // Type 1
  ingredients.ts     // Type 3
  cities.ts          // Type 4
  combinations.ts    // Type 5
  occasions.ts       // Type 6
  ayurvedic.ts       // Type 7

src/components/programmatic/
  ComparisonPage.tsx
  IngredientPage.tsx
  CityPage.tsx
  CombinationPage.tsx
```

Route files are thin wrappers (load data → generate metadata → render template component). Pattern identical to existing `src/app/shea-butter-soap/page.tsx`.

### Schema.org on every programmatic page

- `FAQPage` (3–5 Q&As, same pattern as `src/app/blog/[slug]/page.tsx`)
- `BreadcrumbList`
- `ItemList` for filtered product grids
- `Product` for single-product pages

### Sitemap extension

In `next-sitemap.config.js`, add `additionalPaths` per dynamic route. Filter to `publishedAt <= today` so drafts never appear in the sitemap.

---

## Release cadence

| Month | Pages | What ships |
|---|---|---|
| 1 | ~30 | 5 GSC-confirmed comparison pages + tasks 3.15–3.17 + 5 more comparisons |
| 2 | ~30 | All 14 ingredient pages + 6 occasion pages |
| 3 | ~25 | Tier 1 city pages (7 cities) + 18 combination pages |
| 4 | ~40 | Tier 2 cities (20 more) + 10 more comparison pages |
| 5–6 | ~80 | Remaining combinations + Ayurvedic pages + remaining Tier 2 cities |

Path to 500: remaining ingredient × base combinations.
Path to 1,000: ingredient × city cross-pages (13 × 35 cities = ~450 pages).
Path to 5,000: three-way combinations (ingredient × base × city) — recommended only after 500 pages are indexed and earning impressions.

---

## CDSCO compliance rules per page type

| Page type | Safe | Never write |
|---|---|---|
| Ingredient pages | "traditionally used in Ayurvedic personal care", "gentle lather", "earthy scent" | "antibacterial", "anti-inflammatory", "repairs skin" |
| City pages | "handmade, shipped from Goa", "no SLS or parabens" | Any therapeutic claim |
| Comparison pages | "lighter lather", "creamy feel", "suitable for sensitive skin" | "heals", "repairs skin barrier", "reduces pigmentation" |
| Sensitive skin pages | "suitable for sensitive skin" (skin type) | "for eczema/psoriasis/dermatitis" (condition) |
| Ayurvedic pages | "used in Ayurvedic personal care for centuries" | Clinical citations, "treats" + any condition |

---

## Internal linking graph

- Ingredient pages link to: their category page, products containing them, related comparison pages
- City pages link to: home page bundle (`/#bundle`), shop page, matching blog post if one exists
- Comparison pages link to: both category pages, relevant products
- Hub page `/guide/handmade-soap-india` links to: all category pages (already built — update as new pages ship)
- Blog posts link to: related ingredient pages and comparison pages (add links as pages go live)

---

## Critical files

| File | Role |
|---|---|
| `src/app/shea-butter-soap/page.tsx` | Template to replicate for all programmatic pages |
| `src/app/blog/[slug]/page.tsx` | FAQPage schema pattern to copy |
| `src/lib/products.ts` → `getProducts()` | Reuse for filtered product grids |
| `src/lib/reviews.ts` | Per-product review data for product schema |
| `src/components/BlogInlineCTA.tsx` | CTA component to reuse in templates |
| `next-sitemap.config.js` | Extend `additionalPaths` for new routes |
| `src/app/guide/handmade-soap-india/page.tsx` | Hub page — add links as new pages ship |

---

## Verification

After each weekly batch:
1. Redeploy → sitemap auto-updates → submit sitemap in GSC
2. Week +2: check GSC Coverage for new URLs indexed
3. Week +4: check GSC Performance for impressions on new pages
4. Monthly (task 3.19): add "programmatic pages impressions" row to monthly check-in table
5. Target: comparison pages hit page 1 within 60 days (GSC already shows pos 5–11)

---

## Competitive analysis

See `docs/competitive-analysis-bangalore.md` for a breakdown of the 4 Bangalore competitors analyzed on 2026-05-02 and how to beat them.
