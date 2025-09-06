"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Search, Filter, MoreHorizontal, LoaderCircle } from "lucide-react"
import type { IArticle } from "@/interfaces/Articles"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"

interface ArticleTableProps {
  onEdit: (article: IArticle) => void
}

export function ArticleTable({ onEdit }: ArticleTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [articles, setArticles] = useState<IArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fecthArticles = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://api.yeshouatv.com/api/list_article", {
        method: "GET",
        headers: {Authorization: `Bearer ${token}` }
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

      setArticles(result.data)
      
    } catch (error) {
       setError("Erreur lors du chargement des programmes")
      console.error("Erreur Api: ", error)
    }
  }

    // Appel initial
  useEffect(() => {
    fecthArticles()

  const interval = setInterval(() => {
    fecthArticles()
    }, 60000)

    return() => clearInterval(interval)

  }, [])

  const deleteArticle = async (id: string) =>{
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`https://api.yeshouatv.com/api/delete_article/${id}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`}
      })

      if (!res.ok) {
      const errorText = await res.text()
      console.error("Erreur API DELETE:", errorText)
      throw new Error("Erreur lors de la suppression du programme")
      }

      console.log("Programme supprimé avec succès")
      await fecthArticles()

    } catch (error) {
      console.error("Erreur lors du DELETE:", error)
      throw error
    }
  }

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

  const onDelete = (id: string) => {
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
                <TableCell>visuel</TableCell>
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
                        <span className="font-medium line-clamp-2">{article.title}</span>
                  </TableCell>
                  <TableCell>
                    {article.feature_image && (
                      <img
                        src={article.feature_image || "/placeholder.svg"}
                        alt={article.title}
                        className="h-12 w-16 object-cover rounded"
                        />
                      )}
                  </TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{new Date(article.created_at).toLocaleDateString("fr-FR")}</TableCell>
                   <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="items-end">
                      <DropdownMenuItem onClick={() => onEdit(article)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => deleteArticle(article.id).catch(()=> alert("Erreur lors de la suppression"))}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="flex justify-center items-center w-full py-12">
            <LoaderCircle className="h-10 w-10 animate-spin " />
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
