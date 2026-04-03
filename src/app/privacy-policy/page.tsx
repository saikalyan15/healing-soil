import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Healing Soil',
  description:
    'Privacy policy for healingsoil.in — how we collect, use, and protect your information.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — Healing Soil',
    description: 'Privacy policy for healingsoil.in.',
    url: '/privacy-policy',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-green-primary mb-2">Privacy Policy</h1>
      <p className="font-sans text-sm text-[#888] mb-10">Last updated: April 2025</p>

      <div className="font-sans text-base leading-relaxed text-[#444] space-y-10">

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Who we are</h2>
          <p>
            Healing Soil is a small-batch handmade soap brand based on a farm in South Goa, India.
            We sell natural soaps and wellness products through our website at{' '}
            <a href="https://healingsoil.in" className="text-green-primary underline">healingsoil.in</a>.
            The business is run by Deepanjali.
          </p>
          <p className="mt-3">
            If you have any questions about this policy, you can reach us at{' '}
            <a href="mailto:hello@healingsoil.in" className="text-green-primary underline">
              hello@healingsoil.in
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">What information we collect</h2>
          <p>We collect only the information needed to process and deliver your order:</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li><strong>Name</strong> — to address your order</li>
            <li><strong>Phone number</strong> — to confirm your order via WhatsApp and coordinate delivery</li>
            <li><strong>Delivery address</strong> — to ship your order to you</li>
            <li><strong>Order details</strong> — the products you ordered, quantities, and total amount</li>
          </ul>
          <p className="mt-3">
            We do not collect payment card details. Payments are handled directly via UPI, bank transfer,
            or cash on delivery — we never see or store your card or bank credentials.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">How we use your information</h2>
          <p>Your information is used solely to:</p>
          <ul className="mt-3 list-disc pl-5 space-y-1">
            <li>Process and fulfil your order</li>
            <li>Contact you about your order status or delivery</li>
            <li>Handle returns or queries related to your purchase</li>
          </ul>
          <p className="mt-3">
            We do not use your personal information for marketing without your explicit consent,
            and we never sell, rent, or share your data with third parties for their own commercial purposes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Analytics and cookies</h2>
          <p>
            We use two analytics tools to understand how visitors use our website so we can improve it.
            Neither tool is used for advertising.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-3">
            <li>
              <strong>Google Analytics 4 (GA4)</strong> — collects anonymised data about page visits,
              traffic sources, and general browsing behaviour. Google may use cookies to associate
              sessions over time. You can opt out using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-primary underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — records anonymised heatmaps and session replays
              to show how visitors navigate our pages. Personal details such as names or addresses
              are masked automatically. You can learn more at{' '}
              <a
                href="https://privacy.microsoft.com/en-us/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-primary underline"
              >
                Microsoft&apos;s Privacy Statement
              </a>.
            </li>
          </ul>
          <p className="mt-3">
            Both tools may place cookies in your browser. You can manage or delete cookies at any time
            through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Data retention</h2>
          <p>
            Order information is retained for as long as necessary to fulfil the order and comply
            with any applicable legal or tax obligations. Analytics data is retained according to
            the default retention settings of Google Analytics and Microsoft Clarity.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Your rights</h2>
          <p>
            You have the right to request access to, correction of, or deletion of your personal
            information held by us. To make a request, email us at{' '}
            <a href="mailto:hello@healingsoil.in" className="text-green-primary underline">
              hello@healingsoil.in
            </a>{' '}
            and we will respond within a reasonable time.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-[#1A1A14] mb-3">Changes to this policy</h2>
          <p>
            We may update this privacy policy occasionally. Any changes will be posted on this page
            with a revised date at the top. Continued use of our website after changes are posted
            constitutes your acceptance of the updated policy.
          </p>
        </section>

      </div>
    </div>
  )
}
