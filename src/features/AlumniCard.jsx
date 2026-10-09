import Avatar from '../components/Avatar'

export default function AlumniCard({ a }) {
  return (
    <article className={`alumni-card card${a.placeholder ? ' alumni-card--placeholder' : ''}`}>
      <div className="alumni-card__head">
        <Avatar name={a.name} src={a.photo} size={64} />
        <div>
          <h3>{a.name}</h3>
          <p className="muted small">{a.degree}, {a.department}</p>
          <span className="chip chip--maroon">Batch of {a.batch}</span>
        </div>
      </div>
      <div>
        <h4>{a.position}</h4>
        <p className="alumni-card__org">{a.organization}</p>
      </div>
      <div>
        <p className="alumni-card__label">Major achievements</p>
        <ul className="alumni-card__list">
          {a.achievements.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
      {a.message && <blockquote className="alumni-card__msg">{a.message}</blockquote>}
    </article>
  )
}
