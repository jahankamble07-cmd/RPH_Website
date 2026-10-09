import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { LANDING } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import Logo from '../components/Logo'
import './Login.css'

export default function Login() {
  const { user, login, loginAvailable } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const next = params.get('next')
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : null

  if (user) return <Navigate to={safeNext ?? LANDING[user.role]} replace />

  const submit = (e) => {
    e.preventDefault()
    const signedIn = login(email, password)
    if (!signedIn) {
      setError('Email or password is incorrect.')
      return
    }
    navigate(safeNext ?? LANDING[signedIn.role], { replace: true })
  }

  return (
    <section className="section login">
      <div className="container">
        <div className="login__card card">
          <Logo size={56} className="login__logo" />
          <h1>Log in</h1>
          <p className="muted small">For residents, hall council, alumni and the warden.</p>
          {!loginAvailable && (
            <p className="pending">Sign-in is not set up on this build yet.</p>
          )}
          <form className="form" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="btn" disabled={!loginAvailable}>Log in</button>
          </form>
        </div>
      </div>
    </section>
  )
}
