import { initials } from '../lib/format'
import Icon from './Icon'

export default function Avatar({ name, src, size = 72 }) {
  const style = { width: size, height: size, fontSize: size * 0.34 }
  if (src) return <img className="avatar" src={src} alt="" style={style} />
  return (
    <span className="avatar avatar--initials" style={style} aria-hidden="true">
      {name ? initials(name) : <Icon name="user" size={size * 0.45} />}
    </span>
  )
}
