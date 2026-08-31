// Run with: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { WHATSAPP_NUMBER, whatsappLink, WA_DEFAULT_MESSAGE } from './whatsapp.ts'

test('the number is the bare international form, no plus or spaces', () => {
  assert.match(WHATSAPP_NUMBER, /^91\d{10}$/)
})

test('a bare link has no query string', () => {
  assert.equal(whatsappLink(), `https://wa.me/${WHATSAPP_NUMBER}`)
})

test('a message is URL-encoded into the text parameter', () => {
  const link = whatsappLink(WA_DEFAULT_MESSAGE)
  assert.ok(link.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`))
  assert.equal(decodeURIComponent(link.split('text=')[1]), WA_DEFAULT_MESSAGE)
  assert.ok(!link.includes(' '), 'spaces must be encoded')
})

test('encodes characters that would break the URL', () => {
  const link = whatsappLink('Two bars & a box, please? 50% off?')
  assert.ok(!/[&?](?!text=)/.test(link.replace(`https://wa.me/${WHATSAPP_NUMBER}?text=`, '')))
  assert.equal(
    decodeURIComponent(link.split('text=')[1]),
    'Two bars & a box, please? 50% off?',
  )
})
