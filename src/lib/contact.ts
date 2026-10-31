// lib/contact.ts — the one place the public contact details live.
//
// Pages, policies, JSON-LD and email senders import from here. To change a
// number or address, change it in this file and nowhere else.

/** WhatsApp / mobile number, digits only with country code (wa.me format). */
export const WHATSAPP_NUMBER = '917483100651'

/** Human-readable form for on-page text. */
export const PHONE_DISPLAY = '+91 74831 00651'

/** For `tel:` links. */
export const PHONE_E164 = '+917483100651'

/** Hyphenated form used in schema.org `telephone`. */
export const PHONE_SCHEMA = '+91-74831-00651'

/** Public contact address, shown on contact, returns, shipping, terms and privacy pages. */
export const SUPPORT_EMAIL = 'hello@healingsoil.in'

/** Address named in the privacy policy. */
export const PRIVACY_EMAIL = SUPPORT_EMAIL

/** Sender address for transactional order emails. */
export const ORDERS_FROM_EMAIL = 'orders@healingsoil.in'

/** Instagram handle as displayed. */
export const INSTAGRAM_HANDLE = '@healingsoil.in'

/** Instagram profile URL. */
export const INSTAGRAM_URL = 'https://instagram.com/healingsoil.in'
