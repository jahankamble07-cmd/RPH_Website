import { useEffect, useRef, useState } from 'react'
import Icon from '../../components/Icon'

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Catmull-Rom style control points for a smooth curve through the markers.
function controlPoints(points, tension = 0.35) {
  return points.slice(0, -1).map((p1, i) => {
    const p0 = points[i === 0 ? i : i - 1]
    const p2 = points[i + 1]
    const p3 = points[i + 2 === points.length ? i + 1 : i + 2]
    return [
      p1.x + ((p2.x - p0.x) * tension) / 3,
      p1.y + ((p2.y - p0.y) * tension) / 3,
      p2.x - ((p3.x - p1.x) * tension) / 3,
      p2.y - ((p3.y - p1.y) * tension) / 3,
    ]
  })
}

// Cards alternate left and right; a line is drawn through their corner
// markers as the timeline scrolls into view, and each card appears when the
// line reaches it.
export default function GcTimeline({ entries, onOpen }) {
  const wrapRef = useRef(null)
  const pathRef = useRef(null)
  const stepRefs = useRef([])
  const markerY = useRef([])
  const [visible, setVisible] = useState(() => entries.map(() => REDUCED))

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path) return

    const build = () => {
      const box = wrap.getBoundingClientRect()
      const points = stepRefs.current
        .map((el) => {
          const r = el?.querySelector('.gc-step__marker')?.getBoundingClientRect()
          return r ? { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top } : null
        })
        .filter(Boolean)
      markerY.current = points.map((p) => p.y)
      if (points.length < 2) return
      let d = `M${points[0].x},${points[0].y}`
      controlPoints(points).forEach((c, i) => {
        d += ` C${c[0]},${c[1]} ${c[2]},${c[3]} ${points[i + 1].x},${points[i + 1].y}`
      })
      path.setAttribute('d', d)
      const total = path.getTotalLength()
      path.style.strokeDasharray = `${total}`
      path.style.strokeDashoffset = REDUCED ? '0' : `${total}`
    }

    const update = () => {
      if (REDUCED) return
      const total = path.getTotalLength()
      if (!total) return
      const box = wrap.getBoundingClientRect()
      // The line tip follows a point 75% down the viewport. If the page ends
      // before that point can reach the last marker, the line is scaled so it
      // still completes at the bottom of the page.
      const anchor = window.innerHeight * 0.75
      const reach = anchor - box.top
      const end = markerY.current[markerY.current.length - 1] || box.height
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const reachAtBottom = anchor - (box.top + window.scrollY - maxScroll)
      const span = Math.max(1, Math.min(end, reachAtBottom))
      const progress = Math.min(1, Math.max(0, reach / span))
      path.style.strokeDashoffset = `${total * (1 - progress)}`
      setVisible((prev) => {
        const next = markerY.current.map((y) => progress * end >= y - 140)
        return next.every((v, i) => v === prev[i]) ? prev : next
      })
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }
    const onResize = () => {
      build()
      update()
    }

    const ro = new ResizeObserver(onResize)
    ro.observe(wrap)
    window.addEventListener('scroll', onScroll, { passive: true })
    onResize()
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [entries.length])

  return (
    <div className="gc-line" ref={wrapRef}>
      <svg className="gc-line__svg" aria-hidden="true">
        <path ref={pathRef} d="" />
      </svg>
      {entries.map((entry, i) => {
        const right = i % 2 === 1
        return (
          <div
            key={entry.id}
            ref={(el) => (stepRefs.current[i] = el)}
            className={`gc-step${right ? ' gc-step--right' : ''}${visible[i] ? ' is-in' : ''}`}
          >
            <button type="button" className="gc-step__card" onClick={() => onOpen(entry)}>
              <span className="gc-step__year">
                <Icon name="trophy" size={18} /> GC {entry.year}
              </span>
              <span className="gc-step__result">{entry.result}</span>
              <span className="gc-step__more">
                Podiums and photos <Icon name="arrow" size={14} />
              </span>
            </button>
            <span className="gc-step__marker" aria-hidden="true" />
          </div>
        )
      })}
    </div>
  )
}
