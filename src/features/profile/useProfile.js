import { useCallback } from 'react'
import { COLLECTIONS, useCollection } from '../../lib/store'

// One profile record per account, stored with the other local data.
export function useProfile(user) {
  const { items, add, update } = useCollection(COLLECTIONS.profiles)
  const profile = user ? items.find((p) => p.userId === user.id) : null

  const save = useCallback(
    (patch) => {
      if (!user) return
      if (profile) update(profile.id, patch)
      else add({ userId: user.id, ...patch })
    },
    [user, profile, add, update],
  )

  return { profile: profile ?? null, save }
}

// Shrinks an uploaded photo so it fits comfortably in browser storage.
export function resizePhoto(file, max = 480) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const image = new Image()
      image.onerror = reject
      image.onload = () => {
        const scale = Math.min(1, max / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
