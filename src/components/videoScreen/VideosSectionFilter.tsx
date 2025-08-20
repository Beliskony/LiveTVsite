import { useState, useMemo } from "react"
import { videosData } from "../../data/videosData"
import { VideoCard } from "../mediaComponent/VideoCard"
import { PaginationArticle } from "../articlesPage/PaginationArticle"
import { VideosFilters } from "../mediaComponent/VideoFilter"

const ITEMS_PER_PAGE = 9

export function VideoSectionFilter() {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "", // latest | oldest
    popularity: "", // most-viewed | top-rated
    status: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

   // 🔎 Récupérer toutes les catégories disponibles
  const categories = Array.from(new Set(videosData.map((v) => v.category)))

  // 🔎 Gestion des vidéos filtrées et triées
  const filteredAndSortedVideos = useMemo(() => {
    let filtered = [...videosData]

    // Filtrer par recherche
    if (filters.search) {
      filtered = filtered.filter((video) =>
        video.title?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Filtrer par catégorie
    if (filters.category !== "all") {
      filtered = filtered.filter((video) => video.category === filters.category)
    }

    // Trier par date
    if (filters.sort === "latest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else {
      filtered.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    }

    // Trier par popularité
    if (filters.popularity === "most-viewed") {
      filtered.sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    } else if (filters.popularity === "top-rated") {
      filtered.sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    }

    return filtered
  }, [filters])

  // 📄 Pagination
  const totalPages = Math.ceil(filteredAndSortedVideos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedVideos = filteredAndSortedVideos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  return (
    <section className="w-full h-full my-4 flex flex-col p-2 lg:p-10 gap-y-3.5">
      <h2 className="text-6xl max-sm:text-3xl font-bold mb-8">Toutes les Vidéos</h2>

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <VideosFilters
                onSearchChange={(search) => handleFilterChange({ search })}
                onCategoryChange={(category) => handleFilterChange({ category })}
                onSortChange={(sort) => handleFilterChange({ sort })}
                onStatusChange={(status) => handleFilterChange({ status })}
                activeFilters={filters}
                categories={videosData.map((video) => video.category).filter((c): c is string => c !== undefined)}
         />
      </div>

      {/* Résultats */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedVideos.length} vidéo
          {filteredAndSortedVideos.length > 1 ? "s" : ""} trouvée
          {filteredAndSortedVideos.length > 1 ? "s" : ""}
        </p>
      </div>

      {paginatedVideos.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 md:gap-8 justify-items-center w-full">
          {paginatedVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune vidéo ne correspond à vos critères de recherche.</p>
        </div>
      )}

      {/* Pagination */}
      <PaginationArticle
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredAndSortedVideos.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </section>
  )
}
