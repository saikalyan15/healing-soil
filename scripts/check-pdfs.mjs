// Fails the build if the committed PDFs were made from older prices or layout than the site now has.
import { existsSync, readFileSync } from 'node:fs'
import { pdfSourceHash } from './pdf-hash.mjs'

const stored = existsSync('config/pdf-source.hash') ? readFileSync('config/pdf-source.hash', 'utf8').trim() : ''
if (stored !== pdfSourceHash()) {
  console.error('The rate card and brochure PDFs are out of date with the pricing or print pages.\nRun: npm run build && npm run pdf   then commit public/downloads, docs/rate-card and config/pdf-source.hash')
  process.exit(1)
}
console.log('PDF check passed: PDFs match the current prices.')
