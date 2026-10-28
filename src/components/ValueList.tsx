import { valuePoints, VALUE_CLOSE } from '@/data/value-story'

// The numbered, hairline-separated list of where the price goes
// (src/data/value-story.ts). Pages supply their own section, heading and image;
// this is only the list and its closing line, so the wording stays identical
// everywhere it appears.

export default function ValueList({ showClose = true }: { showClose?: boolean }) {
  return (
    <>
      <div className="divide-y divide-[#D6CFC4]">
        {valuePoints.map((item, i) => (
          <div key={item.t} className="flex gap-5 py-5 first:pt-0">
            <span className="mt-1 font-serif text-lg leading-none text-[#C9A84C]/70">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="mb-1.5 font-sans text-sm font-semibold tracking-wide text-[#1A1A14]">{item.t}</h3>
              <p className="font-sans text-sm leading-[1.7] text-[#666666]">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
      {showClose && (
        <p className="mt-6 border-l-2 border-[#C9A84C] pl-4 font-serif text-[19px] italic leading-relaxed text-[#1E5631]">
          {VALUE_CLOSE}
        </p>
      )}
    </>
  )
}
