"use client"

import type React from "react"

import { useState } from "react"
import { X, Save, Eye } from "lucide-react"

interface ArticleFormProps {
  onClose: () => void
  article?: {
    id: number
    title: string
    content: string
    excerpt: string
    author: string
    category: string
    status: string
    featured_image?: string
    tags: string[]
  }
}

export function ArticleForm({ onClose, article }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    author: article?.author || "",
    category: article?.category || "",
    status: article?.status || "draft",
    featured_image: article?.featured_image || "",
    tags: article?.tags?.join(", ") || "",
  })

  const [isPreview, setIsPreview] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici vous intégrerez avec votre API Laravel
    console.log("Article data:", {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
    onClose()
  }

  const categories = ["Actualités", "Sport", "Culture", "Technologie", "Divertissement"]
  const statuses = [
    { value: "brouillon", label: "Brouillon" },
    { value: "publié", label: "Publié" },
    { value: "supprimé", label: "Supprimé" },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
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
                <label className="text-sm font-medium text-gray-700">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Image à la une</label>
                <input
                  type="url"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="URL de l'image"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Extrait</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Résumé de l'article..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Contenu</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={12}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contenu de l'article..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tag1, tag2, tag3..."
              />
              <p className="text-xs text-gray-500">Séparez les tags par des virgules</p>
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
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    formData.status === "published"
                      ? "bg-green-100 text-green-800"
                      : formData.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statuses.find((s) => s.value === formData.status)?.label}
                </span>
              </div>
              {formData.excerpt && <p className="text-lg text-gray-600 italic mb-6">{formData.excerpt}</p>}
              <div className="whitespace-pre-wrap">{formData.content || "Contenu de l'article..."}</div>
              {formData.tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                </div>
              )}
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
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            {article ? "Mettre à jour" : "Publier"}
          </button>
        </div>
      </form>
    </div>
  )
}
