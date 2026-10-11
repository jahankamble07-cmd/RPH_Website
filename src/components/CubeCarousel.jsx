import { useEffect, useLayoutEffect, useRef } from 'react'
import Icon from './Icon'

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const SCROLL_STEP = 240

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
    transform: `translateX(${side * 100}%) rotateY(calc(${-side} * ${abs === 1 ? 'var(--fold)' : '100deg'}))`,
    opacity: abs === 1 ? 1 : 0,
    zIndex: 10 - abs,
    pointerEvents: abs === 1 ? 'auto' : 'none',
  }
}

// items: [{ id, title, theme, image, renderAction? }]
// Moves on its own every `interval` ms, with page scroll while in view,
// with the side buttons, by swipe or drag, and with the arrow keys.
export default function CubeCarousel({ items, active, onActive, label, interval = 4000 }) {
  const count = items.length
  const rootRef = useRef(null)
  const drag = useRef(null)
  const goRef = useRef(null)

  const go = (step) => onActive((active + step + count) % count)
  // Timers and scroll listeners call the latest `go` through this ref.
  useLayoutEffect(() => {
    goRef.current = go
  })

  useEffect(() => {
    if (REDUCED || count < 2) return
    const t = setTimeout(() => !document.hidden && goRef.current(1), interval)
    return () => clearTimeout(t)
  }, [active, interval, count])

  // Page scroll drives the carousel while it is on screen.
  useEffect(() => {
    if (REDUCED || count < 2) return
    const el = rootRef.current
    let inView = false
    let lastY = window.scrollY
    let sum = 0
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting
      sum = 0
    }, { threshold: 0.35 })
    io.observe(el)
    const onScroll = () => {
      const y = window.scrollY
      if (inView) {
        sum += y - lastY
        if (Math.abs(sum) >= SCROLL_STEP) {
          goRef.current(sum > 0 ? 1 : -1)
          sum = 0
        }
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [count])

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
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    setTimeout(() => (drag.current = null), 0)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <div ref={rootRef} className="cube" role="region" aria-roledescription="carousel" aria-label={label} tabIndex={0} onKeyDown={onKeyDown}>
      <div className="cube__viewport">
        <div
          className="cube__stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
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
        {count > 1 && (
          <>
            <button type="button" className="icon-btn cube__btn cube__btn--prev" onClick={() => go(-1)} aria-label="Previous">
              <Icon name="left" size={22} />
            </button>
            <button type="button" className="icon-btn cube__btn cube__btn--next" onClick={() => go(1)} aria-label="Next">
              <Icon name="right" size={22} />
            </button>
          </>
        )}
      </div>
      <div className="cube__dots">
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
