import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'

/**
 * Replaces a buy CTA on the content pages that stay published in 'content-only'
 * mode. Keeps the reader with somewhere to go without the page looking truncated.
 * Copy stays inside the CLAUDE.md rules: no urgency, soft close, no claims.
 */
export default function WhatsAppNudge({ source = 'content_nudge' }: { source?: string }) {
  return (
    <div className="my-8 flex flex-col gap-3 rounded-lg border border-[#D6CFC4] bg-[#F0EDE6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-serif text-lg text-[#1E5631]">Made by hand in South Goa</p>
        <p className="font-sans text-sm text-[#666666]">
          Handmade soap with no SLS, parabens, or synthetic fragrance. Send us a message on
          WhatsApp and we will help you find one that suits you.
        </p>
      </div>
      <WhatsAppCTA
        source={source}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-[#1E5631] px-5 py-2.5 text-center font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
      >
        <WhatsAppIcon />
        Message on WhatsApp
      </WhatsAppCTA>
    </div>
  )
}
