import { useState } from 'react'
import PageHero from '../components/PageHero'
import Pills from '../components/Pills'
import { WAYS_TO_CONTRIBUTE } from '../data/funding'
import { formatDate, formatINR } from '../lib/format'
import { COLLECTIONS, useCollection } from '../lib/store'
import './FundingRequests.css'

const FILTERS = [{ id: 'all', label: 'All' }, ...WAYS_TO_CONTRIBUTE.map((w) => ({ id: w.id, label: w.title }))]

export default function FundingRequests() {
  const { items } = useCollection(COLLECTIONS.support)
  const [type, setType] = useState('all')

  const shown = items.filter((s) => type === 'all' || s.type === type)
  const pledged = items.filter((s) => s.type === 'funding').reduce((sum, s) => sum + s.amount, 0)
  const alumni = new Set(items.map((s) => s.authorId)).size

  return (
    <>
      <PageHero title="Funding Requests" text="Alumni who have offered to fund or support innovations and hall initiatives." />
      <section className="section">
        <div className="container stack">
          <dl className="fr-summary">
            <div className="card card-body"><dt>Alumni interested</dt><dd>{alumni}</dd></div>
            <div className="card card-body"><dt>Offers received</dt><dd>{items.length}</dd></div>
            <div className="card card-body"><dt>Funding pledged</dt><dd>{formatINR(pledged)}</dd></div>
          </dl>

          <Pills options={FILTERS} value={type} onChange={setType} label="Type of support" />

          {shown.length ? (
            <div className="table-wrap card">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Alumnus</th>
                    <th>Support</th>
                    <th>Project</th>
                    <th className="num">Amount</th>
                    <th>Contact</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((s) => (
                    <tr key={s.id}>
                      <td>{formatDate(s.createdAt)}</td>
                      <td>{s.name}</td>
                      <td>{s.typeLabel}</td>
                      <td>{s.project}</td>
                      <td className="num">{s.amount ? formatINR(s.amount) : ''}</td>
                      <td>{s.contact}</td>
                      <td>{s.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty">No alumni offers yet.</p>
          )}
        </div>
      </section>
    </>
  )
}
