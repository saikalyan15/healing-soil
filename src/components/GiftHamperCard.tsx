import Image from 'next/image'
import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'
import type { GiftHamper } from '@/data/gift-hampers'

// One gift set: photo, contents, and a WhatsApp CTA with a pre-filled message.
// No price, by the owner's decision: sets are quoted on WhatsApp. Shared by
// /gift-hampers and /corporate-gifting, which differ only in the message and
// the GA source.

export function HamperImage({ hamper, sizes }: { hamper: GiftHamper; sizes: string }) {
  return (
    <Image
      src={hamper.image.src}
      alt={hamper.image.alt}
      fill
      className="object-cover"
      style={hamper.image.position ? { objectPosition: hamper.image.position } : undefined}
      sizes={sizes}
    />
  )
}

type Props = {
  hamper: GiftHamper
  message: string
  source: string
  ctaLabel: string
  /** Gold ring and a small label, for the hamper the page leads with. */
  highlight?: string
}

export default function GiftHamperCard({ hamper, message, source, ctaLabel, highlight }: Props) {
  return (
    <article
      id={hamper.id}
      className={`relative flex scroll-mt-24 flex-col overflow-hidden rounded-xl border bg-[#F7F5F0] ${
        highlight ? 'border-[#C9A84C] ring-1 ring-[#C9A84C]' : 'border-[#D6CFC4]'
      }`}
    >
      {highlight && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-[#1E5631] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#F2B636]">
          {highlight}
        </span>
      )}
      <div className="relative aspect-square w-full overflow-hidden bg-[#1E5631]/5">
        <HamperImage hamper={hamper} sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 24vw" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[23px] leading-snug text-[#1A1A14]">{hamper.name}</h3>
        <ul className="mt-3 space-y-1.5">
          {hamper.contents.map((c) => (
            <li key={c} className="flex gap-2.5 font-sans text-[14px] leading-[1.6] text-[#444444]">
              <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-[#C9A84C]" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
        {hamper.note && (
          <p className="mt-3 font-sans text-[13px] leading-[1.7] text-[#666666]">{hamper.note}</p>
        )}
        <div className="mt-6 pt-2 md:mt-auto">
          <WhatsAppCTA
            source={source}
            message={message}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded border-2 border-[#1E5631] px-6 py-3.5 font-sans text-sm font-bold text-[#1E5631] transition-all hover:bg-[#1E5631] hover:text-white active:scale-[0.98]"
          >
            <WhatsAppIcon />
            {ctaLabel}
          </WhatsAppCTA>
        </div>
      </div>
    </article>
  )
}
