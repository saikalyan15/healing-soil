// Analytics for the live site only: Google Analytics 4, Meta Pixel and Microsoft Clarity.
// Preview addresses (such as *.pages.dev) send nothing, so test traffic never reaches the reports.
// WhatsApp clicks keep the event names the old site used, so GA4 key events and Meta reporting
// carry on unchanged: whatsapp_click (a GA4 key event) and whatsapp_send_clicked, plus Meta "Contact".
(function () {
  var host = location.hostname
  if (host !== 'healingsoil.in' && host !== 'www.healingsoil.in') return

  // Google Analytics 4
  var ga = document.createElement('script')
  ga.async = true
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-EWQR3K5MW7'
  document.head.appendChild(ga)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', 'G-EWQR3K5MW7')

  // Meta Pixel
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }
    if (!f._fbq) f._fbq = n
    n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []
    t = b.createElement(e); t.async = !0; t.src = v
    s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', '1321242129962420')
  fbq('track', 'PageView')

  // Microsoft Clarity
  ;(function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', 'vz2i65l8ek')

  // WhatsApp clicks
  document.addEventListener('click', function (event) {
    var target = event.target
    if (!(target instanceof Element)) return
    var link = target.closest('a[href]')
    if (!link) return
    try {
      var url = new URL(link.href)
      if (url.hostname !== 'wa.me' || !/^\/(?:c\/)?917483100651(?:\/|$)/.test(url.pathname)) return
      var label = location.pathname
      gtag('event', 'whatsapp_click', { event_category: 'contact', event_label: label })
      gtag('event', 'whatsapp_send_clicked', { event_category: 'contact', event_label: label })
      fbq('track', 'Contact', { content_name: 'whatsapp_order_click' })
    } catch (e) { /* ignore malformed links */ }
  })
})()
