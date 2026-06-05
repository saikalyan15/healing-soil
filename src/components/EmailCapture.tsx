'use client'

import { useState } from 'react'

export default function EmailCapture({ variant = 'footer' }: { variant?: 'footer' | 'inline' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className={`font-sans text-sm ${variant === 'footer' ? 'text-cream/70' : 'text-[#1E5631]'}`}>
        You&apos;re on the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`min-w-0 flex-1 rounded-lg border px-3 py-2 font-sans text-sm outline-none focus:ring-1 ${
          variant === 'footer'
            ? 'border-white/20 bg-white/10 text-cream placeholder:text-cream/40 focus:ring-[#C9A84C]'
            : 'border-[#D6CFC4] bg-white text-[#1A1A14] placeholder:text-[#999] focus:ring-[#1E5631]'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`shrink-0 rounded-lg px-4 py-2 font-sans text-sm font-semibold transition-colors disabled:opacity-60 ${
          variant === 'footer'
            ? 'bg-[#C9A84C] text-[#1A2E1A] hover:bg-[#C9A84C]/80'
            : 'bg-[#1E5631] text-white hover:bg-[#1E5631]/80'
        }`}
      >
        {status === 'loading' ? '...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="mt-1 font-sans text-xs text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
