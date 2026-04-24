# GSC → Blog Pipeline: Approach Document

Last updated: 2026-04-24. Status: draft for owner review. Companion to [seo-llm-ranking-plan.md](seo-llm-ranking-plan.md) and [task-tracker.md](task-tracker.md).

Purpose: turn the manual GSC → blog workflow we just ran (3 posts in one session) into a repeatable pipeline that runs inside Claude Code. Proposes a specific form factor, scope, and sequence. Not yet approved for build.

---

## Why this document exists

On 2026-04-24, we manually executed this workflow:

1. Read a GSC screenshot to understand what pages and queries were getting impressions
2. Cross-referenced against the content gap list in [seo-llm-ranking-plan.md](seo-llm-ranking-plan.md)
3. Picked three topics (handmade soap Goa, handmade soap Bangalore, natural soap for sensitive skin India)
4. Wrote three MDX posts in brand voice
5. Wired FAQPage schema into [src/app/blog/[slug]/page.tsx](../src/app/blog/%5Bslug%5D/page.tsx)
6. Generated ChatGPT image prompts for each post

It took about three hours and was not repeatable without re-doing each step by hand. This document asks: what is the cleanest way to make that workflow reproducible, and where does human judgment stay in the loop?

---

## What stays human and what gets automated

The workflow has seven decision points. Four of them are mechanical and can be automated. Three require human judgment and stay manual.

| Step | Decision | Automate? |
|---|---|---|
| Pull GSC data | Mechanical API call | Yes |
| Identify opportunities | Heuristic scoring on impressions, CTR, position | Yes |
| Pick topic from shortlist | Editorial judgment | No — human picks from ranked list |
| Write MDX draft | Structured, voice-constrained | Yes (with caveat below) |
| Wire FAQ schema | Mechanical file edit | Yes |
| Generate image prompt | Templated | Yes |
| Final voice edit + publish | Editorial, brand-critical | No — human edits before publishing |

The voice-edit gate is non-negotiable. Google's Helpful Content Update and LLM-to-LLM filtering both down-weight obviously AI-written posts. The pipeline produces a draft; the owner edits it into their voice before publishing. This is the same rule that applies to the [no-AI-blog-posts principle in the SEO plan](seo-llm-ranking-plan.md#no-gos-given-the-data).

---

## Form factor: MCP + Skill

**Recommendation:** One MCP server for Google Search Console data, plus one orchestration skill that chains the workflow. No standalone app.

### Why this shape

The workflow has two distinct needs:

- **External data access** — GSC is a Google API. MCP (Model Context Protocol) is Claude's standard way to talk to external services. Installing a GSC MCP once makes the data available in every future Claude session, not just this one.
- **Workflow orchestration with brand-specific constraints** — the brand-voice filter, CDSCO compliance rules, the MDX format, the FAQ schema wiring, the internal linking to the hub page — all of this already lives inside Claude Code as skills and CLAUDE.md rules. A skill stitches them together.

### Alternatives considered and rejected

**Standalone Node or Python app.** Would work but would have to replicate everything that already works inside Claude Code: brand voice filtering, MDX format matching, FAQ schema wiring, internal linking, CDSCO compliance. That is a second maintenance surface for no upside.

**Skill with manually-pasted GSC data.** Workable as a Day-0 fallback while the MCP is being set up. Not a long-term answer because the whole point is to remove the copy-paste-screenshot step that is the current bottleneck.

**Cloud-hosted automation (GitHub Action, Zapier, n8n).** Overkill for a solo operator. Adds hosting, auth, and debugging surface for a workflow that runs maybe once a week.

---

## Components

### A. GSC MCP server

An MCP server that exposes Google Search Console data to Claude.

**Tools to expose:**

| Tool | Purpose |
|---|---|
| `get_top_queries` | Top N queries by impressions, with clicks, CTR, average position |
| `get_top_pages` | Top N pages by clicks or impressions |
| `get_query_by_page` | For a specific page, what queries bring traffic |
| `get_ctr_outliers` | Queries with high impressions and low CTR (title/meta rewrite candidates) |
| `get_not_indexed_pages` | Pages excluded from index, by reason |
| `get_position_movers` | Pages that gained or lost position week-over-week |

**Auth:** Google service account JSON with read access to the `healingsoil.in` property. Simpler than OAuth for a single-user setup. The key file stays on disk, path referenced in `mcp.json`, never committed to the repo.

**Build vs borrow:** An open-source GSC MCP almost certainly exists. The build step is to either install that one or, if nothing meets our needs, write a small wrapper against the `googleapis` npm or `google-api-python-client` package — GSC's Search Analytics API is simple (one main endpoint: `searchanalytics.query`).

**Install:** The MCP is added to `~/.claude/mcp.json`. Today that file has `playwright` and `fetch`. GSC becomes the third entry.

### B. The `/gsc-blog-pipeline` skill

**Location:** `C:\Users\sai\.claude\commands\brands\healing-soil\gsc-blog-pipeline.md`

**Format:** Matches the existing Healing Soil skill structure — Purpose / Context / Rules / Patterns / Anti-patterns. Same shape as [brand-voice.md](file:///C:/Users/sai/.claude/commands/brands/healing-soil/brand-voice.md).

**Stages the skill runs when invoked:**

1. **Pull** — call GSC MCP for the last 28 days. Get top queries, top pages, CTR outliers, not-indexed summary.

2. **Analyze** — score opportunities using explicit heuristics:
   - Queries with impressions > 100 and CTR < 2% → title and meta rewrite candidate (existing post)
   - Queries with no matching post in `content/blog/` or `content/stories/` → new-post candidate
   - Pages at positions 8–20 → on-page optimization candidate (one rank up per position = exponential traffic gain)
   - New content in the task tracker marked TODO whose target keyword appears in GSC → prioritize that

3. **Shortlist** — present the top 5 opportunities ranked by expected traffic delta. User picks one. No auto-selection — the ranked list is the hand-off to editorial judgment.

4. **Load context** — the skill invokes the existing framework skills before writing anything:
   - `brands:healing-soil:brand-voice`
   - `frameworks:copy-production-process`
   - `frameworks:copywriting-frameworks`
   - `frameworks:audience-psychology`

5. **Draft** — write the MDX into `content/blog/<slug>.mdx`. Matches the format of [sls-free-soap-india.mdx](../content/blog/sls-free-soap-india.mdx): frontmatter with title, date, slug, excerpt, category, author, featuredImage, then body with H2 sections, internal links to the hub page and related posts, soft close to `#bundle`.

6. **Wire schema** — add 4–5 FAQ Q&A entries to the `faqsBySlug` map in [src/app/blog/[slug]/page.tsx](../src/app/blog/%5Bslug%5D/page.tsx). The schema rendering code in that file picks them up automatically.

7. **Image prompt** — output a ChatGPT image prompt matching the pattern used in this session (subject on a surface, natural light, 16:9, no text overlays). Prompt style is standard across all posts to keep visual consistency.

8. **Handoff** — the skill ends with a reminder to the user: edit into voice before publishing, add one detail only you would know, change a sentence that reads as written-not-said. The HCU gate.

### C. CDSCO compliance gate

The skill inherits the rules in [CLAUDE.md](../CLAUDE.md) — no therapeutic claims, no named skin conditions, no exfoliation or barrier-repair claims, no study citations. The skill's Rules section restates these explicitly. If the skill ever produces copy that violates these, the fault is in the skill's prompt, not the model's output — the rule needs to be strengthened.

### D. What stays manual

Four things never automate:

- Voice editing the draft before publishing (the HCU gate)
- Generating the actual image from the prompt (runs in ChatGPT, Midjourney, or an image MCP)
- The `git commit` and deploy decision
- Picking which opportunity to work on from the shortlist

---

## Where pipeline outputs feed back

The pipeline is not a stand-alone tool. It produces rows in [task-tracker.md](task-tracker.md). When the skill writes a new post, it appends or updates the row in Layer 3 (currently 3.9–3.12 are open). When it rewrites a title or meta, it marks the relevant row as a status change with a note.

This is how the pipeline stays honest: every run creates or closes a tracked row, and the tracker is already the source of truth for "what has the SEO plan actually shipped."

---

## MVP vs v2

### MVP (what gets built first)

- GSC MCP installed and authenticated against the `healingsoil.in` property
- `/gsc-blog-pipeline` skill running the 8 stages above for one picked opportunity

**Success test:** run `/gsc-blog-pipeline`. Does it surface the same 3 ranking posts the GSC screenshot shows? Does at least one opportunity it suggests match the 3 topics we picked manually on 2026-04-24? If yes, MVP works. If no, the heuristics are wrong and we fix the skill's Analyze stage.

### v2 (only if MVP proves itself over 4–6 weeks)

- Competitor analysis — what sites are ranking above us for our queries, what their pages look like
- Content decay detection — posts that were at position 10 and are now at 18, flagged as re-optimization candidates
- Internal link auto-suggestion from the hub page to newly-written posts
- Image generation MCP so the image step also happens inside Claude instead of in ChatGPT
- Draft scoring — a second pass that critiques the draft against brand voice rules before handing it to the owner

None of v2 gets built until MVP has produced at least two posts that actually shipped.

---

## Risks and trade-offs

**AI-written detection.** Google's HCU down-weights obviously AI-written posts. The manual voice-edit gate is the mitigation. The skill's handoff message will repeat this every run so it does not get skipped. If the owner publishes drafts without editing, the pipeline will hurt the site instead of helping it.

**GSC data lag.** Search Console data has a 2–3 day reporting lag. The pipeline will never see "yesterday's" queries. Not a blocker at current scale, but worth noting so the owner understands why a freshly published post does not appear in the analysis for a few days.

**MCP auth setup is a one-time tax.** Creating a Google Cloud service account, giving it read access to the property, downloading the JSON key, and pointing the MCP at it — probably 20–30 minutes the first time. The approach doc for building this should include the exact steps.

**Heuristic drift.** The scoring rules (impressions > 100, CTR < 2%, positions 8–20) are starting guesses. Over time they will need tuning based on which opportunities the owner picks versus skips. The skill should log picks and rejections somewhere the owner can review.

---

## Files this pipeline touches

Read-only:
- `docs/seo-llm-ranking-plan.md` — strategic context
- `docs/task-tracker.md` — what is already done, blocked, or in flight
- `CLAUDE.md` — CDSCO compliance rules
- `content/blog/sls-free-soap-india.mdx` — reference MDX format
- `content/blog/*.mdx` — existing posts, to avoid topic duplication

Write:
- `content/blog/<new-slug>.mdx` — new post
- `src/app/blog/[slug]/page.tsx` — FAQ schema entry
- `docs/task-tracker.md` — row update on successful run

Config:
- `C:\Users\sai\.claude\mcp.json` — add GSC server
- `C:\Users\sai\.claude\commands\brands\healing-soil\gsc-blog-pipeline.md` — new skill file

---

## Approval to proceed

If the form factor (MCP + skill) is right, next steps are:

1. Owner reviews this document and confirms the form factor and stage breakdown
2. Claude writes the skill file and the MCP install instructions in a follow-up session
3. Owner runs the MCP auth setup (service account JSON)
4. First pipeline run against live GSC data, compare output to 2026-04-24 manual run as the correctness test

If the form factor is wrong — for example if the owner would rather have a hosted app they can run from a phone — say so now. The MCP + skill shape is recommended because everything that makes the Healing Soil workflow good (brand voice, MDX format, schema wiring, compliance rules) already lives inside Claude Code. Moving it out costs more than it saves.
