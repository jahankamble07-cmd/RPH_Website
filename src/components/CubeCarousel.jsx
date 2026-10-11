import { useCallback, useEffect, useRef, useState } from 'react'

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Cards sit like the inside of a box: the active card is the back wall and
// its neighbours fold out as the side walls.
function placement(offset) {
  const abs = Math.abs(offset)
  const side = Math.sign(offset)
  if (abs === 0) {
    return { transformOrigin: '50% 50%', transform: 'translateX(0) rotateY(0deg)', opacity: 1, zIndex: 10 }
  }
  return {
    transformOrigin: side > 0 ? '0% 50%' : '100% 50%',
    transform: `translateX(${side * 100}%) rotateY(${-side * (abs === 1 ? 62 : 98)}deg)`,
    opacity: abs === 1 ? 1 : 0,
    zIndex: 10 - abs,
    pointerEvents: abs === 1 ? 'auto' : 'none',
  }
}

// items: [{ id, title, theme, image, renderAction? }]
export default function CubeCarousel({ items, active, onActive, label, interval = 4000 }) {
  const count = items.length
  const [paused, setPaused] = useState(false)
  const drag = useRef(null)
  const wheel = useRef({ sum: 0, lock: 0 })

  const go = useCallback((step) => onActive((active + step + count) % count), [active, count, onActive])

  useEffect(() => {
    if (paused || REDUCED || count < 2) return
    const t = setTimeout(() => {
      if (!document.hidden) go(1)
    }, interval)
    return () => clearTimeout(t)
  }, [active, paused, go, interval, count])

  const offsetOf = (i) => {
    let o = i - active
    if (o > count / 2) o -= count
    if (o < -count / 2) o += count
    return o
  }

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, moved: false }
  }
  const onPointerMove = (e) => {
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true
  }
  const onPointerUp = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    setTimeout(() => (drag.current = null), 0)
  }

  // Horizontal trackpad scroll moves one card per gesture.
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    const now = Date.now()
    if (now < wheel.current.lock) return
    wheel.current.sum += e.deltaX
    if (Math.abs(wheel.current.sum) > 40) {
      go(wheel.current.sum > 0 ? 1 : -1)
      wheel.current = { sum: 0, lock: now + 650 }
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <div
      className="cube"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="cube__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        onWheel={onWheel}
      >
        {items.map((item, i) => {
          const offset = offsetOf(i)
          const isActive = offset === 0
          return (
            <article
              key={item.id}
              className={`cube__face${isActive ? ' is-active' : ''}`}
              style={placement(offset)}
              aria-hidden={!isActive}
              onClick={() => !isActive && !drag.current?.moved && onActive(i)}
            >
              <img src={item.image} alt="" draggable="false" />
              <div className="cube__caption">
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.theme}</p>
                </div>
                {isActive && item.renderAction?.()}
              </div>
            </article>
          )
        })}
      </div>
      <div className={`cube__dots${paused ? ' is-paused' : ''}`}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={i === active}
            onClick={() => onActive(i)}
            style={{ '--interval': `${interval}ms` }}
          >
            {i === active && <span key={active} />}
          </button>
        ))}
      </div>
    </div>
  )
}
