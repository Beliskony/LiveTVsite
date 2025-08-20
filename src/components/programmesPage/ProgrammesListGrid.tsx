import { useState, useMemo } from "react"
import { EmissionCard } from "../mediaComponent/EmissionCard"
import { PaginationArticle } from "../articlesPage/PaginationArticle"
import { emissionData } from "@/data/emissionsData"


const ITEMS_PER_PAGE = 9

export function ProgrammesGrid() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(emissionData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedArticles = emissionData.slice(startIndex, startIndex + ITEMS_PER_PAGE)


  return (
    <section className="w-full h-full my-4 items-start flex flex-col p-2 lg:p-10 gap-y-3.5">
      <h2 className="text-5xl text-white font-bold mb-4">Tous Nos Programmes</h2>

      {paginatedArticles.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 max-sm:gap-8 md:gap-6 lg:gap-4 w-full justify-items-center">
          {paginatedArticles.map((emissions) => (
            <EmissionCard key={emissions.id} {...emissions} />
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
        totalItems={emissionData.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </section>
  )
}