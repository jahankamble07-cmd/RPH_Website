import { img } from './images'

// Year timeline shared by every gallery page, same style as Hall Council.
export const GALLERY_YEARS = [
  { id: '2025-26', label: '2025–26' },
  { id: '2024-25', label: '2024–25' },
  { id: '2023-24', label: '2023–24' },
  { id: 'earlier', label: 'Earlier' },
]

// TODO: every photo below is a sample stand-in. Replace with hall photos,
// grouped by year: { [yearId]: ['file-key', ...] } (files in public/images).
export const CATEGORIES = [
  {
    id: 'illumination',
    title: 'Illumination',
    theme: 'Light • Togetherness • RP Hall',
    cover: 'illu-4',
    kind: 'years',
    photos: {
      '2025-26': ['illu-4', 'illu-1', 'illu-2', 'illu-3', 'illu-5'],
      '2024-25': ['illu-prep', 'illu-chatai'],
      '2023-24': ['illu-prep-2'],
    },
  },
  {
    id: 'rangoli',
    title: 'Rangoli',
    theme: 'Colour • Patterns • RP Hall',
    cover: 'rangoli-3',
    kind: 'years',
    photos: {
      '2025-26': ['rangoli-3', 'rangoli-1', 'rangoli-4'],
      '2024-25': ['rangoli-2', 'rangoli-5'],
    },
  },
  {
    id: 'general-championship',
    title: 'General Championship',
    theme: 'Sport • Teamwork • RP Hall',
    cover: 'football',
    kind: 'sports',
  },
  {
    id: 'alumni-meet',
    title: 'Alumni Meet',
    theme: 'Batches • Reunion • RP Hall',
    cover: 'kgp-main',
    kind: 'years',
    photos: {},
  },
  {
    id: 'hall-activities',
    title: 'Other Hall Activities',
    theme: 'Festivals • Drives • RP Hall',
    cover: 'janmashtami',
    kind: 'events',
  },
]

export const GC_SPORTS = [
  { id: 'football', title: 'Football', cover: 'football', photos: { '2025-26': ['football', 'football-2'] } },
  { id: 'cricket', title: 'Cricket', cover: 'cricket', photos: { earlier: ['cricket'] } },
  { id: 'basketball', title: 'Basketball', cover: 'basketball', photos: { '2025-26': ['basketball'] } },
  { id: 'athletics', title: 'Athletics', cover: 'athletics', photos: { '2024-25': ['athletics'] } },
  { id: 'table-tennis', title: 'Table Tennis', cover: 'table-tennis', photos: { earlier: ['table-tennis'] } },
  { id: 'badminton', title: 'Badminton', cover: 'badminton', photos: { '2025-26': ['badminton'] } },
  { id: 'volleyball', title: 'Volleyball', cover: 'volleyball', photos: { '2024-25': ['volleyball'] } },
  { id: 'other-events', title: 'Other Events', cover: 'kgp-src', photos: {} },
]

// Event names from the PDF text and reference. TODO: add the rest of the
// hall's events and their photos.
export const HALL_ACTIVITIES = [
  { id: 'janmashtami', title: 'Janmashtami', photos: { '2025-26': ['janmashtami', 'janmashtami-2'] } },
  { id: 'sweet-eating-competition', title: 'Sweet Eating Competition', photos: {} },
  { id: 'cleaning-drive', title: 'Cleaning Drive', photos: {} },
]

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id)
}

export function photoList(keys = [], caption) {
  return keys.map((key) => ({ key, src: img(key), alt: caption }))
}

export function yearsWithPhotos(photos = {}) {
  return GALLERY_YEARS.filter((y) => photos[y.id]?.length)
}

export function allPhotos(photos = {}) {
  return Object.values(photos).flat()
}

export const HIGHLIGHTS = [
  { key: 'illu-4', caption: 'Illumination', size: 'big' },
  { key: 'rangoli-3', caption: 'Rangoli' },
  { key: 'football', caption: 'General Championship', size: 'tall' },
  { key: 'illu-1', caption: 'Illumination' },
  { key: 'janmashtami-2', caption: 'Janmashtami', size: 'wide' },
  { key: 'rangoli-1', caption: 'Rangoli' },
  { key: 'basketball', caption: 'General Championship' },
  { key: 'illu-5', caption: 'Illumination', size: 'wide' },
  { key: 'volleyball', caption: 'General Championship' },
  { key: 'rangoli-4', caption: 'Rangoli' },
]
