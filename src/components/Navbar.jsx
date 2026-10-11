import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { can, navItemsFor, ROLE_LABELS } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import { SITE } from '../data/site'
import Icon from './Icon'
import Logo from './Logo'
import { useProfile } from '../features/profile/useProfile'

export default function Navbar({ onDonate }) {
  const { user, logout } = useAuth()
  const { profile } = useProfile(user)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const items = navItemsFor(user)

  // Close menus on navigation.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpen(false)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const close = (e) => !e.target.closest('.nav-user') && setMenuOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="brand" aria-label={`${SITE.name}, home`}>
          <Logo size={38} className="brand__logo" />
          <span className="brand__text">
            <strong>{SITE.name.toUpperCase()}</strong>
            <small>{SITE.institute.toUpperCase()}</small>
          </span>
        </Link>

        <nav className={`nav__links${open ? ' is-open' : ''}`} aria-label="Main">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/complaints'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          {can(user, 'funding.donate') && (
            <button type="button" className="btn btn--donate btn--small nav__donate" onClick={onDonate} aria-label="Donate">
              <Icon name="heart" size={15} /> <span className="nav__donate-label">Donate</span>
            </button>
          )}

          {user ? (
            <div className="nav-user">
              <button
                type="button"
                className={`icon-btn nav-user__btn${profile?.photo ? ' has-photo' : ''}`}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Account menu"
              >
                {profile?.photo ? <img src={profile.photo} alt="" /> : <Icon name="user" />}
              </button>
              {menuOpen && (
                <div className="nav-user__menu" role="menu">
                  <p className="nav-user__name">{profile?.name ?? user.name}</p>
                  <p className="nav-user__role">{ROLE_LABELS[user.role]}</p>
                  <Link to="/profile" role="menuitem" className="nav-user__link">
                    <Icon name="user" size={16} /> My profile
                  </Link>
                  <button type="button" role="menuitem" className="nav-user__logout" onClick={handleLogout}>
                    <Icon name="logout" size={16} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="icon-btn" aria-label="Log in" title="Log in">
              <Icon name="user" />
            </Link>
          )}

          <button
            type="button"
            className="icon-btn nav__toggle"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
