import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

export default function Users() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchRecords('users', controller.signal).then(setUsers).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">YOUR COMMUNITY</p><h1>People</h1><p>Meet the students making progress visible.</p></div>{!users && !error && <p className="status">Loading people...</p>}{error && <p className="status status-error">{error}. Check the API connection.</p>}{users?.length === 0 && <p className="status">No profiles yet.</p>}{users?.length > 0 && <div className="people-list">{users.map((user) => <article className="person-row" key={user._id || user.id}><span className="avatar">{(user.displayName || user.username || '?').slice(0, 1).toUpperCase()}</span><div><strong>{user.displayName || user.username}</strong><span>@{user.username}</span></div><span className="person-email">{user.email}</span></article>)}</div>}</section>
}