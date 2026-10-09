import { useState } from 'react'
import Lightbox from './Lightbox'

export default function PhotoGrid({ photos, title, variant = 'grid' }) {
  const [open, setOpen] = useState(null)

  return (
    <>
      <div className={variant === 'strip' ? 'photo-strip' : 'photo-grid'}>
        {photos.map((p, i) => (
          <button key={p.key + i} type="button" className="photo-tile" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}: ${p.alt}`}>
            <img src={p.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <Lightbox photos={photos} index={open} title={title} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </>
  )
}
