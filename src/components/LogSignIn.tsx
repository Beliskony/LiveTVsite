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
  {/* sendPasswordReset, verifyResetCode, resetPassword */}
  const { login, register, loading } = useAuth()

  const [view, setView] = useState<"login" | "register" | "resetEmail" | "verifyOtp" | "newPassword">("login")
  const [showPassword, setShowPassword] = useState(false)

  // erreurs
  const [errors, setErrors] = useState<{ email?: string; password?: string; otp?: string; global?: string }>({})

  // state global
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    newPassword: "",
  })

  if (!isOpen) return null

  const validateForm = () => {
    let newErrors: typeof errors = {}
    if ((view === "login" || view === "register" || view === "resetEmail") && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Adresse email invalide."
    }
    if ((view === "login" || view === "register") && formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères."
    }
    if (view === "newPassword" && formData.newPassword.length < 6) {
      newErrors.password = "Le nouveau mot de passe doit contenir au moins 6 caractères."
    }
    if (view === "verifyOtp" && formData.otp.trim().length !== 6) {
      newErrors.otp = "Le code OTP doit contenir 6 chiffres."
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
        const user = await login(formData.email, formData.password)
        if (!user) throw new Error("Email ou mot de passe incorrect.")
        onClose()
      } else if (view === "register") {
        const user = await register(formData.name, formData.email, formData.password)
        if (!user) throw new Error("Erreur lors de la création du compte.")
        onClose()
      } {/*  else if (view === "resetEmail") {
        const success = await sendPasswordReset(formData.email)
        if (!success) throw new Error("Impossible d'envoyer le mail de réinitialisation.")
        setView("verifyOtp")
      } else if (view === "verifyOtp") {
        const success = await verifyResetCode(formData.email, formData.otp)
        if (!success) throw new Error("Code OTP invalide.")
        setView("newPassword")
      } else if (view === "newPassword") {
        const success = await resetPassword(formData.email, formData.newPassword)
        if (!success) throw new Error("Impossible de réinitialiser le mot de passe.")
        setView("login")
      } */}
    } catch (err: any) {
      setErrors({ global: err?.message || "Une erreur inattendue est survenue." })
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <Card className="relative p-4 w-full max-w-md bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close button */}
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
              : view === "verifyOtp"
              ? "Vérification du Code"
              : "Nouveau Mot de Passe"}
          </CardTitle>
          <CardDescription className="text-center text-slate-600">
            {view === "login"
              ? "Connectez-vous à votre compte pour continuer"
              : view === "register"
              ? "Rejoignez-nous et découvrez toutes nos fonctionnalités"
              : view === "resetEmail"
              ? "Entrez votre adresse e-mail pour recevoir un code OTP"
              : view === "verifyOtp"
              ? "Saisissez le code OTP reçu par e-mail"
              : "Définissez votre nouveau mot de passe"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {errors.global && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center"
            >
              {errors.global}
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === "register" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required={view === "register"}
                />
              </div>
            )}

            {(view === "login" || view === "register" || view === "resetEmail") && (
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
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

            {(view === "login" || view === "register") && (
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
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

            {view === "verifyOtp" && (
              <div className="space-y-2">
                <Label htmlFor="otp">Code OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="6 chiffres"
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => handleInputChange("otp", e.target.value)}
                  required
                />
                {errors.otp && <p className="text-red-500 text-xs">{errors.otp}</p>}
              </div>
            )}

            {view === "newPassword" && (
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
            )}

            {view === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setView("resetEmail")}
                  className="text-sm text-blue-600 hover:text-gray-900"
                >
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
                    : view === "verifyOtp"
                    ? "Vérification..."
                    : "Réinitialisation..."}
                </>
              ) : view === "login" ? (
                "Se connecter"
              ) : view === "register" ? (
                "S'inscrire"
              ) : view === "resetEmail" ? (
                "Envoyer le code"
              ) : view === "verifyOtp" ? (
                "Vérifier le code"
              ) : (
                "Réinitialiser"
              )}
            </Button>
          </form>

          {view === "register" && (
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de
              confidentialité.
            </p>
          )}

          <div className="text-center">
            {view === "login" && (
              <button
                onClick={() => setView("register")}
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                Pas encore de compte ? S'inscrire
              </button>
            )}
            {view === "register" && (
              <button
                onClick={() => setView("login")}
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                Déjà un compte ? Se connecter
              </button>
            )}
            {(view === "resetEmail" || view === "verifyOtp" || view === "newPassword") && (
              <button
                onClick={() => setView("login")}
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                Retour à la connexion
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
