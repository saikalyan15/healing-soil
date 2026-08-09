# Healing Soil — Claude Instructions

## Regulatory Compliance — No Therapeutic Claims

Healing Soil sells handmade soap in India under the Drugs and Cosmetics Act, 1940.
Making therapeutic or medicinal claims without a drug/cosmetic license is an offence.

**NEVER write or suggest copy that includes:**
- "antibacterial," "antifungal," "anti-inflammatory" as product claims
- References to skin conditions: eczema, psoriasis, acne, rashes, dermatitis
- "treats," "cures," "heals," "relieves," "repairs" + any skin condition
- Clinical study citations or peer-reviewed research references supporting health claims
- Exfoliation claims (e.g. "lactic acid dissolves dead skin cells")
- "repairs skin barrier," "reduces pigmentation," "anti-aging," "slows signs of ageing"
- "removes toxins," "stimulates circulation" as skin benefit claims

**SAFE language to use instead:**
- "gentle," "nourishing," "moisturising feel," "leaves skin feeling soft"
- "suitable for sensitive skin" (skin type, not disease)
- "no SLS, parabens, synthetic fragrance"
- "made with natural oils and botanicals"
- "traditionally used in Ayurvedic personal care"
- Ingredient lists and process/origin descriptions
- "gentle lather," "creamy texture," "earthy scent"

**Why this matters:** CDSCO (not FSSAI — that's food) classifies soap as a drug if it makes therapeutic claims. No claims = no drug/cosmetic license needed for handmade soap.

## Brand constraints (non-negotiable)

- **Never name the maker in public copy.** This is a safety decision, not a style one.
- No exaggeration beyond what the ingredient actually does.
- No urgency. Everything is made to order, so scarcity would be invented.
- No superlatives.
- Transparency about which ingredients are grown on the farm and which bases are
  sourced is a trust signal. Say which is which.
- Eco-conscious choices appear in context, never as a headline claim.
- Soft close only. An invitation, not a prompt.
- No em-dashes.

## Business facts

- **ICP:** urban Indian woman 28–45, Bangalore-heavy, reads ingredient lists, has
  already moved off commercial soap. Not looking for "the best soap", looking for
  one that does not hurt her. Two recurring themes in reviews: no reaction, and
  no heavy lather.
- **Primary offer:** starter bundle, 4 soaps at ₹1,000. Single desired action.
- **Farm is in Goa.** Bangalore is where customers are, never the origin.
- **Payments:** Razorpay is the default website checkout behind
  `NEXT_PUBLIC_ENABLE_RAZORPAY`. WhatsApp is shown only after a definite gateway
  failure or checkout dismissal. SoapLedger has an immediate order-pause switch.
- **Shipping:** free on orders of ₹1,000 and above. Below that ₹100, or ₹150 for
  the nine North India states listed in `src/lib/shipping.ts`. Never claim
  unconditional free shipping.

## Verify against the live system, not against docs

Point-in-time status documents in this repo went stale and caused repeated wrong
conclusions. Before acting on any claim about current state, check the source:

- Analytics and search: the `mcp__ga4__*` and `mcp__gsc__*` tools.
- Product catalogue: the SoapLedger API, not any hardcoded list.
- What is built and rendering: the build output in `.next/`, not assumptions.
- What changed: `git log`.

If a doc and the live system disagree, the live system is right.
