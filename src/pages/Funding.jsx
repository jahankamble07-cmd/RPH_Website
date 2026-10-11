import { useMemo, useState } from 'react'
import { useAuth } from '../auth/useAuth'
import Icon from '../components/Icon'
import Modal from '../components/Modal'
import PageHero from '../components/PageHero'
import Pending from '../components/Pending'
import Reveal from '../components/Reveal'
import SampleTag from '../components/SampleTag'
import { FUNDING_FIELDS, FUNDING_NEEDS, INITIATIVES, PAST_SUPPORTED, SUPPORT_STATUS, WAYS_TO_CONTRIBUTE } from '../data/funding'
import { img } from '../data/images'
import SupportModal from '../features/funding/SupportModal'
import { formatDate, formatINR } from '../lib/format'
import { COLLECTIONS, useCollection } from '../lib/store'
import './Funding.css'

function NeedDetails({ need, onClose, onContribute }) {
  return (
    <Modal onClose={onClose} label={need.title}>
      {need.image && <img src={img(need.image)} alt="" className="funding-modal__img" />}
      <div className="modal__body stack">
        <div className="chips">{need.sample && <SampleTag />}</div>
        <h2>{need.title}</h2>
        <dl className="def-list">
          {FUNDING_FIELDS.map(([key, label]) => (
            <div key={key} style={{ display: 'contents' }}>
              <dt>{label}</dt>
              <dd>
                {need[key] == null ? (
                  <span className="muted">To be added</span>
                ) : key === 'amount' ? formatINR(need.amount) : need[key]}
              </dd>
            </div>
          ))}
        </dl>
        <div className="form-actions">
          <button type="button" className="btn btn--donate" onClick={onContribute}>
            <Icon name="heart" size={15} /> Contribute
          </button>
        </div>
      </div>
    </Modal>
  )
}

function Leaderboard({ pledges }) {
  const rows = useMemo(() => {
    const totals = new Map()
    pledges
      .filter((p) => p.type === 'funding' && p.showOnLeaderboard)
      .forEach((p) => totals.set(p.name, (totals.get(p.name) ?? 0) + p.amount))
    return [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
  }, [pledges])

  return (
    <div className="card card-body leaderboard">
      <h3><Icon name="trophy" /> Top donors</h3>
      {rows.length ? (
        <ol>
          {rows.map(([name, total], i) => (
            <li key={name}>
              <span className="leaderboard__rank">{i + 1}</span>
              <span className="leaderboard__name">{name}</span>
              <strong>{formatINR(total)}</strong>
            </li>
          ))}
        </ol>
      ) : (
        <p className="muted small">The leaderboard fills in as pledges are recorded.</p>
      )}
    </div>
  )
}

function MyStatus({ mine, onDonate }) {
  const statusOf = (s) => s.status ?? 'sent'
  const pledged = mine.filter((s) => s.amount).reduce((sum, s) => sum + s.amount, 0)
  const received = mine.filter((s) => s.amount && statusOf(s) === 'received').reduce((sum, s) => sum + s.amount, 0)
  const offers = mine.filter((s) => !s.amount).length

  return (
    <section className="section section--ivory my-status">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <h2>Your Funding Status</h2>
            <p>Donation requests and offers you have sent, and where each one stands.</p>
          </div>
        </Reveal>
        <dl className="status-cards">
          <Reveal className="card card-body" delay={0}><dt>Total pledged</dt><dd>{formatINR(pledged)}</dd></Reveal>
          <Reveal className="card card-body" delay={90}><dt>Received by the hall</dt><dd>{formatINR(received)}</dd></Reveal>
          <Reveal className="card card-body" delay={180}><dt>Requests sent</dt><dd>{mine.length}</dd></Reveal>
          <Reveal className="card card-body" delay={270}><dt>Non-monetary offers</dt><dd>{offers}</dd></Reveal>
        </dl>
        {mine.length ? (
          <ul className="status-list">
            {mine.map((s) => (
              <li key={s.id} className="card">
                <div>
                  <strong>{s.amount ? formatINR(s.amount) : s.typeLabel}</strong>
                  <span className="muted small">{s.project}, sent {formatDate(s.createdAt)}</span>
                </div>
                <span className={`support-status support-status--${statusOf(s)}`}>{SUPPORT_STATUS[statusOf(s)]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty status-empty">
            <p>You have not sent a donation request yet.</p>
            <button type="button" className="btn btn--donate btn--small" onClick={onDonate}>
              <Icon name="heart" size={14} /> Donate
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Funding() {
  const { user } = useAuth()
  const { items: support } = useCollection(COLLECTIONS.support)
  const [modal, setModal] = useState(null)
  const [details, setDetails] = useState(null)

  const mine = support.filter((s) => s.authorId === user.id)
  const donate = (project) => setModal({ type: 'funding', project })

  return (
    <>
      <PageHero title="Funding" text="See what R.P. residents are working on now, then choose how you would like to help." image={img('rp-hall')}>
        <button type="button" className="btn btn--donate funding-hero__btn" onClick={() => donate()}>
          <Icon name="heart" size={16} /> Donate
        </button>
      </PageHero>

      <MyStatus mine={mine} onDonate={() => donate()} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Current Work &amp; Initiatives</h2>
              <p>Projects, facilities and initiatives under way in Rajendra Prasad Hall.</p>
            </div>
          </div>
          <div className="grid grid--4">
            {INITIATIVES.map((it) => (
              <article key={it.id} className="card initiative lift">
                <img src={img(it.image)} alt="" className="cover" loading="lazy" />
                <div className="card-body stack">
                  <div className="chips">
                    <span className="chip chip--maroon">{it.status}</span>
                    {it.sample && <SampleTag />}
                  </div>
                  <h3>{it.title}</h3>
                  <p className="muted small">{it.text}</p>
                </div>
              </article>
            ))}
          </div>
          <h3 className="funding-sub">Earlier projects supported by alumni</h3>
          {PAST_SUPPORTED.length ? null : (
            <Pending>Earlier alumni-supported projects, their outcomes, photos and success stories are to be added.</Pending>
          )}
        </div>
      </section>

      <section className="section section--band">
        <div className="container funding-split">
          <div>
            <div className="section-head">
              <div>
                <h2>Contribute / Fund Innovations</h2>
                <p>Projects and initiatives that need additional support.</p>
              </div>
            </div>
            <div className="needs">
              {FUNDING_NEEDS.map((n) => (
                <article key={n.id} className="card need lift">
                  <img src={img(n.image)} alt="" className="cover" loading="lazy" />
                  <div className="card-body stack">
                    <h3>{n.title} {n.sample && <SampleTag />}</h3>
                    <p className="muted small">{n.about}</p>
                    <p className="need__amount">
                      <span className="small muted">Estimated funding required</span>
                      <strong>{formatINR(n.amount)}</strong>
                    </p>
                    <div className="need__actions">
                      <button type="button" className="btn btn--outline btn--small" onClick={() => setDetails(n)}>Details</button>
                      <button type="button" className="btn btn--donate btn--small" onClick={() => donate(n.title)}>
                        <Icon name="heart" size={14} /> Contribute
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="stack funding-aside">
            <Leaderboard pledges={support} />
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Different Ways Alumni Can Contribute</h2>
              <p>Contribution does not necessarily have to be monetary.</p>
            </div>
          </div>
          <div className="ways">
            {WAYS_TO_CONTRIBUTE.map((w) => (
              <button
                key={w.id}
                type="button"
                className="card way lift"
                onClick={() => setModal({ type: w.id })}
              >
                <span className="way__icon"><Icon name={w.icon} size={22} /></span>
                <span className="way__title">{w.title}</span>
                <span className="link-arrow">{w.id === 'funding' ? 'Donate' : 'Offer'} <Icon name="arrow" size={14} /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="funding-page-pad" />
      <div className="donate-dock">
        <button type="button" className="btn btn--donate" onClick={() => donate()}>
          <Icon name="heart" size={16} /> Donate
        </button>
      </div>

      {details && (
        <NeedDetails
          need={details}
          onClose={() => setDetails(null)}
          onContribute={() => {
            setDetails(null)
            donate(details.title)
          }}
        />
      )}
      {modal && <SupportModal type={modal.type} project={modal.project} onClose={() => setModal(null)} />}
    </>
  )
}
