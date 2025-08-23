"use client"
import type { IUser } from "@/interfaces/User"
import type { AuthContextType } from "@/hooks/auth-contextInterface"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"


const API_URL = "https://api.yeshouatv.com/api" // Ton URL backend Laravel

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(false)

{/*
   // Récupérer l'utilisateur connecté au démarrage
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/user`, { credentials: "include" })
        if (!res.ok) {
          setUser(null)
          return
        }
        const data = await res.json()
        setUser(data)
      } catch (error) {
        console.error("Erreur fetch user :", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, []) */}


  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
   try {
        const reponse = await fetch (`${API_URL}/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({ email, password }),
        })
        if (!reponse.ok) throw new Error("Échec de connexion")

       // Récupérer l'utilisateur après login
        const userRes = await fetch(`${API_URL}/user`, { credentials: "include" })
        const userData = await userRes.json()
          setUser(userData)
            return true
          } catch (error) {
            console.error("Erreur login :", error)
            return false
          } finally {
          setLoading(false)
          }
        }

 const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) throw new Error("Échec d'inscription")

      // Récupérer l'utilisateur après register
      const userRes = await fetch(`${API_URL}/user`, { credentials: "include" })
      const userData = await userRes.json()
      setUser(userData)
      return true
    } catch (error) {
      console.error("Erreur register :", error)
      return false
    } finally {
      setLoading(false)
    }
  }



   // Déconnexion
  const logout = async () => {
    const token = localStorage.getItem("token")

    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error("Erreur logout :", error)
    }

    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    loading,
  }


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


