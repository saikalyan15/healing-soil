import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const scanRoots = ['content/blog', 'src/app', 'src/components', 'src/data']
const extensions = new Set(['.mdx', '.ts', '.tsx'])

const prohibited = [
  ['therapeutic ingredient claims', /\b(?:antibacterial|antifungal|anti-inflammatory)\b/i],
  ['named skin conditions', /\b(?:eczema|psoriasis|acne|dermatitis|rashes?)\b/i],
  ['treatment language', /\b(?:treats?|cures?|heals?|relieves?)\b/i],
  ['skin-barrier claim', /\bskin barrier\b/i],
  ['exfoliation claim', /\b(?:exfoliat\w*|dead skin|lactic acid)\b/i],
  ['appearance claim', /\b(?:pigmentation|anti[- ]?ag(?:e|ing)|wrinkles?)\b/i],
  ['detox or circulation claim', /\b(?:removes? toxins?|detox(?:es|ing)?|stimulates? circulation)\b/i],
  ['clinical support claim', /\b(?:clinical stud(?:y|ies)|peer[- ]reviewed)\b/i],
  ['pore-blocking claim', /\b(?:non[- ]?comedogenic|comedogenic|clog(?:s|ging)? pores?)\b/i],
]

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const failures = []

for (const scanRoot of scanRoots) {
  for (const path of walk(join(root, scanRoot))) {
    if (!extensions.has(extname(path))) continue

    const source = readFileSync(path, 'utf8')
    if (path.includes(`${join('content', 'blog')}/`) && /^---[\s\S]*?\bpublished:\s*false\b[\s\S]*?---/i.test(source)) {
      continue
    }

    for (const [label, pattern] of prohibited) {
      source.split('\n').forEach((line, index) => {
        if (pattern.test(line)) {
          failures.push(`${relative(root, path)}:${index + 1} [${label}] ${line.trim()}`)
        }
      })
    }
  }
}

if (failures.length > 0) {
  console.error('Compliance validation failed:\n')
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('Compliance validation passed: no prohibited product claims found in active content.')
