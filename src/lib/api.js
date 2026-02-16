const BASE = '/api/anime'

async function fetchAPI(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`)
  if (!res.ok) throw new Error('API Error')
  return res.json()
}

export const api = {
  getHome: () => fetchAPI('anime/home'),
  getOngoing: () => fetchAPI('anime/ongoing-anime'),
  getAnimeDetail: (slug) => fetchAPI(`anime/anime/${slug}`),
  getEpisodeDetail: (slug) => fetchAPI(`anime/episode/${slug}`),
  getStreamServer: (id) => fetchAPI(`anime/server/${id}`),
  searchAnime: (q) => fetchAPI(`anime/search/${encodeURIComponent(q)}`),
}
