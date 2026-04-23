# SEO + LLM Discoverability Plan

Last updated: 2026-04-24. Status: draft for owner review. Complements [task-tracker.md](task-tracker.md) Layer 3, does not replace it.

Purpose: get healingsoil.in discovered in Google **and** cited in ChatGPT, Claude, Gemini. Ordered easy to hard. Each tier has a concrete expected outcome.

---

## Baseline (from GSC screenshots, 2026-04-21)

- 15 clicks, 1.32K impressions, CTR 0.9%, avg position 15.8 over 3 months
- Only 1 query recorded: "glycerin vs goat milk soap base"
- 3 ranking blog posts carrying everything:
  - `/blog/glycerin-vs-goat-milk-soap`
  - `/blog/shea-butter-goat-milk-soap-dry-sensitive-skin`
  - `/blog/understanding-the-benefits-of-shea-butter-in-soap` (impressions +7,100% recently)
- 94 not-indexed vs 49 indexed. **Mostly legacy URLs from the blog-to-shop pivot**, redirected or removed. Not a leak, just Google still holding them. Context: [project_site_history_and_vision.md](../../.claude/projects/E--Projects-Healing-Soil-Suite-healing-soil/memory/project_site_history_and_vision.md).
- Countries: India 38% / US 38% / Canada 13%. India-tied-with-US is a low-volume artifact; product is India-only.

**Read this as:** the blog is the only working channel. Everything else has no signal yet.

---

## No-gos (given the data)

- No paid ads. Growth strategy blocks this until ₹50k/month. Ad report shows ₹463 on 3 boosts, 25 conversations, 0 attributable orders.
- No AI-written blog posts. Google HCU and LLM-to-LLM filtering both down-weight them. Your voice is the moat.
- No backlink buying. Category has heavy PBN spam in India; penalty risk is high at this scale.
- No homepage SEO reshuffle. Home stays a referral-converting LP per [growth-strategy.md](growth-strategy.md). The hub page below is what ranks.

---

## Tier 1 — Easy wins (week 1, mostly in-repo)

Small effort, unlocks everything downstream.

### T1.1 Confirm the 94 not-indexed are legacy

**Do:** Open GSC → Pages → "Why pages aren't indexed." For each reason bucket, spot-check 3 URLs. Confirm they are pre-pivot URLs (stories, recommended-eco-products, old articles), not live pages. If any live page is in there, flag it.

**Expected outcome:** 60–90% of the 94 are explained as intentional. The remainder, if any, become a small TODO list. Unblocks T1.2.

### T1.2 Prune sitemap + add GSC removal requests

**Do:** Audit [public/sitemap.xml](../public/sitemap.xml) and remove any legacy URLs still listed. Submit bulk URL removal for the legacy paths confirmed in T1.1. Verify `next.config.js` has 301s where a current equivalent exists (e.g., old product paths to `/shop`).

**Expected outcome:** "Not indexed" count drops to under 30 within 30 days. Stops Google wasting crawl budget.

### T1.3 Rewrite titles + metas on the 3 ranking posts

**Do:** Tracker [3.3](task-tracker.md#L65). India-first phrasing. Draft pattern:
- `/blog/glycerin-vs-goat-milk-soap`: "Glycerin vs goat milk soap: which suits Indian skin? | Healing Soil"
- `/blog/shea-butter-goat-milk-soap-dry-sensitive-skin`: "Shea butter + goat milk soap for dry, sensitive skin (India) | Healing Soil"
- `/blog/understanding-the-benefits-of-shea-butter-in-soap`: "Shea butter in soap: what it does and what it cannot | Healing Soil"

Meta description: 150 chars, one concrete benefit, one differentiator (SLS-free, farm-grown), no hype.

**Expected outcome:** CTR on these 3 posts moves from 0.9% toward 2.5–3% in 2–4 weeks. At the same 1.32K impressions baseline, that's 20–30 more clicks/month from rewrites alone.

### T1.4 Add `llms.txt` at the domain root

**Do:** Create `public/llms.txt` per [llmstxt.org](https://llmstxt.org) spec. Sections: site summary (3 lines), canonical product URLs, blog hub, stories hub, brand facts (SLS-free, made-to-order, Goa farm, founded year, India-only shipping). Keep under 200 lines.

**Expected outcome:** ChatGPT and Claude retrieval honor this today; Gemini increasingly. Does not guarantee citation but makes citation possible. Signal strength: medium, cost: one afternoon.

### T1.5 Add FAQPage + Article schema to the 3 ranking posts

**Do:** Tracker [3.7](task-tracker.md#L69). 3–5 Q&As per post, sourced from the post's own subheads. Use existing schema helpers in the codebase (do not rebuild). Add `Article` schema with author="Healing Soil", datePublished, dateModified.

**Expected outcome:** Eligible for FAQ rich results (visible on mobile SERPs). Gives LLMs a structured, quotable version of each post.

### T1.6 Add `Organization` schema site-wide

**Do:** In `src/app/layout.tsx`, add `Organization` JSON-LD with name, URL, logo, foundingLocation (Goa), areaServed (India), sameAs (Instagram, any press). This is the brand entity LLMs anchor to.

**Expected outcome:** Brand becomes a known entity in Google's Knowledge Graph candidate pool and in LLM retrieval context. Not instant, but prerequisite for Tier 3.

**Tier 1 aggregate outcome:** Not-indexed count halves, CTR on ranking posts doubles, site is LLM-readable. Total effort: 1–2 working sessions.

---

## Tier 2 — Compound content (weeks 2–6, mixed owner + Claude)

This is where real ranking gains come from. Topical authority, not single posts.

### T2.1 Set up Google Business Profile

**Do:** Tracker [3.13](task-tracker.md#L75). Free. business.google.com. Category: Soap shop / Handmade goods. Service area: India (or Bangalore-metro if the GBP is location-gated). Add 8–10 photos, WhatsApp, website, hours.

**Expected outcome:** Biggest single local-SEO trust signal at this scale. Shows up for "handmade soap near me" queries in Bangalore. Also feeds LLM retrieval for local queries.

### T2.2 Write the first commercial-intent post: SLS-free soap India

**Do:** Tracker [3.8](task-tracker.md#L70). Owner drafts in voice, Claude formats + schemas + internal links. Target: 1,200–1,800 words. Sections: what SLS is, why it matters for Indian skin, how to read an ingredients label, list of SLS-free categories (not brand names), where Healing Soil fits (soft close).

**Expected outcome:** Primary target. 1K–3K monthly searches, low competition. If it lands position 5–15, adds 30–80 clicks/month at maturity (3–6 months).

### T2.3 Second commercial post: commercial soap problems (SLS, parabens)

**Do:** Tracker [3.9](task-tracker.md#L71). Companion piece. Cross-links with T2.2.

**Expected outcome:** Reinforces topical authority on the "why switch" intent cluster. Individually modest traffic, but doubles the topical signal for Google.

### T2.4 Build a pillar hub page at `/guide/handmade-soap-india`

**Do:** New route. ~2,000 words. Sections: what handmade soap is, how to read an Indian ingredients label, SLS / parabens / synthetic fragrance explained, how to pick for your skin type, shipping and storage in Indian humidity. Links out to all blog posts and 1–2 stories. Each blog post links back.

**Expected outcome:** This is the "topical authority" signal Google and LLMs both read. Individual posts rank higher when they belong to a clear hub. Expect the hub itself to rank for "handmade soap India" within 3–4 months.

### T2.5 Inline bundle CTA + end-of-post card on all blog posts

**Do:** Tracker [3.5](task-tracker.md#L67). 9 posts. One inline CTA after ~300 words, one card component at end-of-post. Every post links to at least one product page.

**Expected outcome:** Converts existing blog traffic. Current blog clicks are 8/month; assume 2–5% click through to bundle post-install. Compounds as blog traffic grows in T2.2–T2.4.

### T2.6 Internal linking: stories ↔ blog ↔ products

**Do:** Tracker [3.6](task-tracker.md#L68). Every commercial blog post gets one contextual link to a relevant story. Every story gets a soft link back to the relevant blog or product. E-E-A-T signal Google weights.

**Expected outcome:** Helps stories stop being orphan pages, helps blog posts borrow brand-identity weight, surfaces products from content. Small individually, compounds.

### T2.7 Start an organic Reddit + Quora presence

**Do:** Owner, not Claude. Account in good standing only. r/IndianSkincare, r/IndianMakeupAddicts, r/bangalore, relevant Quora spaces. Answer questions with real experience. Mention brand only where relevant and disclosed. One answer per week for 6 weeks. Keep to questions you'd answer anyway as a skincare-aware person.

**Expected outcome:** LLMs weight Reddit and Quora heavily (both are in ChatGPT/Claude/Gemini training and live retrieval). 3–5 high-signal posts get you named when someone asks "SLS-free soap India" to an LLM. Reddit is the single highest-ROI LLM surface outside your own site.

**Tier 2 aggregate outcome:** GSC clicks from ~5/month to 40–80/month by end of month 3. One commercial post ranking page-1. Brand starts surfacing in LLM answers for 1–2 specific queries.

---

## Tier 3 — Off-domain authority (weeks 6–16)

Slow burn. Compounds over quarters.

### T3.1 Three more commercial posts

**Do:** Tracker [3.10, 3.11, 3.12](task-tracker.md#L72). Natural soap for sensitive skin India, handmade soap Bangalore, handmade soap Goa. Owner drafts, Claude formats. Pace: 1 per 3 weeks.

**Expected outcome:** Topical authority becomes defensible. 5 commercial posts plus the hub means Google sees a category site, not a blog that happens to sell. At 6 months, expect 150–300 GSC clicks/month if posts land mid-page-1.

### T3.2 Atomise existing stories into reels + quotable snippets

**Do:** Tracker [4.4](task-tracker.md#L89). `docs/reel-scripts.md` for reel format. Also pick 10 quotable sentences from stories for LLM-bait (short, declarative, branded). Example: "Our bases come from a manufacturer we have used since the start; our neem and tulsi are grown on our farm in Goa." These get reused in blog post openings, schema description fields, meta descriptions. LLMs cite this shape of sentence.

**Expected outcome:** Stories start doing double duty as reel content and LLM citation fodder without compromising their brand-identity role.

### T3.3 Guest mentions on Bangalore / skincare sites

**Do:** Owner. Pitch one Bangalore slow-living blog (The Bangalore Blog, Deccan lifestyle press) and one Indian skincare ingredient site (The Ordinary-style explainer blogs, not retail). Offer: a mechanism-heavy piece (glycerin economics, SLS-free manufacturing in India). No self-promotion, byline only.

**Expected outcome:** Even unlinked brand mentions help LLM retrieval. One linked mention on a DR 20+ site is worth more than 50 directory links. Target: 2 mentions in 6 months.

### T3.4 Directories (low effort, low-medium ROI)

**Do:** Justdial, Sulekha, IndiaMart (if applicable for the handmade-soap SKU model), local Bangalore lifestyle directories. Free or cheap. Owner.

**Expected outcome:** Directory mentions are a 2010 SEO play but still affect LLM retrieval for Indian queries because LLMs read these. Don't spend more than a day on this total.

### T3.5 Wikidata entry (gated on press)

**Do:** Once at least 2 independent press mentions exist (Tier 3.3 outcomes), create a Wikidata item. Not Wikipedia — lower bar. Fields: brand name, founding year, location, category, official website, source citations. Owner.

**Expected outcome:** Wikidata is read by all three major LLMs as authoritative entity data. This is the single highest-ROI LLM signal once you qualify for it. Expect it to move LLM citation rate meaningfully.

### T3.6 Monthly LLM prompt-test log

**Do:** Every month, query ChatGPT, Claude, Gemini with 5 canonical prompts:
1. "Best handmade soap in India for sensitive skin"
2. "SLS-free soap brands India"
3. "Glycerin soap Bangalore"
4. "Soap without parabens India"
5. "Goa handmade soap"

Log: does Healing Soil appear? In what position? What sources does the LLM cite? Save results in `docs/llm-citation-log.md`.

**Expected outcome:** This is your LLM-SEO dashboard. Tells you which tactics (posts, Reddit, Wikidata) actually moved citation. Without this, LLM work is invisible.

**Tier 3 aggregate outcome:** Healing Soil cited in at least 2 of 5 LLM prompts by end of month 6. Branded queries begin appearing in GSC ("healing soil soap", "healingsoil.in"). Organic orders reach tracker target of 8+/month.

---

## Sequencing at a glance

| Week | Tier | Deliverable | Owner |
|---|---|---|---|
| 1 | T1.1 – T1.6 | Indexing confirmed, sitemap pruned, titles + schema + llms.txt shipped | Claude + Owner (T1.1) |
| 2 | T2.1 + T2.2 draft | GBP live, SLS-free post drafted | Owner |
| 3 | T2.2 ship + T2.3 draft | SLS-free post live with schema, second post drafted | Claude + Owner |
| 4 | T2.4 draft + T2.5 | Hub page drafted, blog CTAs live | Owner + Claude |
| 5 | T2.3 ship + T2.4 ship + T2.6 | Both posts live, internal linking done | Claude |
| 6 | T2.7 starts | First Reddit/Quora answers posted | Owner |
| 7–12 | T3.1 cycle | One post every 3 weeks | Owner + Claude |
| 9–16 | T3.2 – T3.5 | Quotable snippets, guest pitches, directories, Wikidata | Owner |
| Monthly | T3.6 | LLM citation log | Owner |

## Success metrics (copy into tracker monthly check-in)

Baseline (2026-04): GSC clicks 15/3mo, ranking queries 1, LLM citation 0/5.

- **Month 1:** Not-indexed < 30. CTR on ranking posts 2%+. GSC clicks 15/month.
- **Month 3:** GSC clicks 40–80/month. 3+ ranking queries. 1 LLM prompt cites brand.
- **Month 6:** GSC clicks 150–300/month. 10+ ranking queries. 2+ of 5 LLM prompts cite brand. Organic orders ≥ 8/month.

## Why this order

Easy-to-hard is also most-to-least reversible. Tier 1 is all in-repo and schema — pure upside, no risk. Tier 2 invests owner writing time but against validated-intent keywords. Tier 3 depends on press and third-party mentions we cannot force. If Tier 2 posts do not rank in 3 months, the plan is wrong and we stop before spending Tier 3 effort.
