import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Healing Soil',
  description:
    'Answers to common questions about Healing Soil handmade soaps — ingredients, delivery, ordering, and product selection.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Healing Soil',
    description:
      'Answers to common questions about Healing Soil handmade soaps — ingredients, delivery, ordering, and product selection.',
    url: '/faq',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'What do you leave out of your soaps?',
    a: 'Our soaps contain no SLS, parabens, synthetic fragrance, or added preservatives. Each product page lists the ingredients used in that bar.',
  },
  {
    q: 'What is the difference between glycerin, goat milk, and shea butter soap?',
    a: 'Glycerin soap has a light, clean lather. Goat milk soap has a softer, creamier feel. Shea butter soap has the richest texture and a moisturising feel that leaves skin feeling soft. Choose based on the lather, texture, and ingredients you prefer.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship pan-India.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Shipped in 2 days. Arrives in 4-7 days depending on your city.',
  },
  {
    q: 'How do I order?',
    a: 'Add your soaps to the cart and pay securely online through Razorpay. Orders are prepaid and cash on delivery is not currently available. A 2.5% online payment charge is added to the order total, rounded to the nearest rupee, and shown in your summary before you pay. You can reach us on WhatsApp if you need help choosing.',
  },
  {
    q: 'Are these soaps suitable for sensitive skin?',
    a: 'Our range includes gentle options suitable for sensitive skin. They contain no SLS, parabens, or synthetic fragrance. If you are unsure, choose a smooth bar and review the ingredient list before ordering.',
  },
  {
    q: 'Is this a made-to-order product?',
    a: 'Yes. Every bar is made after you order. We do not hold pre-made stock, which keeps ingredients fresh and means no preservatives are needed.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function FAQPage() {
  return (
    <div className="bg-[#F7F5F0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="mb-3 font-serif text-5xl leading-tight text-[#1E5631]">
          Frequently asked questions
        </h1>
        <p className="mb-10 font-sans text-base leading-relaxed text-[#666666]">
          Everything you need to know about our soaps, ordering, and delivery.
        </p>

        <div className="divide-y divide-[#D6CFC4]">
          {faqItems.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-medium text-[#1A1A14] hover:text-[#1E5631]">
                {q}
                <span className="flex-shrink-0 text-[#C9A84C] transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 font-sans text-sm leading-relaxed text-[#666666]">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
