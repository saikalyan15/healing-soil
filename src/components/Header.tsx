'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useOrderStore } from '@/lib/store'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const itemCount = useOrderStore((s) => s.itemCount)

  return (
    <header className="w-full bg-white border-b border-[#E8E0D5] relative z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Healing Soil"
            width={200}
            height={80}
            className="object-contain"
            style={{ height: '72px', width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-sm font-medium transition-colors hover:text-[#1E5631] ${
                pathname === link.href ? 'text-[#1E5631]' : 'text-[#1A1A14]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/order"
            className="relative flex items-center justify-center p-2 text-[#1A1A14] hover:text-[#1E5631] transition-colors"
            aria-label="View Cart"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1E5631] text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <a
            href="https://wa.me/917483100651"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1E5631] px-4 py-2 text-xs font-medium text-white hover:bg-[#1E5631]/90 transition-colors"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-1 ml-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-[#1A1A14] transition-all duration-200 ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#1A1A14] transition-all duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-[#1A1A14] transition-all duration-200 ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E0D5] px-6 pb-5">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-sans text-sm font-medium transition-colors hover:text-[#1E5631] ${
                  pathname === link.href ? 'text-[#1E5631]' : 'text-[#1A1A14]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/917483100651"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#1E5631] px-4 py-2 text-xs font-medium text-white"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
