"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Upload } from "lucide-react"

interface VideoFormProps {
  onClose: () => void
  video?: {
    id: string
    title: string
    description: string
    category: string
    duration: string
    thumbnail: string
  }
}

export function VideoForm({ onClose, video }: VideoFormProps) {
  const [formData, setFormData] = useState({
    title: video?.title || "",
    description: video?.description || "",
    category: video?.category || "",
    duration: video?.duration || "",
    thumbnail: video?.thumbnail || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous intégrerez avec votre API Laravel
    console.log("Données du formulaire:", formData)
    onClose()
  }

  return (
    <Card className="mb-6">
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
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">Actualités</SelectItem>
                  <SelectItem value="entertainment">Divertissement</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="documentary">Documentaire</SelectItem>
                  <SelectItem value="music">Musique</SelectItem>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Glissez votre fichier ici ou cliquez pour sélectionner</p>
                <Input type="file" accept="video/*" className="hidden" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">{video ? "Mettre à jour" : "Ajouter la vidéo"}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
