# Growth Task Tracker

Living status for the "bring customers to the website" plan. Update the **Status** column as work progresses. If you open a fresh Claude chat, point it at this file first — every row has enough context to resume cold.

**Source docs** (read these for "why," not for status):
- [growth-strategy.md](growth-strategy.md) — Stage 1–3 research + site diagnosis (April 2026)
- [home-page-copy.md](home-page-copy.md) — Stage 4 LP copy ready to ship
- [HealingSoil-BuildPlan-FINAL.docx](HealingSoil-BuildPlan-FINAL.docx) — original March 2026 build plan
- Plan this tracker executes: `C:\Users\sai\.claude\plans\how-to-bring-customers-binary-bengio.md`

**Status values:** `TODO` · `WIP` · `DONE` · `BLOCKED` (add a note why)
**Owner values:** `Claude` (code / content edits inside repo) · `Owner` (manual / off-repo / requires your accounts)

Last updated: 2026-04-22

---

## Layer 1 — Plug the leaks (Week 1)

Ship the LP rewrite and the 3 small conversion fixes first. This is the single highest-ROI sprint.

| # | Task | Owner | Status | Context needed to resume cold |
|---|---|---|---|---|
| 1.1 | Implement drafted LP copy into home page | Claude | DONE | Source: [home-page-copy.md](home-page-copy.md). Target: [src/app/page.tsx](../src/app/page.tsx). Section order from growth-strategy.md §"Home page section order". Use existing review data from [src/lib/reviews.ts](../src/lib/reviews.ts). |
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
| 3.1 | Triage 94 not-indexed pages in GSC | Owner | TODO | GSC → Pages → "Why pages aren't indexed." Bucket into: (a) legacy pre-pivot URLs (most likely), (b) crawled-not-indexed stories (leave them), (c) thin/duplicate current pages. Share the list of (a) and (c) with Claude. |
| 3.2 | Remove legacy URLs properly | Claude | BLOCKED | Blocked on 3.1 list. Work: ensure 410/404 on those paths, add 301 redirects in [next.config.js](../next.config.js) where there is a current equivalent, remove them from [public/sitemap.xml](../public/sitemap.xml), submit removal in GSC URL Removal tool. |
| 3.3 | Rewrite title/description on the ranking blog post | Claude | TODO | File: [content/blog/glycerin-vs-goat-milk-soap.mdx](../content/blog/glycerin-vs-goat-milk-soap.mdx). Current title: "Glycerin vs Goat Milk Soap: Which is Best for Your Skin?" — needs India-first phrasing, e.g. "Glycerin vs goat milk soap: which is right for your skin? \| Made in India". Target CTR: 3% (from 0.9%). |
| 3.4 | Rewrite titles/descriptions on top 5 blog posts | Claude | TODO | After 3.3 ships and validates. Same pattern: India-first, buyer-intent phrasing. |
| 3.5 | Add inline bundle CTA + end-of-post card to every blog post | Claude | TODO | 9 posts in [content/blog/](../content/blog/). Inline CTA after ~300 words. End-of-post bundle card component. At least one internal link into a product page. |
| 3.6 | Stories → blog → product internal linking | Claude | TODO | Every commercial blog post gets one contextual link into a relevant story. Every story gets a soft link back to the relevant blog or product. E-E-A-T signal. |
| 3.7 | Add FAQPage schema to each blog post | Claude | TODO | Schema helpers already exist in codebase — extend, don't rebuild. 3–5 Q&A per post taken from the post's own subheads. |
| 3.8 | Write "SLS-free soap India" blog post | Owner | TODO | 1K–3K monthly searches, LOW competition, HIGH intent. Highest single content opportunity. Owner writes draft (voice); Claude formats, adds schema, internal links. |
| 3.9 | Write "The problem with commercial soap: SLS and parabens" blog post | Owner | TODO | Companion to 3.8. HIGH intent. |
| 3.10 | Write "Handmade soap Goa" blog post | Owner | TODO | 100–500 searches, VERY LOW competition. Local-origin anchor, target `/shop`. |
| 3.11 | Write "Handmade soap Bangalore" blog post | Owner | TODO | Bangalore-heavy buyer base; low competition. |
| 3.12 | Write "Natural soap for sensitive skin India" blog post | Owner | TODO | 500–1K searches. Anchors to the Krutika LP story and the starter bundle. |
| 3.13 | Set up Google Business Profile | Owner | TODO | Free. business.google.com. Name, category (handmade goods / soap), service area, WhatsApp, website, photos. Highest local-SEO trust signal at this scale. |
| 3.14 | Add "leave a Google review" link to delivered-order WhatsApp flow | Owner | TODO | After 3.13 is live. Every delivered order → WhatsApp message with the Google review link. |

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

## Monthly check-in metrics (track these, not vanity)

Record numbers on the first of each month so trend is visible.

| Month | Website orders | GSC clicks | Reorder rate | Email list size | IG followers | Notes |
|---|---|---|---|---|---|---|
| 2026-04 (baseline) | 0 | ~8 | 21% | 0 | 221 | Pre-plan baseline |
| 2026-05 | | | | | | |
| 2026-06 | | | | | | |
| 2026-07 | | | | | | |

**Targets by end of 2026-07 (90 days):** website orders ≥ 8/month; GSC clicks ≥ 40/month; reorder rate ≥ 30%; email list ≥ 150; IG followers 500–700.
