import { useEffect, useRef } from 'react'
import Icon from './Icon'

export default function Lightbox({ photos, index, title, onClose, onIndex }) {
  const stripRef = useRef(null)
  const count = photos.length
  const go = (step) => onIndex((index + step + count) % count)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % count)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + count) % count)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [index, count, onClose, onIndex])

  useEffect(() => {
    stripRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [index])

  const photo = photos[index]

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title}>
      <div className="lightbox__bar">
        <div>
          <p className="lightbox__title">{title}</p>
          <p className="lightbox__count">{index + 1} / {count}</p>
        </div>
        <button type="button" className="lightbox__btn" onClick={onClose} aria-label="Close">
          <Icon name="close" size={22} />
        </button>
      </div>
      <div className="lightbox__stage">
        {count > 1 && (
          <button type="button" className="lightbox__btn lightbox__prev" onClick={() => go(-1)} aria-label="Previous photo">
            <Icon name="left" size={24} />
          </button>
        )}
        <img src={photo.src} alt={photo.alt} />
        {count > 1 && (
          <button type="button" className="lightbox__btn lightbox__next" onClick={() => go(1)} aria-label="Next photo">
            <Icon name="right" size={24} />
          </button>
        )}
      </div>
      <div className="lightbox__strip" ref={stripRef}>
        {photos.map((p, i) => (
          <button
            key={p.key + i}
            type="button"
            className={i === index ? 'is-active' : undefined}
            onClick={() => onIndex(i)}
            aria-label={`Photo ${i + 1}`}
          >
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}
