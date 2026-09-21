import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit <small>TRACKER</small></span>
        </NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/">Overview</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
      <footer className="app-footer">Mergington High School · Move with purpose</footer>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview-page">
      <div className="intro-block">
        <p className="eyebrow">YOUR DAILY MOTION</p>
        <h1>Small steps.<br /><em>Strong momentum.</em></h1>
        <p className="intro-copy">Track your team, discover your next workout, and keep the whole school moving forward.</p>
        <NavLink className="primary-action" to="/activities">View activity <span aria-hidden="true">↗</span></NavLink>
      </div>
      <div className="overview-note">
        <span className="note-number">01</span>
        <p>Every session counts. Your activity feeds the friendly competition and makes progress visible.</p>
      </div>
    </section>
  )
}

export default App
