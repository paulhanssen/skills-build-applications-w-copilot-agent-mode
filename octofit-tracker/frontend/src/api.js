const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

// Use the Codespace proxy when configured, and the local API otherwise.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function apiUrl(resource) {
  return `${API_BASE_URL}/${resource}/`
}

export function recordsFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  return payload.results || payload.data || payload.items || payload.records || []
}

export async function fetchRecords(resource, signal) {
  const response = await fetch(apiUrl(resource), { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return recordsFromResponse(await response.json())
}