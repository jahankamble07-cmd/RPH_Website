import { useSearchParams } from 'react-router-dom'
import Pending from '../../components/Pending'
import PhotoGrid from '../../components/PhotoGrid'
import Pills from '../../components/Pills'
import { GALLERY_YEARS, photoList, yearsWithPhotos } from '../../data/gallery'

// Year timeline plus the photo grid for the selected year. The year is kept
// in the URL so links and the back button work.
export default function YearPhotos({ photos, title }) {
  const [params, setParams] = useSearchParams()
  const fallback = yearsWithPhotos(photos)[0]?.id ?? GALLERY_YEARS[0].id
  const year = GALLERY_YEARS.some((y) => y.id === params.get('year')) ? params.get('year') : fallback
  const label = GALLERY_YEARS.find((y) => y.id === year).label
  const list = photoList(photos[year], `${title}, ${label}`)

  return (
    <div className="year-block">
      <Pills
        options={GALLERY_YEARS}
        value={year}
        onChange={(id) => setParams({ year: id }, { replace: true })}
        label="Year"
      />
      {list.length ? (
        <PhotoGrid photos={list} title={`${title}, ${label}`} />
      ) : (
        <Pending>Photos for {label} are to be added.</Pending>
      )}
    </div>
  )
}
