import { useEffect, useState } from "react";
import EmissionCarousel from "../mediaComponent/Emission-carousel";
import type { IProgramme } from "@/interfaces/Programme";

export const EmissionSlideSection = () => {
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

 useEffect(() => {
    const fetchProgrammes = async () => {
      setLoading(true)

      try {
        const res = await fetch("https://api.yeshouatv.com/api/list_programmes")
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
  }, [])
  
    return(
      <>
      {loading ?(
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-100 rounded-full animate-spin" />
        </div>
          ) : (
        <div className="flex flex-col items-start justify-start p-6 w-full gap-y-2.5 ">
            {/*la partie des videos recommander*/}
          <div className="flex flex-col max-sm:px-2 items-start justify-center text-left w-full xl:px-30 lg:px-20 md:px-2">
            <h1 className="font-normal text-white text-[16px] md:text-[24px]">A suivre sur votre chaine</h1>
            <h3 className="font-light text-white text-xs max-sm:text-xs">Progamme de la semaine</h3>
          </div>
             <EmissionCarousel emissions={programmes} />
          </div>
           )}
      </>
        )
      }