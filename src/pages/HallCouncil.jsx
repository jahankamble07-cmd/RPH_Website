import { useState } from 'react'
import Icon from '../components/Icon'
import Pending from '../components/Pending'
import Pills from '../components/Pills'
import PortraitCard from '../components/PortraitCard'
import ProfileFeature from '../components/ProfileFeature'
import Reveal from '../components/Reveal'
import { COUNCIL_TERMS, COUNCILS, designation, TOP_POSTS } from '../data/council'
import './HallCouncil.css'

function Phone({ number }) {
  const dialable = /^\d{10}$/.test(number)
  return (
    <p className="member__phone">
      <Icon name="phone" size={14} />
      {dialable ? <a href={`tel:+91${number}`}>{number}</a> : <span>{number}</span>}
    </p>
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
        <Reveal className="section-head section-head--center">
          <h1>Hall Council</h1>
          <hr className="rule" />
          <p>The elected representatives and student secretaries who lead, serve and represent the RP Hall community.</p>
        </Reveal>

        <Pills options={COUNCIL_TERMS} value={term} onChange={setTerm} label="Council year" center />

        {members.length === 0 ? (
          <div className="council__pending">
            <Pending>Details of the {termLabel} council are to be added.</Pending>
          </div>
        ) : (
          <div key={term}>
            <div className="council__top">
              {top.map((m, i) => (
                <Reveal key={m.name} variant={i ? 'right' : 'left'}>
                  <ProfileFeature name={m.name} photo={m.photo} heading={m.name} className="member-feature">
                    <span className="chip chip--maroon member__post">{designation(m.post)}</span>
                    <p className="muted small">{m.department ?? 'Department to be added'}</p>
                    <Phone number={m.phone} />
                  </ProfileFeature>
                </Reveal>
              ))}
            </div>
            <div className="council__rest">
              {rest.map((m, i) => (
                <Reveal key={m.name} delay={(i % 5) * 80}>
                  <PortraitCard name={m.name} photo={m.photo} lines={[designation(m.post), m.department ?? 'Department to be added']}>
                    <Phone number={m.phone} />
                  </PortraitCard>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
