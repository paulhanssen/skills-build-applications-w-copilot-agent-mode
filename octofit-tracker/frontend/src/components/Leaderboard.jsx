import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

export default function Leaderboard() {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchRecords('leaderboard', controller.signal).then(setEntries).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">FRIENDLY COMPETITION</p><h1>Leaderboard</h1><p>Celebrate consistency, not just speed.</p></div>{!entries && !error && <p className="status">Loading your rankings...</p>}{error && <p className="status status-error">{error}. Check the API connection.</p>}{entries?.length === 0 && <p className="status">Rankings will appear after the first activity.</p>}{entries?.length > 0 && <div className="leaderboard-list">{entries.map((entry, index) => <article className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={entry._id || entry.id}><span className="rank">{entry.rank || index + 1}</span><div><strong>{entry.userId?.displayName || entry.userId?.username || entry.displayName || 'Athlete'}</strong><span>{index === 0 ? 'Leading the pack' : 'Keep building momentum'}</span></div><b>{entry.points || 0}<small> pts</small></b></article>)}</div>}</section>
}