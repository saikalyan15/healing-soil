# Healing Soil Growth Strategy

Last updated: 2026-04-29. Status: Stage 1–4 closed. LP implemented in [src/app/page.tsx](../src/app/page.tsx). Site diagnosis closed. Bundle decision closed. Next: category pages (see task-tracker.md §3.15–3.17).

Single source of truth for the LP and growth work. Read this first before any copy or LP work.

---

## Reframe

Original ask: "build an LP and run ads." Data said no.

Dashboard (all-time from Nov 2025): revenue ₹30,570, 31 orders, AOV ₹990 (₹1,600 in April), 4 soaps per order, 21% repeat, 41-day reorder gap, 100% WhatsApp referrals, 0 orders from website, real shipping 7 days, break-even August 2026.

Implication: conversion problem on small website traffic plus a referral-leverage problem. Ads are premature until monthly revenue hits ~₹50,000 or marketing capital is earmarked.

## Growth plan (priority order)

1. Fix the current site so referral traffic converts.
2. Rework the home page into a referral-first LP.
3. Instagram reels (3/week).
4. WhatsApp the 10 existing reviewers for one referral + one reorder each.
5. UGC push: free travel soap for a 30-sec video review.
6. One Bangalore farmers market or yoga studio trial.
7. SEO on `/blog` (3 posts: handmade soap bangalore, soap without sls, natural soap for sensitive skin).

## Audience (Stage 1 closed)

Urban Indian woman 28–45, Bangalore-heavy, ingredient reader, already moved off commercial soap. Schwartz stage 2–3. Not looking for "the best soap," looking for one that does not hurt her. Two dominant VOC themes from existing reviews: **no reaction** and **no heavy lather** (both inverted commercial-soap features).

Top inferred objections: (1) "handcraft soap is just fancy branding" (belief), (2) "will this work for my skin" (trust), (3) "₹1,000 for soap is a lot" (priority).

## Offer (Stage 2 closed)

**Starter bundle, 4 soaps at ₹1,000:** Honey Oats Glycerin ₹250 + Neem Tulsi Goat Milk ₹350 + Kesar Haldi Goat Milk ₹350 + Travel Soap ₹50.

**Mechanism:** commercial soap removes glycerin in production because glycerin sells for more separately. Healing Soil bases keep it in. Bases are also SLS-free (owner-confirmed 2026-04-22), which explains both the lighter lather and the lower reaction risk for sensitive skin. Ingredients grown on the farm (neem, tulsi) or from named suppliers (glycerin, goat milk).

**Proof:** ten 5-star reviews on `/reviews`. Bangalore-heavy. Named.

**Price:** ₹1,000 bundle, shipping on top. Free shipping threshold is ₹1,000 so bundle triggers it automatically.

**Guarantee:** no product-efficacy guarantee (owner decision, every bar made to order, natural variation). **Damage-in-transit replacement: approved.** Approved framing on the LP:

> Every bar is made to order with fresh ingredients from the farm. No two batches are identical, and we will not pretend they are. What we can promise: the ingredients are real, the process is transparent, and if the bar arrives damaged, we replace it.

**Shipping:** 4 days dispatch + 3 days transit = 7 days real. State the real number everywhere. Suggested line: "Shipped in 4 days, arrives in 3 to 7 depending on your city." India only, Speed Post.

**Single desired action:** buy the ₹1,000 starter bundle.

## Lead angle (selected)

**Story angle, A (Krutika hero, Riya secondary), with Enemy + Mechanism and Problem/Pain reinforcing below the fold.**

- Krutika (review-006): "Allergic to all the commercial soaps due to skin sensitivity. These were the only soaps that my skin did not react to." Housewife, Bangalore. Hero quote. Converts the anxious buyer.
- Riya (review-010): "Absolutely loving the honey oats glycerine soap. It is very gentle on the skin. Even without the heavy lather, it leaves me feeling so refreshed." Software Professional, Bangalore. Secondary quote. Exact ICP mirror, two VOC themes in one sentence. Converts the comparison-shopper.

Ruled out: Contrarian (weakest for ecom), Fear (framework warns default), Aspiration (wrong for stage 2–3), Social Proof alone.

## Home page section order (Stage 3 closed)

Hero (Krutika) → Bundle "pick 4" → Mechanism → Riya secondary → Promises → Reviews grid → Soft close.

Bundle moved to position 2 (above mechanism) because 100% of current traffic is warm WhatsApp referral. Industry pattern for warm ecom traffic: get the buy box visible early, treat education as reinforcement for those who keep scrolling, not a gate.

Reviews grid: 4 named Bangalore cards (Snehal Rane, Sonia, Shubhada, Samyuktha). Lisha dropped (eco-led, competes with mechanism section). Anonymous reviewers (review-003, 004, 005) to be renamed before ship — owner granted permission 2026-04-22, first-name lookup pending.

## Brand constraints (non-negotiable)

- **Never name the maker in public copy.** Safety. See `memory/feedback_no_maker_name.md`.
- No exaggeration beyond what the ingredient does.
- No urgency (made-to-order removes valid scarcity).
- No superlatives.
- Transparency about sourced bases vs grown ingredients is a trust signal.
- Eco-conscious choices appear in context, not as headline claims.
- Soft close only. Invitation not prompt.
- No em-dashes.

## Site diagnosis (2026-04-22)

Diagnosis: fix `/` as the LP, do not create a new route. SEO equity is on `/`, existing WhatsApp-shared links keep working, the work is content and structure not a rebuild.

### Critical (safety) — scrub maker name before anything else ships

- [src/app/page.tsx:156,165](src/app/page.tsx#L156) — alt + heading.
- [src/app/our-story/page.tsx:40](src/app/our-story/page.tsx#L40) — alt on founder photo.
- [src/app/privacy-policy/page.tsx:31](src/app/privacy-policy/page.tsx#L31) — body text.
- `public/founder.jpg` — face still visible. Replace with farm or hands shot.

### High — structural leaks for referral traffic

1. **Hero is generic.** "Handmade soaps from a Goa farm" says nothing about sensitive skin or the glycerin mechanism. Referral buyer does not see the reason they were sent the link. Rewrite hero around Krutika proof → mechanism → bundle.
2. **Bundle does not exist as a click.** Shop is a grid of singles. Referral buyer ends up with one ₹250 bar + ₹100 shipping. Blocked on owner decision below.
3. **Delivery time contradicts in 6 places.** Real is 7 days. Site says "a few days" / "7–10" / "8–15" and Schema.org says 6–10. Unify to one line: "Shipped in 4 days, arrives in 3 to 7 depending on your city."
   - [src/app/page.tsx:313](src/app/page.tsx#L313), [src/app/shop/page.tsx:40](src/app/shop/page.tsx#L40), [src/components/OrderPageClient.tsx:165](src/components/OrderPageClient.tsx#L165), [src/app/order/confirmation/page.tsx:44](src/app/order/confirmation/page.tsx#L44), [src/app/order/track/page.tsx:43](src/app/order/track/page.tsx#L43), [src/app/shop/[slug]/page.tsx:86-97](src/app/shop/%5Bslug%5D/page.tsx#L86-L97).
4. **Zero referral mechanism.** Post-submit "Send on WhatsApp" screen ([src/components/OrderPageClient.tsx](src/components/OrderPageClient.tsx)) has no share-with-a-friend ask. `/order/confirmation` is orphaned (grep: 0 refs). Add share block to the step='send' screen.
5. **Promises missing:** damage-replacement and no-guarantee framing not on any page. Mechanism ("glycerin is removed because it sells for more separately") appears nowhere.

### Medium

- **Proof placement.** Krutika is 3rd in a 2-col grid on home, below the fold. She's the hero — put her above the fold. Riya (review-010) is in data but rendered on zero pages.
- **Product Schema.org is lying.** [src/app/shop/[slug]/page.tsx:65-72](src/app/shop/%5Bslug%5D/page.tsx#L65-L72) declares FreeReturn with 2-day window (real policy is no returns, damage-only). [src/app/shop/[slug]/page.tsx:101-107](src/app/shop/%5Bslug%5D/page.tsx#L101-L107) shows 5-star aggregateRating with all 10 reviews on every product (fallback in [src/lib/reviews.ts:126-129](src/lib/reviews.ts#L126-L129)). Rich-snippet disqualification risk.
- **Form data model.** Pincode is inside the address textarea, not a field ([src/components/OrderForm.tsx](src/components/OrderForm.tsx)). Operations pay the cost.
- **Anonymous short reviews.** Three "Customer, Bangalore" entries in [src/lib/reviews.ts:39-61](src/lib/reviews.ts#L39-L61). Either name them (owner permission) or swap for named short quotes.

### Low

- `/cart` and `/checkout` are 7-line stubs, orphaned (header cart icon points to `/order`). Delete or 301 to `/order`.
- `/order/confirmation` unreachable. Either wire in as real confirmation (and put share block there) or delete.

### Verified not broken

- Cart persistence via zustand persist. Survives reload.
- Order submission: posts to SoapLedger, fires owner email via Resend non-blocking.
- GA + Clarity wired, `begin_checkout` / `add_to_cart` / `purchase` / `whatsapp_send_clicked` events fire.

## Referral mechanism (workstream, unblocked, ships after LP v1)

1. Share button on post-submit screen: WhatsApp deep link with prefilled message + LP URL.
2. One line on the "order received" message: "If this works for you, send our page to someone who might need it. That is how most of our customers found us."
3. `?ref=` query param tracking. Defer.

## Bundle presentation (closed)

**Option B: frontend "pick 4" block.** Site keeps individual SKUs. A home-page block adds the 4 bundle soaps to the cart in one tap. Buyer can edit line items. No SoapLedger change.

Reason: a bundle is not a real SKU, it is a merchandising construct. Creating a SKU per bundle would pollute the catalog.

Implications for Stage 3:
- Hero CTA goes to a `#bundle` anchor on home, not a separate product page.
- The bundle block is a home-page component, not a `/shop/[slug]` entry.
- Free-shipping threshold (₹1,000) already triggers automatically on bundle add.
- The 4 default soaps: Honey Oats Glycerin, Neem Tulsi Goat Milk, Kesar Haldi Goat Milk, Travel Soap. Buyer can swap.

## Next actions

1. ~~Stage 3: home-page outline~~ done. See "Home page section order" above.
2. ~~Stage 4: write copy~~ done. Implemented in [src/app/page.tsx](../src/app/page.tsx).
3. **Implementation pass (next session):** ship in one PR — wire copy from `home-page-copy.md` into [src/app/page.tsx](../src/app/page.tsx), build the bundle "pick 4" frontend block, scrub maker name across the 4 surfaces in the site diagnosis, replace `public/founder.jpg`, unify delivery time across the 6 surfaces, fix Schema.org on `/shop/[slug]` (remove FreeReturn, fix per-product aggregateRating fallback in [src/lib/reviews.ts:126-129](../src/lib/reviews.ts#L126-L129)).
4. Owner: rename anonymous reviewers ([review-003, 004, 005](../src/lib/reviews.ts#L39)) with first names. Permission granted 2026-04-22, lookup pending. review-004 ("does not lather up like regular ones") is the priority — strong VOC quote currently wasted on anonymous attribution.
5. Add referral share block to post-submit screen ([src/components/OrderPageClient.tsx](../src/components/OrderPageClient.tsx) `step='send'`).
6. Delete or 301 `/cart`, `/checkout`. Decide on `/order/confirmation`.
7. Measure conversion on referral traffic against baseline (currently zero).
