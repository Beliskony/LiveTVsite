"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Mail, MapPin, Phone, User, MessageSquare, CalendarCheck, CalendarCheck2 } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function ContactPage() {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...formData, birthDate: date })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Contactez-nous</h1>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">ADRESSE BUREAU</h3>
              <p className="text-gray-300">Abidjan</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">E-MAIL</h3>
              <p className="text-gray-300">infos@yeshouatv.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">APPELEZ-NOUS</h3>
              <p className="text-gray-300">+225 00 00 00 00 00</p>
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
                    <SelectTrigger className="bg-transparent border-none text-white focus:ring-0 focus:outline-none">
                      <SelectValue placeholder="Sexe*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homme">Homme</SelectItem>
                      <SelectItem value="femme">Femme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Birth Date Field */}
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm">
                  <CalendarCheck2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal bg-transparent border-none text-white hover:bg-transparent focus:ring-0"
                      >
                        {date ? (
                          format(date, "PPP", { locale: fr })
                        ) : (
                          <span className="text-gray-400">Sélectionnez une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Subject Field */}
              <div className="relative">
                <div className="flex items-center space-x-3 p-4 bg-white/5 border border-white/20 rounded-lg backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <Input
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
          <div className="mt-8 space-y-6">
            <p className="text-sm text-gray-400 max-w-2xl">
              En soumettant ce formulaire, vous reconnaissez avoir pris connaissance des Conditions Générales
              d'Utilisation et vous les acceptez.
            </p>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
