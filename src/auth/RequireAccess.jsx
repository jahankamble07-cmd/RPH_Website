import { Navigate } from 'react-router-dom'
import { can } from './roles'
import { useAuth } from './useAuth'
import Forbidden from '../pages/Forbidden'

export default function RequireAccess({ permission, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!can(user, permission)) return <Forbidden />
  return children
}
