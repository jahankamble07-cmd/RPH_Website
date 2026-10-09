import { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel3D from '../components/Carousel3D'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import Pending from '../components/Pending'
import Pills from '../components/Pills'
import { ALUMNI, ALUMNI_ERAS } from '../data/alumni'
import { MEDAL_TALLY } from '../data/home'
import { GC_HISTORY, LEGACY_SLIDES, MEMORIES, MILESTONES } from '../data/legacy'
import AlumniCard from '../features/AlumniCard'
import './Legacy.css'

const MEDALS = [['gold', 'Gold'], ['silver', 'Silver'], ['bronze', 'Bronze']]

function Hero() {
  const strip = [...LEGACY_SLIDES, ...LEGACY_SLIDES]
  return (
    <section className="legacy-hero">
      <div className="legacy-hero__strip" aria-hidden="true">
        {strip.map((src, i) => <img key={i} src={src} alt="" />)}
      </div>
      <div className="container legacy-hero__body">
        <h1>OUR <em>LEGACY</em></h1>
        <p>The people, traditions and wins that have shaped R.P. Hall across generations.</p>
        <a href="#history" className="btn btn--gold">
          Our History &amp; Memories <Icon name="arrow" size={16} />
        </a>
        <nav className="legacy-hero__links" aria-label="On this page">
          <a href="#history">History &amp; Memories</a>
          <a href="#alumni">Alumni Achievements</a>
          <a href="#gc">GC History</a>
        </nav>
      </div>
    </section>
  )
}

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
        <div className="section-head">
          <div>
            <h2 className="legacy-title">Moments that <em>made us.</em></h2>
            <p>Our History &amp; Memories</p>
          </div>
        </div>
        <Carousel3D items={items} active={active} onActive={setActive} label="History and memories" />

        <h3 className="legacy-sub">Milestones</h3>
        {MILESTONES.length ? (
          <ol className="milestones">
            {MILESTONES.map((m) => (
              <li key={m.year + m.title} className="card">
                <span className="milestones__year">{m.year}</span>
                <h4>{m.title}</h4>
                <p className="muted small">{m.text}</p>
              </li>
            ))}
          </ol>
        ) : (
          <Pending>Dated milestones and past winning designs are to be added.</Pending>
        )}
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
    <section className="section" id="alumni">
      <div className="container">
        <div className="alumni-panel">
          <div className="section-head section-head--center">
            <h2>Alumni Achievements</h2>
            <hr className="rule" />
            <p>Former residents and their work after R.P. Hall. Pick a period to see alumni from that time.</p>
          </div>
          <div className="era-line">
            <Pills options={ALUMNI_ERAS} value={era} onChange={setEra} label="Period" center />
          </div>
          <div className="grid grid--3">
            {shown.map((a, i) => <AlumniCard key={i} a={a} />)}
          </div>
          {shown.length === 0 && <p className="empty">No profiles for this period yet.</p>}
        </div>
      </div>
    </section>
  )
}

function Tradition() {
  return (
    <section className="section tradition">
      <div className="container">
        <div className="section-head">
          <h2 className="legacy-title">Winning is a <em>tradition.</em></h2>
          <Link to="/gallery" className="btn btn--outline-light btn--small">
            Open gallery <Icon name="arrow" size={14} />
          </Link>
        </div>
        <div className="tradition__grid">
          {MEDAL_TALLY.map((m) => (
            <div key={m.event} className="tradition__item">
              <h3>{m.event}</h3>
              <ul>
                {MEDALS.map(([key, label]) => (
                  <li key={key}>
                    <span className={`medal medal--${key}`} aria-hidden="true" />
                    {m[key]} <span className="small">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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

function GcHistory() {
  const [open, setOpen] = useState(null)
  const n = GC_HISTORY.length
  const points = GC_HISTORY.map((_, i) => [((i + 0.5) / n) * 100, i % 2 ? 22 : 78])

  return (
    <section className="section section--band" id="gc">
      <div className="container">
        <div className="section-head section-head--center">
          <h2>GC Achievements &amp; Winning History</h2>
          <hr className="rule" />
          <p>Follow the zig-zag path through the General Championship. Select a year to see the result and podium finishes.</p>
        </div>
        <div className="zigzag-scroll">
          <div className="zigzag card">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <polyline points={points.map((p) => p.join(',')).join(' ')} />
            </svg>
            {GC_HISTORY.map((g, i) => (
              <button
                key={g.id}
                type="button"
                className={`zigzag__node${i % 2 ? ' is-top' : ''}`}
                style={{ left: `${points[i][0]}%`, top: `${points[i][1]}%` }}
                onClick={() => setOpen(g)}
                aria-label={`GC ${g.year}: ${g.result}`}
              >
                <span className="zigzag__circle"><Icon name="trophy" size={14} />{g.year}</span>
                <span className="zigzag__label">{g.result}</span>
              </button>
            ))}
          </div>
        </div>
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
      <Hero />
      <Memories />
      <Alumni />
      <Tradition />
      <GcHistory />
    </>
  )
}

