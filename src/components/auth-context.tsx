"use client"
import type { IUser } from "@/interfaces/User"
import type { AuthContextType } from "@/hooks/auth-contextInterface"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockUsers, mockToken, simulateDelay } from "@/data/mockUser"


const API_URL = "http://127.0.0.1:8000/api" // Ton URL backend Laravel

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Simuler la vérification de l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    console.log(password);
    

  await simulateDelay(800)

  const foundUser = mockUsers.find((u) => u.email === email)
  if (!foundUser) {
    setLoading(false)
    return false
  }

  localStorage.setItem("user", JSON.stringify(foundUser))
  localStorage.setItem("token", mockToken)
  setUser(foundUser)
  setLoading(false)
  return true
}


   /* try {
        const reponse = await fetch (`${API_URL}/login`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password }),
        })
        if (!reponse.ok) throw new Error("Échec de connexion")

      const data = await reponse.json()

      // data doit contenir { user: {...}, token: "..." }
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      setUser(data.user)
      return true

    } catch (error) {
        console.error("Erreur login :", error)
        return false
    }

    finally{
        setLoading(false)
    }
  } */

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true)

      try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) throw new Error("Échec d'inscription")

      const data = await response.json()

      // Enregistrer directement l'utilisateur si Laravel le renvoie
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      setUser(data.user)
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


