import { Link } from 'react-router-dom'
import { can } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import Icon from '../components/Icon'
import Pending from '../components/Pending'
import PortraitCard from '../components/PortraitCard'
import ProfileFeature from '../components/ProfileFeature'
import Rail from '../components/Rail'
import Reveal from '../components/Reveal'
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

function SectionHead({ icon, title, text, action }) {
  return (
    <Reveal className="section-head">
      <div className="head-with-icon">
        <Icon name={icon} size={28} />
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      {action}
    </Reveal>
  )
}

export default function Home() {
  const { user } = useAuth()
  const showNotices = can(user, 'notices.view')
  const showEvents = can(user, 'events.view')

  return (
    <>
      <section className="home-hero">
        <img src={img('rp-hall')} alt="R.P. Hall of Residence building" className="home-hero__img kenburns" />
        <div className="container home-hero__body">
          <p className="home-hero__name rise" style={{ '--i': 0 }}>{SITE.fullName}</p>
          <h1 className="rise" style={{ '--i': 1 }}>{SITE.motto}</h1>
          <p className="home-hero__hindi hindi rise" style={{ '--i': 2 }}>({SITE.mottoHindi})</p>
          <p className="home-hero__text rise" style={{ '--i': 3 }}>
            More than just a hostel, R.P. is a community that nurtures ideas, builds character and shapes
            leaders for a better tomorrow.
          </p>
          <Link to="/our-legacy" className="btn btn--outline-light rise" style={{ '--i': 4 }}>
            Explore Our Hall <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      <div className="container">
        <Reveal as="dl" className="stats card" variant="zoom">
          {HALL_STATS.map((s) => (
            <div key={s.label} className="stats__item">
              <Icon name={s.icon} size={26} />
              <dd>{s.value}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </Reveal>
      </div>

      {(showNotices || showEvents) && (
        <section className="section section--ivory">
          <Reveal className="container home-board">
            {showNotices && <NoticeBoard />}
            {showEvents && <EventsCalendar />}
          </Reveal>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal className="medals">
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
              {MEDAL_TALLY.map((m, i) => (
                <Reveal key={m.event} delay={i * 120}>
                  <div className="medal-card lift">
                    <span className="medal-card__icon"><Icon name={m.icon} size={34} /></span>
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
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>


      <section className="section">
        <div className="container">
          <SectionHead icon="users" title="Reflections from the Fraternity" text="Thoughts, guidance and experiences from our community." />
          <div className="reflections">
            {REFLECTIONS.map((r, i) => (
              <Reveal key={r.heading} variant={i ? 'right' : 'left'}>
                <ProfileFeature
                  quote
                  name={r.name}
                  heading={r.heading}
                  title={r.name ?? 'Name to be added'}
                  footer={<p className="muted small">{r.role}</p>}
                >
                  {r.message ? <p>{r.message}</p> : <Pending>Message to be added.</Pending>}
                </ProfileFeature>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="container">
          <SectionHead
            icon="cap"
            title="Notable Alumni"
            text="R.Pians making an impact across the world."
            action={
              <Link to="/our-legacy#alumni" className="btn btn--outline btn--small">
                View More Alumni <Icon name="arrow" size={14} />
              </Link>
            }
          />
          <Reveal>
            <Rail label="Notable alumni" auto={3500}>
              {ALUMNI.map((a, i) => (
                <PortraitCard key={i} name={a.name} photo={a.photo} lines={[a.position, a.organization]} />
              ))}
            </Rail>
          </Reveal>
        </div>
      </section>
    </>
  )
}
