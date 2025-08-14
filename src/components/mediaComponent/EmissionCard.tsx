import type { IEmission } from "../../interfaces/Emission";
import { formatRelativeDate } from "../../utilitaires/FormatDate";
import { Timer, CalendarCheck2, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";


export const EmissionCard = (propsEmission: IEmission) => {
  return (
    <Card className="group relative w-full h-60 md:h-72 lg:h-96 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
      {/* Image de couverture avec effet de zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${propsEmission.couverture})` }}
        role="img"
        aria-label={`Couverture de l'émission: ${propsEmission.nom}`}
      />

      {/* Overlay gradient moderne */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="lg"
          variant="secondary"
          className="rounded-full bg-background/20 backdrop-blur-sm border-border/30 hover:bg-background/30 transition-colors duration-200"
        >
          <Play className="w-8 h-8 fill-current ml-1" />
        </Button>
      </div>

      <CardContent className="relative z-10 flex flex-col justify-end h-full text-foreground p-0">
        {propsEmission.genre && propsEmission.genre.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {propsEmission.genre.slice(0, 2).map((g, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-900/90 backdrop-blur-sm text-white border-gray-400/30 hover:bg-gray-900/50"
              >
                {g}
              </Badge>
            ))}
            {propsEmission.genre.length > 2 && (
              <Badge variant="outline" className="bg-muted/90 backdrop-blur-sm text-muted-foreground border-border/30">
                +{propsEmission.genre.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Informations principales */}
        <div className="max-sm:p-1 max-sm:space-y-1 p-6 space-y-4 bg-gradient-to-t from-background/95 to-transparent text-white">
          {/* Titre */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold line-clamp-2 mb-2 group-hover:text-gray-900 transition-colors duration-200">
              {propsEmission.nom}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground line-clamp-2 leading-relaxed">
              {propsEmission.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 max-sm:gap-0.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground max-sm:gap-y-0">
              <div className="bg-muted/50 p-1.5 rounded-lg">
                <Timer className="w-4 h-4 text-gray-900" />
              </div>
              <span className="font-medium">
                {propsEmission.starting} - {propsEmission.ending}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground max-sm:gap-y-0">
              <div className="bg-muted/50 p-1.5 rounded-lg">
                <CalendarCheck2 className="w-4 h-4 text-gray-900" />
              </div>
              <span className="font-medium">{propsEmission.when}</span>
            </div>
          </div>

          {/* Barre de progression avec les couleurs shadcn/ui */}
          <div className="w-full h-1 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gray-500 to-gray-900 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
          </div>
        </div>
      </CardContent>

      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </Card>
  )
}