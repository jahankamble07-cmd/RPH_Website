import { useState } from 'react'
import { Link } from 'react-router-dom'
import Carousel3D from '../../components/Carousel3D'
import Icon from '../../components/Icon'
import Pills from '../../components/Pills'
import PhotoGrid from '../../components/PhotoGrid'
import { CATEGORIES, HIGHLIGHTS, photoList } from '../../data/gallery'
import { img } from '../../data/images'
import '../../styles/gallery.css'

const FILTERS = [{ id: 'all', label: 'All' }, ...CATEGORIES.map((c) => ({ id: c.id, label: c.title }))]

export default function GalleryLanding() {
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState('all')

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
    <section className="section">
      <div className="container">
        <header className="gallery-head">
          <p className="gallery-head__label">GALLERY</p>
          <h1>Memories of RP Hall</h1>
          <p className="muted">Our traditions, moments and achievements — all in one place.</p>
        </header>

        <Pills options={FILTERS} value={filter} onChange={pickFilter} label="Album" center />

        <Carousel3D items={albums} active={active} onActive={pickAlbum} label="Albums" />

        <div className="section-head">
          <h2>Recent Highlights</h2>
        </div>
        <PhotoGrid photos={photoList(HIGHLIGHTS, 'R.P. Hall gallery photo')} title="Recent Highlights" variant="strip" />
      </div>
    </section>
  )
}
