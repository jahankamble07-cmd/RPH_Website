import { useCallback, useMemo, useState } from 'react'
import { accounts } from 'virtual:accounts'
import { AuthContext } from './useAuth'

const SESSION_KEY = 'rph:session'

function publicUser(account) {
  const { id, email, role, name } = account
  return { id, email, role, name }
}

function restoreSession() {
  try {
    const id = JSON.parse(localStorage.getItem(SESSION_KEY))?.id
    const account = accounts.find((a) => a.id === id)
    return account ? publicUser(account) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(restoreSession)

  const login = useCallback((email, password) => {
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    )
    if (!account) return null
    const next = publicUser(account)
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id: next.id }))
    setUser(next)
    return next
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout, loginAvailable: accounts.length > 0 }),
    [user, login, logout],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

