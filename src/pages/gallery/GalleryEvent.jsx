import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import { allPhotos, HALL_ACTIVITIES } from '../../data/gallery'
import { img } from '../../data/images'
import NotFound from '../NotFound'
import AlbumBanner from './AlbumBanner'
import YearPhotos from './YearPhotos'
import '../../styles/gallery.css'

export default function GalleryEvent() {
  const { eventId } = useParams()
  const event = HALL_ACTIVITIES.find((e) => e.id === eventId)
  if (!event) return <NotFound />
  const cover = allPhotos(event.photos)[0]

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Gallery', to: '/gallery' },
            { label: 'Other Hall Activities', to: '/gallery/hall-activities' },
            { label: event.title },
          ]}
        />
        <AlbumBanner title={event.title} text="Other Hall Activities" image={cover ? img(cover) : null} />
        <YearPhotos photos={event.photos} title={event.title} />
      </div>
    </section>
  )
}
