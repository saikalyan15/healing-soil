'use client'
import { useRef, useState } from 'react'

export default function VideoTestimonial() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play().catch(() => {})
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-[#1A1A14]/5">
      <video
        ref={videoRef}
        src="/reviews/Karyn-testimonial.mp4"
        preload="metadata"
        playsInline
        controls
        className="h-full w-full"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        onClick={handlePlay}
        aria-label="Play Karyn's review"
        className={`absolute inset-0 flex flex-col items-center justify-center bg-black/20 transition-opacity duration-200 ${
          playing ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
          <svg className="ml-1 h-6 w-6 text-[#1E5631]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="mt-3 font-sans text-sm text-white">Watch Karyn&apos;s story</span>
      </button>
    </div>
  )
}
