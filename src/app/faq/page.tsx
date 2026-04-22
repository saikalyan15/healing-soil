import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — Healing Soil',
  description:
    'Answers to common questions about Healing Soil handmade soaps — ingredients, delivery, ordering, and skin safety.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Healing Soil',
    description:
      'Answers to common questions about Healing Soil handmade soaps — ingredients, delivery, ordering, and skin safety.',
    url: '/faq',
    siteName: 'Healing Soil',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'Are these soaps really chemical-free?',
    a: 'Our soaps contain no synthetic additives: no SLS, no artificial fragrance, no parabens, no preservatives. Every ingredient is something you can read and recognise.',
  },
  {
    q: 'What is the difference between glycerin, goat milk, and shea butter soap?',
    a: 'Glycerin soap is light and clear, best for oily or normal skin. Goat milk soap is creamier and more nourishing, suited to sensitive, dry, or eczema-prone skin. Shea butter soap is the richest of the three, best for very dry skin or anyone who wants to skip a separate moisturiser.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship pan-India.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Shipped in 4 days. Arrives in 3 to 7 days depending on your city.',
  },
  {
    q: 'How do I order?',
    a: 'You can order through our website or reach us on WhatsApp. Both work.',
  },
  {
    q: 'Are these soaps safe for sensitive skin?',
    a: 'Yes. Our soaps contain no synthetic fragrance or harsh foaming agents, which are the most common triggers for skin reactions. The goat milk and shea butter bases are especially gentle.',
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
