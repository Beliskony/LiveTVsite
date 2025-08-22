//import { useState } from "react";
//import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { programmeData } from "@/data/programmeData";
import EmissionCarousel from "../mediaComponent/Emission-carousel";

export const EmissionSlideSection = () => {
    //const [isHovered, setIsHoverred] = useState(false)
      //--- Fetch backend ---
{/*  useEffect(() =>{
    const fetcEmissions = async () => {
      try {
        const response = await fetch("https://api.yeshouatv.com/api/programmes")
        if (!response.ok) throw new Error ("Erreur lors de la récupération des programmes")
        const data: IProgramme[] = await response.json()
        setEmissions(data)

      } catch (error) {
        console.error(error)
      } finally{
        setLoading(false)
      }
    }
    fetcEmissions()
  }, []) */}
  
    return(
          <div className="flex flex-col items-start justify-start p-6 w-full gap-y-2.5 ">
            {/*la partie des videos recommander*/}
            <div className="flex flex-col max-sm:px-2 items-start justify-center text-left w-full xl:px-30 lg:px-20 md:px-2">
              <h1 className="font-normal text-white text-[16px] md:text-[24px]">A suivre sur votre chaine</h1>
              <h3 className="font-light text-white text-xs max-sm:text-xs">Progamme de la semaine</h3>
            </div>
               <EmissionCarousel emissions={programmeData} />
            
          {/* <div className="w-full flex my-7 justify-center items-center">
                <button onClick={() =>({})}
                onMouseEnter={() => setIsHoverred(true)}
                onMouseLeave={() => setIsHoverred(false)}
                className="flex flex-row w-60 h-10 justify-center items-center rounded-2xl bg-blue-600 space-x-1
                hover:scale-110 transition-all">
                  <h3 className="text-white text-lg">Voir toutes les videos</h3>
                  {isHovered ? (<ArrowUpRight className="text-white mt-0.5 transition-transform duration-300 ease-in-out"/>
                ):(
                    <ArrowRight className="text-white mt-0.5 transition-transform duration-300 ease-in-out"/>
                )}
                     
                     
                </button>
            </div>  */}
           
          </div>
        )
}