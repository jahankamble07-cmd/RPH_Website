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
  'complaints.create': [STUDENT, HALL_COUNCIL],
  'complaints.review': [HALL_COUNCIL, WARDEN],
  'innovation.postProject': [STUDENT, HALL_COUNCIL],
  'innovation.postOpportunity': [ALUMNI],
  'opportunities.view': [STUDENT, ALUMNI, HALL_COUNCIL, WARDEN],
  'funding.view': [ALUMNI],
  'funding.donate': [ALUMNI],
  'recruitment.manage': [ALUMNI],
  'fundingRequests.view': [WARDEN, HALL_COUNCIL],
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
  // Reviewers file complaints from a toggle on the Complaints page instead.
  { to: '/complaints/new', label: 'New Complaint', permission: 'complaints.create', hideWith: 'complaints.review' },
  { to: '/complaints', label: 'Complaints', permission: 'complaints.review' },
  { to: '/funding', label: 'Funding', permission: 'funding.view' },
  { to: '/recruitment', label: 'Recruitment', permission: 'recruitment.manage' },
  { to: '/funding-requests', label: 'Funding Requests', permission: 'fundingRequests.view' },
]

export function navItemsFor(user) {
  return NAV_ITEMS.filter((item) => can(user, item.permission) && !(item.hideWith && can(user, item.hideWith)))
}

// Every role lands on Home after logging in.
export const LANDING_PATH = '/'
