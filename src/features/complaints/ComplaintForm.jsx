import { useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUS } from '../../data/complaints'
import { formatDate } from '../../lib/format'
import { COLLECTIONS, useCollection } from '../../lib/store'
import '../../pages/Complaints.css'

const EMPTY = { rollNo: '', category: '', room: '', title: '', description: '' }

// IIT Kharagpur roll numbers: two-digit year, two-letter department, five digits (e.g. 22CS10001).
const ROLL_PATTERN = /^\d{2}[A-Z]{2}\d{5}$/

// Complaint form plus the signed-in user's own complaints.
export default function ComplaintForm() {
  const { user } = useAuth()
  const { items, add } = useCollection(COLLECTIONS.complaints)
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const mine = items.filter((c) => c.authorId === user.id)
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const rollNo = form.rollNo.trim().toUpperCase()
    if (!rollNo || !form.category || !form.room.trim() || !form.title.trim() || !form.description.trim()) {
      setError('All fields are required.')
      setDone(false)
      return
    }
    if (!ROLL_PATTERN.test(rollNo)) {
      setError('Enter a valid roll number, for example 22CS10001.')
      setDone(false)
      return
    }
    add({ ...form, rollNo, room: form.room.trim(), status: 'open', authorId: user.id, authorName: user.name })
    setForm(EMPTY)
    setError('')
    setDone(true)
  }

  return (
      <div className="container complaint-layout">
        <form className="form card card-body" onSubmit={submit} noValidate>
          <h2>New complaint</h2>
          <p className="muted small">All fields are required.</p>
          <div className="form-row">
            <div className="field">
              <label htmlFor="rollNo">Roll number</label>
              <input id="rollNo" value={form.rollNo} onChange={set('rollNo')} required autoComplete="off" placeholder="e.g. 22CS10001" />
            </div>
            <div className="field">
              <label htmlFor="category">Category</label>
              <select id="category" value={form.category} onChange={set('category')} required>
                <option value="">Select a category</option>
                {COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="room">Room number</label>
              <input id="room" value={form.room} onChange={set('room')} required />
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
  )
}
