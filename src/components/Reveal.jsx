import { useEffect, useRef, useState } from 'react'

// Fades its children in when they scroll into view. `variant` picks the
// direction ('up', 'left', 'right', 'zoom'); `delay` staggers siblings.
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const variantClass = variant === 'up' ? '' : ` reveal--${variant}`
  return (
    <Tag
      ref={ref}
      className={`reveal${variantClass}${shown ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
