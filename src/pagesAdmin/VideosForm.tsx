"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, CheckCircle } from "lucide-react"
import type { IVideo } from "@/interfaces/Videos"
import { SelecteurVideo } from "./VideoSelector"
import type { IProgramme } from "@/interfaces/Programme"
import { ImageSelector } from "./ImageSelector"


interface VideoFormProps {
  onClose: () => void
  onRefresh: () => void
  video?: IVideo | null
}

export function VideoForm({ onClose, video }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    duration: video?.duration || "",
    thumbnail: video?.couverture || "",
    programme_id: video?.programme_id || ""
  })

   const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
   const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSuccess, setIsSuccess] = useState(false)
   const [programmes, setProgrammes] = useState<IProgramme[]>([])
   const [error, setError] = useState<string | null>(null)
       
     
      const fetchProgrammes = async () => {
         try {
           const token = localStorage.getItem("token")
           const res = await fetch("https://api.yeshouatv.com/api/list_programmes", {
             method: "GET",
             headers: { Authorization: `Bearer ${token}` }
           })
     
           if (!res.ok) {
             const errorText = await res.text()
             console.error("Erreur API:", errorText)
             throw new Error("Erreur lors du chargement des programmes")
           }
     
           const result = await res.json()
     
           if (!Array.isArray(result.data)) {
             throw new Error("La réponse API ne contient pas un tableau de programmes.")
           }
     
           const programmesWithArrayWhen = result.data.map((prog: any) => ({
             ...prog,
             when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
           }))
     
           setProgrammes(programmesWithArrayWhen)
         } catch (error) {
           setError("Erreur lors du chargement des programmes")
           console.error("Erreur Api: ", error)
         }
       }
     
       // Appel initial
       useEffect(() => {
         fetchProgrammes()
     
       const interval = setInterval(() => {
         fetchProgrammes() // refetch every 5 sec
         }, 5000)
     
         return() => clearInterval(interval)
     
       }, [])

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setError(null)

  const token = localStorage.getItem("token")

  // Prépare FormData de base (sans status ici)
  const buildFormData = (status: "published" | "draft") => {
    const form = new FormData()
    form.append("title", formData.title || "")
    form.append("description", formData.description || "")
    form.append("duration", formData.duration || "")
    form.append("programme_id", formData.programme_id)
    form.append("status", status)

    if (selectedImageFile) form.append("couverture", selectedImageFile)
    if (selectedVideoFile) form.append("video_url", selectedVideoFile)

    return form
  }

  const url = video?.id
    ? `https://api.yeshouatv.com/api/update_video/${video.id}`
    : "https://api.yeshouatv.com/api/add_video"

  try {
    // 🟢 Tentative de publication avec "published"
    let form = buildFormData("published")
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })

    const resText = await response.text()
    console.log("Réponse brute :", resText)

    if (!response.ok) {
      console.warn("Erreur lors de la publication. Tentative de sauvegarde en brouillon...")

      // 🔁 Rebuild form avec "draft"
      form = buildFormData("draft")

      response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
        body: form,
      })

      const retryText = await response.text()
      console.log("Réponse tentative brouillon :", retryText)

      if (!response.ok) {
        throw new Error(`Erreur API après tentative en draft: ${retryText}`)
      }
    }

    setIsSuccess(true)
    setTimeout(() => onClose(), 3000)
    console.log(response);
    
  } catch (err) {
    console.error("Erreur lors de l'envoi:", err)
    setError("Impossible de publier la vidéo. Merci de réessayer.")
    setIsSubmitting(false)
  }
}


    if (isSuccess) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold text-green-700">Vidéo postée avec succès !</h3>
            <p className="text-gray-600">Votre vidéo "{formData.title}" a été ajoutée.</p>
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
        <CardTitle>{video ? "Modifier la vidéo" : "Ajouter une nouvelle vidéo"}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la vidéo</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Entrez le titre..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Programme</Label>
              <Select
                value={formData.programme_id}
                onValueChange={(value) => setFormData({ ...formData, programme_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une emistion" />
                </SelectTrigger>
                <SelectContent>
                  {programmes.map((emission) => {
                    const emissionNorm: IProgramme ={...emission,
                      when: Array.isArray(emission.when) ? emission.when : [emission.when],
                    }
                    return (
                      <SelectItem key={emissionNorm.id} value={emissionNorm.id}>
                        {emissionNorm.nom}
                      </SelectItem>
                    );
                  })}
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
              placeholder="Description de la vidéo..."
              rows={3}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (mm:ss)</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="ex: 15:30"
              />
            </div>
          
            <div className="space-y-2">
              <Label>Fichier vidéo</Label>
              <SelecteurVideo onVideoSelect={setSelectedVideoFile} selectedFile={selectedVideoFile} />
            </div>

            <div className="space-y-2">
              <Label>Fichier image(pour la cover)</Label>
              <ImageSelector onImageSelect={setSelectedImageFile} selectedFile={selectedImageFile} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} >{isSubmitting ? "Publication..." : video ? "Mettre à jour" : "Ajouter la vidéo"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
