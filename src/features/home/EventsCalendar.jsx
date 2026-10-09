import { useMemo, useState } from 'react'
import Icon from '../../components/Icon'
import { HALL_EVENTS } from '../../data/home'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthFmt = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' })

const pad = (n) => String(n).padStart(2, '0')

export default function EventsCalendar() {
  const [today] = useState(() => new Date())
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const prefix = `${year}-${pad(month + 1)}`
  const monthEvents = HALL_EVENTS.filter((e) => e.date.startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date))

  const cells = useMemo(() => {
    const lead = (new Date(year, month, 1).getDay() + 6) % 7
    const days = new Date(year, month + 1, 0).getDate()
    return [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  }, [year, month])

  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
  const hasEvent = (d) => monthEvents.some((e) => e.date === `${prefix}-${pad(d)}`)

  return (
    <div className="calendar card">
      <div className="calendar__head">
        <h3><Icon name="calendar" /> Hall Events</h3>
        <div className="calendar__nav">
          <button type="button" className="icon-btn" aria-label="Previous month" onClick={() => setCursor(new Date(year, month - 1, 1))}>
            <Icon name="left" />
          </button>
          <span>{monthFmt.format(cursor)}</span>
          <button type="button" className="icon-btn" aria-label="Next month" onClick={() => setCursor(new Date(year, month + 1, 1))}>
            <Icon name="right" />
          </button>
        </div>
      </div>
      <div className="calendar__grid" role="grid" aria-label={monthFmt.format(cursor)}>
        {WEEKDAYS.map((w) => <span key={w} className="calendar__wd">{w}</span>)}
        {cells.map((d, i) => (
          <span
            key={i}
            className={`calendar__day${d && isToday(d) ? ' is-today' : ''}${d && hasEvent(d) ? ' has-event' : ''}`}
          >
            {d}
          </span>
        ))}
      </div>
      <ul className="calendar__list">
        {monthEvents.map((e) => (
          <li key={e.date + e.title}>
            <strong>{Number(e.date.slice(8))}</strong> {e.title}
            {e.place && <span className="muted small">, {e.place}</span>}
          </li>
        ))}
        {monthEvents.length === 0 && <li className="muted small">No hall events added for this month.</li>}
      </ul>
    </div>
  )
}
