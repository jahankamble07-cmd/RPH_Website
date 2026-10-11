import { useEffect, useRef, useState } from 'react'

const REDUCED = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Counts a figure like "700+" or "25+" up from zero when it scrolls into view.
// Years and other plain values are shown as they are.
export default function CountUp({ value, duration = 1400 }) {
  const match = /^(\d+)(\+?)$/.exec(String(value))
  const animate = match && match[2] === '+' && !REDUCED
  const target = match ? Number(match[1]) : 0
  const ref = useRef(null)
  const [n, setN] = useState(animate ? 0 : null)

  useEffect(() => {
    if (!animate) return
    const el = ref.current
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration)
        setN(Math.round(target * (1 - (1 - p) ** 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [animate, target, duration])

  if (!animate) return <span>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{n}{match[2]}</span>
    </span>
  )
}
