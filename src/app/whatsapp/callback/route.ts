import { NextRequest } from 'next/server'

/**
 * WhatsApp Embedded Signup OAuth redirect target.
 *
 * Registered in the Meta app dashboard as a "Redirect URI" so Meta can send a
 * logged-in admin's browser back here after they finish the Facebook / WhatsApp
 * Embedded Signup flow. This is a one-time internal configuration endpoint — it
 * is not linked from anywhere in the site and carries no user traffic.
 *
 * What it does:
 *  - Accepts an unauthenticated GET (Meta redirects a browser here; there is no
 *    session and no API key involved).
 *  - Captures every query parameter Meta returns (`code`, `state`, and on
 *    failure `error` / `error_description` / `error_reason`).
 *  - Logs the full query string to the server logs and, best-effort, emails it
 *    to NOTIFY_EMAIL_TO so it can be retrieved after the fact.
 *  - Renders a plain confirmation page. The `code` value is never written to the
 *    page — it only goes to the server-side log and the notification email.
 *
 * Must stay publicly reachable over HTTPS at exactly /whatsapp/callback with no
 * redirect and no auth wall. There is no middleware in this app, and
 * next.config.mjs has no rule matching this path, so a plain 200 is returned.
 */

// Never prerender or cache — every hit must run the handler.
export const dynamic = 'force-dynamic'

async function emailQueryString(fullQueryString: string, receivedAt: string): Promise<void> {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.NOTIFY_EMAIL_TO

    if (!apiKey || !to) {
      console.warn(
        '[whatsapp/callback] RESEND_API_KEY or NOTIFY_EMAIL_TO not configured — skipping notification email',
      )
      return
    }

    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    const escapeHtml = (value: unknown) =>
      String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;')

    await resend.emails.send({
      from: 'orders@healingsoil.in',
      to: to.split(',').map((entry) => entry.trim()),
      subject: 'WhatsApp Embedded Signup — OAuth callback received',
      html: `
        <h2 style="color:#1E5631">WhatsApp Embedded Signup callback</h2>
        <p>Meta redirected to <code>/whatsapp/callback</code> at ${escapeHtml(receivedAt)}.</p>
        <p><strong>Full query string:</strong></p>
        <pre style="white-space:pre-wrap;word-break:break-all;background:#F7F5F0;padding:12px;border-radius:8px">${escapeHtml(
          fullQueryString || '(empty)',
        )}</pre>
        <p style="color:#666">Exchange the <code>code</code> for an access token promptly — Meta's authorization codes expire quickly.</p>
      `,
    })
  } catch (err) {
    // Never propagate — the callback page must still render for the admin.
    console.error('[whatsapp/callback] failed to send notification email:', err)
  }
}

export async function GET(request: NextRequest) {
  const receivedAt = new Date().toISOString()
  const params = request.nextUrl.searchParams
  const fullQueryString = params.toString()

  // Structured server-side log. `code` is intentionally included here (server
  // logs only) so it can be retrieved from the Vercel dashboard.
  console.log('[whatsapp/callback] OAuth redirect received', {
    receivedAt,
    fullQueryString,
    params: Object.fromEntries(params.entries()),
  })

  await emailQueryString(fullQueryString, receivedAt)

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>WhatsApp connection complete</title>
<style>
  body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
         background: #F7F5F0; color: #1A1A14; display: flex; min-height: 100vh;
         align-items: center; justify-content: center; }
  .card { max-width: 26rem; margin: 1.5rem; padding: 2rem; background: #fff;
          border: 1px solid #D6CFC4; border-radius: 12px; text-align: center; }
  h1 { font-size: 1.4rem; margin: 0 0 .75rem; color: #1E5631; }
  p { margin: 0; line-height: 1.6; color: #555; }
</style>
</head>
<body>
  <main class="card">
    <h1>WhatsApp connection complete</h1>
    <p>The signup details were received and logged. You can close this window.</p>
  </main>
</body>
</html>
`

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      // Keeps this internal endpoint out of search results. Does not affect
      // Meta's redirect, which is a plain browser navigation, not a crawl.
      'x-robots-tag': 'noindex, nofollow',
    },
  })
}
