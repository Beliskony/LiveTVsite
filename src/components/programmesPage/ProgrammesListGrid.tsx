import { useState, useEffect } from "react"
import { EmissionCard } from "../mediaComponent/EmissionCard"
import { PaginationArticle } from "../articlesPage/PaginationArticle"
import type { IProgramme } from "@/interfaces/Programme"

const ITEMS_PER_PAGE = 9

export function ProgrammesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const totalPages = Math.ceil(programmes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProgramme = programmes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  useEffect(() => {
    const fetchProgrammes = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://api.yeshouatv.com/api/list_programmes", {
          method: "GET",
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

        // Transformer 'when' string en tableau string[]
        const programmesWithArrayWhen = result.data.map((prog: any) => ({
          ...prog,
          when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
        }))

        setProgrammes(programmesWithArrayWhen)
        setError("")
      } catch (err) {
        setError("Erreur lors du chargement des programmes")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProgrammes()
  }, [])

  if (loading) {
    return (
      <section className="w-full h-full flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-100 rounded-full animate-spin"></div>
      </section>
    )
  }


  return (
    <section className="w-full h-full my-4 items-start flex flex-col p-2 lg:p-10 gap-y-3.5">
      <h2 className="text-5xl text-white font-bold mb-4">Tous Nos Programmes</h2>

      {paginatedProgramme.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-sm:gap-8 md:gap-6 lg:gap-4 w-full justify-items-center">
          {paginatedProgramme.map((emission) => (
            <EmissionCard key={emission.id} contenu={emission} textCouleur="text-white" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun programme pour le moment</p>
        </div>
      )}

      <PaginationArticle
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={programmes.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </section>
  )
}
