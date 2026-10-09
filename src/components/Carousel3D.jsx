import { useEffect, useState } from 'react'
import Icon from './Icon'

function placement(offset, narrow) {
  const abs = Math.abs(offset)
  const visible = abs <= (narrow ? 1 : 2)
  const shift = narrow ? 62 : 58
  return {
    transform: `translateX(${offset * shift}%) translateZ(${-abs * 160}px) rotateY(${offset * -16}deg)`,
    opacity: visible ? 1 : 0,
    filter: abs === 0 ? 'none' : 'brightness(0.62)',
    zIndex: 20 - abs,
    pointerEvents: visible ? 'auto' : 'none',
  }
}

// items: [{ id, title, theme, image, renderAction? }]
export default function Carousel3D({ items, active, onActive, label }) {
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 700px)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const onChange = (e) => setNarrow(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const count = items.length
  const go = (step) => onActive((active + step + count) % count)

  const offsetOf = (i) => {
    let o = i - active
    if (o > count / 2) o -= count
    if (o < -count / 2) o += count
    return o
  }

  return (
    <>
      <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
        <div className="carousel__track">
          {items.map((item, i) => {
            const offset = offsetOf(i)
            const isActive = offset === 0
            return (
              <article
                key={item.id}
                className="album"
                style={placement(offset, narrow)}
                aria-hidden={!isActive}
                onClick={isActive ? undefined : () => onActive(i)}
              >
                <img src={item.image} alt="" />
                <div className="album__caption">
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
            <button type="button" className="icon-btn carousel__arrow carousel__arrow--prev" onClick={() => go(-1)} aria-label="Previous">
              <Icon name="left" />
            </button>
            <button type="button" className="icon-btn carousel__arrow carousel__arrow--next" onClick={() => go(1)} aria-label="Next">
              <Icon name="right" />
            </button>
          </>
        )}
      </div>
      <div className="dots">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={i === active}
            onClick={() => onActive(i)}
          />
        ))}
      </div>
    </>
  )
}
