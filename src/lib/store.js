// Browser-local persistence for user-submitted records (complaints, posts,
// pledges). Swap these functions for API calls once a backend exists.
import { useCallback, useSyncExternalStore } from 'react'

const PREFIX = 'rph:data:'
const listeners = new Set()
const cache = new Map()

function read(key) {
  if (!cache.has(key)) {
    let items = []
    try {
      items = JSON.parse(localStorage.getItem(PREFIX + key)) ?? []
    } catch {
      items = []
    }
    cache.set(key, items)
  }
  return cache.get(key)
}

function write(key, items) {
  cache.set(key, items)
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(items))
  } catch {
    // Storage full or blocked: keep the in-memory copy for this session.
  }
  listeners.forEach((fn) => fn())
}

function subscribe(fn) {
  listeners.add(fn)
  const onStorage = (e) => {
    if (e.key?.startsWith(PREFIX)) {
      cache.delete(e.key.slice(PREFIX.length))
      fn()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function useCollection(key) {
  const items = useSyncExternalStore(subscribe, () => read(key))

  const add = useCallback((record) => {
    const item = { ...record, id: newId(), createdAt: new Date().toISOString() }
    write(key, [item, ...read(key)])
    return item
  }, [key])

  const update = useCallback((id, patch) => {
    write(key, read(key).map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }, [key])

  const remove = useCallback((id) => {
    write(key, read(key).filter((it) => it.id !== id))
  }, [key])

  return { items, add, update, remove }
}

export const COLLECTIONS = {
  complaints: 'complaints',
  projects: 'projects',
  opportunities: 'opportunities',
  support: 'support',
}
