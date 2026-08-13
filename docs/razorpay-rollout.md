# Razorpay rollout

## Required environment variables

Copy the Razorpay and notification entries from `.env.example` into the
production environment. `NOTIFY_EMAIL_TO` accepts comma-separated recipients.

## Razorpay dashboard

1. Add a webhook pointing to `https://healingsoil.in/api/razorpay/webhook`.
2. Use the same secret in `RAZORPAY_WEBHOOK_SECRET`.
3. Subscribe to `order.paid` and `payment.captured`.
4. Enable payment-received email notifications and the desired Razorpay
   settlement SMS/WhatsApp notifications.

## Release order

1. Apply SoapLedger migrations v23 and v24.
2. Deploy SoapLedger, then deploy Healing Soil with Razorpay enabled.
3. Test successful payment, dismissed payment, failed payment, duplicate
   webhook delivery, and a lost browser callback.
4. Test the SoapLedger Settings kill switch in both positions.
5. Only after checkout is verified, launch the Meta website-sales ad. Keep the
   WhatsApp ad live until the website ad is approved, then pause it.
