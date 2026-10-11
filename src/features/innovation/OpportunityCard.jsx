import Icon from '../../components/Icon'
import { applyHref, formatDate } from '../../lib/format'

export default function OpportunityCard({ o, onRemove }) {
  const href = applyHref(o.apply)
  return (
    <article className="opp card lift">
      {o.deadline && (
        <p className="opp__deadline">
          <Icon name="calendar" size={14} /> Apply by {formatDate(`${o.deadline}T00:00`)}
        </p>
      )}
      <div className="opp__head">
        <span className="opp__logo" aria-hidden="true">{o.company.slice(0, 1).toUpperCase()}</span>
        <div>
          <h3>{o.role}</h3>
          <p className="muted small">{o.company}</p>
        </div>
      </div>
      <ul className="opp__meta">
        {o.location && <li><Icon name="pin" size={14} /> {o.location}</li>}
        <li><Icon name="briefcase" size={14} /> {o.type}</li>
      </ul>
      {o.skills?.length > 0 && (
        <div className="chips">{o.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
      )}
      {o.description && <p className="small">{o.description}</p>}
      <div className="opp__foot">
        <span className="muted small">Posted {formatDate(o.createdAt)}{o.postedBy ? ` by ${o.postedBy}` : ''}</span>
        <div className="opp__actions">
          {onRemove && (
            <button type="button" className="btn btn--outline btn--small" onClick={() => onRemove(o.id)}>Remove</button>
          )}
          {href ? (
            <a className="btn btn--small" href={href} target="_blank" rel="noreferrer">
              Apply <Icon name="external" size={13} />
            </a>
          ) : (
            o.apply && <span className="small">Apply: {o.apply}</span>
          )}
        </div>
      </div>
    </article>
  )
}
