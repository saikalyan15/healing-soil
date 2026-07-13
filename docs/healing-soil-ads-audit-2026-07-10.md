# Healing Soil — Meta Ads Account Audit
**Date:** 10 July 2026 · **Account:** Healing Soil (896452193393277) · **Currency:** INR · **Data range:** lifetime (account created ~Jun 2023, first spend May 2026)

---

## The one thing that matters most

**Your ads are stopped because the prepaid balance is ₹0.00.** The Bangalore Launch campaign hit a payment error when funds ran out (last activity: 5 May 2026, 66 days ago). Nothing has delivered since. Until you add funds in Billing, nothing else in this audit matters.

---

## Account snapshot

| Item | Status |
|---|---|
| Account status | Active, but delivery blocked (₹0 prepaid balance) |
| Lifetime spend | ₹846.96 (one ad, ~3 days of budget at ₹300/day) |
| Campaigns | 2 — one stopped (payment error), one unpublished draft |
| Unpublished drafts | 3 items sitting in "Review and publish" since ~7 Jun |
| Opportunity score | 100/100 |
| Pixel | Healing Soil Pixel (1321242129962420) — active on healingsoil.in |
| Conversions API | Not set up |
| Product catalogue | 1 connected |

## What has actually run

**Campaign: Healing Soil Bangalore Launch** (messaging objective)
Ad set: *Bangalore – Sustainable Interests – Reels*, ₹300/day, started 5 May 2026
Ad: *Neem Tulsi Ad*

| Metric | Value | Read |
|---|---|---|
| Spend | ₹846.96 | ~3 days of delivery before funds ran out |
| Results | 31 messaging conversations | |
| Cost per conversation | ₹27.32 | Reasonable for cold Bangalore interest targeting |
| Impressions / Reach | 5,283 / 4,126 | Frequency 1.28 — no fatigue |
| CPM | ₹160.32 | Normal for interest-targeted Reels in a metro |
| Link clicks / CPC | 43 / ₹19.70 | |
| CTR (link) | 0.81% | Slightly below the ~1% e-commerce benchmark, but a thin sample |

Verdict: the test was cut short by funding, not by bad performance. ₹27 per WhatsApp conversation is a workable starting point for a D2C soap brand — the open question is how many of those 31 conversations became orders, which Meta can't see.

## The unpublished "Sales" campaign — publish it and it will disappoint

Draft: *Sales* campaign → *New Sales ad set* (scheduled from 7 Jun) → *Default name - Conversions* ad, ₹1,000/day campaign budget.

**Problem: your pixel only fires PageView** (660 events in 28 days, nothing else — no ViewContent, AddToCart, or Purchase). A Sales/Conversions campaign has no purchase signal to optimize toward or report on. You'd spend ₹1,000/day with no ROAS visibility and weak optimization.

Fix before publishing: add Purchase (at minimum) and ideally AddToCart/InitiateCheckout events — via your website platform's Meta integration or Conversions API (Events Manager itself estimates ~17.8% lower cost per result with CAPI). Until then, the messaging objective you already ran is the more honest choice.

Also: ₹1,000/day is a 3.3x jump from the ₹300/day you've tested. Fine if intentional, but with zero conversion tracking it's flying blind at a higher altitude.

## Structural gaps (fix as you scale, not today)

1. **No testing structure.** One ad, one audience, one creative — ever. When you restart, run 2–3 creatives per ad set so Meta can pick a winner.
2. **Single geography/interest audience.** "Sustainable Interests – Bangalore" only. Worth testing a broad/Advantage+ audience alongside it; at your budget Meta's broad targeting often beats narrow interests.
3. **Naming hygiene.** "Default name - Conversions" and "Sales" won't scale. Use e.g. `[Objective] [Audience] [Geo] [Month]`.
4. **Catalogue connected but unused.** Once purchase events exist, catalogue ads (Advantage+ shopping) are a natural next step for a product brand.
5. **Attribution:** current setup (7-day click) is fine — no change needed.

## Recommended sequence

1. Add funds in Billing → ads can deliver again *(you'll need to do this yourself)*
2. Decide the drafts' fate: don't publish the Sales campaign as-is — either discard or hold until step 3
3. Install Purchase/AddToCart events (platform integration or CAPI)
4. Restart the messaging campaign (proven ₹27/conversation) while conversion tracking accrues data
5. Relaunch Sales campaign with 2–3 creatives, messaging + sales measured side by side
6. Review after ~₹10–15k spend — enough data to compare cost per order across objectives

---
*Metrics read from Ads Manager and Events Manager on 10 Jul 2026 (lifetime view). Derived figures verified: CPM = 846.96/5.283 = ₹160.32; CPC = 846.96/43 = ₹19.70; CTR = 43/5,283 = 0.81%; cost/conversation = 846.96/31 = ₹27.32; frequency = 5,283/4,126 = 1.28.*
