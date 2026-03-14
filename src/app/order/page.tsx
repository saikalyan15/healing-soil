import OrderForm from '@/components/OrderForm'

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h1 className="mb-8 font-serif text-4xl text-[#1E5631]">Place Your Order</h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Order form */}
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-[#D6CFC4] bg-white p-6 sm:p-8">
              <OrderForm />
            </div>
          </div>

          {/* Reassurance panel */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 space-y-6 rounded-lg border border-[#D6CFC4] bg-white p-6">
              {/* Snehal Rane review */}
              <div className="rounded border-l-4 border-l-[#C9A84C] bg-[#FFF8E8] p-4">
                <p className="mb-3 font-serif text-[17px] italic leading-relaxed text-[#1A1A14]">
                  "The goat milk soap has completely transformed my skin. I've been ordering every
                  month for a year and the quality is always perfect."
                </p>
                <div>
                  <p className="font-sans text-sm font-bold text-[#1E5631]">Snehal Rane</p>
                  <p className="font-sans text-xs text-[#666666]">Mumbai</p>
                </div>
              </div>

              {/* How it works */}
              <div>
                <h3 className="mb-3 font-sans text-sm font-bold text-[#1A1A14]">How it works</h3>
                <ul className="space-y-2.5">
                  {[
                    'Place your order — no payment yet',
                    'Deepanjali confirms availability on WhatsApp',
                    'You pay only after confirmation',
                    'Handmade and shipped from Goa',
                  ].map((step) => (
                    <li key={step} className="flex gap-2.5 font-sans text-sm text-[#666666]">
                      <span className="mt-0.5 font-bold text-[#C9A84C]">✓</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="border-t border-[#D6CFC4] pt-4 font-sans text-xs text-[#666666]">
                Questions? WhatsApp Deepanjali at{' '}
                <a
                  href="https://wa.me/917483100651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#1E5631]"
                >
                  +91 74831 00651
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
