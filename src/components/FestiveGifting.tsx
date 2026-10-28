import Image from 'next/image'
import Link from 'next/link'
import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'
import { Garland, SeasonIcon, StringLights } from './FestiveDecor'
import { giftHampers, formatRupees, LOWEST_HAMPER_PRICE, HIGHEST_HAMPER_PRICE } from '@/data/gift-hampers'
import { activeSeason } from '@/data/festive-seasons'

// Homepage festive surfaces. Both read activeSeason() and render nothing outside
// a season window (src/data/festive-seasons.ts), so the homepage goes back to
// its usual self when a festival ends, with no code change. The homepage
// revalidates daily for this.
//
// Soft close, no urgency, no countdown. The festival date is stated as a plain
// fact on /gift-hampers, next to how long making and delivery take.

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
      <span>
        {season.name} gift hampers, {formatRupees(LOWEST_HAMPER_PRICE)} to {formatRupees(HIGHEST_HAMPER_PRICE)}
      </span>
      <span className="font-semibold text-[#F2B636] underline decoration-[#C9A84C] underline-offset-4 group-hover:text-white">
        See all four
      </span>
    </Link>
  )
}

export default function FestiveGiftingBand() {
  const season = activeSeason()
  if (!season) return null

  return (
    <section className="relative w-full overflow-hidden bg-[#1E5631]" aria-labelledby="festive-gifting-heading">
      <Garland decor={season.decor} />
      <StringLights decor={season.decor} className="-mt-1" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-8 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14 md:pb-24 md:pt-12">
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          {/* Warm light behind the photo, breathing slowly like a lamp. */}
          <div
            className="lamp-glow absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgba(242,182,54,0.45),transparent)]"
            aria-hidden="true"
          />
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] ring-1 ring-[#C9A84C]/40">
            <Image
              src={season.heroImage.src}
              alt={season.heroImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 42vw"
            />
          </div>
        </div>

        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-[#F2B636]">
            <SeasonIcon decor={season.decor} />
            {season.eyebrow}
          </p>
          <h2
            id="festive-gifting-heading"
            className="mt-4 font-serif text-[clamp(30px,4.5vw,46px)] leading-[1.1] text-white"
          >
            {season.headline}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-[#C9A84C] md:mx-0" />
          <p className="mt-6 font-sans text-base leading-[1.8] text-white/75">{season.intro}</p>

          <ul className="mt-8 divide-y divide-white/15 border-y border-white/15 text-left">
            {giftHampers.map((h) => (
              <li key={h.id}>
                <Link href={`/gift-hampers#${h.id}`} className="group flex items-baseline justify-between gap-4 py-4">
                  <span>
                    <span className="block font-serif text-[19px] text-white group-hover:text-[#F2B636]">
                      {h.name}
                    </span>
                    <span className="mt-0.5 block font-sans text-[13px] leading-snug text-white/60">
                      {h.summary}
                    </span>
                  </span>
                  <span className="flex-shrink-0 font-serif text-[22px] text-[#F2B636]">
                    {formatRupees(h.price)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <Link
              href="/gift-hampers"
              className="inline-flex w-full items-center justify-center rounded bg-[#C9A84C] px-9 py-4 font-sans text-sm font-bold text-[#1A1A14] transition-all hover:bg-[#F2B636] active:scale-[0.98] sm:w-auto"
            >
              See the hampers
            </Link>
            <WhatsAppCTA
              source={`landing_${season.id}_band`}
              message={season.enquiry}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded border-2 border-white/40 px-8 py-4 font-sans text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-[0.98] sm:w-auto"
            >
              <WhatsAppIcon />
              Ask about a hamper
            </WhatsAppCTA>
          </div>
          <p className="mt-5 font-sans text-xs leading-relaxed text-white/50">
            Free shipping on orders of ₹1,000 and above.
          </p>
        </div>
      </div>
    </section>
  )
}
