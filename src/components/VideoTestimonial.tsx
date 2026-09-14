'use client'
import { useRef, useState } from 'react'

export default function VideoTestimonial() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  // Separate from `playing` on purpose. Native controls stay on once the video
  // has been started, so pausing still leaves a scrubber, but they are absent
  // on the untouched poster where they collided with the caption below.
  const [started, setStarted] = useState(false)

  function handlePlay() {
    videoRef.current?.play().catch(() => {})
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-[#1A1A14]/5">
      {/* Poster is a frame lifted from the video itself (22s), chosen because it
          is the steadiest product-forward moment: two bars on the bed, no face.
          The browser's own first frame put the play button over Karyn's face.
          With a poster standing in for the still, preload drops to none, so the
          10MB file is not touched until someone actually clicks. */}
      <video
        ref={videoRef}
        src="/reviews/Karyn-testimonial.mp4"
        poster="/reviews/karyn-poster.webp"
        preload="none"
        playsInline
        controls={started}
        className="h-full w-full object-cover"
        onPlay={() => {
          setPlaying(true)
          setStarted(true)
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        onClick={handlePlay}
        aria-label="Play Karyn's review"
        className={`absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#1A1A14]/75 via-[#1A1A14]/10 to-transparent pb-8 transition-opacity duration-200 ${
          playing ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg ring-1 ring-[#C9A84C]/60 backdrop-blur-sm">
          <svg className="ml-0.5 h-5 w-5 text-[#1E5631]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em] text-white">
          Watch Karyn&apos;s story
        </span>
      </button>
    </div>
  )
}
