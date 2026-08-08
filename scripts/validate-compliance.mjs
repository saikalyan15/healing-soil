import { readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const scanRoots = ['content/blog', 'src', 'public']
const extensions = new Set(['.mdx', '.ts', '.tsx', '.txt'])

const rules = JSON.parse(
  readFileSync(join(root, 'config/compliance-rules.json'), 'utf8')
)
const prohibited = rules.map(({ label, pattern, flags }) => [
  label,
  new RegExp(pattern, flags),
])

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
