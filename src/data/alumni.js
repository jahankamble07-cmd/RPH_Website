// TODO(Q5): no alumni profiles were supplied. The entries below use the
// placeholder template shown in the PDF (page 7 and 17). Replace them with
// real profiles: { name, degree, department, batch, position, organization,
// achievements: [], message, photo }.
export const ALUMNI_ERAS = [
  { id: 'all', label: 'All eras' },
  { id: '1970-1999', label: '1970s–1990s' },
  { id: '2000-2010', label: '2000s–2010s' },
  { id: '2011-present', label: '2011–Present' },
]

const template = (era) => ({
  placeholder: true,
  era,
  name: 'Alumnus Name',
  degree: 'B.Tech',
  department: 'Department',
  batch: 'YYYY',
  position: 'Position',
  organization: 'Organization',
  achievements: ['Add major achievement', 'Add major achievement'],
  message: 'Optional message to current residents.',
  photo: null,
})

const ERAS_IN_ORDER = ['1970-1999', '2000-2010', '2011-present']

export const ALUMNI = ERAS_IN_ORDER.flatMap((era) => Array.from({ length: 4 }, () => template(era)))
