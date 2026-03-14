export default function Home() {
  return (
    <main>
      <section className="min-h-screen bg-[#F7F5F0] flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-serif text-5xl text-[#1E5631] mb-4">
            Handmade soaps from a Goa farm
          </h1>
          <p className="font-sans text-lg text-[#666666] mb-8">
            No chemicals. No shortcuts. Made to order, just for you.
          </p>
          <a
            href="/shop"
            className="inline-block bg-[#1E5631] text-white px-8 py-3 rounded font-sans hover:bg-[#C9A84C] hover:text-[#1A1A14] transition-colors"
          >
            Shop the soaps
          </a>
        </div>
      </section>
    </main>
  )
}
