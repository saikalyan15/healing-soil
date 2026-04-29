# Category Pages — Execution Runbook

Last updated: 2026-04-28. Status: ready to execute.

Three category landing pages to ship, in order. Each section below is self-contained — you can paste it into a fresh Claude session and ship that one page without re-explaining context. Designed for one-page-per-session so the token budget always fits.

**Why this exists:** see [gsc-traffic-diagnosis-2026-04-28.md](gsc-traffic-diagnosis-2026-04-28.md). The bottleneck is impressions volume. Each of these pages targets a high-intent commercial query we don't currently rank for.

**Template that works:** [src/app/shea-butter-soap/page.tsx](../src/app/shea-butter-soap/page.tsx). It already pulls impressions for "shea butter soap" and "benefits of shea butter soap." Every page below clones its structure.

---

## How to run a session

For each page below:

1. Open a **fresh** Claude Code session (don't reuse a long-running one).
2. Run `/start-here` to load brand context.
3. Paste the section's "Session brief" block verbatim into the chat.
4. Claude builds the page, you review the diff, you ship.
5. Update [task-tracker.md](task-tracker.md) when done.

Estimated effort per page: 1 session, ~15–25k tokens.

---

## Session 1 — `/goat-milk-soap`

**Why first:** highest search volume of the three (1K–5K monthly searches in India for "goat milk soap"). Multiple existing blog posts already feed it. If only one of the three lands, this is the one most likely to.

### Session brief (paste into fresh Claude session)

```
Build a category landing page at /goat-milk-soap. This is task 3.15 in
docs/task-tracker.md, planned in docs/gsc-traffic-diagnosis-2026-04-28.md.

Read first (in this order):
1. docs/gsc-traffic-diagnosis-2026-04-28.md — the search-intent matrix
   (the "why" for this page)
2. CLAUDE.md — CDSCO compliance rules (no therapeutic claims)
3. docs/growth-strategy.md — brand voice, audience, mechanism story
4. src/app/shea-butter-soap/page.tsx — the proven template, clone its structure

Build:
- Route: src/app/goat-milk-soap/page.tsx
- Title: "Goat Milk Soap — Handmade in Goa | Healing Soil"
- Meta description: 150 chars max, mention "made in small batches in Goa,"
  "no SLS or parabens," "suited to dry and sensitive skin"
- Word count: 700–900 words
- Sections (in order):
  1. H1 + intro paragraph (what goat milk soap is, who it suits)
  2. Why goat milk in soap — the mechanism (lactic acid, fats, lather quality)
     — keep this factual, no "treats X condition" language
  3. How ours is made (small batches, Goa, sourced goat milk supplier
     named per growth-strategy.md, glycerin retained, SLS-free)
  4. Who it suits — dry skin, sensitive skin, anyone wanting gentle lather.
     Use the SAFE language list from CLAUDE.md.
  5. Bundle CTA block (link to /#bundle, mention the ₹1,000 starter bundle
     contains the goat milk bars Neem Tulsi + Kesar Haldi)
  6. FAQ — 5 Q&As (see FAQ list below)
  7. Internal links — link to:
       - /blog/glycerin-vs-goat-milk-soap (comparison content)
       - /blog/shea-butter-goat-milk-soap-dry-sensitive-skin (existing ranker)
       - /blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin
       - /shop (browse all SKUs)
       - /guide/handmade-soap-india (hub page)

Schema (clone the shea butter page exactly):
- Product schema with brand "Healing Soil," priceCurrency INR, availability InStock
- FAQPage schema with the 5 Q&As
- BreadcrumbList schema (Home → Goat Milk Soap)

FAQ Q&As to include:
1. What is goat milk soap good for?
2. Is goat milk soap good for sensitive skin?  ← matches existing GSC query
3. How is your goat milk soap different from store-bought?
4. Does goat milk soap lather well?  ← VOC theme: lighter lather
5. Is goat milk soap safe for daily use?

Compliance constraints (non-negotiable, see CLAUDE.md):
- NO "antibacterial," "antifungal," "anti-inflammatory"
- NO references to eczema, psoriasis, acne, dermatitis, rashes
- NO "treats / cures / heals / repairs"
- NO exfoliation claims (no "lactic acid dissolves dead skin cells")
- YES: "gentle," "nourishing," "moisturising feel," "suited to sensitive skin"
- YES: "traditionally used in personal care"

Brand constraints (see growth-strategy.md):
- Never name the maker (gender safety)
- No urgency, no superlatives, no em-dashes
- Soft close only

Done when:
- File compiles, dev server renders the page
- All 3 schemas validate (test in https://validator.schema.org)
- 5 internal links resolve
- Bundle CTA links to /#bundle and renders
- Zero CDSCO-flagged phrases (search the file for: eczema, treat, cure, heal,
  antibacterial, antifungal, anti-inflammatory, dissolve)

After shipping, update task-tracker.md row 3.15 to DONE.
```

### Owner check before merge

- [ ] Read the page out loud. Does it sound like Healing Soil's voice or like AI?
- [ ] Cross-check the 5 FAQs — do you actually answer that way on WhatsApp?
- [ ] Verify the goat milk supplier reference matches what's already on the home page (no new claims).

---

## Session 2 — `/soap-for-sensitive-skin`

**Why second:** closest match to the home-page LP narrative (Krutika story = sensitive-skin reactivity). High intent, lower volume than goat milk (500–1K monthly searches) but the highest-intent of the three.

### Session brief (paste into fresh Claude session)

```
Build a category landing page at /soap-for-sensitive-skin. This is task 3.16
in docs/task-tracker.md, planned in docs/gsc-traffic-diagnosis-2026-04-28.md.
Goat milk soap page (task 3.15) should already be shipped — clone its structure.

Read first (in this order):
1. docs/gsc-traffic-diagnosis-2026-04-28.md — the search-intent matrix
2. CLAUDE.md — CDSCO compliance rules (especially around "sensitive skin"
   framing — sensitive skin is a SKIN TYPE, not a condition; this is the
   one place we can lean in)
3. docs/growth-strategy.md — Krutika story, mechanism (glycerin retained,
   SLS-free), audience
4. src/app/goat-milk-soap/page.tsx — the page you just shipped, mirror it
5. src/app/shea-butter-soap/page.tsx — original template

Build:
- Route: src/app/soap-for-sensitive-skin/page.tsx
- Title: "Soap for Sensitive Skin — Made in Goa | Healing Soil"
- Meta description: 150 chars, "no SLS or parabens, no synthetic fragrance,
  glycerin retained, suited to sensitive skin." Lead with the differentiators
  most relevant to sensitive-skin searchers.
- Word count: 700–900 words
- Sections (in order):
  1. H1 + intro: who this page is for. Use the Krutika quote pattern
     ("the only soaps my skin did not react to") without naming her.
     Or quote her by first name — review-006 in src/lib/reviews.ts.
  2. What "sensitive skin" actually means — skin type, not a disease.
     This is the safe-language anchor; lean here.
  3. The ingredients sensitive skin reacts to — SLS, synthetic fragrance,
     parabens, certain preservatives. Stay factual, no medical claims.
  4. What we leave out (and why) — match growth-strategy.md mechanism story:
     glycerin retained because commercial soap removes it for resale;
     SLS-free bases; named ingredient sourcing.
  5. Which of our soaps suit sensitive skin — Honey Oats Glycerin,
     Neem Tulsi Goat Milk, Kesar Haldi Goat Milk, shea butter bars.
     Brief one-line on each. Link each to /shop or /shop/[slug].
  6. Bundle CTA — the ₹1,000 starter bundle is the obvious answer for
     sensitive-skin browsers; lean into it more here than on other pages.
  7. FAQ — 5 Q&As (see below)
  8. Internal links:
       - /blog/shea-butter-goat-milk-soap-dry-sensitive-skin (existing ranker)
       - /blog/natural-soap-sensitive-skin-india
       - /blog/what-makes-goat-milk-soap-beneficial-for-sensitive-skin
       - /goat-milk-soap (cross-link to the category page from session 1)
       - /shea-butter-soap
       - /guide/handmade-soap-india

Schema:
- Product schema (representative bundle, ₹1,000)
- FAQPage schema with the 5 Q&As
- BreadcrumbList schema

FAQ Q&As to include:
1. What soap is best for sensitive skin?
2. What ingredients should I avoid if I have sensitive skin?
3. Is your soap suitable for sensitive skin?  ← the converter question
4. Why does commercial soap irritate my skin?
5. Will I see less lather? Is that bad?  ← directly addresses VOC theme

Compliance — extra strict on this page because it's the most tempting
to overstate:
- "Sensitive skin" = skin type, OK to use freely
- NEVER combine "sensitive skin" with "treats / heals / repairs / cures"
- NEVER name eczema, dermatitis, rosacea, contact dermatitis, allergic
  reaction (medical), rash
- "Some people with sensitive skin have told us [X review quote]" is OK
- "Reduces inflammation / repairs skin barrier" is NOT OK
- Krutika's quote is allowed as a customer report, not a claim

Done when:
- All checklist items from session 1 pass
- The Krutika quote (or its echo) appears above the fold
- Cross-link to /goat-milk-soap exists and resolves

After shipping, update task-tracker.md row 3.16 to DONE.
```

### Owner check before merge

- [ ] Most important compliance check of the three pages. Read it twice. Search the file for "treat," "cure," "heal," "repair," "barrier" — none of these should appear next to a skin claim.
- [ ] Confirm Krutika is OK with a name attribution (already permitted per growth-strategy.md, double-check with her if uncertain).
- [ ] Verify the bundle CTA copy doesn't promise the bundle "fixes" sensitive skin — only that it suits sensitive skin.

---

## Session 3 — `/glycerin-soap`

**Why third:** lower volume than the other two (500–2K monthly), but rounds out the ingredient category trio and reinforces the mechanism story (glycerin-retained = the brand's central differentiator).

### Session brief (paste into fresh Claude session)

```
Build a category landing page at /glycerin-soap. This is task 3.17 in
docs/task-tracker.md, planned in docs/gsc-traffic-diagnosis-2026-04-28.md.
Goat milk and sensitive-skin pages (3.15, 3.16) should already be shipped.

Read first (in this order):
1. docs/gsc-traffic-diagnosis-2026-04-28.md — the search-intent matrix
2. CLAUDE.md — compliance rules
3. docs/growth-strategy.md — mechanism story (glycerin retained because
   it sells for more separately) — this is the central differentiator
4. content/blog/glycerin-vs-goat-milk-soap.mdx — the existing ranker;
   reuse its facts and language register
5. src/app/goat-milk-soap/page.tsx — clone structure
6. src/app/shea-butter-soap/page.tsx — original template

Build:
- Route: src/app/glycerin-soap/page.tsx
- Title: "Glycerin Soap — Handmade in Goa | Healing Soil"
- Meta description: 150 chars, "small batches in Goa, glycerin retained
  in the soap, light feel, suited to oily and normal skin." Lead with
  the mechanism — it's the moat.
- Word count: 700–900 words
- Sections (in order):
  1. H1 + intro: what glycerin soap is, why it matters
  2. The mechanism (this is the page where we go deepest on it):
     commercial soap removes glycerin during production because glycerin
     sells for more separately. Our bases keep it in. This is THE story
     for this page — don't bury it.
  3. How glycerin behaves on skin — humectant, draws moisture in, leaves
     a light feel after washing. Stay descriptive, not clinical.
  4. Who it suits — oily, normal, combination skin; anyone who finds shea
     butter or goat milk too rich.
  5. Our glycerin soaps — Honey Oats Glycerin is the headline SKU.
     Link to /shop/honey-oats-glycerin (or whichever slug is canonical
     in src/lib/products.ts).
  6. Bundle CTA — Honey Oats is a default in the starter bundle.
  7. FAQ — 5 Q&As (see below)
  8. Internal links:
       - /blog/glycerin-vs-goat-milk-soap (comparison content, the existing
         strongest ranker — link prominently)
       - /goat-milk-soap (the alternative, cross-link)
       - /shea-butter-soap
       - /guide/handmade-soap-india

Schema:
- Product schema with the Honey Oats Glycerin SKU as the representative
  product (real price, real slug)
- FAQPage schema
- BreadcrumbList

FAQ Q&As to include:
1. What is glycerin soap?
2. Why is glycerin retained in your soap?  ← the mechanism question
3. Is glycerin soap good for oily skin?
4. Glycerin soap vs goat milk soap — which one for me?  ← matches
   existing GSC query "glycerin vs goat milk soap base"
5. Does glycerin soap dry out skin?

Compliance:
- Standard CLAUDE.md rules apply
- "Humectant" is descriptive, not therapeutic — OK to use
- "Draws moisture" is OK as a property of the molecule
- "Restores moisture / repairs barrier / fixes dryness" is NOT OK
- No "anti-aging" framing even though glycerin is sometimes pitched that way

Done when:
- All checklist items from sessions 1 and 2 pass
- The mechanism story (glycerin removed because it sells for more) is
  prominent in section 2 — not buried at the bottom
- FAQ Q4 directly mirrors the existing top GSC query

After shipping, update task-tracker.md row 3.17 to DONE.
```

### Owner check before merge

- [ ] Mechanism story matches exactly what's on the home page and in the existing comparison blog. No new claims, no contradictions.
- [ ] Honey Oats Glycerin slug in src/lib/products.ts is what the page links to (don't hand-type slugs).

---

## Session 4 — Eczema post decision (5 minutes, owner)

This is not a build task; it's a decision.

[content/blog/best-natural-soap-for-eczema.mdx](../content/blog/best-natural-soap-for-eczema.mdx) is `published: false` but exists in the repo. It frames eczema as a condition the soap addresses, which violates [CLAUDE.md](../CLAUDE.md). If it ever ships in its current form, it's a CDSCO problem.

Two options:

**Option A — Delete (clean).**
```
Delete content/blog/best-natural-soap-for-eczema.mdx and any image asset
referenced in its frontmatter.
```

**Option B — Rewrite (preserve effort).**
Rewrite into a generic "natural soap for very sensitive, easily irritated skin" angle. No naming of eczema, no "filaggrin," no "stratum corneum," no "atopic dermatitis." Reframe every condition reference as a skin-type / skin-feel description.

If you pick B, this is roughly the same effort as one of the category pages above. Do it as a separate session after sessions 1–3.

**Recommended: Option A.** The post overlaps in intent with `/soap-for-sensitive-skin` (session 2), which we're building anyway. Killing it removes a compliance footgun without losing search coverage.

---

## After all 3 pages ship

Wait. Don't tweak.

- Submit each new URL in GSC → URL Inspection → Request Indexing (1 minute per URL).
- Add each URL to [public/sitemap.xml](../public/sitemap.xml) if not auto-generated.
- **Do not check GSC for 3 weeks.** Google needs 2–6 weeks to evaluate new pages. Refresh-checking creates anxiety, not insight.
- On 2026-05-26, do a single GSC snapshot review. Look at:
  - Are the new URLs being indexed? (Pages report)
  - Are they getting impressions on the target queries? (Performance → Pages filter)
  - Is the click trajectory still upward overall? (28-day window)
- Update the monthly check-in row in [task-tracker.md](task-tracker.md).

The 90-day evaluation gate is **2026-07-28**. Targets in [gsc-traffic-diagnosis-2026-04-28.md](gsc-traffic-diagnosis-2026-04-28.md). Don't re-plan before then.

---

## Tasks added to task-tracker

These should be added to [task-tracker.md](task-tracker.md) Layer 3 (the next session that opens it should propagate them):

| # | Task | Owner | Status |
|---|---|---|---|
| 3.15 | Build `/goat-milk-soap` category page | Claude | TODO |
| 3.16 | Build `/soap-for-sensitive-skin` category page | Claude | TODO |
| 3.17 | Build `/glycerin-soap` category page | Claude | TODO |
| 3.18 | Decide fate of `best-natural-soap-for-eczema.mdx` | Owner | TODO |
| 3.19 | Monthly GSC snapshot on the 1st (replaces weekly checks) | Owner | TODO (recurring) |
