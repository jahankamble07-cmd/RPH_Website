import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import PageHero from '../components/PageHero'
import Pills from '../components/Pills'
import { img } from '../data/images'
import { OPPORTUNITY_TYPES } from '../data/innovation'
import OpportunityCard from '../features/innovation/OpportunityCard'
import { splitList } from '../lib/format'
import { COLLECTIONS, useCollection } from '../lib/store'
import './innovation/Innovation.css'
import './Recruitment.css'

const EMPTY = { company: '', role: '', type: 'Internship', location: '', skills: '', description: '', apply: '', deadline: '' }

function PostForm({ onClose, onSave }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.company.trim() || !form.role.trim() || !form.apply.trim()) {
      setError('Company, role and how to apply are required.')
      return
    }
    onSave({ ...form, skills: splitList(form.skills) })
  }

  return (
    <Modal onClose={onClose} label="Post a job or internship">
      <form className="modal__body form" onSubmit={submit} noValidate>
        <h2>Post a job or internship</h2>
        <div className="form-row">
          <div className="field">
            <label htmlFor="r-company">Company</label>
            <input id="r-company" value={form.company} onChange={set('company')} required />
          </div>
          <div className="field">
            <label htmlFor="r-role">Role</label>
            <input id="r-role" value={form.role} onChange={set('role')} required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="r-type">Type</label>
            <select id="r-type" value={form.type} onChange={set('type')}>
              {OPPORTUNITY_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="r-location">Location</label>
            <input id="r-location" value={form.location} onChange={set('location')} placeholder="City, remote or hybrid" />
          </div>
          <div className="field">
            <label htmlFor="r-deadline">Apply by</label>
            <input id="r-deadline" type="date" value={form.deadline} onChange={set('deadline')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="r-skills">Skills</label>
          <input id="r-skills" value={form.skills} onChange={set('skills')} />
          <span className="hint">Separate with commas.</span>
        </div>
        <div className="field">
          <label htmlFor="r-desc">Description and requirements</label>
          <textarea id="r-desc" value={form.description} onChange={set('description')} />
        </div>
        <div className="field">
          <label htmlFor="r-apply">How to apply</label>
          <input id="r-apply" value={form.apply} onChange={set('apply')} required placeholder="Application link or email" />
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <button type="button" className="btn btn--outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn">Post opening</button>
        </div>
      </form>
    </Modal>
  )
}

export default function Recruitment() {
  const { user } = useAuth()
  const { items, add, remove } = useCollection(COLLECTIONS.opportunities)
  const [posting, setPosting] = useState(false)
  const [type, setType] = useState('All')
  const [query, setQuery] = useState('')
  const [mineOnly, setMineOnly] = useState(false)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((o) => {
      if (mineOnly && o.authorId !== user.id) return false
      if (type !== 'All' && o.type !== type) return false
      return !q || [o.role, o.company, o.location, ...(o.skills ?? [])].join(' ').toLowerCase().includes(q)
    })
  }, [items, type, query, mineOnly, user.id])

  const save = (record) => {
    add({ ...record, authorId: user.id, postedBy: user.name })
    setPosting(false)
  }

  return (
    <>
      <PageHero title="Recruitment" text="Post job and internship openings for R.P. residents. Every post also appears under Opportunities on the Innovation page." image={img('kgp-main')}>
        <button type="button" className="btn btn--light recruit-hero__btn" onClick={() => setPosting(true)}>
          <Icon name="plus" size={16} /> Post a job / internship
        </button>
      </PageHero>

      <section className="section">
        <div className="container recruit">
          <div className="stack">
            <div className="opp-filters">
              <label className="search">
                <Icon name="search" size={16} />
                <span className="visually-hidden">Search openings</span>
                <input className="input" type="search" placeholder="Search by company, role or skill" value={query} onChange={(e) => setQuery(e.target.value)} />
              </label>
              <label className="check">
                <input type="checkbox" checked={mineOnly} onChange={(e) => setMineOnly(e.target.checked)} />
                My posts only
              </label>
            </div>
            <Pills options={['All', ...OPPORTUNITY_TYPES]} value={type} onChange={setType} label="Type" />
            {shown.length ? (
              <div className="stack">
                {shown.map((o) => (
                  <OpportunityCard key={o.id} o={o} onRemove={o.authorId === user.id ? remove : undefined} />
                ))}
              </div>
            ) : (
              <p className="empty">{items.length ? 'No openings match these filters.' : 'No openings posted yet.'}</p>
            )}
          </div>

          <aside className="stack recruit__aside">
            <div className="card card-body stack">
              <h3>Have an opening?</h3>
              <p className="small muted">Share an internship, full-time role or project position at your company.</p>
              <button type="button" className="btn" onClick={() => setPosting(true)}>
                <Icon name="plus" size={16} /> Post now
              </button>
            </div>
            <div className="card card-body stack">
              <h3>Where posts appear</h3>
              <p className="small muted">Students see every opening on the Innovation page, without needing to log in.</p>
              <Link to="/innovation#opportunities" className="link-arrow">View on Innovation <Icon name="arrow" size={14} /></Link>
            </div>
          </aside>
        </div>
      </section>

      {posting && <PostForm onClose={() => setPosting(false)} onSave={save} />}
    </>
  )
}
