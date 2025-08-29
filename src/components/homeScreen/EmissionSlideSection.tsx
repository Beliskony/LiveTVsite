import { useState } from "react";
import EmissionCarousel from "../mediaComponent/Emission-carousel";
import type { IProgramme } from "@/interfaces/Programme";

export const EmissionSlideSection = () => {
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [error, setError] = useState("")
  
    return(
      <>
      
        <div className="flex flex-col items-start justify-start p-6 w-full gap-y-2.5 ">
            {/*la partie des videos recommander*/}
          <div className="flex flex-col max-sm:px-2 items-start justify-center text-left w-full xl:px-30 lg:px-20 md:px-2">
            <h1 className="font-normal text-white text-[16px] md:text-[24px]">A suivre sur votre chaine</h1>
            <h3 className="font-light text-white text-xs max-sm:text-xs">Progamme de la semaine</h3>
          </div>
             <EmissionCarousel emissions={programmes} />
          </div>

      </>
        )
      }