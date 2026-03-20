import Link from 'next/link'

export default function StoryCTA() {
  return (
    <div className="my-10 rounded-lg border border-[#1E5631]/20 bg-[#1E5631]/5 px-6 py-7">
      <p className="mb-1 font-serif text-xl text-[#1E5631]">Made with the same values</p>
      <p className="mb-5 font-sans text-sm leading-relaxed text-[#555]">
        Handmade soaps from our farm in Goa. No chemicals. Made to order.
      </p>
      <Link
        href="/shop"
        className="inline-block rounded-full bg-[#1E5631] px-5 py-2 font-sans text-sm font-medium text-white hover:bg-[#164825] transition-colors"
      >
        See the soaps →
      </Link>
    </div>
  )
}
