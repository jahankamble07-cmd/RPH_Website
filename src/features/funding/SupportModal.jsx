import { useState } from 'react'
import { useAuth } from '../../auth/useAuth'
import Modal from '../../components/Modal'
import { FUNDING_NEEDS, WAYS_TO_CONTRIBUTE } from '../../data/funding'
import { formatINR } from '../../lib/format'
import { COLLECTIONS, useCollection } from '../../lib/store'

const GENERAL = 'General hall fund'

export default function SupportModal({ type = 'funding', project, onClose }) {
  const { user } = useAuth()
  const { add } = useCollection(COLLECTIONS.support)
  const [form, setForm] = useState({
    type,
    project: project ?? GENERAL,
    amount: '',
    contact: user?.email ?? '',
    message: '',
    showOnLeaderboard: true,
  })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(null)

  const isFunding = form.type === 'funding'
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const amount = Number(form.amount)
    if (isFunding && !(amount > 0)) {
      setError('Enter the amount you would like to give.')
      return
    }
    if (!isFunding && !form.message.trim()) {
      setError('Tell us briefly what you can offer.')
      return
    }
    const record = add({
      ...form,
      amount: isFunding ? amount : null,
      typeLabel: WAYS_TO_CONTRIBUTE.find((w) => w.id === form.type)?.title,
      name: user.name,
      email: user.email,
      authorId: user.id,
    })
    setSaved(record)
  }

  return (
    <Modal onClose={onClose} label={isFunding ? 'Donate' : 'Offer support'} narrow>
      <div className="modal__body stack">
        <h2>{isFunding ? 'Donate' : 'Offer support'}</h2>
        {saved ? (
          <>
            <p className="form-ok" role="status">
              {isFunding
                ? `Your pledge of ${formatINR(saved.amount)} to ${saved.project} is recorded.`
                : 'Your offer is recorded.'}
            </p>
            <p className="small muted">The warden can see it under Funding Requests and will contact you at {saved.contact}.</p>
            <div className="form-actions">
              <button type="button" className="btn" onClick={onClose}>Done</button>
            </div>
          </>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="sup-type">Type of support</label>
              <select id="sup-type" value={form.type} onChange={set('type')}>
                {WAYS_TO_CONTRIBUTE.map((w) => <option key={w.id} value={w.id}>{w.title}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="sup-project">Project or initiative</label>
              <select id="sup-project" value={form.project} onChange={set('project')}>
                <option>{GENERAL}</option>
                {FUNDING_NEEDS.map((n) => <option key={n.id}>{n.title}</option>)}
              </select>
            </div>
            {isFunding && (
              <div className="field">
                <label htmlFor="sup-amount">Amount (₹)</label>
                <input id="sup-amount" type="number" min="1" inputMode="numeric" value={form.amount} onChange={set('amount')} required />
              </div>
            )}
            <div className="field">
              <label htmlFor="sup-message">{isFunding ? 'Note (optional)' : 'What you can offer'}</label>
              <textarea id="sup-message" value={form.message} onChange={set('message')} />
            </div>
            <div className="field">
              <label htmlFor="sup-contact">Contact email or phone</label>
              <input id="sup-contact" value={form.contact} onChange={set('contact')} />
            </div>
            {isFunding && (
              <label className="check">
                <input type="checkbox" checked={form.showOnLeaderboard} onChange={set('showOnLeaderboard')} />
                Show my name on the donor leaderboard
              </label>
            )}
            {isFunding && (
              <p className="small muted">
                Online payment is not set up yet. Your pledge is recorded and the warden will share payment details.
              </p>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="form-actions">
              <button type="button" className="btn btn--outline" onClick={onClose}>Cancel</button>
              <button type="submit" className={`btn${isFunding ? ' btn--donate' : ''}`}>
                {isFunding ? 'Record pledge' : 'Send offer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  )
}
