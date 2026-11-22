# Pending work

Written 2026-11-22, when the Astro rebuild on branch `astro-rebuild` was feature-complete. Confirm an
item is still open before acting on it. Items marked **(you)** need an answer or action from the owner.

## 1. Before the domain moves (launch blockers)

- [ ] **Remove the noindex line** from `public/_headers` (`X-Robots-Tag: noindex, nofollow`). If it ships, Google drops the site.
- [ ] **Merge `astro-rebuild` into `main`** and make `main` the Cloudflare production branch, so there is one source of truth.
- [ ] **Cloudflare build settings:** command `npm run build`, output `dist`, env `NODE_VERSION` 22 (or newer). **(you)**
- [ ] **Copy every DNS record into Cloudflare before switching nameservers:** MX and email, Search Console TXT, Resend, Meta. Missing one silently breaks email or verification. **(you)**
- [ ] **www to apex redirect.** Google still sees `www.healingsoil.in` links. Add a Cloudflare redirect rule (the old Next config did this).
- [ ] **Test the redirects on the `pages.dev` preview**, especially that query strings (Meta ad UTMs) survive. Spot-check: `/shop`, `/shop/pomegranate-glycerine`, `/gift-hampers`, `/corporate-gifting`, `/stories/<slug>`, `/ingredient/neem`.
- [ ] **Meta ads:** `/corporate-gifting` and `/gift-hampers` now redirect. Point the ads at `/wholesale` and `/gifting`. Check the ad copy still matches (the business page is 50g squares only).
- [ ] **Search Console after launch:** submit `sitemap-index.xml`, remove the old `sitemap.xml`, request indexing for the four landers, watch coverage for 404 spikes for two weeks.
- [ ] **GA4:** confirm `whatsapp_click` appears in realtime. Un-mark `view_item`, `add_to_cart`, `begin_checkout` and `purchase` as key events (the shop is gone).
- [ ] **Keep Vercel paused, not deleted, for two weeks** after cutover, as the fallback.

## 2. Facts to confirm (copy depends on them) **(you)**

- [ ] Which bars besides Coconut Moringa are cold process, and the cure time. The homepage says only "left on a rack to cure", with no number.
- [ ] A photo for Coconut Moringa, the only cold-process bar. Its tile says "Photo to come".
- [ ] Essential oils: which bars contain them. SoapLedger lists none for Pomegranate (glycerine), Orange (glycerine) and Marigold.
- [ ] Bases are SLS-free and paraben-free: confirm with the base supplier's spec sheets. The site says so. I removed the old "no preservatives" claims for the same reason.
- [ ] Weights for Marigold and Red Rose (the site shows none).
- [ ] Red Rose: real shape and colour versus the 50g square photo. Spelling of the base ("Red wine").
- [ ] Neem Tulsi and Kesar Gulab photos: embossed text and heart shape are either your real moulds or touch-up.
- [ ] The right Facebook URL (two existed). It is left out of the footer until confirmed.
- [ ] One contact email: `healingsoil.in@gmail.com` is used; the old privacy policy named `hello@healingsoil.in`.
- [ ] Gift hamper contents, prices and the 2 to 3 day making time still current. Chocolate cashews are bought in.
- [ ] Policies reviewed (shipping, refunds, privacy, terms). Check "dispatch within 2 business days" against made-to-order reality, and refunds by UPI.
- [ ] Cosmetic licensing for the lip balm and body butter (Cosmetics Rules, 2020), and label fields (batch, MRP, ingredient declaration).
- [ ] Dietary note for buyers who avoid honey, beeswax, goat milk or wine bases? Honey Oats has honey, the lip balm has beeswax, the body butter has honey. Add only what you can confirm.

## 3. Catalogue and SoapLedger clean-up **(you)**

- [ ] Rename "Charcoal - Detox" in SoapLedger and rewrite its text ("remove excess oil and odour"). It is left off the site.
- [ ] Blue Pea and Lavender Bliss need photos before they can be listed.
- [ ] Lip balm text says "works wonders on very dry, damaged lips". Do not reuse it.
- [ ] Fix the base fields: Kesar-Haldi shows "Papaya Cucumber" correctly, but the avocado butter shows "Aloe Vera" and Red Rose "Red Wine".
- [ ] Decide whether the gift sets, kids set, Valentine bar and discovery boxes get pages. Their old links go to `/soaps`.

## 4. Photos

- [ ] Real photos for the 50g squares, then the homepage bars (one surface, daylight, bar straight on or at 45 degrees). Prompts are in `docs/photography/ai-soap-photo-prompts.md`.
- [ ] A photo of your own kokum fruit, to replace the credited Wikimedia photo.
- [ ] Reshoot the avocado body butter and kokum lip balm without hibiscus or handwriting (the hibiscus is not an ingredient).
- [ ] Farm photos for Neem, Tulsi and Marigold if the current ones are not yours (they are tagged "Grown on our farm").
- [ ] New `og-image.jpg` (still the old design).

## 5. Logo

- [ ] Simplify the hands-and-sprout mark so it survives a melt-and-pour mould. Needs the bar face size and stamp size. The favicon is a placeholder "HS".

## 6. Improvements from Search Console and Analytics (checked 2026-11-22)

- [ ] Re-check the four landers 4 to 6 weeks after launch. `/sls-free-soap`, `/shea-butter-soap` and `/soap-for-sensitive-skin` have been "Crawled, currently not indexed" since July. They were thin (the product grid was hidden in content-only mode). They now carry product cards and fresh copy. If still not indexed, fold them into the matching blog posts with a 301.
- [ ] Travel queries have about 1,100 impressions a month and almost no clicks ("travel soap", "mini soap for travel", "small soap for travel", "mini soap bars"). `/soaps/travel-soaps` now has a price-led title. Consider a dedicated `/travel-soaps` page and link to it from the travel blog post.
- [ ] Titles and descriptions for posts with impressions and no clicks: shea butter soap benefits, chemical-free soap, soap for sensitive skin, marigold soap, loofah soap, glycerine vs goat milk base. Test price- or question-led titles.
- [ ] Meta paid social is about 47% of sessions but converts at about 2%. Review which ads and landing pages send WhatsApp clicks, and tag ad links with UTMs so `whatsapp_click` can be traced to an ad.
- [ ] Instagram organic converts well (17 sessions, 10 key events). Post links to `/soaps` and `/wholesale`.
- [ ] ChatGPT sends traffic (39 sessions). `/llms.txt` is now generated from the data. Check it after launch.
- [ ] About 7.6% of search impressions are US. The site ships only within India and says so. No action unless you want it.
- [ ] Posts still describe making as only "melted and hand-poured". Update the process posts for cold process.

## 7. Features from the original brief not built yet

- [ ] **Festive offers:** dated bundles that switch on and off. Plan: an offers file with start and end dates, filtered at build, and a daily GitHub Actions call to the Cloudflare deploy hook. No countdowns.
- [ ] **Proof for event planners:** past events, logos, testimonials. Nothing to show yet, so nothing is invented.
- [ ] Seasonal pages for the lip balm and body butter, if you want them listed with details.
- [ ] Shrink the brochure PDF (6 MB) for sharing on WhatsApp.
- [ ] A phone-width review of every page, and a Lighthouse run (target 95 or more).

## 8. Repo clean-up

- [ ] Delete old files in the repo root and `docs/`: ad preview PNGs, `output/`, `tools/` (MCP servers, move out if still used), `scripts/stamp-batch.js`, stale planning docs.
- [ ] Remove unused SoapLedger, Razorpay and Resend values from `.env.local` and from Cloudflare/Vercel once Vercel is retired.
- [ ] Add a few tests (pricing, redirects) if the site grows.
- [ ] Dropped on purpose: Datafast analytics, MailerLite email capture, server-side Meta CAPI and GA4 Measurement Protocol (they existed for the checkout). Say so if you want any back.
