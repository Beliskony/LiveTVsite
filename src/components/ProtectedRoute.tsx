import { useState, useEffect, type JSX } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "./auth-context"


type ProtectedRouteProps = {
  element: JSX.Element
  requiredRole?: "admin" | "user"
}

const ProtectedRoute = ({ element, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth()

  

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-100 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return element
}

export default ProtectedRoute


