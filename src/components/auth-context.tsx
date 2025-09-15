"use client"
import type { IUser } from "@/interfaces/User"
import type { AuthContextType } from "@/hooks/auth-contextInterface"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  const saveUserToLocal = (user: IUser) => localStorage.setItem("user", JSON.stringify(user))
  const removeUserFromLocal = () => localStorage.removeItem("user")

  const fetchUser = async (tokenToUse: string) => {
    try {
      const res = await fetch(`https://chunk.yeshouatv.com/api/user`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokenToUse}`,
        },
      })

      if (!res.ok) {
        console.warn("Échec récupération user (token expiré ?)", res.status)
        setUser(null)
        removeUserFromLocal()
        localStorage.removeItem("token")
        return null
      }

      const result = await res.json()
      setUser(result.data)
      saveUserToLocal(result.data)
      setToken(tokenToUse)
      return result.data
    } catch (error) {
      console.error("Erreur lors du fetch user :", error)
      setUser(null)
      removeUserFromLocal()
      localStorage.removeItem("token")
      return null
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }

    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken).finally(() => setLoading(false))
    }else {
    setLoading(false)
  }
  }, [])

  const login = async (email: string, password: string): Promise<IUser | null> => {
    setLoading(true)
    try {
      const res = await fetch(`https://chunk.yeshouatv.com/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Échec de connexion :", errorText)
        throw new Error("Échec de connexion")
      }

      const data = await res.json()
      const token = data.token

      if (!token) throw new Error("Token manquant dans la réponse")

      localStorage.setItem("token", token)
      setToken(token)

      // Aller chercher l'utilisateur avec le token
      const fecthedUser = await fetchUser(token)
      return fecthedUser
    } catch (error) {
      console.error("Erreur login :", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<IUser | null> => {
    setLoading(true)
    try {
      const res = await fetch(`https://chunk.yeshouatv.com/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Échec d'inscription :", errorText)
        throw new Error("Échec d'inscription")
      }

      const data = await res.json()
      const token = data.token

      if (!token) throw new Error("Token manquant après inscription")

      localStorage.setItem("token", token)
      setToken(token)

      const fetchedUser = await fetchUser(token)
      return fetchedUser
    } catch (error) {
      console.error("Erreur register :", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  //mot de passe oublie a tester et integre
  const sendPasswordResetAndVerifyCode = async (email: string): Promise<boolean> => {
  setLoading(true)
  try {
    const res = await fetch(`https://chunk.yeshouatv.com/api/send_code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Erreur envoi e-mail reset :", errorText)
      throw new Error("Échec de l'envoi du mail de réinitialisation.")
    }

    return true
  } catch (error) {
    console.error("Erreur reset password :", error)
    return false
  } finally {
    setLoading(false)
  }
}

const resetPassword = async (email: string, OTP:string, newPassword: string): Promise<boolean> => {
  setLoading(true)
  try {
    const res = await fetch(`https://chunk.yeshouatv.com/api/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, code: OTP, password: newPassword }),
    })
      
    if (!res.ok) {
      const errorText = await res.text()
      console.error("Échec changement mot de passe :", errorText)
      console.log('reset_password payload', { code: OTP, password: newPassword });

      throw new Error("Impossible de changer le mot de passe")
    }

    return true
    
  } catch (error) {
    console.error("Erreur changement mot de passe :", error)
    return false
  } finally {
    setLoading(false)
  }
}
//mot de passe oublie a tester et integre



  const logout = async () => {
    try {
      await fetch(`https://chunk.yeshouatv.com/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error("Erreur logout :", error)
    } finally {
      setUser(null)
      setToken(null)
      removeUserFromLocal()
      localStorage.removeItem("token")
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
    loading,
    sendPasswordResetAndVerifyCode,
    resetPassword
    
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
