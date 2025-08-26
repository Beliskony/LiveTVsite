"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, CheckCircle } from "lucide-react"
import type { IVideo } from "@/interfaces/Videos"
import { SelecteurVideo } from "./VideoSelector"
import { programmeData } from "@/data/programmeData"
import type { IProgramme } from "@/interfaces/Programme"
import { ImageSelector } from "./ImageSelector"


interface VideoFormProps {
  onClose: () => void
  video?: IVideo | null
}

export function VideoForm({ onClose, video }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    duration: video?.duration || "",
    thumbnail: video?.couverture || "",
    programmeId: video?.programmeId || ""
  })

   const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null)
   const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true) 

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const form = new FormData()
        form.append("title", formData.title || "");
        form.append("description", formData.description || "");
        form.append("duration", formData.duration || "");
        form.append("emissionId", formData.programmeId);
          if (selectedImageFile) form.append("couverture", selectedImageFile);
          if (selectedVideoFile) form.append("videoFile", selectedVideoFile);

      const response = await fetch("https://api.yeshouatv.com/api/videos", {
        method: video ? "PUT" : "POST",
        body: form,
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");

      setIsSubmitting(false)
      setIsSuccess(true)

      setTimeout(() => {onClose()}, 3000)
    } catch (error) {
      setIsSubmitting(false)
      console.error("Erreur lors de l'envoi:", error)
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
                value={formData.programmeId}
                onValueChange={(value) => setFormData({ ...formData, programmeId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une emistion" />
                </SelectTrigger>
                <SelectContent>
                  {programmeData.map((emission) => {
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
