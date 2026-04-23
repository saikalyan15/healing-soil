'use client'
import { useRef, useState } from 'react'

export default function VideoTestimonial() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    videoRef.current?.play()
    setPlaying(true)
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#1A1A14]/5">
      <video
        ref={videoRef}
        src="/reviews/karyn-testimonial.mp4"
        preload="none"
        playsInline
        controls={playing}
        className="h-full w-full object-cover"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          onClick={handlePlay}
          aria-label="Play Karyn's review"
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 transition hover:bg-black/30"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
            <svg className="ml-1 h-6 w-6 text-[#1E5631]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="mt-3 font-sans text-sm text-white">Watch Karyn&apos;s story</span>
        </button>
      )}
    </div>
  )
}
