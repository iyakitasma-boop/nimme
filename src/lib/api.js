const API_BASE = '/api/anime'

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!res.ok) {
      throw new Error(`API call failed: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

export const api = {
  // Home
  getHome: () => fetchAPI('anime/home'),
  
  // Schedule
  getSchedule: () => fetchAPI('anime/schedule'),
  
  // Detail Anime
  getAnimeDetail: (slug) => fetchAPI(`anime/anime/${slug}`),
  
  // Ongoing
  getOngoing: (page = 1) => fetchAPI(`anime/ongoing-anime?page=${page}`),
  
  // Complete
  getComplete: (page = 1) => fetchAPI(`anime/complete-anime?page=${page}`),
  
  // All Genres
  getAllGenres: () => fetchAPI('anime/genre'),
  
  // Anime by Genre
  getAnimeByGenre: (slug, page = 1) => fetchAPI(`anime/genre/${slug}?page=${page}`),
  
  // Episode Detail
  getEpisodeDetail: (slug) => fetchAPI(`anime/episode/${slug}`),
  
  // Search
  searchAnime: (keyword) => fetchAPI(`anime/search/${encodeURIComponent(keyword)}`),
  
  // Batch
  getBatchDetail: (slug) => fetchAPI(`anime/batch/${slug}`),
  
  // Unlimited (All Anime)
  getAllAnime: (page = 1) => fetchAPI(`anime/unlimited?page=${page}`),
  
  // Stream Server
  getStreamServer: (serverId) => fetchAPI(`anime/server/${serverId}`),
}