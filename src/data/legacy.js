import { img } from './images'

export const LEGACY_SLIDES = ['rp-hall', 'kgp-old', 'illu-4', 'kgp-main', 'rangoli-3', 'kgp-gate'].map(img)

// Topics listed in the PDF for "Our History & Memories". Descriptions are
// short factual summaries; TODO(Q6): add hall-specific stories, years and
// winning designs.
export const MEMORIES = [
  { id: 'illumination', title: 'Illumination', theme: 'Light • Togetherness • RP Hall', image: 'illu-4', gallery: '/gallery/illumination', text: 'Thousands of diyas set on bamboo frames to form a picture, lit together on the night of Diwali.' },
  { id: 'rangoli', title: 'Rangoli', theme: 'Colour • Patterns • RP Hall', image: 'rangoli-3', gallery: '/gallery/rangoli', text: 'A large rangoli made by the hall for the inter-hall competition held alongside Illumination.' },
  { id: 'hall-teams', title: 'Hall teams', theme: 'Teams • Practice • Podiums', image: 'football', gallery: '/gallery/general-championship', text: 'Hall teams that represent R.P. in inter-hall sport.' },
  { id: 'cultural', title: 'Cultural activities', theme: 'Stage • Music • Drama', image: 'illu-5', gallery: '/gallery/hall-activities', text: 'Cultural events in the General Championship and within the hall.' },
  { id: 'sports', title: 'Sports', theme: 'Field • Court • Track', image: 'football-2', gallery: '/gallery/general-championship', text: 'Inter-hall sports contested as part of the General Championship.' },
  { id: 'freshers', title: 'Freshers', theme: 'New batch • First days', image: 'kgp-gate', gallery: '/gallery/hall-activities', text: 'The welcome for each new batch of residents.' },
  { id: 'farewells', title: 'Farewells', theme: 'Final year • Send-off', image: 'kgp-main', gallery: '/gallery/hall-activities', text: 'The send-off for the graduating batch.' },
  { id: 'traditions', title: 'Hall traditions', theme: 'Festivals • Rituals', image: 'janmashtami', gallery: '/gallery/hall-activities', text: 'Festivals and customs kept by every batch.' },
  { id: 'milestones', title: 'Important milestones', theme: 'Dates • Firsts', image: 'rp-hall', gallery: null, text: 'Key dates in the history of the hall.' },
].map((m) => ({ ...m, image: img(m.image) }))

// TODO(Q6): GC history was not supplied. Placeholder nodes follow the PDF
// reference ("YYYY", "GC result"). Each real entry should look like:
// { year: '2024', result: 'Overall GC Champions', position: '1st',
//   podiums: [{ event: 'Football', position: '1st', gallery: '/gallery/general-championship/football' }],
//   sports: [], cultural: [], technical: [], teams: [], highlights: [], photo: 'football' }
export const GC_HISTORY = Array.from({ length: 6 }, (_, i) => ({
  id: `gc-${i}`,
  placeholder: true,
  year: 'YYYY',
  result: 'GC result',
}))

