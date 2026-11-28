# Pending work

Updated 2026-11-28. Confirm an item is still open before acting on it. **(you)** needs the owner.

## Going live, in this order **(you)**

1. [ ] **Disconnect Git in Vercel** (project, Settings, Git, Disconnect). The current live site keeps serving. `vercel.json` also turns Vercel deploys off, as a second guard.
2. [ ] **Merge the pull request** into `main`.
3. [ ] **Cloudflare Pages:** production branch `main`, build command `npm run build`, output `dist`, `NODE_VERSION` 22. Wait for a green deploy.
4. [ ] **Check the `pages.dev` address** on your phone: home, `/gift-hampers`, `/corporate-gifting`, `/wholesale`, one soap, and a WhatsApp button.
5. [ ] **Copy every DNS record into Cloudflare** before changing nameservers: MX and email (`hello@`), Search Console TXT, Resend, Meta.
6. [ ] **Add the domain** to the Pages project, and a redirect rule from `www.healingsoil.in` to `healingsoil.in`.
7. [ ] **Deploy hook:** create one in Cloudflare Pages for `main`, and add it as the GitHub secret `CF_DEPLOY_HOOK`. Without it the Christmas season does not switch off after 6 January.
8. [ ] **Search Console:** submit `sitemap-index.xml`, remove the old `sitemap.xml`, request indexing for `/sls-free-soap`, `/shea-butter-soap`, `/soap-for-sensitive-skin` and `/gift-hampers`.
9. [ ] **GA4:** check `whatsapp_click` in realtime. Un-mark `view_item`, `add_to_cart`, `begin_checkout` and `purchase` as key events.
10. [ ] **Keep Vercel (disconnected) for two weeks** as the fallback, then delete it, `vercel.json` and old environment values.

## Campaigns **(you)**

- [ ] GA4 showed **no paid social sessions in the 14 days to 2026-11-28**. Check where the Christmas ads point and that their links carry UTM tags. `/gift-hampers` and `/corporate-gifting` keep their addresses.

## Facts to confirm **(you)**

- [ ] Which bars besides Coconut Moringa are cold process, and a photo for Coconut Moringa. The old live FAQ (Nov 1) said "melt-and-pour, not cold-process"; the new site says both, from your note of 18 November.
- [ ] Showing retail prices per bar: the old content-only site showed none, because there is no GST registration for interstate online sales. The new site shows them. Confirm that is fine.
- [ ] Which bars contain essential oils (none listed for Marigold, and the Pomegranate and Orange glycerine bars).
- [ ] Which bars contain lemongrass. It is named as farm-grown, but no bar lists it.
- [ ] Bases are SLS-free and paraben-free: confirm with the supplier's spec sheets.
- [ ] Weights for Marigold and Red Rose.
- [ ] Neem Tulsi and Kesar Gulab photos: embossed text and heart shape are your real moulds, or touch-up.
- [ ] Policies reviewed (shipping, refunds, privacy, terms).
- [ ] Cosmetic licensing for the lip balm and body butter, and label fields.
- [ ] Rename "Charcoal - Detox" in SoapLedger if it is ever to be listed.

## Photos and brand

- [ ] Real photos for the 50g squares and homepage bars. Prompts: `docs/photography/`.
- [ ] Your own kokum fruit photo (then drop the credit line).
- [ ] Logo that works in a melt-and-pour mould (needs bar face and stamp size). The favicon is a placeholder.

## After launch

- [ ] In 4 to 6 weeks, re-check the three landers Google had not indexed. If still not, fold them into the matching posts with a 301.
- [ ] Travel queries get many impressions and few clicks. Watch `/soaps/travel-soaps`.
- [ ] Proof for event planners (past events, testimonials), as it appears.
- [ ] Older posts still carry some wording from the shop era. Review them over time.
