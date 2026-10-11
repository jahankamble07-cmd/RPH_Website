import Portrait from '../components/Portrait'

export default function AlumniCard({ a }) {
  return (
    <article className={`alumni-card card lift${a.placeholder ? ' alumni-card--placeholder' : ''}`}>
      <Portrait name={a.name} src={a.photo} className="alumni-card__photo" />
      <div className="alumni-card__body">
        <span className="chip chip--maroon">Batch of {a.batch}</span>
        <h3>{a.name}</h3>
        <p className="muted small">{a.degree}, {a.department}</p>
        <p className="alumni-card__role">
          <strong>{a.position}</strong>
          <span>{a.organization}</span>
        </p>
        <div>
          <p className="alumni-card__label">Major achievements</p>
          <ul className="alumni-card__list">
            {a.achievements.map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
        {a.message && <blockquote className="alumni-card__msg">{a.message}</blockquote>}
      </div>
    </article>
  )
}
