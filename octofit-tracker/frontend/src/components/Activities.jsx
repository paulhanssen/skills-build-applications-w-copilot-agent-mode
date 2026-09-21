import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchRecords('activities', controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <ResourcePage eyebrow="KEEP MOVING" title="Activity log" description="A clear view of every effort made by your community." loading={!activities && !error} error={error} empty={!activities?.length}>
    <div className="activity-list">{activities?.map((activity) => <article className="data-row" key={activity._id || activity.id}>
      <div className="row-icon">{activity.type?.slice(0, 1).toUpperCase()}</div>
      <div><strong>{activity.type || 'Activity'}</strong><span>{activity.durationMinutes || 0} minutes · {activity.distanceKm || 0} km</span></div>
      <b>{activity.points || 0}<small> pts</small></b>
    </article>)}</div>
  </ResourcePage>
}

function ResourcePage({ eyebrow, title, description, loading, error, empty, children }) {
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>{loading && <p className="status">Loading your data...</p>}{error && <p className="status status-error">{error}. Check the API connection.</p>}{empty && !loading && !error && <p className="status">Nothing here yet.</p>}{!loading && !error && !empty && children}</section>
}

export default Activities