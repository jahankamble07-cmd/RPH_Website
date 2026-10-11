import { initials } from '../lib/format'
import Icon from './Icon'

// Photo frame used by profile cards. Shows initials until a photo is added.
export default function Portrait({ name, src, className = '' }) {
  return (
    <div className={`portrait ${className}`}>
      {src ? (
        <img src={src} alt={name ?? ''} loading="lazy" />
      ) : (
        <span className="portrait__initials" aria-hidden="true">
          {name ? initials(name) : <Icon name="user" size={48} />}
        </span>
      )}
    </div>
  )
}
