import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container status-page">
        <h1>Page not found</h1>
        <p className="muted">The page you asked for does not exist.</p>
        <Link to="/" className="btn">Go to home</Link>
      </div>
    </section>
  )
}
