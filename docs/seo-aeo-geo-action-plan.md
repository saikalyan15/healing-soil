# SEO, AEO, GEO, and measurement action plan

Last reviewed: 8 August 2026

## Completed in code

| Priority | Action | Outcome | Commit |
| --- | --- | --- | --- |
| Critical | Enforce compliant catalogue and testimonial copy | Source content is scanned; SoapLedger updates are checked before replacing the last good cache | `c2975a7`, `87b26f5` |
| High | Consolidate legacy product URLs | Every known alias permanently redirects to its final canonical destination and aliases stay out of sitemaps | `8a9ed45` |
| High | Define the analytics conversion contract | Only saved leads and verified payments are business outcomes; diagnostic funnel events remain separate | `8e8b9ce` |
| Medium | Strengthen entity and article signals | One organization identity is reused across the site, products, and articles; authorship and high-value internal paths are explicit | `5f4451e` |

## Required after deployment

### 1. Correct GA4 key events

Owner: GA4 administrator

Follow [the analytics measurement plan](./analytics-measurement-plan.md). Remove
product views, cart additions, and the legacy WhatsApp click event from key
events. Add `generate_lead` after its first production event arrives and keep
verified `purchase` events as key events.

Success check: the GA4 key-event report contains business outcomes only.

### 2. Confirm canonical indexing in Search Console

Owner: Search Console administrator

After the deployment is live:

1. Inspect the legacy Neem Tulsi product URL and confirm Google sees the
   permanent redirect.
2. Inspect the canonical Neem Tulsi product URL and request indexing if needed.
3. Confirm the submitted sitemap contains the canonical URL only.

Success check: the canonical product page becomes indexed and the legacy URL is
reported as a redirect rather than a duplicate page.

### 3. Preserve the Meta creative baseline

Owner: Ads Manager administrator

Keep visual touch-ups, generated text, and text overlays off on the current ad.
The live creative is the control. Once it has a stable result baseline, create
a separate challenger ad for any visual-touch-up test so its performance can be
compared without altering the control. Generated text and overlays require a
manual brand and compliance review before any future test.

Success check: the control ad remains unchanged and any experiment has its own
ad ID and reporting row.

## Next review

Review GA4 lead quality, Meta WhatsApp conversations, and GSC canonical status
after the deployed changes have collected enough data to compare. Prioritize
new content only after measurement is clean; the current organic strength is
the monsoon gardening article, which now links readers into the farm story and
related slow-living content.
