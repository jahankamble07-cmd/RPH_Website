import { useState } from 'react'
import { Link } from 'react-router-dom'
import CubeCarousel from '../components/CubeCarousel'
import FilmHero from '../components/FilmHero'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import Pending from '../components/Pending'
import Pills from '../components/Pills'
import Rail from '../components/Rail'
import Reveal from '../components/Reveal'
import { ALUMNI, ALUMNI_ERAS } from '../data/alumni'
import { MEDAL_TALLY } from '../data/home'
import { GC_HISTORY, LEGACY_SLIDES, MEMORIES } from '../data/legacy'
import AlumniCard from '../features/AlumniCard'
import GcTimeline from '../features/legacy/GcTimeline'
import './Legacy.css'

const MEDALS = [['gold', 'Gold'], ['silver', 'Silver'], ['bronze', 'Bronze']]

function Memories() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null)

  const items = MEMORIES.map((m) => ({
    ...m,
    renderAction: () => (
      <button type="button" className="btn btn--light btn--small" onClick={() => setOpen(m)}>
        Explore more <Icon name="arrow" size={14} />
      </button>
    ),
  }))

  return (
    <section className="section" id="history">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <h2 className="legacy-title">Moments that <em>made us.</em></h2>
            <p>Our History &amp; Memories</p>
          </div>
        </Reveal>
        <CubeCarousel items={items} active={active} onActive={setActive} label="History and memories" />
      </div>

      {open && (
        <Modal onClose={() => setOpen(null)} label={open.title}>
          <img src={open.image} alt="" className="modal-photo" />
          <div className="modal__body stack">
            <h2>{open.title}</h2>
            <p className="muted small">{open.theme}</p>
            <p>{open.text}</p>
            {open.gallery && (
              <Link to={open.gallery} className="btn btn--small" style={{ justifySelf: 'start' }}>
                View photos <Icon name="arrow" size={14} />
              </Link>
            )}
          </div>
        </Modal>
      )}
    </section>
  )
}

function Alumni() {
  const [era, setEra] = useState('all')
  const shown = ALUMNI.filter((a) => era === 'all' || a.era === era)
  return (
    <section className="section alumni-band" id="alumni">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <h2>Alumni Achievements</h2>
          <hr className="rule" />
          <p>Former residents and their work after R.P. Hall. Pick a period to see alumni from that time.</p>
        </Reveal>
        <Reveal className="era-line">
          <Pills options={ALUMNI_ERAS} value={era} onChange={setEra} label="Period" center />
        </Reveal>
        <p className="alumni-count muted small">{shown.length} profiles</p>
        {shown.length ? (
          <Rail key={era} label="Alumni profiles" auto={3200} column="max(250px, calc((100% - 3 * 18px) / 4))">
            {shown.map((a, i) => <AlumniCard key={i} a={a} />)}
          </Rail>
        ) : (
          <p className="empty">No profiles for this period yet.</p>
        )}
      </div>
    </section>
  )
}

function GcRecord({ entry }) {
  const blocks = [
    ['Sports achievements', entry.sports],
    ['Cultural achievements', entry.cultural],
    ['Technical achievements', entry.technical],
    ['Winning teams', entry.teams],
    ['Notable performances', entry.highlights],
  ]
  return (
    <div className="modal__body stack">
      <h2>GC {entry.year}</h2>
      <p><strong>{entry.result}</strong>{entry.position && `, ${entry.position}`}</p>

      <h4>Podium finishes</h4>
      {entry.podiums?.length ? (
        <ul className="podiums">
          {entry.podiums.map((p) => (
            <li key={p.event}>
              <span className="chip">{p.position}</span>
              {p.gallery ? <Link to={p.gallery}>{p.event}</Link> : p.event}
            </li>
          ))}
        </ul>
      ) : (
        <Pending>Podium positions for this year are to be added.</Pending>
      )}

      {blocks.map(([title, list]) => list?.length ? (
        <div key={title}>
          <h4>{title}</h4>
          <ul>{list.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      ) : null)}

      <Link to="/gallery/general-championship" className="btn btn--small" style={{ justifySelf: 'start' }}>
        General Championship photos <Icon name="arrow" size={14} />
      </Link>
    </div>
  )
}

function Winning() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section winning" id="gc">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="legacy-title">Winning is a <em>tradition.</em></h2>
          <Link to="/gallery" className="btn btn--outline-light btn--small">
            Open gallery <Icon name="arrow" size={14} />
          </Link>
        </Reveal>
        <div className="tradition__grid">
          {MEDAL_TALLY.map((m, i) => (
            <Reveal key={m.event} className="tradition__item" delay={i * 120}>
              <h3><Icon name={m.icon} size={22} /> {m.event}</h3>
              <ul>
                {MEDALS.map(([key, label]) => (
                  <li key={key}>
                    <span className={`medal medal--${key}`} aria-hidden="true" />
                    {m[key]} <span className="small">{label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="section-head section-head--center winning__head">
          <h2>GC Achievements &amp; Winning History</h2>
          <hr className="rule" />
          <p>Scroll down the line through the General Championship. Select a year to see the result and podium finishes.</p>
        </Reveal>
        <GcTimeline entries={GC_HISTORY} onOpen={setOpen} />
      </div>
      {open && (
        <Modal onClose={() => setOpen(null)} label={`GC ${open.year}`} narrow>
          <GcRecord entry={open} />
        </Modal>
      )}
    </section>
  )
}

export default function Legacy() {
  return (
    <>
      <FilmHero slides={LEGACY_SLIDES}>
        <h1 className="rise" style={{ '--i': 0 }}>OUR <em>LEGACY</em></h1>
        <p className="rise" style={{ '--i': 1 }}>The people, traditions and wins that have shaped R.P. Hall across generations.</p>
        <a href="#history" className="btn btn--gold rise" style={{ '--i': 2 }}>
          Our History &amp; Memories <Icon name="arrow" size={16} />
        </a>
        <nav className="film-hero__links rise" style={{ '--i': 3 }} aria-label="On this page">
          <a href="#history">History &amp; Memories</a>
          <a href="#alumni">Alumni Achievements</a>
          <a href="#gc">GC History</a>
        </nav>
      </FilmHero>
      <Memories />
      <Alumni />
      <Winning />
    </>
  )
}
