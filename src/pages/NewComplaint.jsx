import { useState } from 'react'
import { useAuth } from '../auth/useAuth'
import PageHero from '../components/PageHero'
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUS } from '../data/complaints'
import { formatDate } from '../lib/format'
import { COLLECTIONS, useCollection } from '../lib/store'
import './Complaints.css'

const EMPTY = { category: '', room: '', title: '', description: '' }

export default function NewComplaint() {
  const { user } = useAuth()
  const { items, add } = useCollection(COLLECTIONS.complaints)
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const mine = items.filter((c) => c.authorId === user.id)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.category || !form.title.trim() || !form.description.trim()) {
      setError('Category, subject and details are required.')
      setDone(false)
      return
    }
    add({ ...form, status: 'open', authorId: user.id, authorName: user.name })
    setForm(EMPTY)
    setError('')
    setDone(true)
  }

  return (
    <>
      <PageHero title="Register a Complaint" text="Complaints go to the hall council and the warden." />
      <section className="section">
        <div className="container complaint-layout">
          <form className="form card card-body" onSubmit={submit} noValidate>
            <h2>New complaint</h2>
            <div className="form-row">
              <div className="field">
                <label htmlFor="category">Category</label>
                <select id="category" value={form.category} onChange={set('category')} required>
                  <option value="">Select a category</option>
                  {COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="room">Room number</label>
                <input id="room" value={form.room} onChange={set('room')} placeholder="Optional" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="title">Subject</label>
              <input id="title" value={form.title} onChange={set('title')} required />
            </div>
            <div className="field">
              <label htmlFor="description">Details</label>
              <textarea id="description" value={form.description} onChange={set('description')} required />
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            {done && <p className="form-ok" role="status">Complaint registered.</p>}
            <div className="form-actions">
              <button type="submit" className="btn">Submit complaint</button>
            </div>
          </form>

          <div>
            <h2 className="complaint-side-title">Your complaints</h2>
            {mine.length ? (
              <ul className="complaint-list">
                {mine.map((c) => (
                  <li key={c.id} className="card card-body">
                    <div className="complaint-list__top">
                      <span className="chip">{c.category}</span>
                      <span className={`status status--${c.status}`}>{COMPLAINT_STATUS[c.status]}</span>
                    </div>
                    <h4>{c.title}</h4>
                    <p className="muted small">Filed {formatDate(c.createdAt)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">You have not filed any complaints.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
