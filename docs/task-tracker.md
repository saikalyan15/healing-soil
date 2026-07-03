# Growth Task Tracker

Living status for the "bring customers to the website" plan. Update the **Status** column as work progresses. If you open a fresh Claude chat, point it at this file first — every row has enough context to resume cold.

**Source docs** (read these for "why," not for status):
- [growth-strategy.md](growth-strategy.md) — Stage 1–3 research + site diagnosis (April 2026)
- [HealingSoil-BuildPlan-FINAL.docx](HealingSoil-BuildPlan-FINAL.docx) — original March 2026 build plan
- Plan this tracker executes: `C:\Users\sai\.claude\plans\how-to-bring-customers-binary-bengio.md`

**Status values:** `TODO` · `WIP` · `DONE` · `BLOCKED` (add a note why)
**Owner values:** `Claude` (code / content edits inside repo) · `Owner` (manual / off-repo / requires your accounts)

Last updated: 2026-07-03 (session 12 — July GSC/GA snapshot recorded; pomegranate + shea + loofah + sensitive-skin CTR/depth fixes; recommendation CTA button added to all /soap-for/ decision pages; GA4 MCP connector registered for Claude Code)

---

## Layer 1 — Plug the leaks (Week 1)

Ship the LP rewrite and the 3 small conversion fixes first. This is the single highest-ROI sprint.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 1.1 | Implement drafted LP copy into home page | Claude | DONE | Implemented in [src/app/page.tsx](../src/app/page.tsx). Section order: Hero → Bundle → Mechanism → Riya secondary → Promises → Reviews grid → Soft close. |
| 1.2 | Scrub maker name across 4 surfaces | Claude | DONE | Verified 2026-04-22: no maker name in page.tsx, our-story/page.tsx, or privacy-policy/page.tsx. our-story now shows farm-cashew-tree.jpg, not founder photo. |
| 1.3 | Replace `public/founder.jpg` | Owner | TODO | File still exists at `public/founder.jpg` (not referenced by any page, but should be deleted or replaced). Replace with farm shot or hands shot. |
| 1.4 | Build "pick 4" bundle block on home | Claude | DONE | BundlePicker component live at `#bundle`. Hero CTA anchors to `#bundle`. Default SKUs wired in. |
| 1.5 | Add referral share block to post-order screen | Claude | DONE | Added below the "No WhatsApp?" line in [src/components/OrderPageClient.tsx](../src/components/OrderPageClient.tsx) `step='send'` block. WhatsApp share link with prefilled message pointing to healingsoil.in. |
| 1.6 | Unify delivery time copy across 6 surfaces | Claude | DONE | Verified 2026-04-22: canonical line live on page.tsx, shop/page.tsx:40, OrderPageClient.tsx:165, order/confirmation/page.tsx:44, order/track/page.tsx:43. |
| 1.7 | Fix Product Schema.org on `/shop/[slug]` | Claude | DONE | Verified 2026-04-22: return policy is `MerchantReturnNotPermitted`. aggregateRating only fires when product-specific reviews exist (empty array returned otherwise per reviews.ts:127). |
| 1.8 | Install Meta Pixel | Claude | DONE | Done 2026-06-06. Pixel ID 1321242129962420 installed in [src/app/layout.tsx](../src/app/layout.tsx) alongside GA4 and Clarity. Fires PageView on every page load. |
| 1.9 | Add email capture (footer + post-order) | Claude | DONE | Done 2026-06-06. MailerLite chosen. API key in .env.local. API route at [src/app/api/subscribe/route.ts](../src/app/api/subscribe/route.ts). Component at [src/components/EmailCapture.tsx](../src/components/EmailCapture.tsx). Live in footer (dark variant) and post-order send screen (inline variant). |
| 1.10 | Privacy policy page update | Claude | DONE | Done 2026-05-24. Added Meta Pixel clause to analytics section, new "Email communications" section, updated retention to 3-year specific period, updated date to May 2026. Unblocks 1.8 and 1.9. |
| 1.11 | Confirm Instagram bio link points to healingsoil.in | Owner | DONE | Done 2026-06-06. Links set to: (1) healingsoil.in, (2) WhatsApp. WhatsApp catalog removed. Website in position 1. |
| 1.12 | Update Instagram bio text | Owner | DONE | Done 2026-06-06. Bio: "Handmade soaps from Goa / No SLS. No parabens. Small batch. Made to order. / Plastic-free packaging / Shop via link below." |
| 1.13 | Turn on Instagram DM notifications | Owner | DONE | Done 2026-06-05. |
| 1.14 | Set up Instagram Saved Replies | Owner | TODO | Create 3: (a) how to order, (b) ingredient questions, (c) do you ship to [city]. Template copy in HealingSoil-BuildPlan-FINAL.docx Table 1. |
| 1.15 | Change Instagram profile picture to a soap bar | Owner | DONE | Done 2026-06-06. Three soaps, natural setting, product visible. |
| 1.16 | Connect Facebook page to Instagram in Meta Business Suite | Owner | DONE | Meta Business account active 2026-05-26 with Facebook + Instagram already integrated. |

---

## Layer 2 — Activate existing customers (Week 1–2)

31 past customers, 41-day reorder gap, 21% repeat rate. Reactivating this base is the fastest path to a second month's revenue.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 2.1 | WhatsApp the 10 existing reviewers — reorder nudge | Owner | TODO | One personalised message each. Suggest a soap they haven't tried. 10 reviewers listed in [src/lib/reviews.ts](../src/lib/reviews.ts). |
| 2.2 | WhatsApp the 10 existing reviewers — referral ask | Owner | DONE | Done 2026-06-06. Used new Referral Ask section in SoapLedger /outreach page (built session 11). Three message templates available. Customers re-appear after 60 days. |
| 2.3 | Send UGC briefs to 10 customers | Owner | TODO | Offer: free travel soap (₹50 cost) in exchange for a 30-sec phone video review. Collect videos in one folder; they become material for Layer 4 reels. |
| 2.4 | Build day-35 reorder reminder list | Owner | DONE | Done — SoapLedger /outreach "Due Now" section already does this. Uses per-customer soap lifecycle (bars × 30 days, adjusted by actual reorder history). Go to /outreach when customers are due. |
| 2.5 | Rename the 3 anonymous reviewers | Owner | BLOCKED | Blocked on first-name lookup (permission granted 2026-04-22). Once named, Claude updates [src/lib/reviews.ts:39-61](../src/lib/reviews.ts). review-004 ("does not lather up like regular ones") is priority. |

---

## Layer 3 — Compound existing content for search (Week 2–6)

Biggest unused lever. Fix the inventory first, then optimise what ranks, then write the gaps.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 3.1 | Triage 94 not-indexed pages in GSC | Owner | DONE | Confirmed 2026-04-24: 18 pages with redirect (legacy domain variants + old URLs), 7 not-found 404s, 38 discovered-not-indexed (new content, Google will index), 20 crawled-not-indexed, rest are canonical/noindex. Legacy confirmed from pre-pivot blog. |
| 3.2 | Remove legacy URLs properly | Owner | DONE | Owner submitted GSC removal requests 2026-04-24 for 4 real 404s: `/home/`, `/diy-neem-soap-slow-living/`, `/recommends/the-indian-chai-calming-vata-dosha-tea/`, `/our-stories-2/`. Redirects for domain variants (http/www) confirmed working. |
| 3.3 | Rewrite title/description on the ranking blog post | Claude | DONE | All 3 ranking posts updated 2026-04-24: India-first titles, excerpts with keywords and mechanism. See [glycerin-vs-goat-milk-soap.mdx](../content/blog/glycerin-vs-goat-milk-soap.mdx), [shea-butter-goat-milk-soap-dry-sensitive-skin.mdx](../content/blog/shea-butter-goat-milk-soap-dry-sensitive-skin.mdx), [understanding-the-benefits-of-shea-butter-in-soap.mdx](../content/blog/understanding-the-benefits-of-shea-butter-in-soap.mdx). On-page deepening done 2026-04-25: glycerin-vs-goat-milk-soap expanded to ~650 words, "soap base" added throughout, comparison table added, FAQ updated with direct "glycerin vs goat milk soap base" question. |
| 3.4 | Rewrite titles/descriptions on top 5 blog posts | Claude | DONE | Done 2026-05-26. India-first titles + excerpts applied to: what-makes-goat-milk-soap-beneficial-for-sensitive-skin, neem-tulsi-soap-benefits, why-handmade-soap-lasts-longer, what-makes-soap-chemical-free, why-we-make-soap-in-small-batches. Removed "our"/"we" from search-facing titles. Added India context to excerpts. |
| 3.5 | Add inline bundle CTA + end-of-post card to every blog post | Claude | DONE | Done 2026-04-24. [BlogInlineCTA.tsx](../src/components/BlogInlineCTA.tsx) renders above content on all 9 blog posts. End-of-post card updated: links to `/#bundle`, references starter bundle + ₹1,000 price. |
| 3.6 | Stories → blog → product internal linking | Claude | DONE | Done 2026-04-24. Every blog post links to hub page `/guide/handmade-soap-india`. Hub page links to all 9 posts + 2 stories. Individual posts link to each other where relevant. |
| 3.7 | Add FAQPage schema to each blog post | Claude | DONE | Done 2026-04-24. FAQPage schema added to 3 ranking blog posts (12 Q&As total) in [blog/[slug]/page.tsx](../src/app/blog/%5Bslug%5D/page.tsx). Extend to remaining posts as they get title rewrites. |
| 3.7a | Add llms.txt at domain root | Claude | DONE | Done 2026-04-24. [public/llms.txt](../public/llms.txt) — brand facts, product categories, canonical URLs, key ingredient claims, FAQs. LLM retrieval signal. |
| 3.7b | Add Organization schema site-wide | Claude | DONE | Done 2026-04-24. JSON-LD added to [layout.tsx](../src/app/layout.tsx) — name, URL, logo, foundingLocation (Goa), areaServed (IN), sameAs (Instagram). |
| 3.7c | Build hub page /guide/handmade-soap-india | Claude | DONE | Done 2026-04-24. [src/app/guide/handmade-soap-india/page.tsx](../src/app/guide/handmade-soap-india/page.tsx). ~2,000 words. Article + FAQPage schema (5 Q&As). Links to all 9 blog posts + 2 stories. Targets "handmade soap India" head term. |
| 3.8 | Write "SLS-free soap India" blog post | Claude | DONE | Done 2026-04-24. [sls-free-soap-india.mdx](../content/blog/sls-free-soap-india.mdx). FAQPage schema (5 Q&As) added to [blog/[slug]/page.tsx](../src/app/blog/%5Bslug%5D/page.tsx). BlogInlineCTA and end-of-post bundle card auto-wired. |
| 3.9 | Write "SLS and parabens in commercial soap" blog post | Claude | DONE | Done 2026-05-26. [sls-parabens-soap-india.mdx](../content/blog/sls-parabens-soap-india.mdx). Covers SLS stripping cycle, hard water compounding, parabens as preservatives, label reading guide. Links to sls-free-soap-india, bundle, hub. Image needed: `/blog/sls-parabens-soap-india.png`. |
| 3.10 | Write "Handmade soap Goa" blog post | Owner | DONE | Live at [content/blog/handmade-soap-goa.mdx](../content/blog/handmade-soap-goa.mdx), published 2026-04-24. Covers small-batch origin, farm-to-bar process, shipping from Goa. |
| 3.11 | Write "Handmade soap Bangalore" blog post | Owner | DONE | Live at [content/blog/handmade-soap-bangalore.mdx](../content/blog/handmade-soap-bangalore.mdx), published 2026-04-24. Covers hard water, SLS stripping, base comparison, Goa origin, delivery. City page also live at `/soap/bangalore` (2026-05-14). Both indexed as of 2026-05-26. |
| 3.12 | Write "Natural soap for sensitive skin India" blog post | Owner | DONE | Live at [content/blog/natural-soap-sensitive-skin-india.mdx](../content/blog/natural-soap-sensitive-skin-india.mdx), published 2026-04-24. India-first title. Covers sensitive skin as a routine reaction, label reading, base comparison. |
| 3.13 | Set up Google Business Profile | Owner | BLOCKED | Blocked: business not formally registered. Revisit when registration is complete. |
| 3.14 | Add "leave a Google review" link to delivered-order WhatsApp flow | Owner | TODO | After 3.13 is live. Every delivered order → WhatsApp message with the Google review link. |
| 3.15 | Build `/goat-milk-soap` category page | Claude | DONE | Shipped 2026-05-02. [src/app/goat-milk-soap/page.tsx](../src/app/goat-milk-soap/page.tsx). Filters `p.base === 'Goat Milk'`. FAQPage + BreadcrumbList schema. BlogInlineCTA. |
| 3.16 | Build `/soap-for-sensitive-skin` category page | Claude | DONE | Shipped 2026-05-02. [src/app/soap-for-sensitive-skin/page.tsx](../src/app/soap-for-sensitive-skin/page.tsx). Shows all in-stock products. CDSCO checked — uses "suitable for sensitive skin" (skin type only). |
| 3.17 | Build `/glycerin-soap` category page | Claude | DONE | Shipped 2026-05-02. [src/app/glycerin-soap/page.tsx](../src/app/glycerin-soap/page.tsx). Filters `p.base === 'Glycerine'`. Mechanism story (glycerin retained) included in copy. |
| 3.18 | Decide fate of `content/blog/best-natural-soap-for-eczema.mdx` | Owner | DONE | File is gone — not found anywhere in repo as of 2026-05-16. No action needed. |
| 3.19 | Monthly GSC snapshot on the 1st of each month | Owner | TODO (recurring) | Replaces weekly checks — weekly is noise at this volume. On the 1st, record clicks, impressions, position, distinct ranking queries in [growth-strategy.md](growth-strategy.md) monthly check-in table. Apply Country=India filter when reading. No tactical changes mid-month. 90-day re-evaluation gate is 2026-07-28 per [gsc-traffic-diagnosis-2026-04-28.md](gsc-traffic-diagnosis-2026-04-28.md). **June 1 watchlist:** (a) crawled-not-indexed count — should drop from 47 as city+ingredient pages re-indexed after geographic content fix; (b) `/soap/bangalore` and `/blog/handmade-soap-bangalore` — check for first impressions on Bangalore queries; (c) compare/\* and ingredient/\* impressions row (task 6.14). |
| 3.20 | GSC: validate fix for `/mental-health` redirect error | Owner | DONE | Validated 2026-06-05. |
| 3.21 | GSC: validate fix for `/shop/orange` duplicate canonical | Owner | DONE | Validated 2026-06-05. |

---

## Layer 4 — Instagram (Week 3 onward)

Start at 221 followers. Dialled-down cadence: 3 posts/week (one is a reel). Alternate reel type week-to-week.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 4.1 | Weekly product or ingredient post | Owner | TODO | Close-up, in use, or ingredient callout. Caption line 1: "Order via link in bio." |
| 4.2 | Weekly customer review post | Owner | TODO | Screenshot of a real review or clean graphic over a product photo. Primary trust-transfer unlock (no founder face). |
| 4.3 | Weekly reel — rotate types | Owner | TODO | Alternate: (a) process — soap cutting/curing/packing, silent + captions, (b) ingredient storytelling (15-sec per ingredient), (c) customer UGC from 2.3, (d) before/after skin-feel stories via WhatsApp. |
| 4.4 | Atomise 23 story posts into reel scripts | Claude | DONE | Done 2026-05-24. 21 active stories scripted (2 retired excluded) in [docs/reel-scripts.md](reel-scripts.md). Each script: hook (3s), body (12s), end card. Production notes and priority order included. |

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
| 6.7 | Ship 14 ingredient pages (2 batches of 7) | Claude | DONE | All 14 live as of 2026-05-16 (0 drafts). Batch 1 (2026-05-02): neem, tulsi, goat-milk, glycerin, shea-butter, honey, oats. Batch 2 (released in batch 3 deploy): kesar, haldi, rose, pomegranate, orange, ginger, rosemary. |
| 6.8 | Ship occasion pages (8 pages) | Claude | DONE | All 8 live as of 2026-05-16 (0 drafts). `src/data/occasions.ts`. |
| 6.9 | Ship 5 more comparison pages | Claude | DONE | All 5 live: neem-tulsi-vs-kesar-haldi-soap, ginger-rosemary-vs-neem-tulsi-soap, honey-oats-vs-kesar-haldi-soap, pomegranate-vs-orange-soap, handmade-vs-commercial-soap. |
| 6.10 | Ship Tier 1 city pages (7 cities) | Claude | DONE | All 7 live (2026-05-14): bangalore, mumbai, pune, delhi, hyderabad, chennai, goa. |
| 6.11 | Ship ingredient × base combination pages | Claude | DONE | All 13 live as of 2026-05-16 (0 drafts). `src/data/combinations.ts`. |
| 6.12 | Ship Tier 2 city pages (20 cities) | Claude | DONE | All 20 stamped and live 2026-05-16. Cities: kolkata, ahmedabad, jaipur, surat, lucknow, kochi, coimbatore, indore, bhopal, nagpur, chandigarh, bhubaneswar, guwahati, dehradun, mysore, vadodara, visakhapatnam, thane, nashik, rajkot. |
| 6.13 | Build Ayurvedic pages (6 pages) | Claude | DONE | All 6 live 2026-05-16. Route: `src/app/ayurvedic-soap/[slug]/page.tsx`. Pages: neem-tulsi, kesar-haldi, goat-milk, honey-oats, shea-butter, ginger-rosemary. |
| 6.15 | Add sheep milk vs goat milk comparison | Claude | DONE | Added to `src/data/comparisons.ts` 2026-05-16. publishedAt: '2026-05-16'. GSC was showing this query with impressions but no page targeting it. relatedProductsB empty (we don't sell sheep milk). |
| 6.14 | Monthly GSC review: add programmatic impressions row | Owner | TODO (recurring) | On the 1st of each month, record impressions from compare/*, ingredient/*, soap/* routes separately from blog impressions. Target: 500+ comparison impressions by Aug 2026. |

---

## Layer 7 — Content depth and CTR fixes (June 2026, from GA/GSC analysis)

Identified from May 8–Jun 4 GA + GSC data. These are the highest-leverage actions before building new pages.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 7.1 | Deepen /blog/goat-milk-soap-benefits | Claude | DONE | Done 2026-06-06. seoTitle updated to target "goat milk soap benefits" directly. Added India context section (hard water, climate, Ayurvedic tradition, ~170 words). Added 6-question FAQ section in MDX body and matching FAQPage schema in faqsBySlug. Post now ~1,400 words. File: [content/blog/goat-milk-soap-benefits.mdx](../content/blog/goat-milk-soap-benefits.mdx). |
| 7.2 | Fix title + meta on /shop/marigold-soap | Claude | DONE | Done 2026-06-06. Added PRODUCT_META_OVERRIDES map in [src/app/shop/[slug]/page.tsx](../src/app/shop/%5Bslug%5D/page.tsx). New title: "Handmade Marigold Soap from Goa \| Ships Across India \| Healing Soil". New description: sensory hook (golden petals, creamy lather, earthy scent, no SLS). |
| 7.3 | Rewrite meta descriptions on top 3 compare pages | Claude | DONE | Done 2026-06-06. Updated [src/data/comparisons.ts](../src/data/comparisons.ts). Each now opens with a direct base comparison in 150 chars. Removed em-dash from goat-milk-vs-shea-butter entry. Pattern: "X base is [quality]. Y base is [different quality]. Which suits your skin, compared here." |

---

## Monthly check-in metrics (track these, not vanity)

Record numbers on the first of each month so trend is visible.

| Month | Website orders | GSC clicks | Reorder rate | Email list size | IG followers | Notes |
|---|---|---|---|---|---|---|
| 2026-04 (baseline) | 0 | ~8 | 21% | 0 | 221 | Pre-plan baseline |
| 2026-05 (updated May 26) | 2 (website, Apr 25–May 22) | 17 clicks (+35%) · 2,520 impr (+48%) · pos 14.4 · CTR 0.7% (28-day GSC) | — | 0 | — | **530 pages indexed** (up from 117 on May 23 — programmatic batch fully indexed). 106 not indexed: 37 legacy redirects (known), 9 alternate canonicals (intentional), 5 x 404s (investigate), 47 crawled-not-indexed (diagnosed thin content on ingredient pages — fixed 2026-05-25: city-wise geographic content added to ingredient pages; awaiting re-crawl), 4 discovered-not-indexed (in queue), 1 redirect error (investigate), 1 Google-override canonical (investigate). Top GSC pages (28d): glycerin-vs-goat-milk-soap blog 9 clicks, home 3 clicks, compare/glycerin-vs-goat-milk-soap 2 clicks, pomegranate-peel-soap 1 click, shea-butter-vs-glycerin-soap 1 click. Position dipped from 13.5 to 14.4 — expected as 400+ new pages pulled average down. |
| 2026-06 (as of Jun 5) | 2 (GA key events May 8–Jun 4) | 28 clicks · ~3,000+ impr · pos ~7–9 on compare pages · CTR 0.7% avg | — | 0 | — | **546 pages indexed**. Compare pages earning impressions at positions 7–9 (architecture confirmed working). Critical gaps: /blog/goat-milk-soap-benefits at position 55.9 with 300 impressions (content too thin) · /shop/marigold-soap at position 5.5 with 93 impressions and 0 clicks (title/meta mismatch) · compare page CTRs below expected at positions 7–9. See tasks 3.22–3.24. |
| 2026-07 (as of Jul 3) | 0 tracked (2 WhatsApp-click key events, Jun 5–Jul 2) | ~30 clicks (28d) · ~3,000+ impr · CTR ~0.7% | — | — | — | **GA (28d): 251 sessions, 195 users, 60% organic search.** Daily sessions jumped to ~23/day Jun 29–Jul 2 (vs 5–8 earlier in June) — monsoon cluster working: "best soap for monsoon in india" pos 2.3 / 6.7% CTR; rainy-season blog + /soap-for/monsoon are #2/#3 landing pages. Jun 29 pSEO wave (pomegranate-benefits, loofah, rainy-season posts) too new to rank-judge. Jul 2 snippet rewrites (travel, monsoon, comparisons, marigold, sensitive-skin) awaiting re-crawl — judge ~Jul 15, don't re-touch. Funnel is now the constraint: top 3 organic landing pages = 84 sessions, 0 key events; 32 view_item → 3 add_to_cart → 0 purchases. Owner: mark add_to_cart + view_item as GA4 key events; fix GA4 currency (USD → INR). |

**Targets by end of 2026-07 (90 days):** website orders ≥ 8/month; GSC clicks ≥ 40/month; reorder rate ≥ 30%; email list ≥ 150; IG followers 500–700.
