const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

// Use the Codespace proxy when configured, and a relative URL locally so the UI never requests an undefined host.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function apiUrl(resource) {
  return `${API_BASE_URL}/${resource}`
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