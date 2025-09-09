import type { IProgramme } from "../../interfaces/Programme";
import { CalendarCheck2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import getReadableDaysRange from "@/utilitaires/getReadableDaysRange";


interface propsEmission {
  contenu: IProgramme
  textCouleur: string
}

export const EmissionCard = (Emission:propsEmission) => {
  return (
  <>
   <div className="flex flex-col items-center justify-center p-4">
    <Link to={`/programmes/${Emission.contenu.id}`} className="no-underline">
    <Card className="group relative w-[250px] max-sm:w-[300px] h-[450px] lg:h-96 xl:h-[420px] overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
      {/* Image de couverture avec effet de zoom */}
      <div
        className="absolute inset-0 bg-cover object-fill bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${Emission.contenu.couverture.replace("http://", "https://")})` }}
        role="img"
        aria-label={`Couverture de l'émission: ${Emission.contenu.nom}`}
      />

      {/* Overlay gradient moderne */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent" />

      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 flex items-center justify-center">
         <div className="text-center text-white p-6 space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-700">
          <div className="space-y-2">
            <h3 className="text-xl text-white">{Emission.contenu.starting} à {Emission.contenu.ending}</h3>
          </div>

          <p className="text-sm md:text-base break-all text-gray-200 max-w-xs mx-auto leading-relaxed line-clamp-3">
            {Emission.contenu.description}
            </p>
      </div>
      </div>


      <CardContent className="relative z-10 flex flex-col justify-end h-full text-foreground p-0">
          <div className="absolute w-full top-4 left-4 flex max-sm:flex-col flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-gray-900/90 backdrop-blur-sm text-white border-gray-400/30 hover:bg-gray-900/50 h-5"
              >
                {Emission.contenu.genre}
              </Badge>

              <Badge
                variant="secondary"
                className=" bg-gray-900/90 backdrop-blur-sm text-white border-gray-400/30 hover:bg-gray-900/50 max-w-[220px] max-h-20 whitespace-normal break-words">
                <CalendarCheck2 className="w-7 h-7 mr-1" />
                <span className=" leading-snug break-words whitespace-normal">
                  {getReadableDaysRange(Emission.contenu.when)}
                </span>
              </Badge>
          </div>
      </CardContent>

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </Card>

    <div className={`mt-1 max-w-[250px] mx-auto font-bold text-sm text-wrap text-center ${Emission.textCouleur}`}>
      <h2 className="truncate">{Emission.contenu.nom}</h2>
    </div>
    </Link>
  </div>
  </>
  )
}