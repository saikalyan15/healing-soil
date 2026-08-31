// lib/whatsapp.ts — the one place the WhatsApp number and deep-link format live.
//
// The number was hardcoded in ~15 files. New surfaces (the content-only landing,
// the holding page, the buy-CTA replacements) all go through here. The existing
// checkout components keep their own local copies for now since those screens do
// not render outside the 'full' site mode.

export const WHATSAPP_NUMBER = '917483100651'
export const WHATSAPP_DISPLAY = '+91 74831 00651'

/**
 * Builds a wa.me deep link. With a message it opens the chat with that text
 * pre-filled; without one it just opens the chat.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Default opener used by the landing page and the generic "order on WhatsApp" CTA. */
export const WA_DEFAULT_MESSAGE =
  'Hi Healing Soil, I would like to know more about your soaps.'
