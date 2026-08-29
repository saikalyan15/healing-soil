/**
 * ABANDONED: WhatsApp Embedded Signup OAuth redirect target.
 *
 * The WhatsApp Business Platform onboarding (Embedded Signup + Coexistence,
 * intended to let us send order-status messages to customers) was shelved.
 *
 * This endpoint is disabled: it now returns 404 so there is nothing live to
 * fail against Meta's URL checks. The original implementation is preserved in
 * the comment block below. To bring it back, restore that code, re-enable the
 * `/whatsapp/connect` rewrite in next.config.mjs, and rename
 * public/whatsapp/connect.html.disabled back to connect.html.
 */

export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'x-robots-tag': 'noindex, nofollow',
    },
  })
}

/* ─── Original implementation (disabled) ───────────────────────────────────────

import { NextRequest } from 'next/server'

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
      'x-robots-tag': 'noindex, nofollow',
    },
  })
}

──────────────────────────────────────────────────────────────────────────────── */
