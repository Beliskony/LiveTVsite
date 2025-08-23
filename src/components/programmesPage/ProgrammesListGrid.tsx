import { useState, useEffect } from "react"
import { EmissionCard } from "../mediaComponent/EmissionCard"
import { PaginationArticle } from "../articlesPage/PaginationArticle"
import { programmeData } from "@/data/programmeData"
import type { IProgramme } from "@/interfaces/Programme"
import { data } from "react-router-dom"


const ITEMS_PER_PAGE = 9

export function ProgrammesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const totalPages = Math.ceil(programmeData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProgramme = programmeData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

 {/* useEffect(() => {
    const fetchProgrammes = async () => {
      setLoading(true)

      try {
        const res = await fetch("https://api.yeshouatv.com/api/programmes")
        if (!res.ok) throw new Error("Erreur lors du chargement des programmes")

          const data: IProgramme[] = await res.json()
          setProgrammes(data)

      } catch (error) {
        setError("Erreur lors du chargement des programmes")
        console.error("Erreur Api: ", error)
      } finally {
        setLoading(false)
      }
    }
      fetchProgrammes()
  }, [])*/}

  //remplacer programmeData par programmes partout

  return (
    <section className="w-full h-full my-4 items-start flex flex-col p-2 lg:p-10 gap-y-3.5">
      <h2 className="text-5xl text-white font-bold mb-4">Tous Nos Programmes</h2>

      {paginatedProgramme.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-sm:gap-8 md:gap-6 lg:gap-4 w-full justify-items-center">
          {paginatedProgramme.map((emissions) => (
            <EmissionCard key={emissions.id} contenu={emissions} textCouleur="text-white" />
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
        totalItems={programmeData.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </section>
  )
}