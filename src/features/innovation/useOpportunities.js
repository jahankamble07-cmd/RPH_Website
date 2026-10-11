import { useEffect } from 'react'
import { COLLECTIONS, useCollection } from '../../lib/store'

export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// An opening stays listed up to and including its deadline day.
export function isOpen(o, today = todayISO()) {
  return !o.deadline || o.deadline >= today
}

// Recruitment posts that are still open. Posts past their deadline are
// deleted from the store the next time anyone loads the list.
export function useOpportunities() {
  const { items, add, remove } = useCollection(COLLECTIONS.opportunities)
  const today = todayISO()
  const open = items.filter((o) => isOpen(o, today))
  const expiredIds = items.filter((o) => !isOpen(o, today)).map((o) => o.id).join(',')

  useEffect(() => {
    if (expiredIds) expiredIds.split(',').forEach(remove)
  }, [expiredIds, remove])

  return { items: open, add, remove }
}
