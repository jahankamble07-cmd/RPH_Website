import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import { GC_SPORTS } from '../../data/gallery'
import { img } from '../../data/images'
import NotFound from '../NotFound'
import AlbumBanner from './AlbumBanner'
import YearPhotos from './YearPhotos'
import '../../styles/gallery.css'

export default function GallerySport() {
  const { sportId } = useParams()
  const sport = GC_SPORTS.find((s) => s.id === sportId)
  if (!sport) return <NotFound />
  const title = `${sport.title}, General Championship`

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Gallery', to: '/gallery' },
            { label: 'General Championship', to: '/gallery/general-championship' },
            { label: sport.title },
          ]}
        />
        <AlbumBanner title={sport.title} text="General Championship" image={img(sport.cover)} />
        <YearPhotos photos={sport.photos} title={title} />
      </div>
    </section>
  )
}
