"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MapPin, Phone, User, MessageSquare, LoaderCircle} from "lucide-react"
import { Skeleton } from "../ui/skeleton"


export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
     // Vérification des champs requis
  if (
    !formData.name.trim() ||
    !formData.email.trim() ||
    !formData.gender.trim() ||
    !formData.subject.trim() ||
    !formData.message.trim() 
  ) {
    alert("Veuillez remplir tous les champs requis avant de soumettre le formulaire.")
    return
  }

   setIsSending(true)
   setSuccessMessage("")

    try {
    const response = await fetch("https://chunk.yeshouatv.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erreur backend:", errorText)
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.")
      return
    }

    // Succès
    setSuccessMessage("Votre message a été envoyé avec succès ✅")

    // Réinitialiser le formulaire
    setFormData({
      name: "",
      email: "",
      gender: "",
      subject: "",
      message: "",
    })
  } catch (error) {
    console.error("Erreur envoi:", error)
    alert("Une erreur réseau est survenue ❌")
  } finally {
    setIsSending(false)
  }

  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    const timer = setTimeout(()=> setLoading(false), 2000)
    return () => clearTimeout(timer)
  })


  if (loading) return (
     <div className="h-full text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton className="h-10 md:h-12 w-60 mx-auto mb-4" />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        {/* Form Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>

          {/* Right Column - Message */}
          <div>
            <Skeleton className="h-[300px] lg:h-[400px] w-full rounded-lg" />
          </div>
        </div>

        {/* Footer - Submit and Terms */}
        <div className="flex mt-8 flex-col items-center space-y-6 md:flex-row md:justify-between md:items-center gap-4">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contactez-nous</h1>
        </div>

        {/* Contact Info */}
        <div className="grid justify-self-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">ADRESSE BUREAU</h3>
              <p className="text-gray-300">Abidjan, Marcory</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">E-MAIL</h3>
              <a href="mailto:contacts@yeshouatv.com" className="text-gray-300 hover:underline focus:outline-none">
                <p className="text-gray-300">contacts@yeshouatv.com</p>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">APPELEZ-NOUS</h3>
              <a href="tel:+2252731957520" className="text-gray-300 hover:underline focus:outline-none">
                <p className="text-gray-300">+225 2731957520</p>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm">
                  <User className="w-5 h-5 text-gray-400" />
                  <Input
                    id="fullName"
                    aria-label="Nom et Prénoms"
                    placeholder="Nom et Prénoms*"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <Input
                    id="Useremail"
                    aria-label="email"
                    type="email"
                    placeholder="Adresse électronique*"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <Select onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger aria-label="gender" id="gender" className="bg-transparent border-none text-white focus:ring-0 focus:outline-none">
                      <SelectValue placeholder="Sexe*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homme">Homme</SelectItem>
                      <SelectItem value="femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>


              {/* Subject Field */}
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <Input
                    id="sujet"
                    aria-label="sujet"
                    placeholder="Sujet*"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Message */}
            <div className="space-y-6">
              <div className="relative h-full">
                <div className="p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm h-full min-h-[300px] lg:min-h-[400px]">
                  <Textarea
                    id="textarea"
                    aria-label="textarea"
                    placeholder="Écrire votre message ici...*"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="bg-transparent border-none text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none resize-none h-full"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="flex mt-8 flex-col items-center space-y-6 md:flex-row md:justify-between md:items-center gap-4">
            <p className="text-sm text-gray-400 max-w-2xl">
              En soumettant ce formulaire, vous reconnaissez avoir pris connaissance des Conditions Générales
              d'Utilisation et vous les acceptez.
            </p>

            <div className="flex">
              <Button
                type="submit"
                disabled={isSending}
                className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                 {isSending ? (
                    <>
                      <LoaderCircle className="animate-spin w-4 h-4" />
                      <span>Envoi...</span>
                    </>
                      ) : (
                        "Envoyer"
                  )}
              </Button>
            </div>
          </div>
        </form>

        {successMessage && (
          <div className="mt-6 p-4 rounded-lg bg-green-600 text-white text-center font-medium shadow">
            {successMessage}
          </div>
        )}

      </div>
    </div>
  )
}
