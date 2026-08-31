import { NextResponse, type NextRequest } from 'next/server'

// In 'dark' site mode the whole site is one holding page at /. Everything else
// 307-redirects there. In 'full' and 'content-only' this is a pass-through
// (route-level redirects handle the storefront in content-only mode).
//
// Temporary (307) on purpose: dark mode is a short hold, and a permanent
// redirect would tell search engines to drop the URLs.

const DARK = process.env.NEXT_PUBLIC_SITE_MODE === 'dark'

export function proxy(request: NextRequest) {
  if (!DARK) return NextResponse.next()

  const { pathname } = request.nextUrl
  if (pathname === '/') return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/'
  url.search = ''
  return NextResponse.redirect(url, 307)
}

export const config = {
  // Skip Next internals, API routes (they return 410 themselves), and any path
  // with a file extension (assets, robots.txt, sitemap.xml, og-image.jpg).
  matcher: ['/((?!_next/|api/|.*\\.).*)'],
}
