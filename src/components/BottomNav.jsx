import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { navItemsFor, ROLE_LABELS } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import { useProfile } from '../features/profile/useProfile'
import Icon from './Icon'

const TABS = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/our-legacy', label: 'Legacy', icon: 'landmark' },
  { to: '/gallery', label: 'Gallery', icon: 'image' },
  { to: '/innovation', label: 'Innovation', icon: 'bulb' },
]

const ICONS = {
  '/hall-council': 'users',
  '/complaints/new': 'clipboard',
  '/complaints': 'clipboard',
  '/funding': 'heart',
  '/recruitment': 'briefcase',
  '/funding-requests': 'handshake',
}

// Phone-only tab bar, frosted like the header. "Menu" opens a sheet with the
// remaining pages for the signed-in role and the account actions.
export default function BottomNav({ onDonate }) {
  const { user, logout } = useAuth()
  const { profile } = useProfile(user)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const tabPaths = TABS.map((t) => t.to)
  const more = navItemsFor(user).filter((i) => !tabPaths.includes(i.to))
  const moreActive = more.some((i) => pathname.startsWith(i.to))

  return (
    <>
      <nav className="bottom-nav" aria-label="Main">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} end={t.to === '/'} className="bottom-nav__tab">
            <Icon name={t.icon} size={22} />
            <span>{t.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className={`bottom-nav__tab${moreActive || open ? ' active' : ''}`}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'grid'} size={22} />
          <span>Menu</span>
        </button>
      </nav>

      {open &&
        createPortal(
          <div className="sheet" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
            <div className="sheet__panel" role="dialog" aria-modal="true" aria-label="Menu">
              <span className="sheet__grip" aria-hidden="true" />
              {user ? (
                <Link to="/profile" className="sheet__user">
                  <span className="sheet__avatar">
                    {profile?.photo ? <img src={profile.photo} alt="" /> : <Icon name="user" size={20} />}
                  </span>
                  <div>
                    <strong>{profile?.name ?? user.name}</strong>
                    <span>{ROLE_LABELS[user.role]} · View profile</span>
                  </div>
                  <Icon name="right" size={18} />
                </Link>
              ) : (
                <p className="sheet__hint">Log in to see the pages for your role.</p>
              )}
              <ul className="sheet__list">
                {more.map((item) => (
                  <li key={item.to}>
                    <NavLink to={item.to} end={item.to === '/complaints'}>
                      <Icon name={ICONS[item.to] ?? 'arrow'} size={20} />
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="sheet__actions">
                {onDonate && (
                  <button type="button" className="btn btn--donate" onClick={() => { setOpen(false); onDonate() }}>
                    <Icon name="heart" size={16} /> Donate
                  </button>
                )}
                {user ? (
                  <button type="button" className="btn btn--outline" onClick={() => { logout(); navigate('/') }}>
                    <Icon name="logout" size={16} /> Log out
                  </button>
                ) : (
                  <Link to="/login" className="btn">Log in</Link>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
