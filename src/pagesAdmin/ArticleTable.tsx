"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, Search, Filter } from "lucide-react"
import type { IArticle } from "@/interfaces/Articles"
import { articleData } from "@/data/articlesData"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"

interface ArticleTableProps {
  onEdit?: (article: IArticle) => void
}

export function ArticleTable({ onEdit }: ArticleTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const categories = ["Actualités", "Sport", "Culture", "Technologie", "Divertissement"]
  const statuses = [
    { value: "all", label: "Tous" },
    { value: "publié", label: "Publié" },
    { value: "brouillon", label: "Brouillon" },
    { value: "supprimé", label: "Supprimé" },
  ]

  const filteredArticles = articleData.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  //pagination
  const totalItems = filteredArticles.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "default",
      draft: "secondary",
      scheduled: "destructive",
    } as const

    const labels = {
      published: "Publié",
      draft: "Brouillon",
      scheduled: "Supprimé",
    }

    const variant = variants[status as keyof typeof variants] || "secondary"

    return <Badge variant={variant}>{labels[status as keyof typeof labels]}</Badge>
  }

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      console.log("Delete article:", id)
    }
  }

  return (
    <Card className="px-0 py-4 md:p-4 lg:p-4 xl:p-4">
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex max-sm:flex-col gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px] pl-10">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border mb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {article.featured_image && (
                        <img
                          src={article.featured_image || "/placeholder.svg"}
                          alt={article.title}
                          className="h-12 w-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="font-medium line-clamp-2">{article.title}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{new Date(article.created_at).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onEdit?.(article)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(article.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun article trouvé</p>
          </div>
        )}

      </CardContent>

     <div className="ml-5 max-sm:ml-0">
       {/* Pagination */}
        <PaginationArticle 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </Card>
  )
}
