export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

export function truncateText(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function getAnimeStatus(status) {
  const statusMap = {
    ongoing: 'Ongoing',
    complete: 'Completed',
    upcoming: 'Upcoming',
    unknown: 'Unknown'
  }
  return statusMap[status] || status
}

export function extractEpisodeNumber(slug) {
  const match = slug.match(/episode-(\d+)/i)
  return match ? match[1] : null
}