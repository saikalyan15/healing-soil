// The one place the WhatsApp number, socials and default messages live.

export const SITE = {
  name: 'Healing Soil',
  url: 'https://healingsoil.in',
  whatsappNumber: '917483100651',
  whatsappDisplay: '+91 74831 00651',
  region: 'South Goa',
  socials: {
    instagram: 'https://www.instagram.com/healingsoil.in',
    // Two different Facebook URLs existed on the old site. Add the correct one here.
    facebook: null as string | null,
  },
} as const

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const MESSAGES = {
  general: 'Hi Healing Soil, I would like to know more about your soaps.',
  business: 'Hi Healing Soil, I am enquiring for a shop, event or company. Shop or company name: \nCity: \nQuantity: \nDate needed: ',
  harvest: 'Hi Healing Soil, what is ready this season: kokum lip balm or avocado body butter?',
  bar: (name: string) => `Hi Healing Soil, I would like to order ${name}.`,
}
