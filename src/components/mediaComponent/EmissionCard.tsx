import type { IEmission } from "../../interfaces/Emission";
import { formatRelativeDate } from "../../utilitaires/FormatDate";
import { Timer, CalendarCheck2 } from "lucide-react";


export const EmissionCard = (propsEmission: IEmission) => {
    return (
        <div className="relative flex w-full justify-center max-sm:w-full h-60 md:h-72 lg:h-96 lg:w-full lg:justify-center 
        max-lg:w-full rounded-xl overflow-hidden">
            
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                 style={{backgroundImage: `url(${propsEmission.couverture})`}}
                 role="img"
                 aria-label={`couverture de l'emission: ${propsEmission.nom}`}>
            </div>

            <div className="relative w-full z-10 flex flex-col justify-end h-full text-white rounded-xl ">
                <div className="gap-y-3 space-y-1.5 p-3 backdrop-brightness-50">
                    <h3 className="text-xl font-bold line-clamp-2">
                        {propsEmission.nom}
                    </h3>

                    <p className="text-sm text-gray-300 line-clamp-2">
                        {propsEmission.description}
                    </p>

                    <div className="flex flex-row gap-x-1">
                        <Timer />
                        <h5>{formatRelativeDate(propsEmission.starting)} - {formatRelativeDate(propsEmission.ending)}</h5>
                    </div>

                    <div className="flex flex-row gap-x-1">
                        <CalendarCheck2 />
                        <h5>{propsEmission.when}</h5>
                    </div>

                    {propsEmission.genre && propsEmission.genre.length > 0 && (
                <div className="mt-2">
                  {propsEmission.genre.map((g, index) => (
                    <span key={index} className="inline-block lg:hidden bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                      {g}
                    </span>
                   ))}
                </div>
                )}
                </div>

            </div>
        </div>
    )
}