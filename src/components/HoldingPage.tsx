import Image from 'next/image'
import WhatsAppCTA, { WhatsAppIcon } from './WhatsAppCTA'
import { WA_DEFAULT_MESSAGE } from '@/lib/whatsapp'

// The whole site in 'dark' mode: one page. Everything else redirects here.
// Kept deliberately bare. Copy follows CLAUDE.md.

export default function HoldingPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#F7F5F0] px-4">
      <div className="max-w-md text-center">
        <Image
          src="/logo.png"
          alt="Healing Soil"
          width={200}
          height={80}
          priority
          className="mx-auto object-contain"
          style={{ height: '84px', width: 'auto' }}
        />
        <p className="mt-8 font-serif text-2xl leading-snug text-[#1E5631]">
          Healing Soil is taking a short pause.
        </p>
        <p className="mt-4 font-sans text-sm leading-relaxed text-[#666666]">
          For anything you need, you can reach us on WhatsApp or follow along on Instagram.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <WhatsAppCTA
            source="holding_page"
            message={WA_DEFAULT_MESSAGE}
            className="inline-flex items-center justify-center gap-2 rounded bg-[#1E5631] px-8 py-3 font-sans text-sm font-medium text-white transition-colors hover:bg-[#153d22]"
          >
            <WhatsAppIcon />
            Message on WhatsApp
          </WhatsAppCTA>
          <a
            href="https://instagram.com/healingsoil.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-[#1E5631] underline underline-offset-4 hover:text-[#C9A84C]"
          >
            @healingsoil.in
          </a>
        </div>
      </div>
    </div>
  )
}
