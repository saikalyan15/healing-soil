'use client'

import { useOrderStore } from '@/lib/store'

const TEXTURE_OPTIONS = [
  { value: 'no-preference', label: 'No preference' },
  { value: 'smooth', label: 'Smooth — plain lather, no exfoliants' },
  { value: 'mildly-textured', label: 'Mildly Textured — fine particles, gentle feel' },
  { value: 'textured', label: 'Textured — visible grit (neem, oats, marigold)' },
  { value: 'loofah', label: 'Loofah — embedded loofah, strong exfoliation' },
]

const SCENT_OPTIONS = [
  { value: 'no-preference', label: 'No preference' },
  { value: 'light', label: 'Light scent' },
  { value: 'unscented', label: 'Unscented' },
]

export default function OrderPreferences() {
  const preferences = useOrderStore((s) => s.preferences)
  const setPreferences = useOrderStore((s) => s.setPreferences)

  return (
    <div className="rounded-lg border border-[#D6CFC4] bg-white p-6">
      <h2 className="mb-1 font-serif text-xl text-[#1A1A14]">Customise your order</h2>
      <p className="mb-6 font-sans text-sm text-[#666666]">
        Optional — share your preferences and we will tailor your order where possible.
      </p>

      {/* Texture preference */}
      <fieldset className="mb-6">
        <legend className="mb-3 font-sans text-sm font-semibold text-[#1A1A14]">
          Texture preference
        </legend>
        <div className="space-y-2">
          {TEXTURE_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-start gap-3">
              <input
                type="radio"
                name="texture"
                value={opt.value}
                checked={preferences.texture === opt.value}
                onChange={() => setPreferences({ texture: opt.value })}
                className="mt-0.5 accent-[#1E5631]"
              />
              <span className="font-sans text-sm text-[#1A1A14]">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Scent preference */}
      <fieldset className="mb-6">
        <legend className="mb-3 font-sans text-sm font-semibold text-[#1A1A14]">
          Scent preference
        </legend>
        <div className="space-y-2">
          {SCENT_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-start gap-3">
              <input
                type="radio"
                name="scent"
                value={opt.value}
                checked={preferences.scent === opt.value}
                onChange={() => setPreferences({ scent: opt.value })}
                className="mt-0.5 accent-[#1E5631]"
              />
              <span className="font-sans text-sm text-[#1A1A14]">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Anything to avoid */}
      <div>
        <label
          htmlFor="avoid"
          className="mb-2 block font-sans text-sm font-semibold text-[#1A1A14]"
        >
          Anything to avoid?
        </label>
        <p className="mb-2 font-sans text-xs text-[#666666]">
          e.g. no goat milk, no nuts, no strong botanicals
        </p>
        <textarea
          id="avoid"
          rows={3}
          value={preferences.avoid}
          onChange={(e) => setPreferences({ avoid: e.target.value })}
          placeholder="Leave blank if none"
          className="w-full rounded border border-[#D6CFC4] px-3 py-2 font-sans text-sm text-[#1A1A14] placeholder:text-[#999] focus:border-[#1E5631] focus:outline-none"
        />
      </div>
    </div>
  )
}
