import { useState, useEffect } from "react";
import EmissionCarousel from "../mediaComponent/Emission-carousel";
import type { IProgramme } from "@/interfaces/Programme";
import { SkeletonEmissionCard } from "../Skeletons/SkeletonEmissionCard";

export const EmissionSlideSection = () => {
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
  
    return(
      <>
      
        <div className="flex flex-col items-start justify-start p-6 w-full gap-y-2.5 ">
            {/*la partie des videos recommander*/}
          <div className="flex flex-col max-sm:px-2 items-start justify-center text-left w-full xl:px-30 lg:px-20 md:px-2">
            <h1 className="font-normal text-white text-[16px] md:text-[24px]">A suivre sur votre chaine</h1>
            <h3 className="font-light text-white text-xs max-sm:text-xs">Progamme de la semaine</h3>
          </div>
          {loading ? (
            <SkeletonEmissionCard/>
          ) : (
             <EmissionCarousel emissions={programmes} />
          )}
          </div>

      </>
        )
      }