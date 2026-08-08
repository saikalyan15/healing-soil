# Analytics measurement plan

Last reviewed: 8 August 2026

## Key events

Only persisted business outcomes should be marked as GA4 key events:

| Event | Meaning | Key event |
| --- | --- | --- |
| `generate_lead` | An unpaid order was saved successfully and is ready for WhatsApp follow-up | Yes |
| `purchase` | Razorpay payment was verified and the paid order was saved | Yes |

Razorpay is currently disabled, so new WhatsApp orders should produce
`generate_lead`, not `purchase`.

## Diagnostic funnel events

These events help diagnose the funnel but must not be marked as key events:

| Event | Meaning |
| --- | --- |
| `view_item` | Product detail page viewed |
| `add_to_cart` | Product or bundle added to the order |
| `begin_checkout` | Customer first interacted with the checkout form |
| `whatsapp_click` | Legacy GA custom event for a WhatsApp outbound click |
| `whatsapp_send_clicked` | Customer opened the prepared order message from confirmation |

## GA4 Admin change required

In **Admin → Data display → Events / Key events** for property `G-EWQR3K5MW7`:

1. Unmark `view_item`, `add_to_cart`, and `whatsapp_click` as key events.
2. Mark `generate_lead` as a key event after the first event arrives.
3. Keep `purchase` marked as a key event.
4. Leave `begin_checkout` and `whatsapp_send_clicked` unmarked.

The GA4 reporting connector is read-only and cannot change these property
settings. As of this review, the last 30 days were inflated by 49 `view_item`,
14 `add_to_cart`, and 9 `whatsapp_click` events counted as conversions.

## Reporting boundary

Treat order-funnel reporting before 8 August 2026 as historical, non-comparable
data. Use `generate_lead` for unpaid WhatsApp orders and `purchase` only for
verified online payments from this date forward.
