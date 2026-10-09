// Single source of truth for roles, what each role may do, and the navbar.

export const ROLES = {
  STUDENT: 'student',
  ALUMNI: 'alumni',
  HALL_COUNCIL: 'hall_council',
  WARDEN: 'warden',
}

export const ROLE_LABELS = {
  student: 'Student',
  alumni: 'Alumni',
  hall_council: 'Hall Council',
  warden: 'Warden',
}

const { STUDENT, ALUMNI, HALL_COUNCIL, WARDEN } = ROLES

export const PERMISSIONS = {
  'notices.view': [STUDENT],
  'events.view': [STUDENT],
  'complaints.create': [STUDENT],
  'complaints.review': [HALL_COUNCIL, WARDEN],
  'innovation.postProject': [STUDENT],
  'innovation.postOpportunity': [ALUMNI],
  'funding.view': [ALUMNI],
  'funding.donate': [ALUMNI],
  'recruitment.manage': [ALUMNI],
  'fundingRequests.view': [WARDEN],
}

export function can(user, permission) {
  if (!permission) return true
  if (!user) return false
  return (PERMISSIONS[permission] ?? []).includes(user.role)
}

// Order follows section 1 of the requirements. Home is the logo.
export const NAV_ITEMS = [
  { to: '/hall-council', label: 'Hall Council' },
  { to: '/our-legacy', label: 'Our Legacy' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/innovation', label: 'Innovation' },
  { to: '/complaints/new', label: 'New Complaint', permission: 'complaints.create' },
  { to: '/complaints', label: 'Complaints', permission: 'complaints.review' },
  { to: '/funding', label: 'Funding', permission: 'funding.view' },
  { to: '/recruitment', label: 'Recruitment', permission: 'recruitment.manage' },
  { to: '/funding-requests', label: 'Funding Requests', permission: 'fundingRequests.view' },
]

export const LANDING = {
  [STUDENT]: '/',
  [ALUMNI]: '/funding',
  [HALL_COUNCIL]: '/complaints',
  [WARDEN]: '/complaints',
}
