import type { IProgramme } from "../../interfaces/Programme";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

interface propsEmission {
  contenu: IProgramme
  textCouleur: string
}

export const EmissionCard = (Emission: propsEmission) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Link to={`/programmes/${Emission.contenu.id}`} className="no-underline">
        <Card className="group relative w-[200px] h-[350px] overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-black">

        {/* ✅ Image nette centrée (non cropée) */}
      <img src={Emission.contenu.couverture.replace("http://", "https://") || "/placeholder.svg"}
        alt={`Couverture de l'émission: ${Emission.contenu.nom}`} className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 z-10"/>

          {/* ✅ Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-transparent z-10" />

        </Card>

        {/* ✅ Titre de l’émission */}
        <div className={`mt-1 max-w-[250px] mx-auto font-bold text-sm text-wrap text-center ${Emission.textCouleur}`}>
          <h2 className="truncate">{Emission.contenu.nom}</h2>
        </div>
      </Link>
    </div>
  );
};
