import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// Everything that changes what the PDFs say or look like.
export function pdfSourceHash(root = process.cwd()) {
  const files = [
    'src/data/pricing.ts',
    'src/layouts/Print.astro',
    ...readdirSync(join(root, 'src/pages/print')).map((f) => `src/pages/print/${f}`),
  ].sort()
  const h = createHash('sha256')
  for (const f of files) h.update(f).update(readFileSync(join(root, f)))
  return h.digest('hex')
}
