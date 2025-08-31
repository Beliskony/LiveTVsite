import { useState, useEffect } from "react"
import { EmissionCard } from "../mediaComponent/EmissionCard"
import { PaginationArticle } from "../articlesPage/PaginationArticle"
import type { IProgramme } from "@/interfaces/Programme"
import { LoaderCircle } from "lucide-react"

const ITEMS_PER_PAGE = 9

export function ProgrammesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  const totalPages = Math.ceil(programmes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProgramme = programmes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

 // Fonction pour charger les programmes
  const fetchProgrammes = async () => {
    try {
      const res = await fetch("https://api.yeshouatv.com/api/list_programmes_for_user")

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Erreur API:", errorText)
        throw new Error("Erreur lors du chargement des programmes")
      }

      const result = await res.json()

      if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }

      // Transformer 'when' (string) en tableau
      const programmesWithArrayWhen = result.data.map((prog: any) => ({
        ...prog,
        when: typeof prog.when === "string"
          ? prog.when.split(",").map((d: string) => d.trim())
          : prog.when,
      }))

      setProgrammes(programmesWithArrayWhen)
    } catch (error) {
      setError("Erreur lors du chargement des programmes")
      console.error("Erreur Api: ", error)
    } finally {
      setLoading(false)
    }
  }

  // useEffect pour le chargement initial + refresh auto
  useEffect(() => {
    fetchProgrammes()

    const interval = setInterval(() => {
      fetchProgrammes()
    }, 5000)

    return () => clearInterval(interval)
  }, [])



  return (
    <section className="w-full lg:h-screen my-4 items-start flex flex-col p-2 lg:p-10 gap-y-3.5">
      <h2 className="text-5xl text-white font-bold mb-4">Tous Nos Programmes</h2>

      {paginatedProgramme.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-sm:gap-8 md:gap-6 lg:gap-4 w-full justify-items-center">
          {paginatedProgramme.map((emission) => (
            <EmissionCard key={emission.id} contenu={emission} textCouleur="text-white" />
          ))}
        </div>
      ) : (
        <div className="justify-center items-center">
            <LoaderCircle className="animate-spin text-white" />
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
