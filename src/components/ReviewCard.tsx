type ReviewCardProps = {
  quote: string
  name: string
  location: string
  occupation?: string
  featured: boolean
}

export default function ReviewCard({
  quote,
  name,
  location,
  occupation,
  featured,
}: ReviewCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        featured
          ? 'border-l-4 border-l-[#C9A84C] bg-[#FFF8E8] border border-[#E8DFC4]'
          : 'border border-[#D6CFC4] bg-white'
      }`}
    >
      <p className="font-serif text-[18px] italic text-[#1A1A14] leading-relaxed mb-4">
        "{quote}"
      </p>
      <div className="flex flex-col gap-0.5">
        <span className="font-sans text-sm font-bold text-[#1E5631]">{name}</span>
        <span className="font-sans text-xs text-[#666666]">
          {occupation ? `${occupation} · ` : ''}{location}
        </span>
      </div>
    </div>
  )
}
