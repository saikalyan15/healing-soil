// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://healingsoil.in',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/print/') })],
})
