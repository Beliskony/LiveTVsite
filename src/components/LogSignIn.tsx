"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "./auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LogSignIn({ isOpen, onClose }: AuthModalProps) {
  const { login, register, loading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let success = false

      if (isLogin) {
        success = await login(formData.email, formData.password)
      } else {
        success = await register(formData.email, formData.password, formData.fullName)
      }

      if (success) {
        setFormData({ fullName: "", email: "", password: "" })
        onClose()
      }
    } catch (error) {
      console.error("Authentication error:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
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
      <Card className="relative w-full max-w-md bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 z-10"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>

        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-center text-slate-800 font-[family-name:var(--font-heading)]">
            {isLogin ? "Bienvenue de Retour" : "Créez Votre Compte"}
          </CardTitle>
          <CardDescription className="text-center text-slate-600">
            {isLogin
              ? "Connectez-vous à votre compte pour continuer"
              : "Rejoignez-nous et découvrez toutes nos fonctionnalités"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                  Nom complet
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Adresse e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="h-11 pr-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gray-900 hover:bg-sky-500 text-white font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Connexion..." : "Création..."}
                </>
              ) : isLogin ? (
                "Se connecter"
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>

          {!isLogin && (
            <p className="text-xs text-slate-500 text-center leading-relaxed">
              En créant un compte, vous acceptez nos{" "}
              <button className="text-blue-600 hover:text-sky-500 transition-colors duration-200">
                conditions d'utilisation
              </button>{" "}
              et notre{" "}
              <button className="text-blue-600 hover:text-sky-500 transition-colors duration-200">
                politique de confidentialité
              </button>
              .
            </p>
          )}

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-200 cursor-pointer"
            >
              {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
