import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

export default function Workouts() {
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchRecords('workouts', controller.signal).then(setWorkouts).catch((requestError) => { if (requestError.name !== 'AbortError') setError(requestError.message) }); return () => controller.abort() }, [])
  return <section className="resource-page"><div className="page-heading"><p className="eyebrow">FIND YOUR NEXT</p><h1>Workouts</h1><p>Personalized inspiration for wherever you are today.</p></div>{!workouts && !error && <p className="status">Loading workouts...</p>}{error && <p className="status status-error">{error}. Check the API connection.</p>}{workouts?.length === 0 && <p className="status">No workouts have been added yet.</p>}{workouts?.length > 0 && <div className="card-grid">{workouts.map((workout) => <article className="info-card workout-card" key={workout._id || workout.id}><span className="card-kicker">{workout.difficulty || 'ALL LEVELS'} · {workout.durationMinutes || 0} MIN</span><h2>{workout.title}</h2><p>{workout.description}</p><span className="workout-type">{workout.activityType || 'Movement'}</span></article>)}</div>}</section>
}