import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { LANDING } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import Icon from '../components/Icon'
import Logo from '../components/Logo'
import { img } from '../data/images'
import { SITE } from '../data/site'
import './Login.css'

export default function Login() {
  const { user, login, loginAvailable } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <section className="login">
      <div className="login__visual">
        <img src={img('rp-hall')} alt="" className="kenburns" />
        <div className="login__visual-body">
          <Logo size={84} className="login__logo rise" />
          <p className="login__hall rise" style={{ '--i': 1 }}>{SITE.name}</p>
          <p className="login__inst rise" style={{ '--i': 2 }}>{SITE.institute}</p>
          <span className="login__rule rise" style={{ '--i': 3 }} />
          <p className="login__motto rise" style={{ '--i': 4 }}>
            {SITE.motto}
            <span className="hindi">{SITE.mottoHindi}</span>
          </p>
        </div>
      </div>

      <div className="login__panel">
        <form className="login__form rise" style={{ '--i': 1 }} onSubmit={submit} noValidate>
          <h1>Log in</h1>
          <p className="muted">For residents, hall council, alumni and the warden.</p>
          {!loginAvailable && <p className="pending">Sign-in is not set up on this build yet.</p>}

          <div className="login__field">
            <label htmlFor="email">Email</label>
            <div className="login__input">
              <Icon name="mail" size={17} />
              <input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="login__field">
            <label htmlFor="password">Password</label>
            <div className="login__input">
              <Icon name="lock" size={17} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="login__toggle" onClick={() => setShowPassword((v) => !v)} aria-pressed={showPassword}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && <p className="form-error login__error" role="alert">{error}</p>}
          <button type="submit" className="btn login__submit" disabled={!loginAvailable}>
            Log in <Icon name="arrow" size={16} />
          </button>
        </form>
      </div>
    </section>
  )
}
