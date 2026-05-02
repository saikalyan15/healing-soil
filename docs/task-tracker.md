# Growth Task Tracker

Living status for the "bring customers to the website" plan. Update the **Status** column as work progresses. If you open a fresh Claude chat, point it at this file first — every row has enough context to resume cold.

**Source docs** (read these for "why," not for status):
- [growth-strategy.md](growth-strategy.md) — Stage 1–3 research + site diagnosis (April 2026)
- [HealingSoil-BuildPlan-FINAL.docx](HealingSoil-BuildPlan-FINAL.docx) — original March 2026 build plan
- Plan this tracker executes: `C:\Users\sai\.claude\plans\how-to-bring-customers-binary-bengio.md`

**Status values:** `TODO` · `WIP` · `DONE` · `BLOCKED` (add a note why)
**Owner values:** `Claude` (code / content edits inside repo) · `Owner` (manual / off-repo / requires your accounts)

Last updated: 2026-05-02 (session 6 — ingredient batch 2, 8 occasion pages, 27 city pages, 6 Ayurvedic pages built; all publishedAt: null; routes fixed)

---

## Layer 1 — Plug the leaks (Week 1)

Ship the LP rewrite and the 3 small conversion fixes first. This is the single highest-ROI sprint.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 1.1 | Implement drafted LP copy into home page | Claude | DONE | Implemented in [src/app/page.tsx](../src/app/page.tsx). Section order: Hero → Bundle → Mechanism → Riya secondary → Promises → Reviews grid → Soft close. |
| 1.2 | Scrub maker name across 4 surfaces | Claude | DONE | Verified 2026-04-22: no maker name in page.tsx, our-story/page.tsx, or privacy-policy/page.tsx. our-story now shows farm-cashew-tree.jpg, not founder photo. |
| 1.3 | Replace `public/founder.jpg` | Owner | TODO | File still exists at `public/founder.jpg` (not referenced by any page, but should be deleted or replaced). Replace with farm shot or hands shot. |
| 1.4 | Build "pick 4" bundle block on home | Claude | DONE | BundlePicker component live at `#bundle`. Hero CTA anchors to `#bundle`. Default SKUs wired in. |
| 1.5 | Add referral share block to post-order screen | Claude | TODO | Target: [src/components/OrderPageClient.tsx](../src/components/OrderPageClient.tsx) `step='send'` block. WhatsApp deep link with prefilled text + LP URL. Line: "If this works for you, send our page to someone who might need it. That is how most of our customers found us." |
| 1.6 | Unify delivery time copy across 6 surfaces | Claude | DONE | Verified 2026-04-22: canonical line live on page.tsx, shop/page.tsx:40, OrderPageClient.tsx:165, order/confirmation/page.tsx:44, order/track/page.tsx:43. |
| 1.7 | Fix Product Schema.org on `/shop/[slug]` | Claude | DONE | Verified 2026-04-22: return policy is `MerchantReturnNotPermitted`. aggregateRating only fires when product-specific reviews exist (empty array returned otherwise per reviews.ts:127). |
| 1.8 | Install Meta Pixel | Claude | BLOCKED | Blocked on 1.10 (privacy policy). Target: [src/app/layout.tsx](../src/app/layout.tsx) alongside GA4. Owner to provide Pixel ID after creating a Meta Business account if not yet done. |
| 1.9 | Add email capture (footer + post-order) | Claude | BLOCKED | Blocked on 1.10 and on owner picking Brevo vs MailerLite (both have free tiers — Brevo: 300 emails/day, MailerLite: 12k/mo up to 1k subs). Owner to create account and share API key. |
| 1.10 | Privacy policy page update | Claude | TODO | Existing page at `src/app/privacy-policy/page.tsx`. Needs clause for Meta Pixel + email list (Brevo/MailerLite) + retention policy. Prerequisite for 1.8 and 1.9. |
| 1.11 | Confirm Instagram bio link points to healingsoil.in | Owner | TODO | Build plan Table 1 "Fix the Funnel Now" — check the IG bio link is `https://healingsoil.in` (or `/shop`), not a WhatsApp community link and not the retired `/our-products`. |
| 1.12 | Update Instagram bio text | Owner | TODO | 3 lines: "Handmade soaps from Goa. / No chemicals. Small batch. Made to order. / Shop via link below." |
| 1.13 | Turn on Instagram DM notifications | Owner | TODO | Settings → Notifications → Messages and Calls → all on. Build plan called "Lost DMs" a concrete revenue leak. |
| 1.14 | Set up Instagram Saved Replies | Owner | TODO | Create 3: (a) how to order, (b) ingredient questions, (c) do you ship to [city]. Template copy in HealingSoil-BuildPlan-FINAL.docx Table 1. |
| 1.15 | Change Instagram profile picture to a soap bar | Owner | TODO | Currently soil. Build plan specifically called out: buyer needs to see the product, not the brand metaphor. |
| 1.16 | Connect Facebook page to Instagram in Meta Business Suite | Owner | TODO | Unified inbox so no DM is missed. business.facebook.com. |

---

## Layer 2 — Activate existing customers (Week 1–2)

31 past customers, 41-day reorder gap, 21% repeat rate. Reactivating this base is the fastest path to a second month's revenue.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 2.1 | WhatsApp the 10 existing reviewers — reorder nudge | Owner | TODO | One personalised message each. Suggest a soap they haven't tried. 10 reviewers listed in [src/lib/reviews.ts](../src/lib/reviews.ts). |
| 2.2 | WhatsApp the 10 existing reviewers — referral ask | Owner | TODO | Separate message from 2.1. Ask: "send our page to one person whose skin has been giving them trouble." |
| 2.3 | Send UGC briefs to 10 customers | Owner | TODO | Offer: free travel soap (₹50 cost) in exchange for a 30-sec phone video review. Collect videos in one folder; they become material for Layer 4 reels. |
| 2.4 | Build day-35 reorder reminder list | Owner | TODO | Pull customer list from SoapLedger filtered by `delivered_at >= 35 days ago AND no reorder`. Manual WhatsApp nudge for now — do not automate yet. |
| 2.5 | Rename the 3 anonymous reviewers | Owner | BLOCKED | Blocked on first-name lookup (permission granted 2026-04-22). Once named, Claude updates [src/lib/reviews.ts:39-61](../src/lib/reviews.ts). review-004 ("does not lather up like regular ones") is priority. |

---

## Layer 3 — Compound existing content for search (Week 2–6)

Biggest unused lever. Fix the inventory first, then optimise what ranks, then write the gaps.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 3.1 | Triage 94 not-indexed pages in GSC | Owner | DONE | Confirmed 2026-04-24: 18 pages with redirect (legacy domain variants + old URLs), 7 not-found 404s, 38 discovered-not-indexed (new content, Google will index), 20 crawled-not-indexed, rest are canonical/noindex. Legacy confirmed from pre-pivot blog. |
| 3.2 | Remove legacy URLs properly | Owner | DONE | Owner submitted GSC removal requests 2026-04-24 for 4 real 404s: `/home/`, `/diy-neem-soap-slow-living/`, `/recommends/the-indian-chai-calming-vata-dosha-tea/`, `/our-stories-2/`. Redirects for domain variants (http/www) confirmed working. |
| 3.3 | Rewrite title/description on the ranking blog post | Claude | DONE | All 3 ranking posts updated 2026-04-24: India-first titles, excerpts with keywords and mechanism. See [glycerin-vs-goat-milk-soap.mdx](../content/blog/glycerin-vs-goat-milk-soap.mdx), [shea-butter-goat-milk-soap-dry-sensitive-skin.mdx](../content/blog/shea-butter-goat-milk-soap-dry-sensitive-skin.mdx), [understanding-the-benefits-of-shea-butter-in-soap.mdx](../content/blog/understanding-the-benefits-of-shea-butter-in-soap.mdx). On-page deepening done 2026-04-25: glycerin-vs-goat-milk-soap expanded to ~650 words, "soap base" added throughout, comparison table added, FAQ updated with direct "glycerin vs goat milk soap base" question. |
| 3.4 | Rewrite titles/descriptions on top 5 blog posts | Claude | TODO | After 3.3 validates (2–4 weeks). Same India-first pattern for remaining 6 posts. |
| 3.5 | Add inline bundle CTA + end-of-post card to every blog post | Claude | DONE | Done 2026-04-24. [BlogInlineCTA.tsx](../src/components/BlogInlineCTA.tsx) renders above content on all 9 blog posts. End-of-post card updated: links to `/#bundle`, references starter bundle + ₹1,000 price. |
| 3.6 | Stories → blog → product internal linking | Claude | DONE | Done 2026-04-24. Every blog post links to hub page `/guide/handmade-soap-india`. Hub page links to all 9 posts + 2 stories. Individual posts link to each other where relevant. |
| 3.7 | Add FAQPage schema to each blog post | Claude | DONE | Done 2026-04-24. FAQPage schema added to 3 ranking blog posts (12 Q&As total) in [blog/[slug]/page.tsx](../src/app/blog/%5Bslug%5D/page.tsx). Extend to remaining posts as they get title rewrites. |
| 3.7a | Add llms.txt at domain root | Claude | DONE | Done 2026-04-24. [public/llms.txt](../public/llms.txt) — brand facts, product categories, canonical URLs, key ingredient claims, FAQs. LLM retrieval signal. |
| 3.7b | Add Organization schema site-wide | Claude | DONE | Done 2026-04-24. JSON-LD added to [layout.tsx](../src/app/layout.tsx) — name, URL, logo, foundingLocation (Goa), areaServed (IN), sameAs (Instagram). |
| 3.7c | Build hub page /guide/handmade-soap-india | Claude | DONE | Done 2026-04-24. [src/app/guide/handmade-soap-india/page.tsx](../src/app/guide/handmade-soap-india/page.tsx). ~2,000 words. Article + FAQPage schema (5 Q&As). Links to all 9 blog posts + 2 stories. Targets "handmade soap India" head term. |
| 3.8 | Write "SLS-free soap India" blog post | Claude | DONE | Done 2026-04-24. [sls-free-soap-india.mdx](../content/blog/sls-free-soap-india.mdx). FAQPage schema (5 Q&As) added to [blog/[slug]/page.tsx](../src/app/blog/%5Bslug%5D/page.tsx). BlogInlineCTA and end-of-post bundle card auto-wired. |
| 3.9 | Write "The problem with commercial soap: SLS and parabens" blog post | Owner | TODO | Companion to 3.8. HIGH intent. |
| 3.10 | Write "Handmade soap Goa" blog post | Owner | TODO | 100–500 searches, VERY LOW competition. Local-origin anchor, target `/shop`. |
| 3.11 | Write "Handmade soap Bangalore" blog post | Owner | TODO | Bangalore-heavy buyer base; low competition. |
| 3.12 | Write "Natural soap for sensitive skin India" blog post | Owner | TODO | 500–1K searches. Anchors to the Krutika LP story and the starter bundle. |
| 3.13 | Set up Google Business Profile | Owner | BLOCKED | Blocked: business not formally registered. Revisit when registration is complete. |
| 3.14 | Add "leave a Google review" link to delivered-order WhatsApp flow | Owner | TODO | After 3.13 is live. Every delivered order → WhatsApp message with the Google review link. |
| 3.15 | Build `/goat-milk-soap` category page | Claude | DONE | Shipped 2026-05-02. [src/app/goat-milk-soap/page.tsx](../src/app/goat-milk-soap/page.tsx). Filters `p.base === 'Goat Milk'`. FAQPage + BreadcrumbList schema. BlogInlineCTA. |
| 3.16 | Build `/soap-for-sensitive-skin` category page | Claude | DONE | Shipped 2026-05-02. [src/app/soap-for-sensitive-skin/page.tsx](../src/app/soap-for-sensitive-skin/page.tsx). Shows all in-stock products. CDSCO checked — uses "suitable for sensitive skin" (skin type only). |
| 3.17 | Build `/glycerin-soap` category page | Claude | DONE | Shipped 2026-05-02. [src/app/glycerin-soap/page.tsx](../src/app/glycerin-soap/page.tsx). Filters `p.base === 'Glycerine'`. Mechanism story (glycerin retained) included in copy. |
| 3.18 | Decide fate of `content/blog/best-natural-soap-for-eczema.mdx` | Owner | TODO | Currently `published: false` but lives in repo with eczema-as-condition framing — CDSCO violation if it ever ships. Recommendation: delete (Option A in [category-pages-execution.md](category-pages-execution.md) §"Session 4"). Overlaps with 3.16 anyway. |
| 3.19 | Monthly GSC snapshot on the 1st of each month | Owner | TODO (recurring) | Replaces weekly checks — weekly is noise at this volume. On the 1st, record clicks, impressions, position, distinct ranking queries in [growth-strategy.md](growth-strategy.md) monthly check-in table. Apply Country=India filter when reading. No tactical changes mid-month. 90-day re-evaluation gate is 2026-07-28 per [gsc-traffic-diagnosis-2026-04-28.md](gsc-traffic-diagnosis-2026-04-28.md). |

---

## Layer 4 — Instagram (Week 3 onward)

Start at 221 followers. Dialled-down cadence: 3 posts/week (one is a reel). Alternate reel type week-to-week.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 4.1 | Weekly product or ingredient post | Owner | TODO | Close-up, in use, or ingredient callout. Caption line 1: "Order via link in bio." |
| 4.2 | Weekly customer review post | Owner | TODO | Screenshot of a real review or clean graphic over a product photo. Primary trust-transfer unlock (no founder face). |
| 4.3 | Weekly reel — rotate types | Owner | TODO | Alternate: (a) process — soap cutting/curing/packing, silent + captions, (b) ingredient storytelling (15-sec per ingredient), (c) customer UGC from 2.3, (d) before/after skin-feel stories via WhatsApp. |
| 4.4 | Atomise 23 story posts into reel scripts | Claude | TODO | One-pager per story with: hook (3 sec), body (12 sec), end card ("link in bio"). Deliverable: a single markdown file `docs/reel-scripts.md` that owner can work through. |

---

## Layer 5 — Paid + offline (deferred until ≥₹50k/month except 5.1)

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 5.1 | One Bangalore farmers market or yoga studio trial | Owner | TODO | Budget ₹500–1,500. Collect emails + WhatsApp numbers in person on a clipboard. Post-event WhatsApp follow-up within 48 hours. Use the day for IG content too. |
| 5.2 | Paid Meta/Google ads | Owner | BLOCKED | Blocked on: (a) revenue ≥ ₹50k/month, (b) creative library from Layers 2+4, (c) warm-audience pool from Pixel installed in 1.8. Revisit — do not start early. |

---

## Layer 6 — Programmatic SEO (Month 1–6)

Execution detail in [docs/execution-plan.md](execution-plan.md). Keyword list in [docs/keyword-list.md](keyword-list.md). Competitor analysis in [docs/competitive-analysis-bangalore.md](competitive-analysis-bangalore.md).

**Architecture:** data files in `src/data/` drive dynamic routes. `publishedAt` field controls which pages are live. Release 20–50 pages per batch by setting dates and redeploying. 100 target keywords across 6 clusters.

**Checkin = deploy (auto-deploy pipeline).** Always build new entries with `publishedAt: null`. When ready to release a batch, run the stamp script, review the git diff, then check in:

```sh
node scripts/stamp-batch.js src/data/ingredients.ts 7
node scripts/stamp-batch.js src/data/cities.ts 7
node scripts/stamp-batch.js src/data/occasions.ts 8
```

Adjust the file path and count for whichever batch you are releasing. The script stamps the next N `publishedAt: null` entries with today's date in order.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 6.1 | Build comparison page infrastructure | Claude | DONE | Shipped 2026-05-02. `src/data/comparisons.ts`, `src/app/compare/[slug]/page.tsx`, `src/components/programmatic/ComparisonPage.tsx`. `dynamicParams = false` set. |
| 6.2 | Build ingredient page infrastructure | Claude | DONE | Shipped 2026-05-02. `src/data/ingredients.ts`, `src/app/ingredient/[slug]/page.tsx`, `src/components/programmatic/IngredientPage.tsx`. |
| 6.3 | Build city page infrastructure | Claude | DONE | Shipped 2026-05-02. `src/data/cities.ts`, `src/app/soap/[city]/page.tsx`, `src/components/programmatic/CityPage.tsx`. |
| 6.4 | Extend next-sitemap.config.js | Claude | DONE | Shipped 2026-05-02. `additionalPaths` added for compare/ingredient/soap routes. Regex bug fixed to handle multi-line entries with nested FAQ arrays. |
| 6.5 | Populate + ship 5 GSC-confirmed comparison pages | Claude | DONE | Shipped 2026-05-02. All 5 in `src/data/comparisons.ts` with `publishedAt: '2026-05-02'`. CDSCO-reviewed. |
| 6.6 | Build SLS-free landing page `/sls-free-soap` | Claude | DONE | Shipped 2026-05-02. `src/app/sls-free-soap/page.tsx`. Targets "SLS free soap India" (GSC position 9.3). Cross-links to blog post. |
| 6.7 | Ship 14 ingredient pages (2 batches of 7) | Claude | DONE | Batch 1 (2026-05-02, live): neem, tulsi, goat-milk, glycerin, shea-butter, honey, oats. Batch 2 (publishedAt: null, ready to stamp): kesar, haldi, rose, pomegranate, orange, ginger, rosemary. |
| 6.8 | Ship occasion pages (8 pages) | Claude | DONE | Built 2026-05-02 (publishedAt: null). Route: `src/app/occasion/[slug]/page.tsx`. Component: `OccasionPage.tsx`. All 8 slugs in `src/data/occasions.ts`. Stamp to release. |
| 6.9 | Ship 5 more comparison pages | Claude | DONE | Shipped 2026-05-02: neem-tulsi-vs-kesar-haldi-soap, ginger-rosemary-vs-neem-tulsi-soap, honey-oats-vs-kesar-haldi-soap, pomegranate-vs-orange-soap, handmade-vs-commercial-soap. ComparisonPage.tsx fixed to conditionally hide empty productsB section. |
| 6.10 | Ship Tier 1 city pages (7 cities) | Claude | DONE | Built 2026-05-02 (publishedAt: null). All 7 in `src/data/cities.ts`. Route `src/app/soap/[city]/page.tsx` already existed. Stamp to release. |
| 6.11 | Ship ingredient × base combination pages | Claude | TODO | Phase 6. ~18 pages, one per product. Flat keyword-rich URLs e.g. `/neem-goat-milk-soap`. Data file: `src/data/combinations.ts`. |
| 6.12 | Ship Tier 2 city pages (20 cities) | Claude | DONE | Built 2026-05-02 (publishedAt: null). All 20 in `src/data/cities.ts`. Stamp to release in batches. |
| 6.13 | Build Ayurvedic pages (6 pages) | Claude | DONE | Built 2026-05-02 (publishedAt: null). Route: `src/app/ayurvedic-soap/[slug]/page.tsx`. Component: `AyurvedicPage.tsx`. Data: `src/data/ayurvedic.ts`. Stamp to release. |
| 6.14 | Monthly GSC review: add programmatic impressions row | Owner | TODO (recurring) | On the 1st of each month, record impressions from compare/*, ingredient/*, soap/* routes separately from blog impressions. Target: 500+ comparison impressions by Aug 2026. |

---

## Monthly check-in metrics (track these, not vanity)

Record numbers on the first of each month so trend is visible.

| Month | Website orders | GSC clicks | Reorder rate | Email list size | IG followers | Notes |
|---|---|---|---|---|---|---|
| 2026-04 (baseline) | 0 | ~8 | 21% | 0 | 221 | Pre-plan baseline |
| 2026-05 | | | | | | |
| 2026-06 | | | | | | |
| 2026-07 | | | | | | |

**Targets by end of 2026-07 (90 days):** website orders ≥ 8/month; GSC clicks ≥ 40/month; reorder rate ≥ 30%; email list ≥ 150; IG followers 500–700.
