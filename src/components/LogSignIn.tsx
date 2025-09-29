"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Eye, EyeOff, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "./auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LogSignIn({ isOpen, onClose }: AuthModalProps) {
  const { login, register, sendPasswordResetAndVerifyCode, resetPassword, loading } = useAuth()

  const [view, setView] = useState<"login" | "register" | "resetEmail" | "resetPassword">("login")
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState<{ login?: string; email?: string; phoneNumber?: string; password?: string; OTP?: string; global?: string }>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    login: "",
    phoneNumber: "",
    password: "",
    OTP: "",
    newPassword: "",
  })

  if (!isOpen) return null

  const validateForm = () => {
    let newErrors: typeof errors = {}
    if ((view === "register" || view === "resetEmail" || view === "resetPassword") 
        && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide."
    }
    if (view === "register" && !/^\d{8,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Numéro de téléphone invalide."
    }
    if ((view === "login" || view === "register") && formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères."
    }
    if (view === "resetPassword") {
      if (formData.OTP.trim().length !== 4) {
        newErrors.OTP = "Le code OTP doit contenir 4 chiffres."
      }
      if (formData.newPassword.length < 6) {
        newErrors.password = "Le nouveau mot de passe doit contenir au moins 6 caractères."
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    if (!validateForm()) return

    try {
      if (view === "login") {
        const user = await login(formData.login, formData.password)
        if (!user) throw new Error("Email ou mot de passe incorrect.")
        onClose()
      } else if (view === "register") {
        const user = await register(formData.name, formData.email, formData.phoneNumber, formData.password)
        if (!user) throw new Error("Erreur lors de la création du compte.")
        onClose()
      } else if (view === "resetEmail") {
        const success = await sendPasswordResetAndVerifyCode(formData.email)
        if (!success) throw new Error("Impossible d'envoyer le mail de réinitialisation.")
        setView("resetPassword")
      } else if (view === "resetPassword") {
        const success = await resetPassword(formData.email, formData.OTP, formData.newPassword)
        if (!success) throw new Error("Impossible de réinitialiser le mot de passe.")
        setView("login")
      }
    } catch (err: any) {
      setErrors({ global: err?.message || "Une erreur inattendue est survenue." })
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <Card className="relative p-4 w-full max-w-md bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 z-10"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>

        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            {view === "login"
              ? "Bienvenue de Retour"
              : view === "register"
              ? "Créez Votre Compte"
              : view === "resetEmail"
              ? "Mot de Passe Oublié"
              : "Réinitialisation du Mot de Passe"}
          </CardTitle>
          <CardDescription className="text-center text-slate-600">
            {view === "login"
              ? "Connectez-vous à votre compte pour continuer"
              : view === "register"
              ? "Rejoignez-nous et découvrez toutes nos fonctionnalités"
              : view === "resetEmail"
              ? "Entrez votre adresse e-mail pour recevoir un code OTP"
              : "Entrez le code OTP reçu, votre email et votre nouveau mot de passe"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {errors.global && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm text-center">
              {errors.global}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === "register" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom & Prénom<span className="font-bold text-sm text-red-600 items-center justify-center">*</span></Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
            )}

            {(view === "login") &&(
              <div className="space-y-2">
                <Label htmlFor="login">Email ou téléphone<span className="font-bold text-sm text-red-600 items-center justify-center">*</span></Label>
                <Input
                  id="identifiant"
                  type="text"
                  placeholder="mail ou téléphone"
                  value={formData.login}
                  onChange={(e) => handleInputChange("login", e.target.value)}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
            )}

            {(view === "register" || view === "resetEmail" || view === "resetPassword") && (
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail<span className="font-bold text-sm text-red-600 items-center justify-center">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
            )}

            {view === "register" && (
              <div className="space-y-2">

                <Label htmlFor="phoneNumber">Numéro de téléphone<span className="font-bold text-sm text-red-600 items-center justify-center">*</span></Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="0709569876"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
              </div>
            )}

            {(view === "login" || view === "register") && (
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe<span className="font-bold text-sm text-red-600 items-center justify-center">*</span></Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
            )}

            {view === "resetPassword" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="OTP">Code OTP</Label>
                  <Input
                    id="OTP"
                    type="text"
                    placeholder="4 chiffres"
                    maxLength={4}
                    value={formData.OTP}
                    onChange={(e) => handleInputChange("OTP", e.target.value)}
                    required
                  />
                  {errors.OTP && <p className="text-red-500 text-xs">{errors.OTP}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>
              </>
            )}

            {view === "login" && (
              <div className="text-right">
                <button type="button" onClick={() => setView("resetEmail")} className="text-sm text-blue-600 hover:text-gray-900">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gray-900 hover:bg-sky-500 text-white font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {view === "login"
                    ? "Connexion..."
                    : view === "register"
                    ? "Création..."
                    : view === "resetEmail"
                    ? "Envoi..."
                    : "Réinitialisation..."}
                </>
              ) : view === "login" ? (
                "Se connecter"
              ) : view === "register" ? (
                "S'inscrire"
              ) : view === "resetEmail" ? (
                "Envoyer le code"
              ) : (
                "Réinitialiser"
              )}
            </Button>
          </form>

          <div className="text-center">
            {view === "login" && (
              <button onClick={() => setView("register")} className="text-sm text-slate-600 hover:text-slate-800">
                Pas encore de compte ? S'inscrire
              </button>
            )}
            {view === "register" && (
              <button onClick={() => setView("login")} className="text-sm text-slate-600 hover:text-slate-800">
                Déjà un compte ? Se connecter
              </button>
            )}
            {(view === "resetEmail" || view === "resetPassword") && (
              <button onClick={() => setView("login")} className="text-sm text-slate-600 hover:text-slate-800">
                Retour à la connexion
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
