"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, Search, Filter } from "lucide-react"
import type { IArticle } from "@/interfaces/Articles"
import { articles } from "@/utilitaires/ArticleData"


interface ArticleTableProps {
  onEdit?: (article: IArticle) => void
}

export function ArticleTable({ onEdit }: ArticleTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")



  const categories = ["Actualités", "Sport", "Culture", "Technologie", "Divertissement"]
  const statuses = [
    { value: "all", label: "Tous" },
    { value: "publié", label: "Publié" },
    { value: "brouillon", label: "Brouillon" },
    { value: "supprimé", label: "Supprimé" },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-gray-100 text-gray-800",
      scheduled: "bg-yellow-100 text-yellow-800",
    }
    const labels = {
      published: "Publié",
      draft: "Brouillon",
      scheduled: "Supprimé",
    }

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      // Ici vous intégrerez avec votre API Laravel
      console.log("Delete article:", id)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Article
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vues</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredArticles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {article.featured_image && (
                      <img
                        src={article.featured_image || "/placeholder.svg"}
                        alt={article.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{article.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{getStatusBadge(article.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.views.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(article.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit?.(article)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun article trouvé</p>
        </div>
      )}
    </div>
  )
}
