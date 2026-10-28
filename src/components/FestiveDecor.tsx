import { useId } from 'react'
import type { SeasonDecor } from '@/data/festive-seasons'

// Seasonal decoration, keyed by FestiveSeason.decor. Everything is inline SVG or
// CSS: no image requests, scales to any width, and all of it is decorative, so
// it is hidden from assistive tech. Animations live in globals.css (.flame,
// .bulb, .lamp-glow) and stop under prefers-reduced-motion.
//
// Adding a decor: add it to SeasonDecor, then a pattern to Garland, an icon to
// SeasonIcon and a bulb palette below.

/** A garland hung along the top edge of a festive section. */
export function Garland({ decor, className = '' }: { decor: SeasonDecor; className?: string }) {
  // Two garlands on one page must not share a pattern id.
  const id = `garland-${useId().replace(/:/g, '')}`
  return (
    <svg className={`block h-11 w-full ${className}`} aria-hidden="true" focusable="false">
      <defs>
        {decor === 'marigold' ? (
          // Toran: mango leaves alternating with marigold strands.
          <pattern id={id} width="56" height="44" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="56" y2="3" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M14 3 C 8 12, 9 22, 14 28 C 19 22, 20 12, 14 3 Z" fill="#2F6B3A" />
            <path d="M14 5 L 14 26" stroke="#4E8C55" strokeWidth="0.8" />
            <line x1="42" y1="3" x2="42" y2="12" stroke="#C9A84C" strokeWidth="1" />
            <circle cx="42" cy="18" r="6.5" fill="#E8912D" />
            <circle cx="42" cy="18" r="4.2" fill="#F2B636" />
            <circle cx="42" cy="18" r="1.6" fill="#C9731C" />
            <circle cx="42" cy="31" r="5" fill="#F2B636" />
            <circle cx="42" cy="31" r="3" fill="#E8912D" />
            <circle cx="42" cy="40" r="2.6" fill="#E8912D" />
          </pattern>
        ) : (
          // Evergreen: pine sprigs with red berries and a small gold star.
          <pattern id={id} width="56" height="44" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="56" y2="3" stroke="#C9A84C" strokeWidth="1.5" />
            <path d="M6 3 L 22 3 L 14 22 Z" fill="#2F6B3A" />
            <path d="M9 3 L 19 3 L 14 15 Z" fill="#3E7D47" />
            <circle cx="11" cy="6" r="2.2" fill="#B23A3A" />
            <circle cx="16.5" cy="7.5" r="2" fill="#B23A3A" />
            <line x1="42" y1="3" x2="42" y2="14" stroke="#C9A84C" strokeWidth="1" />
            <path d="M42 15 L 43.8 19.6 L 48.6 19.8 L 44.9 22.8 L 46.1 27.5 L 42 24.8 L 37.9 27.5 L 39.1 22.8 L 35.4 19.8 L 40.2 19.6 Z" fill="#F2B636" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** A small seasonal mark for eyebrows and the strip: a diya, or a star. */
export function SeasonIcon({ decor, className = '' }: { decor: SeasonDecor; className?: string }) {
  if (decor === 'evergreen') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
        <path
          className="flame"
          d="M12 2 L 14.6 8.6 L 21.5 8.9 L 16.1 13.2 L 17.9 20 L 12 16.2 L 6.1 20 L 7.9 13.2 L 2.5 8.9 L 9.4 8.6 Z"
          fill="#F2B636"
        />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      <g className="flame">
        <path d="M12 2.5 C 14.5 6, 14 9, 12 11 C 10 9, 9.5 6, 12 2.5 Z" fill="#F2B636" />
        <path d="M12 5.5 C 13 7.2, 12.8 8.6, 12 9.6 C 11.2 8.6, 11 7.2, 12 5.5 Z" fill="#E8912D" />
      </g>
      <path d="M3 13 H 21 C 20 18, 16.5 21, 12 21 C 7.5 21, 4 18, 3 13 Z" fill="#C9731C" />
      <path d="M3 13 H 21" stroke="#C9A84C" strokeWidth="1.2" />
    </svg>
  )
}

const BULB_COLOURS: Record<SeasonDecor, string[]> = {
  marigold: ['#FFC861', '#FFD98A', '#F2B636'],
  evergreen: ['#FFE3A3', '#F08A7E', '#FFE3A3', '#9ED39A'],
}

const BULBS = 24
const SWAGS = 2

/** Height of the wire at x (0..1): two shallow swags, in px from the top. */
function sag(x: number): number {
  const local = (x * SWAGS) % 1
  return 4 + 14 * Math.sin(Math.PI * local)
}

/**
 * A string of lights in two shallow swags. Each bulb twinkles on its own slow
 * cycle. Delays and durations are derived from the index rather than random,
 * so server and client render the same markup.
 */
export function StringLights({ decor, className = '' }: { decor: SeasonDecor; className?: string }) {
  const colours = BULB_COLOURS[decor]
  const wire = Array.from({ length: 49 }, (_, i) => {
    const x = i / 48
    return `${i === 0 ? 'M' : 'L'} ${(x * 1000).toFixed(1)} ${sag(x).toFixed(1)}`
  }).join(' ')

  return (
    <div className={`pointer-events-none relative h-7 w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1000 28" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d={wire} fill="none" stroke="#C9A84C" strokeOpacity="0.45" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: BULBS }, (_, i) => {
        const x = (i + 0.5) / BULBS
        const colour = colours[i % colours.length]
        return (
          <span
            key={i}
            className="bulb absolute h-[6px] w-[6px] -translate-x-1/2 rounded-full"
            style={
              {
                left: `${x * 100}%`,
                top: `${sag(x) + 1}px`,
                background: colour,
                boxShadow: `0 0 6px 2px ${colour}99`,
                '--delay': `${((i * 0.37) % 2.6).toFixed(2)}s`,
                '--dur': `${(2.4 + ((i * 0.53) % 1.8)).toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
