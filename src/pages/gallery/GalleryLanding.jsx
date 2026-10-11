import { useState } from 'react'
import { Link } from 'react-router-dom'
import CubeCarousel from '../../components/CubeCarousel'
import Icon from '../../components/Icon'
import Lightbox from '../../components/Lightbox'
import Pills from '../../components/Pills'
import Reveal from '../../components/Reveal'
import { CATEGORIES, HIGHLIGHTS } from '../../data/gallery'
import { img } from '../../data/images'
import '../../styles/gallery.css'

const FILTERS = [{ id: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.title }))]
const HIGHLIGHT_PHOTOS = HIGHLIGHTS.map((h) => ({ key: h.key, src: img(h.key), alt: h.caption }))

export default function GalleryLanding() {
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null)

  const pickFilter = (id) => {
    setFilter(id)
    if (id !== 'all') setActive(CATEGORIES.findIndex((c) => c.id === id))
  }

  const pickAlbum = (i) => {
    setActive(i)
    if (filter !== 'all') setFilter(CATEGORIES[i].id)
  }

  const albums = CATEGORIES.map((c) => ({
    id: c.id,
    title: c.title,
    theme: c.theme,
    image: img(c.cover),
    renderAction: () => (
      <Link to={`/gallery/${c.id}`} className="btn btn--light btn--small">
        Explore album <Icon name="arrow" size={14} />
      </Link>
    ),
  }))

  return (
    <>
      <section className="section">
        <div className="container">
          <header className="gallery-head">
            <p className="gallery-head__label rise" style={{ '--i': 0 }}>GALLERY</p>
            <h1 className="rise" style={{ '--i': 1 }}>Memories of RP Hall</h1>
            <p className="muted rise" style={{ '--i': 2 }}>Our traditions, moments and achievements — all in one place.</p>
          </header>

          <Pills options={FILTERS} value={filter} onChange={pickFilter} label="Album" center />

          <CubeCarousel items={albums} active={active} onActive={pickAlbum} label="Albums" />
        </div>
      </section>

      <section className="section highlights">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <h2>Recent Highlights</h2>
              <p>Select a photo to view it full size.</p>
            </div>
          </Reveal>
          <div className="mosaic">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h.key} variant="zoom" delay={(i % 5) * 90} className={h.size ? `tile--${h.size}` : undefined}>
                <button type="button" className="mosaic__tile" onClick={() => setOpen(i)} aria-label={`Open photo: ${h.caption}`}>
                  <img src={img(h.key)} alt="" loading="lazy" />
                  <span className="mosaic__caption">
                    <strong>{h.caption}</strong>
                    <span>View photo</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {open !== null && (
        <Lightbox photos={HIGHLIGHT_PHOTOS} index={open} title="Recent Highlights" onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </>
  )
}
