'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackMetaEvent } from '@/lib/meta-pixel'

export default function MetaPixelEvents() {
  const pathname = usePathname()
  const previousPathRef = useRef(pathname)

  useEffect(() => {
    if (pathname !== previousPathRef.current) {
      trackMetaEvent('PageView')
      previousPathRef.current = pathname
    }
  }, [pathname])

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return

      const link = target.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      try {
        const url = new URL(link.href)
        const isHealingSoilWhatsApp =
          url.hostname === 'wa.me' &&
          /^\/(?:c\/)?917483100651(?:\/|$)/.test(url.pathname)

        if (isHealingSoilWhatsApp) {
          trackMetaEvent('Contact', { content_name: 'whatsapp_order_click' })
        }
      } catch {
        // Ignore malformed hrefs; navigation should continue normally.
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
