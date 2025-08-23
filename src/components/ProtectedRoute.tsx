import { type JSX } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./auth-context"

type ProtectedRouteProps = {
  element: JSX.Element
  requiredRole?: "admin" | "user"
}

const ProtectedRoute = ({ element, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/home" replace />
  }

  return element
}

export default ProtectedRoute
