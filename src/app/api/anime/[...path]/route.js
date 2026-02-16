import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { path } = params
  const searchParams = request.nextUrl.searchParams
  const apiPath = path.join('/')
  const queryString = searchParams.toString()
  
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${apiPath}${queryString ? `?${queryString}` : ''}`

  console.log(`[Ditznime Proxy] Fetching: ${url}`)

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': process.env.NEXT_PUBLIC_API_BASE_URL,
        'Origin': process.env.NEXT_PUBLIC_API_BASE_URL,
      },
      next: {
        revalidate: 3600 // Cache 1 jam
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status}` }, 
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Set cache headers
    const headers = new Headers()
    headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
    
    return NextResponse.json(data, { headers })
    
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch from external API' }, 
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}