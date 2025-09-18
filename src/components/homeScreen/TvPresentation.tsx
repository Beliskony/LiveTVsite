import { Badge } from "@/components/ui/badge"
import team from "@/data/TvTeams"
import ProgrammesPhare from "./ProgrammePhare"

export default function TVPresentation() {
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
         <div className="lg:w-1/2 w-full max-sm:p-1.5">
           <p className="text-lg max-sm:text-sm text-gray-300 leading-relaxed xl:px-4">
            Yeshoua TV est une chaîne généraliste qui propose une programmation riche et variée, accessible 24h/24 sur plusieurs plateformes en Afrique et à l’international.
            Notre mission est de partager des contenus qui inspirent, informent et divertissent un large public.
           </p>
         </div>

         <div className="lg:w-1/2 w-full flex justify-center items-center">
            <img src="/logotvCouleur.png" alt="logo Yeshoua TV" className="h-[300px] w-[300px] lg:max-h-full lg:max-w-full object-fill rounded-lg shadow-lg" />
         </div>
        </div>
     </div>


     <div className="xl:my-20 my-5 px-4">
      
        <div className="w-full flex flex-col gap-y-2.5 text-center justify-center items-center my-7">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white uppercase">Les programmes phares de Yeshoua Tv</h1>

            <p className="text-xs md:text-xl text-white max-w-3xl">Des programmes télé de qualité pour répondre aux attentes des ivoiriens et de la diaspora.</p>
        </div>
      <ProgrammesPhare/>
     </div>


      {/* SECTION ÉQUIPE */}
      
     <div className="xl:my-20 my-5 px-4 gap-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white uppercase text-center font-bold mb-8">Notre équipe</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 my-4">
            {team.map((membre, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-y-2 xl:pt-4">
                    <img src={membre.photoProfil} alt={`Photo de ${membre.nom}`} className="w-24 h-24 rounded-full object-cover shadow-md" />
                    <Badge variant="secondary" className="bg-[#1faae1] text-white px-3 py-1">
                        {membre.nom}
                    </Badge>
                </div>
            ))}
        </div>
     </div>

    </section>
  )
}
