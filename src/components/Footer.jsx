import { Link } from 'react-router-dom'
import { NAV_ITEMS } from '../auth/roles'
import { SITE, SOCIAL_LINKS } from '../data/site'
import Icon from './Icon'
import Logo from './Logo'

const PUBLIC_LINKS = NAV_ITEMS.filter((item) => !item.permission)
const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <Link to="/" className="brand brand--light" aria-label={`${SITE.name}, home`}>
          <Logo size={38} className="brand__logo" />
          <span className="brand__text">
            <strong>{SITE.name.toUpperCase()}</strong>
            <small>{SITE.institute.toUpperCase()}</small>
          </span>
        </Link>
        <nav className="footer__links" aria-label="Footer">
          {PUBLIC_LINKS.map((item) => (
            <Link key={item.to} to={item.to}>{item.label}</Link>
          ))}
        </nav>
        <div className="footer__social">
          {SOCIAL_LINKS.map((s) =>
            s.url ? (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name}>
                <Icon name={s.icon} size={20} />
              </a>
            ) : (
              <span key={s.name} title={`${s.name} link to be added`} aria-label={`${s.name} (link to be added)`}>
                <Icon name={s.icon} size={20} />
              </span>
            ),
          )}
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {YEAR} {SITE.name}, {SITE.institute}. All rights reserved.</span>
        <span>
          <em>{SITE.motto}</em> | <span className="hindi">{SITE.mottoHindi}</span>
        </span>
      </div>
    </footer>
  )
}
