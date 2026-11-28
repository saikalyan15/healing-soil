// The one place the WhatsApp number, socials and default messages live.

export const SITE = {
  name: 'Healing Soil',
  url: 'https://healingsoil.in',
  whatsappNumber: '917483100651',
  whatsappDisplay: '+91 74831 00651',
  email: 'hello@healingsoil.in',
  region: 'South Goa',
  socials: {
    instagram: 'https://www.instagram.com/healingsoil.in',
    // Instagram is the only social the live site lists. Add Facebook here if wanted.
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
  squares: 'Hi Healing Soil, I would like a quote for soap squares.\nPurpose (event, stay, gift, shop): \nSoaps: \nQuantity: \nDate needed: \nCity: ',
  rateCard: 'Hi Healing Soil, please send me the rate card for soap squares.',
  unscented: (name: string) => `Hi Healing Soil, I would like ${name} without essential oils. Is that possible?`,
  harvest: 'Hi Healing Soil, what is ready this season: kokum lip balm or avocado body butter?',
  bar: (name: string) => `Hi Healing Soil, I would like to order ${name}.`,
}
