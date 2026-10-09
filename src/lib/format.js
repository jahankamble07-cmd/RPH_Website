const dateFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

export const formatDate = (iso) => dateFmt.format(new Date(iso))
export const formatINR = (n) => inr.format(n)

export function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export function splitList(text) {
  return text.split(',').map((s) => s.trim()).filter(Boolean)
}

export function applyHref(apply) {
  if (!apply) return null
  if (/^https?:\/\//i.test(apply)) return apply
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(apply)) return `mailto:${apply}`
  return null
}
