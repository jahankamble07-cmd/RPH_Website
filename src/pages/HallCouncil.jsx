import { useState } from 'react'
import Avatar from '../components/Avatar'
import Icon from '../components/Icon'
import Pending from '../components/Pending'
import Pills from '../components/Pills'
import { COUNCIL_TERMS, COUNCILS, designation, TOP_POSTS } from '../data/council'
import './HallCouncil.css'

function MemberCard({ m, large }) {
  const dialable = /^\d{10}$/.test(m.phone)
  return (
    <article className={`member card${large ? ' member--large' : ''}`}>
      <Avatar name={m.name} src={m.photo} size={large ? 104 : 80} />
      <div className="member__body">
        <h3>{m.name}</h3>
        <p className="member__dept">{m.department ?? 'Department to be added'}</p>
        <span className="chip chip--maroon member__post">{designation(m.post)}</span>
        <p className="member__phone">
          <Icon name="phone" size={14} />
          {dialable ? <a href={`tel:+91${m.phone}`}>{m.phone}</a> : <span>{m.phone}</span>}
        </p>
      </div>
    </article>
  )
}

export default function HallCouncil() {
  const [term, setTerm] = useState('current')
  const members = COUNCILS[term] ?? []
  const top = members.filter((m) => TOP_POSTS.includes(m.post))
  const rest = members.filter((m) => !TOP_POSTS.includes(m.post))
  const termLabel = COUNCIL_TERMS.find((t) => t.id === term).label

  return (
    <section className="section council">
      <div className="container">
        <div className="section-head section-head--center">
          <h1>Hall Council</h1>
          <hr className="rule" />
          <p>The elected representatives and student secretaries who lead, serve and represent the RP Hall community.</p>
        </div>

        <Pills options={COUNCIL_TERMS} value={term} onChange={setTerm} label="Council year" center />

        {members.length === 0 ? (
          <div className="council__pending">
            <Pending>Details of the {termLabel} council are to be added.</Pending>
          </div>
        ) : (
          <>
            <div className="council__top">
              {top.map((m) => <MemberCard key={m.name} m={m} large />)}
            </div>
            <div className="council__rest">
              {rest.map((m) => <MemberCard key={m.name} m={m} />)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
