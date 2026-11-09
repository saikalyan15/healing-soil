import Link from 'next/link'
import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'
import { HamperImage } from './GiftHamperCard'
import { Garland, SeasonIcon, StringLights } from './FestiveDecor'
import { giftHampers } from '@/data/gift-hampers'
import { activeSeason } from '@/data/festive-seasons'

// Homepage gifting surfaces. Both read activeSeason() (src/data/festive-seasons.ts).
// The strip shows only inside a season window. The band always shows: in a
// season it carries that festival's copy and decor, outside one it falls back
// to plain year-round gifting copy, because gifting is a standing part of the
// homepage, not only a festival one. The homepage revalidates daily for this.
//
// No prices anywhere here, by the owner's decision: sets are quoted on WhatsApp.
// Soft close, no urgency, no countdown.

const YEAR_ROUND = {
  id: 'gifting',
  eyebrow: 'Gifting',
  headline: 'Handmade soap, made to give',
  intro:
    'Three gift sets, each made to order on our farm in South Goa. Something small for the people you see every day, and something fuller for family.',
  enquiry: 'Hi Healing Soil, I would like to ask about a gift set.',
}

/** A slim line above the hero, so the first screen carries the season. */
export function FestiveStrip() {
  const season = activeSeason()
  if (!season) return null
  return (
    <Link
      href="/gift-hampers"
      className="group flex items-center justify-center gap-2 bg-[#1E5631] px-4 py-2.5 text-center font-sans text-[13px] text-white/90 hover:text-white"
    >
      <SeasonIcon decor={season.decor} className="flex-shrink-0" />
      <span>{season.name} gifting, made to order</span>
      <span className="font-semibold text-[#F2B636] underline decoration-[#C9A84C] underline-offset-4 group-hover:text-white">
        See the gift sets
      </span>
    </Link>
  )
}

export default function FestiveGiftingBand() {
  const season = activeSeason()
  const copy = season ?? YEAR_ROUND

  return (
    <section className="relative w-full overflow-hidden bg-[#1E5631]" aria-labelledby="gifting-heading">
      {season && (
        <>
          <Garland decor={season.decor} />
          <StringLights decor={season.decor} className="-mt-1" />
        </>
      )}

      <div className={`mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-24 ${season ? 'pt-8 md:pt-12' : 'pt-20 md:pt-24'}`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F2B636]">
            {season && <SeasonIcon decor={season.decor} />}
            {copy.eyebrow}
          </p>
          <h2 id="gifting-heading" className="mt-4 font-serif text-[clamp(30px,4.5vw,46px)] leading-[1.1] text-white">
            {copy.headline}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A84C]" />
          <p className="mt-6 font-sans text-base leading-[1.8] text-white/75">{copy.intro}</p>
          {season && <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">{season.dateNote}</p>}
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {giftHampers.map((h) => (
            <li key={h.id}>
              <Link
                href={`/gift-hampers#${h.id}`}
                className="group block overflow-hidden rounded-xl bg-white/5 ring-1 ring-[#C9A84C]/30 transition-colors hover:bg-white/10"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <HamperImage hamper={h} sizes="(max-width: 640px) 90vw, 32vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[21px] leading-snug text-white group-hover:text-[#F2B636]">{h.name}</h3>
                  <p className="mt-1.5 font-sans text-[14px] leading-[1.6] text-white/65">{h.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/gift-hampers"
            className="inline-flex w-full items-center justify-center rounded bg-[#C9A84C] px-9 py-4 font-sans text-sm font-bold text-[#1A1A14] transition-all hover:bg-[#F2B636] active:scale-[0.98] sm:w-auto"
          >
            See the gift sets
          </Link>
          <WhatsAppCTA
            source={`landing_${copy.id}_band`}
            message={copy.enquiry}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded border-2 border-white/40 px-8 py-4 font-sans text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto"
          >
            <WhatsAppIcon />
            Ask about a gift set
          </WhatsAppCTA>
        </div>

        <p className="mt-8 text-center font-sans text-sm text-white/70">
          Gifting for a team or clients?{' '}
          <Link
            href="/corporate-gifting"
            className="font-semibold text-[#F2B636] underline decoration-[#C9A84C] underline-offset-4 hover:text-white"
          >
            Corporate gifting
          </Link>
        </p>
      </div>
    </section>
  )
}
