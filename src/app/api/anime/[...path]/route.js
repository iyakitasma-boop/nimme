export async function GET(req, { params }) {
  const path = params.path.join('/')
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`
  
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    })
    const data = await res.json()
    return Response.json(data)
  } catch {
    return Response.json({ error: 'Failed' }, { status: 500 })
  }
}
