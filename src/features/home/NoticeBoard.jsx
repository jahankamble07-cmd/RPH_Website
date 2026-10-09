import { useState } from 'react'
import Icon from '../../components/Icon'
import Pills from '../../components/Pills'
import SampleTag from '../../components/SampleTag'
import { NOTICE_CATEGORIES, NOTICES } from '../../data/home'

const DOT = {
  General: 'var(--brick)',
  Events: 'var(--gold)',
  Academics: 'var(--maroon)',
  Mess: 'var(--orange)',
  Maintenance: 'var(--ember)',
}

export default function NoticeBoard() {
  const [category, setCategory] = useState('All')
  const shown = NOTICES.filter((n) => category === 'All' || n.category === category)

  return (
    <div>
      <div className="section-head">
        <div className="head-with-icon">
          <Icon name="megaphone" size={28} />
          <div>
            <h2>Notice Board</h2>
            <p>Stay updated with the latest announcements and events.</p>
          </div>
        </div>
      </div>
      <Pills options={NOTICE_CATEGORIES} value={category} onChange={setCategory} label="Notice category" />
      <ul className="notices">
        {shown.map((n) => (
          <li key={n.id} className="notice card">
            <span className="notice__date">
              <strong>{n.day}</strong>
              {n.month}
            </span>
            <span className="notice__dot" style={{ background: DOT[n.category] }} title={n.category} />
            <div className="notice__body">
              <h4>{n.title} {n.sample && <SampleTag />}</h4>
              <p className="muted small">{n.text}</p>
            </div>
            <span className="chip">{n.category}</span>
          </li>
        ))}
        {shown.length === 0 && <li className="empty">No notices in this category.</li>}
      </ul>
    </div>
  )
}
