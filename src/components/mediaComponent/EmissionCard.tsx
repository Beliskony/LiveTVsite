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
        <Card className="group relative w-[250px] h-[420px] overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-black">

        {/* ✅ Image nette centrée (non cropée) */}
      <img src={Emission.contenu.couverture ?? "/placeholder.png"}
        alt={`Couverture de l'émission: ${Emission.contenu.nom}`} className="absolute inset-0 w-full h-full object-fill transition-transform duration-700 z-10 hover:scale-110 ease-in-out"/>


        </Card>

        {/* ✅ Titre de l’émission */}
        <div className={`mt-1 max-w-[250px] mx-auto font-bold text-sm text-wrap text-center ${Emission.textCouleur}`}>
          <h2 className="truncate">{Emission.contenu.nom}</h2>
        </div>
      </Link>
    </div>
  );
};
