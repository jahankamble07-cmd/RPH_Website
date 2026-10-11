import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon'

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Horizontally scrolling row of cards with arrow buttons. With `auto` (ms)
// it advances one card at a time and wraps to the start.
export default function Rail({ children, label, auto = 0, column }) {
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)

  const step = useCallback((dir) => {
    const track = ref.current
    if (!track) return
    const first = track.firstElementChild
    const width = first ? first.getBoundingClientRect().width + 18 : track.clientWidth
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4
    if (dir > 0 && atEnd) track.scrollTo({ left: 0 })
    else track.scrollBy({ left: dir * width })
  }, [])

  useEffect(() => {
    if (!auto || paused || REDUCED) return
    const id = setInterval(() => !document.hidden && step(1), auto)
    return () => clearInterval(id)
  }, [auto, paused, step])

  return (
    <div
      className="rail"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <button type="button" className="icon-btn rail__btn rail__btn--prev" onClick={() => step(-1)} aria-label="Previous">
        <Icon name="left" />
      </button>
      <div
        ref={ref}
        className="rail__track"
        role="region"
        aria-label={label}
        tabIndex={0}
        style={column ? { '--rail-col': column } : undefined}
      >
        {children}
      </div>
      <button type="button" className="icon-btn rail__btn rail__btn--next" onClick={() => step(1)} aria-label="Next">
        <Icon name="right" />
      </button>
    </div>
  )
}
