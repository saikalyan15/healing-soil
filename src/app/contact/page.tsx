export const metadata = {
  title: 'Contact — Healing Soil',
  description:
    'Get in touch with Healing Soil. Chat with us on WhatsApp, follow us on Instagram, or find us on Facebook.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — Healing Soil',
    description: 'Get in touch with Healing Soil. The fastest way to reach us is WhatsApp.',
    url: '/contact',
    siteName: 'Healing Soil',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact Healing Soil' }],
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">

        <h1 className="mb-4 font-serif text-5xl leading-tight text-[#1E5631]">
          Get in touch
        </h1>
        <p className="mb-12 font-sans text-lg leading-relaxed text-[#666666]">
          Every bar of soap is handmade with care on our farm in South Goa.
          The fastest way to reach Healing Soil is WhatsApp.
        </p>

        {/* Primary Contact Options */}
        <div className="mb-10 space-y-4">
          <a
            href="https://wa.me/917483100651"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#1E5631] px-8 py-4 font-sans text-base font-medium text-white transition-colors hover:bg-[#25D366]"
          >
            <WhatsAppIcon size={22} />
            <span>WhatsApp <span className="ml-1 opacity-80">+91 74831 00651</span></span>
          </a>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="tel:+917483100651"
              className="flex items-center gap-3 rounded-lg border border-[#D6CFC4] bg-white px-6 py-4 font-sans text-sm font-medium text-[#1A1A14] transition-colors hover:border-[#1E5631] hover:text-[#1E5631]"
            >
              <PhoneIcon />
              <span>Call: +91 74831 00651</span>
            </a>

            <a
              href="mailto:healingsoil.in@gmail.com"
              className="flex items-center gap-3 rounded-lg border border-[#D6CFC4] bg-white px-6 py-4 font-sans text-sm font-medium text-[#1A1A14] transition-colors hover:border-[#1E5631] hover:text-[#1E5631]"
            >
              <MailIcon />
              <span>healingsoil.in@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Social contacts */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-[#1E5631] mb-2">Socials</h2>
          <a
            href="https://instagram.com/healingsoil.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg border border-[#D6CFC4] bg-white px-6 py-3.5 font-sans text-sm font-medium text-[#1A1A14] transition-colors hover:border-[#C9A84C] hover:text-[#1E5631]"
          >
            <InstagramIcon />
            <span>
              Instagram{' '}
              <span className="font-normal text-[#666666]">@healingsoil.in</span>
            </span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61576352186521"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-lg border border-[#D6CFC4] bg-white px-6 py-3.5 font-sans text-sm font-medium text-[#1A1A14] transition-colors hover:border-[#C9A84C] hover:text-[#1E5631]"
          >
            <FacebookIcon />
            <span>Facebook — Healing Soil</span>
          </a>
        </div>

        <p className="mt-8 font-sans text-sm text-[#999]">
          We typically reply within a few hours.
        </p>

      </div>
    </div>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
