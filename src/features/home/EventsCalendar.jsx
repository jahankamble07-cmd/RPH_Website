import { useMemo, useState } from 'react'
import Icon from '../../components/Icon'
import { HALL_EVENTS } from '../../data/home'

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const monthName = new Intl.DateTimeFormat('en-IN', { month: 'long' })
const longDate = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

const pad = (n) => String(n).padStart(2, '0')
const iso = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`

export default function EventsCalendar() {
  const [today] = useState(() => new Date())
  const todayIso = iso(today.getFullYear(), today.getMonth(), today.getDate())
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [dir, setDir] = useState(0)
  const [selected, setSelected] = useState(todayIso)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()

  const cells = useMemo(() => {
    const lead = (new Date(year, month, 1).getDay() + 6) % 7
    const days = new Date(year, month + 1, 0).getDate()
    return [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  }, [year, month])

  const eventsOn = (date) => HALL_EVENTS.filter((e) => e.date === date)
  const prefix = iso(year, month, 1).slice(0, 7)
  const monthCount = HALL_EVENTS.filter((e) => e.date.startsWith(prefix)).length
  const dayEvents = eventsOn(selected)
  const upcoming = HALL_EVENTS.filter((e) => e.date >= todayIso).sort((a, b) => a.date.localeCompare(b.date))[0]

  const shift = (step) => {
    setDir(step)
    setCursor(new Date(year, month + step, 1))
  }
  const goToday = () => {
    setDir(0)
    setCursor(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelected(todayIso)
  }

  const selectedDate = new Date(`${selected}T00:00`)

  return (
    <section className="cal" aria-label="Hall events calendar">
      <header className="cal__top">
        <div className="cal__today">
          <span className="cal__today-num">{today.getDate()}</span>
          <span className="cal__today-text">
            <strong>{WEEKDAY_NAMES[(today.getDay() + 6) % 7]}</strong>
            <span>{monthName.format(today)} {today.getFullYear()}</span>
          </span>
        </div>
        <span className="cal__badge"><Icon name="calendar" size={14} /> Hall Events</span>
      </header>

      <div className="cal__nav">
        <button type="button" className="cal__arrow" aria-label="Previous month" onClick={() => shift(-1)}>
          <Icon name="left" size={18} />
        </button>
        <div className="cal__month" key={`${year}-${month}`}>
          <strong>{monthName.format(cursor)}</strong> <span>{year}</span>
        </div>
        <button type="button" className="cal__arrow" aria-label="Next month" onClick={() => shift(1)}>
          <Icon name="right" size={18} />
        </button>
      </div>

      <div className="cal__wd" aria-hidden="true">
        {WEEKDAYS.map((w, i) => <span key={i} className={i > 4 ? 'is-weekend' : undefined}>{w}</span>)}
      </div>
      <div
        key={`${year}-${month}`}
        className={`cal__grid${dir > 0 ? ' from-right' : dir < 0 ? ' from-left' : ''}`}
        role="grid"
        aria-label={`${monthName.format(cursor)} ${year}`}
      >
        {cells.map((d, i) => {
          if (!d) return <span key={i} />
          const date = iso(year, month, d)
          const count = eventsOn(date).length
          const cls = ['cal__day']
          if (date === todayIso) cls.push('is-today')
          if (date === selected) cls.push('is-selected')
          if (count) cls.push('has-event')
          if (i % 7 > 4) cls.push('is-weekend')
          return (
            <button
              key={i}
              type="button"
              className={cls.join(' ')}
              style={{ '--i': i }}
              aria-pressed={date === selected}
              aria-label={`${longDate.format(new Date(`${date}T00:00`))}${count ? `, ${count} event${count > 1 ? 's' : ''}` : ''}`}
              onClick={() => setSelected(date)}
            >
              {d}
            </button>
          )
        })}
      </div>

      <div className="cal__detail" key={selected}>
        <p className="cal__detail-date">{longDate.format(selectedDate)}</p>
        {dayEvents.length ? (
          <ul>
            {dayEvents.map((e) => (
              <li key={e.title}>
                <span className="cal__dot" aria-hidden="true" />
                <span>
                  <strong>{e.title}</strong>
                  {e.place && <em>{e.place}</em>}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cal__empty">
            No hall events on this day.
            {upcoming ? ` Next: ${upcoming.title}.` : ''}
          </p>
        )}
      </div>

      <footer className="cal__foot">
        <span>{monthCount ? `${monthCount} event${monthCount > 1 ? 's' : ''} this month` : 'No events added this month'}</span>
        <button type="button" className="cal__today-btn" onClick={goToday}>Today</button>
      </footer>
    </section>
  )
}
