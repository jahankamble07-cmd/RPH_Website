import Portrait from './Portrait'

// Large card with the photo on the left, as in the Warden block on the
// homepage reference.
export default function ProfileFeature({ name, photo, heading, title, children, footer, quote = false, className = '' }) {
  return (
    <article className={`feature-card card lift ${className}`}>
      <Portrait name={name} src={photo} className="feature-card__photo" />
      <div className="feature-card__body">
        {quote && <span className="feature-card__quote" aria-hidden="true">“</span>}
        {heading && <h3>{heading}</h3>}
        {children}
        <span className="feature-card__rule" />
        {title && <p className="feature-card__name">{title}</p>}
        {footer}
      </div>
    </article>
  )
}
