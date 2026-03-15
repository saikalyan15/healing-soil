import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

/**
 * On-demand revalidation endpoint.
 *
 * Usage:
 * GET  /api/revalidate?tag=products&secret=...
 * POST /api/revalidate { "tag": "products", "secret": "..." }
 */

async function handler(request: NextRequest) {
  let secret: string | null = null
  let tag: string | null = null
  let path: string | null = null

  // Try query params first
  const { searchParams } = new URL(request.url)
  secret = searchParams.get('secret')
  tag = searchParams.get('tag')
  path = searchParams.get('path')

  // If POST and missing data, try body
  if (request.method === 'POST' && (!secret || (!tag && !path))) {
    try {
      const body = await request.json()
      secret = secret || body.secret
      tag = tag || body.tag
      path = path || body.path
    } catch (e) {
      // Body might not be JSON or might be empty
    }
  }

  // Security check
  if (!secret || secret !== process.env.SOAPLEDGER_API_KEY) {
    console.error('[Revalidate] Unauthorized attempt')
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tag && !path) {
    return NextResponse.json({ message: 'Missing tag or path' }, { status: 400 })
  }

  try {
    if (tag) {
      revalidateTag(tag)
      console.log(`[Revalidate] Tag purged: ${tag}`)
    }
    if (path) {
      revalidatePath(path)
      console.log(`[Revalidate] Path purged: ${path}`)
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      target: tag || path 
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Revalidate Error]', message)
    return NextResponse.json({ message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
