// Profile fields shown for each role. `group` decides which card a field sits in.
const contact = [
  { key: 'phone', label: 'Phone', type: 'tel', group: 'contact', placeholder: '10-digit mobile number' },
  { key: 'hometown', label: 'Home town', group: 'contact' },
]

const resident = [
  { key: 'rollNo', label: 'Roll number', group: 'basic', required: true, placeholder: 'e.g. 22CS10001' },
  { key: 'department', label: 'Department', group: 'basic' },
  {
    key: 'programme',
    label: 'Programme',
    group: 'basic',
    options: ['B.Tech', 'Dual Degree', 'Integrated M.Sc', 'M.Tech', 'M.Sc', 'MBA', 'PhD', 'Other'],
  },
  { key: 'year', label: 'Year of study', group: 'basic', options: ['1st year', '2nd year', '3rd year', '4th year', '5th year', 'Research scholar'] },
  { key: 'room', label: 'Room number', group: 'hall' },
  { key: 'bloodGroup', label: 'Blood group', group: 'basic', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
]

export const PROFILE_FIELDS = {
  student: [...resident, ...contact],
  hall_council: [...resident, { key: 'post', label: 'Council post', group: 'hall' }, ...contact],
  alumni: [
    { key: 'batch', label: 'Batch (passing-out year)', group: 'basic', placeholder: 'e.g. 2012' },
    { key: 'degree', label: 'Degree', group: 'basic', options: ['B.Tech', 'Dual Degree', 'M.Tech', 'M.Sc', 'MBA', 'PhD', 'Other'] },
    { key: 'department', label: 'Department', group: 'basic' },
    { key: 'organization', label: 'Current organisation', group: 'work' },
    { key: 'position', label: 'Position', group: 'work' },
    { key: 'city', label: 'City', group: 'work' },
    { key: 'linkedin', label: 'LinkedIn profile', type: 'url', group: 'contact', placeholder: 'https://' },
    ...contact,
  ],
  warden: [
    { key: 'department', label: 'Department', group: 'basic' },
    { key: 'designation', label: 'Designation', group: 'basic', placeholder: 'e.g. Professor' },
    { key: 'office', label: 'Office', group: 'hall' },
    { key: 'officeHours', label: 'Office hours', group: 'hall' },
    ...contact,
  ],
}

export const PROFILE_GROUPS = {
  basic: 'Basic information',
  hall: 'Hall details',
  work: 'Work',
  contact: 'Contact',
}
