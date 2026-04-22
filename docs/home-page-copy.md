# Home Page Copy (Stage 4 draft)

Last updated: 2026-04-22. Status: drafted, owner-confirmed claims included, ready for implementation pass.

Source of truth for the home-page rewrite. Read alongside `growth-strategy.md`. All copy below uses verifiable claims only, no maker name, no urgency, no superlatives, no em-dashes, soft close.

One-reader frame: Anjali, 34, software engineer in HSR Layout. Two-month dry patch her old soap made worse. Read off Lux six months ago. Tried Pears, then a Dove bar, neither felt right. A friend WhatsApp'd her this link last night.

Section order: Hero → Bundle → Mechanism → Riya secondary → Promises → Reviews grid → Soft close.

---

## Section 1 — Hero (Krutika)

**Headline**
The only soap her skin didn't react to.

**Subhead**
Handmade soap from a Goa farm. Made to order. For skin that has stopped getting along with commercial soap.

**Proof block (inside hero)**
> "Allergic to all the commercial soaps due to skin sensitivity. These were the only soaps that my skin did not react to."
>
> Krutika, Housewife, Bangalore. 5 stars.

**Primary CTA**
Try the starter bundle. Four soaps, ₹1,000.

**Micro-line under CTA**
Shipped in 4 days. Arrives in 3 to 7 days depending on your city. Free shipping included.

**Visual note**
Replace `public/founder.jpg`. Use a farm or hands shot. No face. No maker name in alt text.

---

## Section 2 — Bundle "pick 4"

**Section heading**
The starter bundle

**Lead**
Four soaps so you can find the one your skin agrees with, without committing to a full bar of any single one.

**Default cards (each swappable)**

| Soap | Description | Price |
|---|---|---|
| Honey Oats Glycerin | Gentle, clear base. Suits most skin types. | ₹250 |
| Neem Tulsi Goat Milk | Creamy goat milk base. Calming for irritated skin. | ₹350 |
| Kesar Haldi Goat Milk | Creamy goat milk base. Brightening. | ₹350 |
| Travel Soap | A small fourth bar to try. | ₹50 |

**Running total**
Total ₹1,000. Free shipping included.

**CTA**
Add the bundle to cart.

**Sub-text under CTA**
You can swap any soap before checkout.

**Implementation note**
Frontend "pick 4" block. Adds 4 SKUs to cart in one tap. No new SKU in SoapLedger. CTA in hero links to `#bundle` anchor.

---

## Section 3 — Mechanism

**Section heading**
Why our soap doesn't lather the way you're used to

**Body**
Two things make our soap behave differently from commercial soap.

The first is glycerin. Saponification produces glycerin naturally. Commercial soap removes it because glycerin sells for more on its own, in face creams and lotions. Ours stays in the bar.

The second is what is missing. There is no SLS, the detergent that gives most commercial bars their thick foam. SLS is also one of the more common reasons sensitive skin reacts to soap.

That is why our soap does not foam the way you are used to, and why someone who reacts to commercial soap may not react to ours.

**Process transparency line**
The glycerin and goat milk bases come from a manufacturer we have used since the start. The neem and tulsi are grown on our farm in Goa. We combine them, cure each batch, and ship after your order.

---

## Section 4 — Riya secondary proof

**Section heading**
What it actually feels like

**Quote block**
> "Absolutely loving the honey oats glycerine soap. It is very gentle on the skin. Even without the heavy lather, it leaves me feeling so refreshed."
>
> Riya, Software Professional, Bangalore. 5 stars.

---

## Section 5 — Promises

**Section heading**
What we can and cannot promise

**Body (verbatim per growth doc, owner-approved)**
Every bar is made to order with fresh ingredients from the farm. No two batches are identical, and we will not pretend they are. What we can promise: the ingredients are real, the process is transparent, and if the bar arrives damaged, we replace it.

---

## Section 6 — Reviews grid (4 cards)

**Section heading**
Four more reviews from Bangalore

**Cards**

> "My skin feels noticeably softer, dryness is a thing of the past, and it has even helped reduce my tan."
>
> Snehal Rane, Bangalore. 5 stars.

> "The Red Wine soaps are awesome. They lather less and consume less water."
>
> Sonia, Housewife, Bangalore. 5 stars.

> "Soaps are amazing and very mild and exfoliating."
>
> Shubhada, Small Business Owner, Bangalore. 5 stars.

> "Soaps are amazing and long lasting."
>
> Samyuktha, Therapist, Bangalore. 5 stars.

**Implementation note**
Lisha (review-001) dropped from home grid (eco-led, off-message for the LP). Krutika and Riya are in hero/secondary, removed from grid to avoid duplication. The 3 anonymous "Customer, Bangalore" entries (review-003, 004, 005) are pending first-name lookup from owner. Once named, review-004 can replace one of the Tier B cards if owner prefers.

---

## Section 7 — Soft close

**Heading**
If you'd like to try

**Body**
This is a starter bundle, not a subscription. Four soaps to find the one your skin agrees with. If it works, you will know within a week. If it does not, you have learnt something at ₹1,000 instead of finding out one bar at a time.

**Final CTA**
Add the bundle to cart. ₹1,000.

**Sub-text**
Free shipping. Shipped in 4 days. Arrives in 3 to 7 days depending on your city.

---

## Diagnostics passed

- Sounds-human test: hero headline sourced from Krutika's exact phrase, mechanism uses reason-why with the glycerin economics + SLS absence, close treats reader as an adult.
- Brand voice: maker name absent; sourced vs grown stated explicitly; no urgency; no superlatives; no em-dashes; soft close; eco-conscious not used as headline (made-to-order mentioned in close as operational fact).
- Verifiable claims only: SLS-free confirmed by owner 2026-04-22. No product-efficacy guarantee made.

## Owner action items before ship

- Rename the 3 anonymous reviewers (review-003, 004, 005) with first names. Permission granted by owner 2026-04-22, lookup pending.
- Confirm "manufacturer we have used since the start" phrasing or supply more precise version.
