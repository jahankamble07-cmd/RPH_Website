import { Link, useParams, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../../components/Breadcrumbs'
import Icon from '../../components/Icon'
import Pills from '../../components/Pills'
import { allPhotos, GALLERY_YEARS, GC_SPORTS, getCategory, HALL_ACTIVITIES } from '../../data/gallery'
import { img } from '../../data/images'
import NotFound from '../NotFound'
import AlbumBanner from './AlbumBanner'
import YearPhotos from './YearPhotos'
import '../../styles/gallery.css'

function Cover({ photoKey, alt }) {
  return photoKey ? (
    <img className="cover" src={img(photoKey)} alt={alt} loading="lazy" />
  ) : (
    <div className="cover--empty"><Icon name="image" size={28} /></div>
  )
}

function SportList() {
  return (
    <>
      <div className="section-head"><h2>Select a Sport / Event</h2></div>
      <div className="grid grid--4">
        {GC_SPORTS.map((s) => {
          const count = allPhotos(s.photos).length
          return (
            <Link key={s.id} to={`/gallery/general-championship/${s.id}`} className="card tile-link">
              <Cover photoKey={count ? s.cover : null} alt="" />
              <div className="card-body">
                <h3>{s.title}</h3>
                <p className="muted small">{count ? `${count} photos` : 'Photos to be added'}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

function EventsByYear() {
  const [params, setParams] = useSearchParams()
  const year = GALLERY_YEARS.some((y) => y.id === params.get('year')) ? params.get('year') : GALLERY_YEARS[0].id
  const label = GALLERY_YEARS.find((y) => y.id === year).label

  return (
    <div className="year-block">
      <Pills options={GALLERY_YEARS} value={year} onChange={(id) => setParams({ year: id }, { replace: true })} label="Year" />
      <h2>{label}</h2>
      <div className="grid grid--3">
        {HALL_ACTIVITIES.map((e) => {
          const first = e.photos[year]?.[0]
          return (
            <Link key={e.id} to={`/gallery/hall-activities/${e.id}?year=${year}`} className="card tile-link">
              <Cover photoKey={first} alt="" />
              <div className="card-body">
                <h3>{e.title} {label}</h3>
                <p className="muted small">{first ? `${e.photos[year].length} photos` : 'Photos to be added'}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default function GalleryCategory() {
  const { categoryId } = useParams()
  const category = getCategory(categoryId)
  if (!category) return <NotFound />

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Gallery', to: '/gallery' }, { label: category.title }]} />
        <AlbumBanner title={category.title} text={category.theme} image={img(category.cover)} />
        {category.kind === 'years' && <YearPhotos photos={category.photos} title={category.title} />}
        {category.kind === 'sports' && <SportList />}
        {category.kind === 'events' && <EventsByYear />}
      </div>
    </section>
  )
}
