// Figures below are copied from the homepage reference image in the PDF.
// TODO(Q3): confirm each figure with the hall office before launch.
export const HALL_STATS = [
  { icon: 'users', value: '700+', label: 'Boarders' },
  { icon: 'users', value: '80+', label: 'Hall Workers' },
  { icon: 'building', value: '1959', label: 'Year of Establishment' },
  { icon: 'cap', value: '1000+', label: 'Alumni Network' },
]

export const MEDAL_TALLY = [
  { event: 'Illumination', icon: 'diya', gold: 12, silver: 9, bronze: 8 },
  { event: 'Rangoli', icon: 'flower', gold: 10, silver: 7, bronze: 6 },
  { event: 'General Championship', icon: 'trophy', gold: 8, silver: 11, bronze: 9 },
]

export const NOTICE_CATEGORIES = ['All', 'General', 'Events', 'Academics', 'Mess', 'Maintenance']

// Sample notices copied from the homepage reference. Replace with real notices.
export const NOTICES = [
  { id: 'n1', day: '06', month: 'Oct', category: 'General', title: 'Hall Meeting', text: 'General hall meeting on 8th Oct, 7 PM at Common Room.', sample: true },
  { id: 'n2', day: '04', month: 'Oct', category: 'Mess', title: 'Mess Menu Update', text: 'Revised mess menu will be effective from 7th Oct.', sample: true },
  { id: 'n3', day: '02', month: 'Oct', category: 'Events', title: 'Sports Trials', text: 'Trials for Inter-Hall Sports (Football & Cricket) on 10th Oct.', sample: true },
  { id: 'n4', day: '28', month: 'Sep', category: 'Maintenance', title: 'Maintenance Notice', text: 'Water supply may be interrupted on 30th Sep due to scheduled maintenance.', sample: true },
]

// TODO: hall events for the calendar. Format: { date: 'YYYY-MM-DD', title, place }
export const HALL_EVENTS = []

// TODO(Q4): messages and the warden's name were not supplied.
export const REFLECTIONS = [
  { heading: 'Message from the Warden', name: null, role: 'Warden, R.P. Hall of Residence', message: null },
  { heading: 'Message from the Hall President', name: 'Sreenived Ajith', role: 'Hall President', message: null },
]
