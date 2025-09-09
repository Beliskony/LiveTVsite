import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import team from "@/data/TvTeams"

export default function TVPresentation() {
  return (
    <section className="text-white py-12 px-6 md:px-20 space-y-16">
      {/* SECTION CHAÎNE */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 justify-center items-center">
         <div className="lg:w-1/2">
           <h1 className="text-4xl md:text-5xl font-bold uppercase text-white">
            Yeshoua TV
           </h1>

           <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            Yeshoua TV est une chaîne généraliste qui propose une programmation riche et variée, accessible 24h/24 sur plusieurs plateformes en Afrique et à l’international.
            Notre mission est de partager des contenus qui inspirent, informent et divertissent un large public.
           </p>
         </div>

         <div className="lg:w-1/2 flex justify-center items-center">
            <img src="/logotvCouleur.png" alt="logo Yeshoua TV" className="max-w-full rounded-lg shadow-lg" />
         </div>
     </div>


      {/* SECTION ÉQUIPE */}
      
     <div>
        <h2 className="text-3xl font-bold mb-8">Notre équipe</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {team.map((membre, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-2">
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
