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

**Why this matters:** CDSCO (not FSSAI — that's food) classifies soap as a drug if it makes therapeutic claims.
Avoiding claims does not by itself remove licensing duties: soap appears to be a cosmetic, and the
Cosmetics Rules, 2020 license cosmetic manufacture. Treat the licence question as open until an
adviser confirms it (see `docs/pending.md`).

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
- **All business happens on WhatsApp.** The site has no cart, checkout, accounts or
  backend. Every order CTA opens a wa.me link with a prefilled message
  (`src/config/site.ts`). Payment is UPI after the owner confirms price and date.
- **No prices on the public site** (owner decision, 2026-11-28), retail or wholesale, until GST
  registration and listing rules are settled. `SHOW_PRICES` in `src/config/site.ts` is the switch.
  Prices stay in the data files. The rate card with prices is `docs/rate-card/`, sent on WhatsApp
  and never published. Shipping charges are still shown.
- **No starter bundle** ("4 soaps for ₹1,000" was removed). Do not add bundle offers unless the
  owner asks.
- **Gift sets have no prices** (owner decision, Nov 2026). Three sets: jute bag, discovery box,
  full set. They are quoted on WhatsApp. Do not add a price field back without the owner asking.
- **Farm-grown:** neem, tulsi, lemongrass and marigold (and kokum). Not every bar uses them. The
  Red Rose bar is a sourced red wine and pomegranate base with no farm botanicals.
- **Public email is `hello@healingsoil.in`.** Instagram is the only social listed.
- **Farm is in Goa.** Bangalore is where customers are, never the origin. The one
  exception is the avocado body butter, whose avocados come from the owner's own trees
  in Bangalore; say that only as an ingredient source.
- **Two ways of making soap, and each bar says which.** Most bars are melt and pour from a
  bought base (glycerine, goat milk, papaya cucumber, shea butter, red wine and pomegranate). Some are cold
  process, made from scratch. Never imply every bar is one or the other.
- **Wholesale is 50g soap squares only** (Honey Oats, Kesar Haldi, Red Rose), minimum 25 per
  soap. Events, hospitality and gifting get the rate card price on WhatsApp; shops that resell are
  quoted separately. 100g bars are retail only. Prices live in
  `src/data/pricing.ts`; the rate card and brochure PDFs are made from it.
- **Shipping:** free on orders of ₹1,000 and above. Below that ₹100, or ₹150 for the North
  India states. Never claim unconditional free shipping.
- **Essential oils change from batch to batch and can be left out on request.** Describe them
  like vitamin E ("we use them, listed on the label"), never by naming specific oils unless the
  owner confirms, and never with allergy wording (see the compliance rules above).
- **Kokum lip balm and avocado body butter are seasonal and limited.** Say so plainly
  ("ask what is ready"), never as urgency.
- **Photos are the owner's own, lightly touched up with AI.** The test: the bar that arrives
  must match the photo in shape, colour and surface. Do not add invented props, text or
  embossing. The kokum fruit photo is CC BY-SA 4.0 and keeps its credit line.

## Stack and commands

Astro 7 static site on Cloudflare Pages. No server, no database, no API calls at runtime.
Node 22.23.4 or newer.

```
npm run dev                  # dev server
npm run build                # prebuild (redirects) -> astro build -> postbuild checks
npm run preview              # serve dist/
npm run validate:compliance  # prohibited-claim scan over content/ and src/ and public/
npm run pdf                  # re-render the rate card and brochure (needs Chrome; run after build)
```

`npm run build` runs these checks in order and fails on any problem:

1. `scripts/build-redirects.mjs` (prebuild) writes `public/_redirects` from `config/redirects.txt`,
   one rule per story, and every product slug and legacy alias in `src/data/soaps.ts`.
2. `scripts/check-redirects.mjs`: every redirect destination is a built page.
3. `scripts/check-links.mjs`: no broken internal link or image anywhere in `dist/`.
4. `scripts/check-pdfs.mjs`: the committed PDFs match the current prices and print pages.
   If it fails, run `npm run build && npm run pdf`, then commit `public/downloads/` and
   `config/pdf-source.hash`.

Run `npm run validate:compliance` after editing any copy.

## Where things live

- `src/pages/index.astro`: the homepage story (process, what is not in it, essential oils,
  vitamin E, herbs, small batches, the bars).
- `src/data/soaps.ts`: the retail catalogue, seeded once from SoapLedger on 2026-11-22. This
  file is now the source of truth. Each soap has a base, method, weight, price, ingredients with
  origin, and legacy slugs (which become redirects).
- `src/data/pricing.ts`: wholesale squares, minimum, lead time. A `null` price renders as "ask us".
- `src/data/gift-hampers.ts`, `src/data/reviews.ts`: gifting and reviews.
- `src/data/festive-seasons.ts`: seasonal gifting. In season, `/gift-hampers` is the collection
  page, with a homepage band and a header link. `/corporate-gifting` is the noindex ad landing.
  Both keep their addresses because ads and search results point at them. The site is static, so
  `.github/workflows/daily-rebuild.yml` rebuilds daily (needs the `CF_DEPLOY_HOOK` secret).
- `src/config/site.ts`: WhatsApp number, socials, and every prefilled message. Change a number or a
  social link here only.
- `content/blog` and `content/stories`: MDX, both served at `/blog/<slug>` (filename is the slug;
  `published: false` hides a post). `content/pages`: the ranking and information pages, rendered by
  `src/pages/[...slug].astro` with FAQ and breadcrumb markup.
- `src/pages/print/`: the print layouts for the rate card and brochure.
- `src/pages/llms.txt.ts`: `/llms.txt`, generated from the data so it cannot drift.
- `public/analytics.js`: GA4, Meta Pixel and Clarity, live domain only. WhatsApp clicks fire
  `whatsapp_click` and `whatsapp_send_clicked` (GA4) and Meta `Contact`. Keep those names.
- `public/_headers`: security headers, plus `noindex` for the `*.pages.dev` addresses only.
- `vercel.json` turns Vercel deployments off, so pushing `main` cannot replace the old live site
  with a build that lacks the redirects. Delete the file once Vercel is retired.

Adding a soap: add an entry to `src/data/soaps.ts` and a photo in `public/products/`. Its page,
the listing, the redirects and `llms.txt` follow. Do not add a SoapLedger or any runtime API call.

## Verify against the live system, not against docs

Point-in-time documents go stale. Before acting on any claim about current state, check the source:

- Analytics and search: the `mcp__ga4__*` and `mcp__gsc__*` tools.
- What is built and rendering: `dist/` after `npm run build`, not assumptions.
- What changed: `git log`.
- `docs/pending.md` is a dated to-do list; confirm an item is still open before acting on it.
