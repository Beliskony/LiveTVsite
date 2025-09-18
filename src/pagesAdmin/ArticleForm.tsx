"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Save, Eye, CheckCircle, LoaderCircle } from "lucide-react"
import type { IArticle } from "@/interfaces/Articles"
import { ImageSelector } from "./ImageSelector"

interface ArticleFormProps {
  onClose: () => void
  onRefresh:() => void
  article?: IArticle
}

export function ArticleForm({ onClose, article, onRefresh }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.contenu || "",
    author: article?.author || "",
    category: article?.category || "",
    status: article?.status || "suprimé",
    featured_image: article?.feature_image || "",
  })

  // Synchroniser formData avec article en édition
useEffect(() => {
  if (article) {
    setFormData({
      title: article.title || "",
      content: article.contenu || "",
      author: article.author || "",
      category: article.category || "",
      status: article.status || "supprimé",
      featured_image: article.feature_image || "",
    })
  } else {
    // Si aucun article, on reset le formulaire (utile après fermeture ou ajout)
    setFormData({
      title: "",
      content: "",
      author: "",
      category: "",
      status: "supprimé",
      featured_image: "",
    })
  }
}, [article])


  const [isPreview, setIsPreview] = useState(false)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Ici vous intégrerez avec votre API Laravel
  const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("contenu", formData.content)
      payload.append("author", formData.author)
      payload.append("category", formData.category)
      payload.append("status", formData.status)
      if (selectedImageFile) payload.append("feature_image", selectedImageFile)

   try {
    const url =  article ? `https://chunk.yeshouatv.com/api/update_article/${article.id}` : "https://chunk.yeshouatv.com/api/add_article"

     const response = await fetch(url, {
      method: "POST",
      headers: {Authorization: `Bearer ${token ?? ""}`,},
      body: payload,
     })
      const text = await response.text()
      console.log("Status:", response.status)
      console.log("Response body:", text)

      if (!response.ok) throw new Error("Erreur lors de l'envoi")

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
      <div className="bg-white rounded-lg shadow-md p-6  my-4 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-700">Article publié avec succès !</h3>
        <p className="text-gray-600">"{formData.title}" a été ajouté/modifié.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md">
          Fermer
        </button>
      </div>
    )
  }


  const categories = ["Actualités", "Sport", "Culture", "Technologie", "Divertissement"]
 

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm my-6">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">{article ? "Modifier l'article" : "Nouvel article"}</h3>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <Eye className="h-4 w-4" />
            {isPreview ? "Éditer" : "Aperçu"}
          </button>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {!isPreview ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Auteur</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image à la une</label>
                <ImageSelector onImageSelect={setSelectedImageFile} selectedFile={selectedImageFile} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contenu</label>
              <textarea
                value={formData.content}
                rows={50}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contenu de l'article..."
                required
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="prose max-w-none">
              {formData.featured_image && (
                <img
                  src={formData.featured_image || "/placeholder.svg"}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold mb-2">{formData.title || "Titre de l'article"}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>Par {formData.author || "Auteur"}</span>
                <span>•</span>
                <span>{formData.category || "Catégorie"}</span>
                <span>•</span>
                
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md transition-colors"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin w-4 h-4" />
              </>
              ) : (
              <>
                <Save className="h-4 w-4" />
                {article ? "Mettre à jour" : "Publier"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
