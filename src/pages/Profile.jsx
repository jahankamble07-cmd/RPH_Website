import { useRef, useState } from 'react'
import { ROLE_LABELS } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import Icon from '../components/Icon'
import Portrait from '../components/Portrait'
import Reveal from '../components/Reveal'
import { img } from '../data/images'
import { PROFILE_FIELDS, PROFILE_GROUPS } from '../data/profile'
import { SITE } from '../data/site'
import { resizePhoto, useProfile } from '../features/profile/useProfile'
import { COLLECTIONS, useCollection } from '../lib/store'
import './Profile.css'

const ROLL_PATTERN = /^\d{2}[A-Z]{2}\d{5}$/

function validate(fields, values) {
  for (const f of fields) {
    const v = (values[f.key] ?? '').trim()
    if (f.required && !v) return `${f.label} is required.`
    if (f.key === 'rollNo' && v && !ROLL_PATTERN.test(v.toUpperCase())) return 'Enter a valid roll number, for example 22CS10001.'
    if (f.key === 'phone' && v && !/^\d{10}$/.test(v)) return 'Phone number must be 10 digits.'
    if (f.type === 'url' && v && !/^https?:\/\//i.test(v)) return `${f.label} must start with http:// or https://`
  }
  return ''
}

function Activity({ user }) {
  const { items: complaints } = useCollection(COLLECTIONS.complaints)
  const { items: projects } = useCollection(COLLECTIONS.projects)
  const { items: support } = useCollection(COLLECTIONS.support)
  const { items: posts } = useCollection(COLLECTIONS.opportunities)
  const mine = (list) => list.filter((x) => x.authorId === user.id).length

  const rows = {
    student: [['Complaints filed', mine(complaints)], ['Projects posted', mine(projects)]],
    hall_council: [['Complaints filed', mine(complaints)], ['Projects posted', mine(projects)], ['Complaints open', complaints.filter((c) => c.status !== 'resolved').length]],
    alumni: [['Pledges and offers', mine(support)], ['Openings posted', mine(posts)]],
    warden: [['Complaints open', complaints.filter((c) => c.status !== 'resolved').length], ['Alumni offers', support.length]],
  }[user.role]

  return (
    <dl className="profile-stats">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dd>{value}</dd>
          <dt>{label}</dt>
        </div>
      ))}
    </dl>
  )
}

export default function Profile() {
  const { user } = useAuth()
  const { profile, save } = useProfile(user)
  const fields = PROFILE_FIELDS[user.role]
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({})
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  const data = { name: user.name, ...profile }
  const groups = Object.keys(PROFILE_GROUPS).filter((g) => fields.some((f) => f.group === g))
  const headline = [data.rollNo, data.department, data.programme ?? data.degree, data.batch && `Batch of ${data.batch}`]
    .filter(Boolean)
    .join(' · ')

  const startEdit = () => {
    setDraft({ name: data.name, ...Object.fromEntries(fields.map((f) => [f.key, data[f.key] ?? ''])) })
    setError('')
    setSaved(false)
    setEditing(true)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!draft.name?.trim()) {
      setError('Name is required.')
      return
    }
    const problem = validate(fields, draft)
    if (problem) {
      setError(problem)
      return
    }
    const clean = Object.fromEntries(Object.entries(draft).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]))
    if (clean.rollNo) clean.rollNo = clean.rollNo.toUpperCase()
    save(clean)
    setEditing(false)
    setError('')
    setSaved(true)
  }

  const onPhoto = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }
    try {
      save({ photo: await resizePhoto(file) })
      setError('')
      setSaved(false)
    } catch {
      setError('That image could not be read. Try another one.')
    }
  }

  return (
    <>
      <section className="profile-hero">
        <img src={img('rp-hall')} alt="" className="profile-hero__img" />
        <div className="container profile-hero__inner">
          <div className="profile-photo rise">
            <Portrait name={data.name} src={data.photo} className="profile-photo__frame" />
            <button type="button" className="profile-photo__btn" onClick={() => fileRef.current?.click()} aria-label={data.photo ? 'Change photo' : 'Add photo'}>
              <Icon name="image" size={16} />
            </button>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPhoto} />
          </div>
          <div className="profile-hero__text">
            <span className="profile-role rise" style={{ '--i': 1 }}>{ROLE_LABELS[user.role]}</span>
            <h1 className="rise" style={{ '--i': 2 }}>{data.name}</h1>
            <p className="rise" style={{ '--i': 3 }}>{headline || SITE.name}</p>
            <div className="profile-hero__actions rise" style={{ '--i': 4 }}>
              {!editing && (
                <button type="button" className="btn btn--light btn--small" onClick={startEdit}>
                  <Icon name="tool" size={14} /> Edit profile
                </button>
              )}
              {data.photo && (
                <button type="button" className="btn btn--outline-light btn--small" onClick={() => save({ photo: null })}>
                  Remove photo
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section profile">
        <div className="container profile__grid">
          <div className="profile__main">
            {saved && <p className="form-ok" role="status">Profile saved.</p>}
            {error && !editing && <p className="form-error" role="alert">{error}</p>}

            {editing ? (
              <form className="card card-body form profile-form" onSubmit={submit} noValidate>
                <h2>Edit profile</h2>
                <div className="field">
                  <label htmlFor="pf-name">Full name</label>
                  <input id="pf-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
                </div>
                {groups.map((g) => (
                  <fieldset key={g} className="profile-form__group">
                    <legend>{PROFILE_GROUPS[g]}</legend>
                    <div className="form-row">
                      {fields.filter((f) => f.group === g).map((f) => (
                        <div key={f.key} className="field">
                          <label htmlFor={`pf-${f.key}`}>{f.label}{f.required && ' *'}</label>
                          {f.options ? (
                            <select id={`pf-${f.key}`} value={draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}>
                              <option value="">Select</option>
                              {f.options.map((o) => <option key={o}>{o}</option>)}
                            </select>
                          ) : (
                            <input
                              id={`pf-${f.key}`}
                              type={f.type ?? 'text'}
                              inputMode={f.type === 'tel' ? 'numeric' : undefined}
                              placeholder={f.placeholder}
                              value={draft[f.key]}
                              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </fieldset>
                ))}
                {error && <p className="form-error" role="alert">{error}</p>}
                <div className="form-actions">
                  <button type="button" className="btn btn--outline" onClick={() => setEditing(false)}>Cancel</button>
                  <button type="submit" className="btn">Save profile</button>
                </div>
              </form>
            ) : (
              groups.map((g, gi) => (
                <Reveal key={g} className="card card-body profile-card" delay={gi * 80}>
                  <h2>{PROFILE_GROUPS[g]}</h2>
                  <dl className="profile-list">
                    {g === 'contact' && (
                      <div>
                        <dt>Email</dt>
                        <dd>{user.email}</dd>
                      </div>
                    )}
                    {g === 'hall' && (
                      <div>
                        <dt>Hall</dt>
                        <dd>{SITE.name}</dd>
                      </div>
                    )}
                    {fields.filter((f) => f.group === g).map((f) => (
                      <div key={f.key}>
                        <dt>{f.label}</dt>
                        <dd>
                          {data[f.key] ? (
                            f.type === 'url' ? <a href={data[f.key]} target="_blank" rel="noreferrer">{data[f.key]}</a> : data[f.key]
                          ) : (
                            <span className="profile-missing">Not added</span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))
            )}
          </div>

          <aside className="profile__side">
            <Reveal className="card card-body">
              <h2>Your activity</h2>
              <Activity user={user} />
            </Reveal>
            <Reveal className="card card-body profile-account" delay={80}>
              <h2>Account</h2>
              <dl className="profile-list">
                <div><dt>Email</dt><dd>{user.email}</dd></div>
                <div><dt>Role</dt><dd>{ROLE_LABELS[user.role]}</dd></div>
              </dl>
              <p className="muted small">Your profile is saved in this browser.</p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
