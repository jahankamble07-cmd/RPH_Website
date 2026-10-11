import Portrait from './Portrait'

// Photo-on-top card, as in the Notable Alumni blocks on the homepage reference.
export default function PortraitCard({ name, photo, lines = [], children, className = '' }) {
  return (
    <article className={`portrait-card card lift ${className}`}>
      <Portrait name={name} src={photo} className="portrait-card__photo" />
      <div className="portrait-card__body">
        <h3>{name}</h3>
        {lines.filter(Boolean).map((line, i) => (
          <p key={i} className={i === 0 ? 'portrait-card__lead' : 'muted small'}>{line}</p>
        ))}
        {children}
      </div>
      <span className="portrait-card__rule" />
    </article>
  )
}
