import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

export default function Teams() {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchRecords('teams', controller.signal).then(setTeams).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">BETTER TOGETHER</p><h1>Teams</h1><p>Find your people and make movement a shared habit.</p></div>{!teams && !error && <p className="status">Loading teams...</p>}{error && <p className="status status-error">{error}. Check the API connection.</p>}{teams?.length === 0 && <p className="status">No teams have been created yet.</p>}{teams?.length > 0 && <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id || team.id}><span className="card-kicker">{team.memberIds?.length || 0} MEMBERS</span><h2>{team.name}</h2><p>{team.description || 'A team ready to move together.'}</p></article>)}</div>}</section>
}