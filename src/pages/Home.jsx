import { Link } from 'react-router-dom'
import { can } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import Avatar from '../components/Avatar'
import Icon from '../components/Icon'
import Pending from '../components/Pending'
import { ALUMNI } from '../data/alumni'
import { HALL_STATS, MEDAL_TALLY, REFLECTIONS } from '../data/home'
import { img } from '../data/images'
import { SITE } from '../data/site'
import EventsCalendar from '../features/home/EventsCalendar'
import NoticeBoard from '../features/home/NoticeBoard'
import './Home.css'

const MEDALS = [
  ['gold', 'Gold'],
  ['silver', 'Silver'],
  ['bronze', 'Bronze'],
]

export default function Home() {
  const { user } = useAuth()
  const showNotices = can(user, 'notices.view')
  const showEvents = can(user, 'events.view')

  return (
    <>
      <section className="home-hero">
        <img src={img('rp-hall')} alt="R.P. Hall of Residence building" className="home-hero__img" />
        <div className="container home-hero__body">
          <p className="home-hero__name">{SITE.fullName}</p>
          <h1>{SITE.motto}</h1>
          <p className="home-hero__hindi hindi">({SITE.mottoHindi})</p>
          <p className="home-hero__text">
            More than just a hostel, R.P. is a community that nurtures ideas, builds character and shapes
            leaders for a better tomorrow.
          </p>
          <Link to="/our-legacy" className="btn btn--outline-light">
            Explore Our Hall <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      <div className="container">
        <dl className="stats card">
          {HALL_STATS.map((s) => (
            <div key={s.label} className="stats__item">
              <Icon name={s.icon} size={26} />
              <dd>{s.value}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <section className="section">
        <div className="container">
          <div className="medals">
            <div className="medals__head">
              <div className="head-with-icon">
                <Icon name="trophy" size={30} />
                <div>
                  <h2>R.P. Medal Tally</h2>
                  <p>A legacy of consistent excellence in inter-hall competitions.</p>
                </div>
              </div>
              <Link to="/our-legacy#gc" className="btn btn--outline-light btn--small">
                View Detailed History <Icon name="arrow" size={14} />
              </Link>
            </div>
            <div className="medals__grid">
              {MEDAL_TALLY.map((m) => (
                <div key={m.event} className="medal-card">
                  <img src={img(m.image)} alt="" className="medal-card__img" />
                  <h3>{m.event}</h3>
                  <ul className="medal-card__counts">
                    {MEDALS.map(([key, label]) => (
                      <li key={key}>
                        <span className={`medal medal--${key}`} aria-hidden="true" />
                        <strong>{m[key]}</strong>
                        <span className="visually-hidden">{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(showNotices || showEvents) && (
        <section className="section section--ivory">
          <div className="container home-board">
            {showNotices && <NoticeBoard />}
            {showEvents && <EventsCalendar />}
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="head-with-icon">
              <Icon name="users" size={28} />
              <div>
                <h2>Reflections from the Fraternity</h2>
                <p>Thoughts, guidance and experiences from our community.</p>
              </div>
            </div>
          </div>
          <div className="grid grid--2">
            {REFLECTIONS.map((r) => (
              <article key={r.heading} className="reflection card">
                <Avatar name={r.name} size={96} />
                <div className="reflection__body">
                  <h3>{r.heading}</h3>
                  {r.message ? <p>{r.message}</p> : <Pending>Message to be added.</Pending>}
                  <p className="reflection__name">{r.name ?? 'Name to be added'}</p>
                  <p className="muted small">{r.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="container">
          <div className="section-head">
            <div className="head-with-icon">
              <Icon name="cap" size={28} />
              <div>
                <h2>Notable Alumni</h2>
                <p>R.Pians making an impact across the world.</p>
              </div>
            </div>
            <Link to="/our-legacy#alumni" className="btn btn--outline btn--small">
              View More Alumni <Icon name="arrow" size={14} />
            </Link>
          </div>
          <div className="grid grid--3">
            {ALUMNI.map((a, i) => (
              <article key={i} className="alum-mini card">
                <Avatar name={a.name} size={64} />
                <div>
                  <h3>{a.name}</h3>
                  <p className="small">{a.position}</p>
                  <p className="muted small">{a.organization}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
