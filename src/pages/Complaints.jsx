import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import Pills from '../components/Pills'
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUS } from '../data/complaints'
import { formatDate } from '../lib/format'
import { COLLECTIONS, useCollection } from '../lib/store'
import './Complaints.css'

const VIEWS = [
  { id: 'active', label: 'Active' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'all', label: 'All' },
]

function CategoryChart({ counts, onPick, selected }) {
  const max = Math.max(1, ...counts.map((c) => c.count))
  return (
    <ol className="cat-chart" aria-label="Active complaints by category, most frequent first">
      {counts.map((c, i) => (
        <li key={c.category}>
          <button
            type="button"
            className={`cat-chart__row${selected === c.category ? ' is-selected' : ''}`}
            onClick={() => onPick(c.category)}
            title={`${c.category}: ${c.count} active`}
          >
            <span className="cat-chart__label">{c.category}{i === 0 && c.count > 0 && <span className="chip">Most frequent</span>}</span>
            <span className="cat-chart__track">
              <span className="cat-chart__bar" style={{ width: `${(c.count / max) * 100}%` }} />
            </span>
            <span className="cat-chart__value">{c.count}</span>
          </button>
        </li>
      ))}
    </ol>
  )
}

export default function Complaints() {
  const { items, update } = useCollection(COLLECTIONS.complaints)
  const [view, setView] = useState('active')
  const [category, setCategory] = useState('All')

  const active = items.filter((c) => c.status !== 'resolved')

  const counts = useMemo(
    () =>
      COMPLAINT_CATEGORIES.map((cat) => ({ category: cat, count: active.filter((c) => c.category === cat).length }))
        .sort((a, b) => b.count - a.count),
    [active],
  )

  const shown = items.filter((c) => {
    if (view === 'active' && c.status === 'resolved') return false
    if (view === 'resolved' && c.status !== 'resolved') return false
    return category === 'All' || c.category === category
  })

  return (
    <>
      <PageHero title="Complaints" text="Complaints registered by residents, by category and status." />
      <section className="section">
        <div className="container complaints-grid">
          <aside className="card card-body">
            <h2 className="complaint-side-title">Active by category</h2>
            <p className="muted small">{active.length} active of {items.length} total</p>
            <CategoryChart counts={counts} selected={category} onPick={(c) => setCategory(category === c ? 'All' : c)} />
          </aside>

          <div className="stack">
            <Pills options={VIEWS} value={view} onChange={setView} label="Status" />
            <Pills options={['All', ...COMPLAINT_CATEGORIES]} value={category} onChange={setCategory} label="Category" />
            {shown.length ? (
              <ul className="complaint-list">
                {shown.map((c) => (
                  <li key={c.id} className="card card-body">
                    <div className="complaint-list__top">
                      <span className="chip">{c.category}</span>
                      <span className={`status status--${c.status}`}>{COMPLAINT_STATUS[c.status]}</span>
                    </div>
                    <h4>{c.title}</h4>
                    <p className="small">{c.description}</p>
                    <p className="muted small">
                      {c.authorName}{c.room && `, room ${c.room}`}, {formatDate(c.createdAt)}
                    </p>
                    <label className="complaint-list__status">
                      <span className="small">Status</span>
                      <select className="input" value={c.status} onChange={(e) => update(c.id, { status: e.target.value })}>
                        {Object.entries(COMPLAINT_STATUS).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                      </select>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">No complaints match these filters.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
