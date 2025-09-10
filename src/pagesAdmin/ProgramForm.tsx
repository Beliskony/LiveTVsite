"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, X } from "lucide-react"
import { ImageSelector } from "./ImageSelector"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/auth-context"

interface ProgramFormProps {
  onClose: () => void
  onRefresh: () => void
  program?: {
    id: string
    nom: string
    description: string
    when: string
    starting: string
    ending: string
    genre: string
    couverture: string
  }


}

export function ProgramForm({ onClose, program, onRefresh }: ProgramFormProps) {
  // Initialise day from program.when CSV string or empty array
const initialDays = Array.isArray(program?.when) ? program.when : (program?.when?.split(",") ?? [])


  const [formData, setFormData] = useState({
    title: program?.nom || "",
    description: program?.description || "",
    day: initialDays,
    startTime: program?.starting || "",
    endTime: program?.ending || "",
    type: program?.genre || "",
  })

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { user } = useAuth()
  const token = localStorage.getItem("token")

  const days = [
    { value: "lundi", label: "lundi" },
    { value: "mardi", label: "mardi" },
    { value: "mercredi", label: "mercredi" },
    { value: "jeudi", label: "jeudi" },
    { value: "vendredi", label: "vendredi" },
    { value: "samedi", label: "samedi" },
    { value: "dimanche", label: "dimanche" },
  ]

  useEffect(() => {
  if (program) {
    const parsedDays = Array.isArray(program.when)
      ? program.when
      : program.when?.split(",").map((d) => d.trim().toLowerCase()) || []

    setFormData({
      title: program.nom || "",
      description: program.description || "",
      day: parsedDays,
      startTime: program.starting || "",
      endTime: program.ending || "",
      type: program.genre || "",
    })
  }
}, [program])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    

    try {
      const payload = new FormData()
      payload.append("nom", formData.title)
      payload.append("description", formData.description)
      payload.append("starting", formData.startTime)
      payload.append("ending", formData.endTime)
      payload.append("when", formData.day.join(","))
      payload.append("genre", formData.type)

      if (selectedImageFile) payload.append("couverture", selectedImageFile)

      // Choix de l'URL et méthode selon création ou modification
      const url = program?.id
        ? `https://api.yeshouatv.com/api/update_programme/${program.id}`
        : "https://api.yeshouatv.com/api/add_programme"
      const method = "POST"

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
          // Ne pas définir 'Content-Type' avec FormData, le navigateur le gère
        },
        body: payload,
      })

     const responseText = await response.text()

console.log("Status:", response.status)
console.log("Response body:", responseText)

// Vérifie si la réponse est HTML => probable erreur 500 avec page d'erreur
const isHtml = responseText.trim().startsWith("<!DOCTYPE html>")
const isOk = response.ok

if (!isOk || isHtml) {
  console.error("Échec de la requête ou réponse non attendue")
  alert("Le serveur a rencontré une erreur. Veuillez réessayer plus tard.")
  return // on ne fait rien d’autre
}

setIsSuccess(true)
onRefresh()

    } catch (error) {
      console.error(error)
      alert("Une erreur est survenue lors de l'envoi du formulaire.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="mb-6 p-4">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold text-green-700">Programme enregistré !</h3>
            <p className="text-gray-600">Le programme "{formData.title}" a été {program ? "modifié" : "ajouté"}.</p>
            <Button onClick={onClose} className="mt-4">
              Fermer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6 p-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{program ? "Modifier le programme" : "Ajouter un nouveau programme"}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du programme</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Entrez le titre..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type de programme</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sport">Sport</SelectItem>
                  <SelectItem value="divertissement">Divertissement</SelectItem>
                  <SelectItem value="religion">Religion</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description du programme..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="days">Jours</Label>
              <Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-full justify-start text-left">
      {formData.day.length > 0
        ? formData.day
            .map((d) => d.charAt(0).toUpperCase() + d.slice(1)) // capitalise
            .join(", ")
        : "Sélectionnez des jours"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 bg-white shadow z-50">
    <div className="space-y-2 p-2">
      {days.map((day) => (
        <div key={day.value} className="flex items-center space-x-2">
          <Checkbox
            id={day.value}
            checked={formData.day.includes(day.value)}
            onCheckedChange={(checked) => {
              setFormData((prev) => {
                const updatedDays = checked
                  ? [...prev.day, day.value]
                  : prev.day.filter((d) => d !== day.value)
                return { ...prev, day: updatedDays }
              })
            }}
          />
          <Label htmlFor={day.value}>{day.label.charAt(0).toUpperCase() + day.label.slice(1)}</Label>
        </div>
      ))}
    </div>
  </PopoverContent>
</Popover>

            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">Heure de début</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure de fin</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Image de couverture</Label>
            <ImageSelector onImageSelect={setSelectedImageFile} selectedFile={selectedImageFile} />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (program ? "Modification en cours..." : "Envoi en cours...") : program ? "Modifier le programme" : "Ajouter le programme"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
