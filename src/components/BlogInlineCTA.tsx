import Link from 'next/link'

export default function BlogInlineCTA() {
  return (
    <div className="my-8 rounded-lg border border-[#D6CFC4] bg-[#F0EDE6] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <p className="font-serif text-lg text-[#1E5631]">Try the starter bundle</p>
        <p className="font-sans text-sm text-[#666666]">
          Four soaps, ₹1,000. SLS-free, made to order from Goa. Free shipping.
        </p>
      </div>
      <Link
        href="/#bundle"
        className="shrink-0 rounded bg-[#1E5631] px-5 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#C9A84C] hover:text-[#1A1A14]"
      >
        See the bundle
      </Link>
    </div>
  )
}
