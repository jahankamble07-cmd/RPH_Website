import { Link } from 'react-router-dom'
import { ROLE_LABELS } from '../auth/roles'
import { useAuth } from '../auth/useAuth'

export default function Forbidden() {
  const { user } = useAuth()
  return (
    <section className="section">
      <div className="container status-page">
        <h1>No access</h1>
        <p className="muted">
          This page is not available to {ROLE_LABELS[user?.role] ?? 'your'} accounts.
        </p>
        <Link to="/" className="btn">Go to home</Link>
      </div>
    </section>
  )
}
