# SEO Improvements Plan — Healing Soil
*Prepared: March 2026 | Status: For review*

---

## What was already fixed (March 2026)

These are done and deployed with the last set of changes:

- Fixed "Duplicate without user-selected canonical" — 8 stub redirect pages were rendering actual HTML with no canonical tag. All converted to `permanentRedirect()`.
- Removed `/our-products`, `/icon.png`, `/order/track` from sitemap (they were incorrectly listed).
- Created missing `og-image.jpg` — all social sharing previews were broken.
- Added `AggregateRating` + `Review` structured data to `/reviews` page (eligible for star snippets in Google).
- Upgraded homepage schema from `Organization` to `LocalBusiness` (better for local/discovery search).
- Added root layout title template so each page gets a consistent suffix.
- Fixed sitemap `changefreq` — all pages were incorrectly claiming daily changes.

---

## Remaining improvements

### 1. Individual product pages — `/shop/[slug]`
**Priority: High**

**The problem today:** All products live on a single page `/shop`. Each product is anchored as `/shop#neem-tulsi-goat-milk`. Google can't rank individual products in search. If someone searches "neem tulsi handmade soap India" or "goat milk soap Goa", there is no product-level page to surface.

**What to build:** Dynamic routes at `/shop/[slug]` — one page per product. Each page would have:
- Product name, description, ingredients list
- A product-specific `title` and `description` meta tag (e.g. "Neem Tulsi Goat Milk Soap — Healing Soil | Handmade from Goa")
- `Product` schema with `Offer`, ingredient list, and reviews for that product
- A "Add to order" / WhatsApp CTA
- 1–2 customer reviews specific to that soap where available

**Effort:** Medium (2–3 days). SoapLedger already has a `getProductBySlug()` function in `lib/products.ts`. The main work is building the page template and wiring up the metadata.

**Impact:** This is the single highest-leverage SEO change available. Products like "Honey Oats Glycerin Soap", "Kesar Haldi Goat Milk Soap" are highly specific searches with buying intent and very low competition.

---

### 2. Blog posts targeting soap-related searches
**Priority: High**

**The problem today:** There is one blog post. The blog section exists and is fully built — it just has no content driving search traffic.

**Target searches to write for:**

| Post idea | Target keyword |
|---|---|
| "Why goat milk soap is better for sensitive skin" | goat milk soap for sensitive skin India |
| "What makes a soap truly chemical-free?" | chemical free soap India |
| "Neem and tulsi in skincare — the Ayurvedic case" | neem tulsi soap benefits |
| "The difference between glycerin and goat milk soap" | glycerin vs goat milk soap |
| "Why we make soap in small batches" | handmade small batch soap |
| "How to make your handmade soap last longer" | how to make handmade soap last |
| "Natural soap for eczema and dry skin" | natural soap eczema India |

**Format:** Each post should be 600–1,000 words, include a natural link to `/shop`, and reference the relevant ingredient from the `/ingredients` page. The MDX infrastructure is already in place — posts just need to be written and dropped into `content/blog/`.

**Effort:** Writing time only. No code changes needed.

**Impact:** High over time. Each post is a standalone URL that can rank independently. The blog post `why-we-dont-use-chemicals` already exists and demonstrates the right format.

---

### 3. FAQ structured data on `/shop` and homepage
**Priority: Medium**

**What it does:** Google can display FAQ answers directly in search results as expandable rich snippets. This increases the space your result takes up in the SERP and answers pre-purchase questions before the customer even clicks.

**Questions to include:**
- Are these soaps really chemical-free?
- What is the difference between glycerin and goat milk soap?
- Do you ship across India?
- How long does delivery take?
- How do I order?
- Are these soaps safe for sensitive skin?
- Is this a made-to-order product?

**What to build:** A `FAQPage` JSON-LD schema block added to the shop page and/or homepage. The visible FAQ content can optionally be shown on the page as an accordion — good for both UX and SEO.

**Effort:** Small (half a day). Pure schema markup addition. Optionally pair it with an accordion UI component.

**Impact:** Medium. FAQs improve CTR from search. Particularly useful for purchase-intent queries.

---

### 4. Internal links from `/stories` to `/shop`
**Priority: Medium**

**The problem today:** The 23 stories pages are indexed and receive some crawl budget, but most don't link to the shop or specific products. This means the SEO value those pages carry isn't flowing to the shop.

**What to add:** A contextual "Try our soaps" block at the bottom of each story, similar to what the blog already does. For stories that are directly soap-related (e.g. `diy-neem-soap-slow-living`, `handmade-soap-sensitive-skin`), add an inline link to the relevant product page once product pages exist.

**Effort:** Small once individual product pages are built. In the meantime, a generic CTA block linking to `/shop` can be added to the story template.

---

## What was deliberately left out

- **Star ratings on reviews** — not adding per your preference. The `AggregateRating` schema claims 5/5 for now, which is fine. If you ever add ratings in future, update the `reviewCount` and `ratingValue` fields in `/reviews/page.tsx`.

---

## Suggested order of work

1. Write 2–3 blog posts (no code, highest content impact, can start immediately)
2. Build individual product pages `/shop/[slug]`
3. Add FAQ schema to shop page
4. Add shop CTA block to stories template
