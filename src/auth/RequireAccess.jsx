import { Navigate, useLocation } from 'react-router-dom'
import { can } from './roles'
import { useAuth } from './useAuth'
import Forbidden from '../pages/Forbidden'

export default function RequireAccess({ permission, children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }
  if (!can(user, permission)) return <Forbidden />
  return children
}
