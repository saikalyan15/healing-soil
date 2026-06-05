# GSC Traffic Diagnosis & Forward Plan — 2026-04-28

Triggered by: owner concern that "the strategy isn't working" + a ChatGPT analysis pasted into the chat.

Companion docs (read these for the *plan*; this doc is the *diagnosis* and *deltas*):
- [growth-strategy.md](growth-strategy.md) — LP, audience, offer, brand constraints
- [seo-llm-ranking-plan.md](seo-llm-ranking-plan.md) — tiered SEO/LLM plan
- [task-tracker.md](task-tracker.md) — live status board

---

## TL;DR

1. **The strategy is working.** Week-over-week: clicks 15 → 20 (+33%). 28-day window: clicks +44%, impressions +61%, average position 15.8 → 14.9. Ranking-query count went from 1 → 6, and "healing soil" branded query is now appearing for the first time. These are the right leading indicators at week ~4 of a 12-week SEO compounding curve.
2. **20 clicks over 3 months is below the noise floor for measuring conversion.** Even a flawless funnel converts that volume into ~0–1 orders. The current bottleneck is impressions volume, not CTR and not the LP. Judging the LP/funnel on this traffic level is statistically meaningless.
3. **The ChatGPT analysis is mostly redundant with the existing plan, and it misses the actual gap.** ~80% of its "Step 1–7" is already shipped or already on the roadmap. The one piece worth adding is **search-intent → page-type mapping**, specifically two or three missing category landing pages.
4. **Do not pivot.** Stay on Tier 2 of [seo-llm-ranking-plan.md](seo-llm-ranking-plan.md). Add the category-page workstream below. Re-evaluate at end of July (90 days from Tier 1 ship).

---

## What the GSC data actually says

Both PDFs side by side:

| Metric (3-mo window) | 2026-04-21 | 2026-04-28 | Δ |
|---|---|---|---|
| Total clicks | 15 | 20 | +33% |
| Total impressions | 1.32K | 1.94K | +47% |
| CTR | 0.9% | 1.0% | +0.1pp |
| Avg position | 15.8 | 14.9 | improved 0.9 |

| Metric (28-day window) | 2026-04-21 | 2026-04-28 |
|---|---|---|
| Clicks | 8 (+75%) | 9 (+44%) |
| Impressions | 1.32K (+83%) | 1.3K (+61%) |
| Top recommendation | shea butter post +7,100% | shea butter post +700% |

Top queries on 2026-04-28 (vs. only "glycerin vs goat milk soap base" a week ago):
- healing soil ← **branded search appearing — leading indicator**
- glycerin vs goat milk soap base
- benefits of shea butter soap
- shea butter soap
- shea butter soap benefits
- is goat milk soap good for sensitive skin

### Read this honestly

- **+44% clicks / +61% impressions in 28 days is real movement, not noise.** It's small in absolute terms because the base is small. That's a volume problem, not a strategy problem.
- **Query diversity grew 1 → 6.** Tier 1 schema + title rewrites (shipped 2026-04-24) are starting to register. Google typically takes 2–6 weeks to re-evaluate; we're at week ~1 post-ship. Most of the lift hasn't arrived yet.
- **"healing soil" as branded query** means people are now searching for the brand by name. That doesn't happen on a dead site. It's small (4 days of new data) but it's the right signal.
- **Avg position 14.9** = bottom of page 1 / top of page 2. That's a CTR cliff. Moving from position 15 to position 8 is roughly a 3–4× CTR multiplier without any other change. That's the next 8–12 weeks of work.
- **Geography drift (US 44% / India 33% today vs. India 38% / US 38% / Canada 13% last week)** is a low-volume artifact. With 9–20 clicks total, one US visitor moves the percentage 5–10 points. Not a strategic concern *yet*; revisit at >100 monthly clicks.

### The ChatGPT analysis read the data wrong

It treats "clicks are still small" as evidence the strategy failed. At week 4 of a 12-week compounding play, the right metric is **trajectory and query diversity**, not absolute click count. Both trajectory and diversity are positive.

---

## Where the ChatGPT analysis is right

Three things worth keeping:

1. **Search intent → page type mapping is a useful framework**, and we don't have it written down anywhere. We have most of the page types implicitly, but the matrix below makes the gap visible.
2. **Category landing pages are partially missing.** We have one (`/shea-butter-soap`); we don't have analogues for goat milk soap, glycerin soap, or skin-type categories.
3. **The intent layering language ("problem → comparison → category → product") is good vocabulary** for thinking about future content. The growth strategy uses different framing (Schwartz stages 2–3) but the two are compatible.

### Search-intent → page-type matrix (our actual coverage today)

| Intent | Sample query | Right page type | Have it? |
|---|---|---|---|
| Informational / problem | "is goat milk soap good for sensitive skin" | Blog post | ✅ Yes (`/blog/shea-butter-goat-milk-soap-dry-sensitive-skin`, others) |
| Comparison | "glycerin vs goat milk soap" | Comparison blog | ✅ Yes (`/blog/glycerin-vs-goat-milk-soap`) |
| Pillar / hub | "handmade soap India" | Hub page | ✅ Yes (`/guide/handmade-soap-india`) |
| Ingredient category | "shea butter soap" | Category landing | ✅ Yes (`/shea-butter-soap`) |
| Ingredient category | "goat milk soap" | Category landing | ❌ **Missing** |
| Ingredient category | "glycerin soap" | Category landing | ❌ **Missing** |
| Skin-type category | "soap for sensitive skin India" | Category landing | ❌ **Missing** |
| Skin-type category | "soap for dry skin India" | Category landing | ❌ **Missing** |
| Local | "handmade soap Bangalore / Goa" | Local blog (rank), category page (convert) | ⚠️ Blog yes (`handmade-soap-bangalore.mdx`, `handmade-soap-goa.mdx`), category no |
| Commercial / shop | "buy handmade soap India" | Shop / home LP | ✅ Yes (`/shop`, `/`) |
| Branded | "healing soil" | Home | ✅ Yes (`/`) |
| Mechanism | "SLS-free soap India" | Blog | ✅ Yes (`/blog/sls-free-soap-india`) |

**Real gap: 4 category landing pages.** Two ingredient categories (goat milk, glycerin) and two skin-type categories (sensitive, dry). The `/shea-butter-soap` page is the template — it already ranks under "shea butter soap" and "benefits of shea butter soap."

---

## Where the ChatGPT analysis is wrong

| ChatGPT claim | Reality |
|---|---|
| "You removed content and expected BOFU to magically appear" | We removed pre-pivot education that was off-brand for a shop. We deliberately kept the 3 ranking commercial blog posts. The pivot was data-driven (100% of orders are WhatsApp referrals, 0 from web), not a guess. |
| "Blogs don't drive revenue, products do" | True at scale. False at our stage. Right now, blogs are the *only* organic surface generating any signal. Killing the blog play kills the only working channel. |
| "You're missing internal linking" | Done 2026-04-24 ([task-tracker.md](task-tracker.md) §3.6). Every blog links to the hub and to the bundle. Hub links back to all 9 posts + 2 stories. |
| "You're missing conversion CTAs in blog posts" | Done 2026-04-24 ([task-tracker.md](task-tracker.md) §3.5). `BlogInlineCTA` is on every post; end-of-post bundle card is on every post. |
| "You're missing a hub page" | Done 2026-04-24 ([task-tracker.md](task-tracker.md) §3.7c). `/guide/handmade-soap-india`. |
| "You're missing FAQ schema" | Done 2026-04-24 ([task-tracker.md](task-tracker.md) §3.7) on the 3 ranking posts and on `/shea-butter-soap`. |
| "You need a quiz / WhatsApp funnel / lead capture" | Email capture is BLOCKED on Brevo/MailerLite + privacy-policy update ([task-tracker.md](task-tracker.md) §1.9, §1.10). Quiz is a v2. WhatsApp post-order share block is queued ([task-tracker.md](task-tracker.md) §1.5). The plan acknowledges this — the order is intentional. |
| "Pages may rank reshuffle for 1–2 months — traffic may drop" | Already happened (the legacy pre-pivot URLs were removed in February–March). We're past that window; current numbers are post-reset. |
| "You need 'best soap for dry skin India 2026 guide'" | This is exactly Tier 2 / Tier 3 of [seo-llm-ranking-plan.md](seo-llm-ranking-plan.md). The blog `natural-soap-sensitive-skin-india.mdx` already exists. |
| "Add India / Goa / INR modifiers" | Already done in title rewrites 2026-04-24 ([task-tracker.md](task-tracker.md) §3.3). |

The ChatGPT analysis isn't bad reasoning — it's reasoning without context. ~80% of what it prescribes is already shipped or scheduled.

---

## What I'd actually change in the plan

Three additions to [seo-llm-ranking-plan.md](seo-llm-ranking-plan.md), inserted between Tier 2 and Tier 3:

### Addition 1 — Build 3 missing category landing pages

Template: clone the structure of [src/app/shea-butter-soap/page.tsx](../src/app/shea-butter-soap/page.tsx).

| Page | Route | Target query | Estimated monthly searches (India) |
|---|---|---|---|
| Goat milk soap | `/goat-milk-soap` | "goat milk soap", "goat milk soap india" | 1K–5K |
| Glycerin soap | `/glycerin-soap` | "glycerin soap", "glycerin soap india" | 500–2K |
| Soap for sensitive skin | `/soap-for-sensitive-skin` | "soap for sensitive skin", "natural soap for sensitive skin india" | 500–1K |

Each page: 700–900 words, FAQPage + Product schema, links to 1–2 supporting blog posts, links to relevant SKUs in `/shop`, embeds bundle CTA. Compliance: same CDSCO rules as everything else (no "treats sensitive skin," only "suited to sensitive skin").

**Why now and not later:** these are the highest-intent commercial queries we don't yet rank for. The shea-butter page proves the template works (it's pulling impressions for "shea butter soap," "shea butter soap benefits"). Replicating the template is ~1 working session per page.

**Order:** goat milk first (highest volume), then sensitive skin (closest to LP narrative), then glycerin.

### Addition 2 — Stop measuring conversion until volume crosses 100 clicks/month

20 clicks/3 months is below the statistical floor for funnel diagnosis. The right benchmark for "is the LP working" is `orders / clicks` once clicks per month ≥ 100. Until then, measure trajectory:

- Monthly clicks growth rate (target: 30–50%/month for next 90 days)
- Number of distinct ranking queries (target: 6 → 25 by end of July)
- Average position (target: 14.9 → ~10 by end of July)

If clicks haven't compounded past 50/month by end of July, *then* re-open the plan. Not before.

### Addition 3 — Quiet compliance cleanup

[content/blog/best-natural-soap-for-eczema.mdx](../content/blog/best-natural-soap-for-eczema.mdx) is `published: false` but it exists in the repo with eczema-as-condition framing — exactly the kind of content [CLAUDE.md](../CLAUDE.md) says we cannot ship. Two options:

1. Delete the file. Cleanest.
2. Rewrite into a generic "natural soap for very sensitive skin" angle with no condition naming, then publish.

Decision needed from owner. If the file ever ships in its current form, it's a CDSCO problem.

---

## Why the plan is right and we should not pivot

Restating the logic the existing strategy is built on, because it's easy to lose this when staring at small numbers:

1. **100% of revenue comes from WhatsApp warm referrals.** Web orders: zero. The home page is therefore optimised as a *referral converter*, not a SEO landing page. This is in [growth-strategy.md](growth-strategy.md) and reflects what the data actually showed.
2. **SEO is a parallel channel that targets cold demand.** It feeds blog → bundle. We expect the first conversions from organic at 50–100 monthly clicks, which we are 6–12 weeks away from at current trajectory.
3. **Ads are blocked until ≥₹50K/month.** Burning ad spend on a site that is still figuring out organic intent is the most expensive way to learn things we will learn for free in 3 months.
4. **The Instagram + UGC + farmers market layers (Layers 4, 5.1)** exist precisely because organic SEO is slow. They are warm-channel multipliers. None of them depend on SEO working.

The ChatGPT framing — "your TOFU is gone, your BOFU doesn't exist, you've broken the funnel" — assumes the funnel was running on organic search before. It wasn't. **The funnel runs on WhatsApp**, and that funnel has 31 orders, ₹30,570 revenue, 21% repeat rate, AOV ₹1,600 in April. That funnel works. The SEO work is to add a *second* funnel, not rebuild a broken one.

---

## What I want to ship next (concrete tasks)

In priority order. Add these to [task-tracker.md](task-tracker.md) Layer 3:

| # | Task | Owner | Effort |
|---|---|---|---|
| 3.15 | Build `/goat-milk-soap` category page (template: `/shea-butter-soap`) | Claude | 1 session |
| 3.16 | Build `/soap-for-sensitive-skin` category page | Claude | 1 session |
| 3.17 | Build `/glycerin-soap` category page | Claude | 1 session |
| 3.18 | Decide fate of `best-natural-soap-for-eczema.mdx` (delete or rewrite-and-publish) | Owner | 5 min decision |
| 3.19 | Monthly GSC snapshot review on the 1st: clicks growth, query diversity, position trend. No tactical changes mid-month. | Owner | 10 min/mo |

Deferred (already on the plan, do not re-prioritise):
- Tier 2.7 — Reddit / Quora organic presence ([seo-llm-ranking-plan.md](seo-llm-ranking-plan.md) T2.7)
- Tier 3.1 — additional commercial blog posts at 1 / 3 weeks
- Tier 3.6 — monthly LLM citation log

---

## 90-day re-evaluation gate

Set a calendar reminder for **2026-07-28**. On that date, look at:

| Metric | Today (2026-04-28) | 90-day target | Trigger to re-plan |
|---|---|---|---|
| GSC clicks (28-day) | 9 | 40–80 | <25 |
| GSC impressions (28-day) | 1.3K | 5–10K | <2.5K |
| Distinct ranking queries | 6 | 25+ | <12 |
| Avg position | 14.9 | ~10 | >14 |
| Web orders / month | 0 | 1–3 | 0 (only meaningful once clicks ≥100) |
| Branded queries | 1 ("healing soil") | 5+ | 1 |

If we hit ≥3 of the targets: stay on plan, advance to Tier 3.
If we hit 1–2: extend Tier 2 by 6 weeks, do not start Tier 3.
If we hit 0 or hit any "trigger to re-plan": stop. Re-diagnose. The strategy is wrong and we look at it from scratch.

---

## One last thing

The instinct to look at 20 clicks and conclude the strategy is broken is normal. It is also wrong at this stage. SEO is a 6-month bet, and we are at week 4. The data says the bet is on track. The right move is to keep shipping the next bricks (3 category pages above) and to stop checking GSC weekly — once a month is enough until volume crosses 100 clicks/month. Weekly checks at this scale create false signal and tempt unnecessary pivots.
