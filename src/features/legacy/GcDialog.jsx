import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'
import Modal from '../../components/Modal'

// Podium order left to right, as on a real podium: 2nd, 1st, 3rd.
const STEPS = [
  { place: '2nd', key: 'silver', label: 'Silver', order: 1 },
  { place: '1st', key: 'gold', label: 'Gold', order: 2 },
  { place: '3rd', key: 'bronze', label: 'Bronze', order: 0 },
]

const BLOCKS = [
  ['Sports achievements', 'sports'],
  ['Cultural achievements', 'cultural'],
  ['Technical achievements', 'technical'],
  ['Winning teams', 'teams'],
  ['Notable performances', 'highlights'],
]

export default function GcDialog({ entry, onClose }) {
  const podiums = entry.podiums ?? []
  const byPlace = (place) => podiums.filter((p) => p.position === place)
  const hasPodiums = podiums.length > 0
  const blocks = BLOCKS.filter(([, key]) => entry[key]?.length)

  return (
    <Modal onClose={onClose} label={`General Championship ${entry.year}`} className="gc-dialog">
      <div className="gc-dialog__scroll">
        <header className="gc-dialog__head">
          <div className="gc-dialog__trophy" aria-hidden="true">
            <span className="gc-dialog__rays" />
            <Icon name="trophy" size={44} />
          </div>
          <p className="gc-dialog__kicker">General Championship</p>
          <h2>{entry.year}</h2>
          <div className="gc-dialog__result">
            <span>{entry.result}</span>
            {entry.position && <span className="gc-dialog__place">{entry.position}</span>}
          </div>
        </header>

        <section className="gc-podium" aria-label="Podium finishes">
          {STEPS.map((s) => {
            const events = byPlace(s.place)
            return (
              <div key={s.place} className={`gc-podium__col gc-podium__col--${s.key}`} style={{ '--order': s.order }}>
                <span className={`gc-podium__medal medal--${s.key}`} aria-hidden="true">{s.place.slice(0, 1)}</span>
                <div className="gc-podium__step">
                  <strong>{s.place}</strong>
                  <span>{hasPodiums ? `${events.length} event${events.length === 1 ? '' : 's'}` : s.label}</span>
                </div>
              </div>
            )
          })}
        </section>

        <section className="gc-dialog__events">
          <h3>Podium finishes</h3>
          {hasPodiums ? (
            <div className="gc-dialog__places">
              {['1st', '2nd', '3rd'].map((place, i) => {
                const events = byPlace(place)
                if (!events.length) return null
                return (
                  <div key={place} className="gc-dialog__place-row" style={{ '--i': i }}>
                    <span className={`gc-dialog__badge gc-dialog__badge--${place}`}>{place}</span>
                    <div className="gc-dialog__chips">
                      {events.map((e) =>
                        e.gallery ? (
                          <Link key={e.event} to={e.gallery} className="gc-chip">
                            {e.event} <Icon name="arrow" size={12} />
                          </Link>
                        ) : (
                          <span key={e.event} className="gc-chip gc-chip--plain">{e.event}</span>
                        ),
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="gc-dialog__empty">
              Podium positions for this year are to be added. Each event will link to its photos in the gallery.
            </p>
          )}
        </section>

        {blocks.length > 0 && (
          <section className="gc-dialog__blocks">
            {blocks.map(([title, key]) => (
              <div key={key} className="gc-dialog__block">
                <h3>{title}</h3>
                <ul>{entry[key].map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            ))}
          </section>
        )}
      </div>

      <footer className="gc-dialog__actions">
        <button type="button" className="gc-dialog__close" onClick={onClose}>Close</button>
        <Link to="/gallery/general-championship" className="btn gc-dialog__gallery">
          <Icon name="image" size={18} /> View GC photos
          <Icon name="arrow" size={16} />
        </Link>
      </footer>
    </Modal>
  )
}
