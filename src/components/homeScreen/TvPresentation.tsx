import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import team from "@/data/TvTeams"
import ProgrammesPhare from "./ProgrammePhare"

export default function TVPresentation() {
   const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isMobile])


  return (
    <section className="text-white py-8 px-6 xl:px-10">
      {/* SECTION CHAÎNE */}
      <div className="flex flex-col justify-center items-center xl:px-20">
        <div className="w-full flex flex-row gap-x-1.5 items-center">
          <h1 className="text-xl md:text-2xl px-4 max-sm:px-1 md:px-0 font-bold text-white">
            Yeshoua&nbsp;TV
           </h1>

           <hr className="w-full border-t-2 border-white"/>
        </div>

        <div className="flex flex-col lg:flex-row md:py-5 justify-center items-center">
         <div className="lg:w-3/5 w-full max-sm:p-1.5">
           <p className="text-lg max-sm:text-sm max-sm:text-center text-gray-300 font-light leading-relaxed xl:px-4">
            Yeshoua TV est une chaîne de télévision chrétienne à vocation généraliste. Inspirée des valeurs du message du temps de la fin, 
            elle se veut un média de proximité qui informe, éduque et divertit tout en promouvant les principes d'éthique, de paix et de solidarité.
             Avec une grille de programmes variée (programmes religieux, informations, documentaires, débats, magazines, films, séries, musique, émissions jeunesse et éducatifs), 
            Yéshoua TV se positionne comme une télévision accessible à tous, ouverte sur le monde mais enracinée dans les réalités, chretiennes, sociales, économiques et culturelles de la Côte d’Ivoire et de l’Afrique.
            La mission de Yéshoua TV est d’être <span className="font-extrabold text-xl max-sm:text-sm text-white">un canal d’édification, de savoir et de divertissement responsable</span>, contribuant à la promotion de l’évangile.
           </p>
         </div>

         <div className="lg:w-2/5 w-full flex justify-center items-center">
            <img src="/logotvCouleur.png" alt="logo Yeshoua TV" className="h-[400px] w-[400px] lg:max-h-full lg:max-w-full object-fill rounded-lg shadow-lg" />
         </div>
        </div>
     </div>


     <div className="xl:my-20 my-5 px-4">
      
        <div className="w-full flex flex-col gap-y-2.5 text-center justify-center items-center my-7">
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white uppercase">Les programmes phares de Yeshoua Tv</h2>

            <p className="text-xs md:text-xl text-white max-w-3xl">Des programmes télé de qualité pour répondre aux attentes des ivoiriens et de la diaspora.</p>
        </div>
      <ProgrammesPhare/>
     </div>


      {/* SECTION ÉQUIPE */}
      
     <div className="xl:my-20 my-5 px-4 gap-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white uppercase text-center font-bold mb-8">Notre équipe</h2>
        <div className="hidden md:flex flex-wrap justify-center gap-6 my-4 ">
            {team.map((membre, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-y-2 xl:pt-4 md:mx-5">
                    <img src={membre.photoProfil} alt={`Photo de ${membre.nom}`} className="w-36 h-36 rounded-full object-cover shadow-md" />
                    <Badge variant="secondary" className="bg-[#1faae1] text-white px-3 py-1">
                        {membre.nom}
                    </Badge>
                </div>
            ))}
        </div>

         <div className="sm:hidden">
          <div className="relative w-full max-w-xs mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {team.map((membre, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="flex flex-col items-center text-center gap-y-2 p-4">
                    <img
                      src={membre.photoProfil || "/placeholder.svg"}
                      alt={`Photo de ${membre.nom}`}
                      className="w-48 h-48 rounded-full object-cover shadow-md mb-1"
                    />
                    <Badge variant="secondary" className="bg-[#1faae1] text-lg text-white px-4 py-2">
                      {membre.nom}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicateurs de pagination */}
            <div className="flex justify-center mt-4 gap-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-1  transition-colors ${
                    index === currentIndex ? "bg-[#1faae1]" : "bg-gray-500"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
     </div>

    </section>
  )
}
