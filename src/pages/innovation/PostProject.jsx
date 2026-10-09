import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import Breadcrumbs from '../../components/Breadcrumbs'
import { OPPORTUNITY_TYPES } from '../../data/innovation'
import { splitList } from '../../lib/format'
import { COLLECTIONS, useCollection } from '../../lib/store'

const EMPTY = {
  title: '', summary: '', lookingFor: '', role: '', skills: '', needed: '', type: 'Project', requirements: '', contact: '',
}

export default function PostProject() {
  const { user } = useAuth()
  const { add } = useCollection(COLLECTIONS.projects)
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.summary.trim() || !form.contact.trim()) {
      setError('Project name, description and contact are required.')
      return
    }
    add({
      ...form,
      skills: splitList(form.skills),
      needed: form.needed ? Number(form.needed) : null,
      status: 'Open',
      kind: 'Student Project',
      postedBy: user.name,
      authorId: user.id,
    })
    navigate('/innovation')
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <Breadcrumbs items={[{ label: 'Innovation', to: '/innovation' }, { label: 'Post a project' }]} />
        <h1>Post a project</h1>
        <p className="muted" style={{ margin: '6px 0 22px' }}>
          Your project will appear under Contribute to Projects on the Innovation page.
        </p>
        <form className="form card card-body" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="title">Project or startup name</label>
            <input id="title" value={form.title} onChange={set('title')} required />
          </div>
          <div className="field">
            <label htmlFor="summary">Short description</label>
            <textarea id="summary" value={form.summary} onChange={set('summary')} required />
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="lookingFor">Who you are looking for</label>
              <input id="lookingFor" value={form.lookingFor} onChange={set('lookingFor')} placeholder="e.g. second-year students interested in robotics" />
            </div>
            <div className="field">
              <label htmlFor="role">Role / position available</label>
              <input id="role" value={form.role} onChange={set('role')} />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label htmlFor="skills">Required skills</label>
              <input id="skills" value={form.skills} onChange={set('skills')} />
              <span className="hint">Separate with commas.</span>
            </div>
            <div className="field">
              <label htmlFor="needed">Number of people required</label>
              <input id="needed" type="number" min="1" value={form.needed} onChange={set('needed')} />
            </div>
            <div className="field">
              <label htmlFor="type">Opportunity type</label>
              <select id="type" value={form.type} onChange={set('type')}>
                {OPPORTUNITY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="requirements">Hiring / participation requirements</label>
            <textarea id="requirements" value={form.requirements} onChange={set('requirements')} />
          </div>
          <div className="field">
            <label htmlFor="contact">How to apply or contact the team</label>
            <input id="contact" value={form.contact} onChange={set('contact')} required placeholder="Email, phone or form link" />
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <Link to="/innovation" className="btn btn--outline">Cancel</Link>
            <button type="submit" className="btn">Post project</button>
          </div>
        </form>
      </div>
    </section>
  )
}
