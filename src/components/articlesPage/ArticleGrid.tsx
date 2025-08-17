import { useState, useMemo } from "react"
import ArticleCard from "./ArticleCard"
import { PaginationArticle } from "./PaginationArticle"
import { ArticleFilters } from "./ArticleFilters"
import { articleData } from "@/data/articlesData"

const ITEMS_PER_PAGE = 9

export function ArticlesGrid() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "recent",
    status: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(articleData.map((article) => article.category))]
    return uniqueCategories.sort()
  }, [])

  const filteredAndSortedArticles = useMemo(() => {
    const filtered = articleData.filter((article) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          article.title.toLowerCase().includes(searchLower) ||
          article.contenu.toLowerCase().includes(searchLower) ||
          article.author?.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      if (filters.category && filters.category !== "all") {
        if (article.category !== filters.category) return false
      }

      if (filters.status && filters.status !== "all") {
        if (article.status !== filters.status) return false
      }

      return true
    })

    filtered.sort((a, b) => {
      switch (filters.sort) {
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        case "recent":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    return filtered
  }, [filters])

  const totalPages = Math.ceil(filteredAndSortedArticles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedArticles = filteredAndSortedArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  return (
    <section className="w-full h-full my-4 items-center flex flex-col p-2 lg:p-10 gap-y-3.5">
      <h2 className="text-2xl font-bold mb-8">Tous les articles</h2>

      <ArticleFilters
        onSearchChange={(search) => handleFilterChange({ search })}
        onCategoryChange={(category) => handleFilterChange({ category })}
        onSortChange={(sort) => handleFilterChange({ sort })}
        onStatusChange={(status) => handleFilterChange({ status })}
        activeFilters={filters}
        categories={categories}
      />

      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length !== 1 ? "s" : ""} trouvé
          {filteredAndSortedArticles.length !== 1 ? "s" : ""}
        </p>
      </div>

      {paginatedArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 max-sm:gap-8 md:gap-6 lg:gap-4 w-full justify-items-center">
          {paginatedArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun article ne correspond à vos critères de recherche.</p>
        </div>
      )}

      <PaginationArticle
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredAndSortedArticles.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </section>
  )
}