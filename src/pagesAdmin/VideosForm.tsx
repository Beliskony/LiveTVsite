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

export function VideoForm({ onClose, onRefresh, video }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    duration: video?.duration || "",
    thumbnail: video?.couverture || "",
    programme_id: video?.programme_id?.toString() || "" // 👈 toujours en string
  })

  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
   const [uploadProgress, setUploadProgress] = useState(0)
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchProgrammes = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token manquant")

      const res = await fetch("https://api.yeshouatv.com/api/list_programmes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, // ✅ backticks
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

  useEffect(() => {
    fetchProgrammes()
    const interval = setInterval(() => {
      fetchProgrammes()
    }, 10000) //10s
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token manquant")
      if (!selectedVideoFile) throw new Error("Veuillez sélectionner un fichier vidéo.")

      const uploadId = Date.now().toString() // identifiant unique
      const url = video?.id
        ? `https://chunk.yeshouatv.com/api/update_video/${video.id}`
        : "https://chunk.yeshouatv.com/api/add_video"

      const chunkSize = 5 * 1024 * 1024 // 5 Mo
      const totalChunks = Math.ceil(selectedVideoFile.size / chunkSize)

      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize
        const end = Math.min(start + chunkSize, selectedVideoFile.size)
        const chunk = selectedVideoFile.slice(start, end)

        const chunkForm = new FormData()
        chunkForm.append("upload_id", uploadId)
        chunkForm.append("chunk_index", i.toString())
        chunkForm.append("total_chunks", totalChunks.toString())
        chunkForm.append("video_chunk", chunk)

        // ✅ Métadonnées uniquement au premier chunk
        if (i === 0) {
          chunkForm.append("title", formData.title)
          chunkForm.append("description", formData.description)
          chunkForm.append("duration", formData.duration)
          chunkForm.append("programme_id", formData.programme_id.toString())
          chunkForm.append("status", "published")
          if (selectedImageFile) {
            chunkForm.append("couverture", selectedImageFile)
          }
        }

        const chunkResponse = await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }, // ✅ corrigé
          body: chunkForm,
        })

        if (!chunkResponse.ok) {
          const errTxt = await chunkResponse.text()
          throw new Error(`Erreur à l’envoi du chunk ${i + 1}/${totalChunks}: ${errTxt}`)
        }
        
          setUploadProgress(Math.round(((i + 1) / totalChunks) * 100))
        
      }

      setIsSuccess(true)
      onRefresh() // ✅ rafraîchir la liste après succès
      setTimeout(() => onClose(), 3000)
    } catch (err: any) {
      console.error("Erreur lors de l’envoi:", err)
      setError(err.message || "Impossible de publier la vidéo. Merci de réessayer.")
    } finally {
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
        {isSubmitting && (
        <div className="py-5">
          <div className="w-full bg-gray-200 h-3 rounded mb-4">
            <div className="h-3 bg-green-500 rounded" style={{ width: `${uploadProgress}%` }} />
            <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
          </div>
        </div>
        )}
        
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
                  <SelectValue placeholder="Sélectionnez une émission" />
                </SelectTrigger>
                <SelectContent>
                  {programmes.map((emission) => {
                    const emissionNorm: IProgramme = {
                      ...emission,
                      when: Array.isArray(emission.when) ? emission.when : [emission.when],
                    }
                    return (
                      <SelectItem key={emissionNorm.id} value={emissionNorm.id.toString()}>
                        {emissionNorm.nom}
                      </SelectItem>
                    )
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
          {!video && (
            <div className="space-y-2">
              <Label>Fichier vidéo</Label>
              <SelecteurVideo onVideoSelect={setSelectedVideoFile} selectedFile={selectedVideoFile} />
            </div>
          )}

            <div className="space-y-2">
              <Label>Fichier image (pour la cover)</Label>
              <ImageSelector onImageSelect={setSelectedImageFile} selectedFile={selectedImageFile} />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publication..." : video ? "Mettre à jour" : "Ajouter la vidéo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
