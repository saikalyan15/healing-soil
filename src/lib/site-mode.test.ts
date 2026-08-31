// Run with: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { siteMode } from './site-mode.ts'

// siteMode() re-reads process.env on every call, so each case can set the var
// and check the result without module-cache games.
function withMode(value: string | undefined, fn: () => void) {
  const previous = process.env.NEXT_PUBLIC_SITE_MODE
  if (value === undefined) delete process.env.NEXT_PUBLIC_SITE_MODE
  else process.env.NEXT_PUBLIC_SITE_MODE = value
  try {
    fn()
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_MODE
    else process.env.NEXT_PUBLIC_SITE_MODE = previous
  }
}

test('defaults to full when unset', () => {
  withMode(undefined, () => assert.equal(siteMode(), 'full'))
})

test('accepts the two non-default modes verbatim', () => {
  withMode('content-only', () => assert.equal(siteMode(), 'content-only'))
  withMode('dark', () => assert.equal(siteMode(), 'dark'))
})

test('falls back to full for anything unrecognised', () => {
  for (const bad of ['', 'FULL', 'contentonly', 'off', 'true', 'maintenance']) {
    withMode(bad, () => assert.equal(siteMode(), 'full', `"${bad}" should fall back`))
  }
})
