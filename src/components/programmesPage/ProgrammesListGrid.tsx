import { useState, useEffect } from "react";
import type { IProgramme } from "@/interfaces/Programme";
import { EmissionCard } from "../mediaComponent/EmissionCard";
import { SkeletonEmissionCard } from "../Skeletons/SkeletonEmissionCard";

export default function ProgrammesGrid() {

  const [programmes, setProgrammes] = useState<IProgramme[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);  // Initialisation de l'état loading à true
  
  // Mise à jour de l'heure chaque minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Récupération des programmes depuis l'API
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        const res = await fetch("https://api.yeshouatv.com/api/list_programmes_for_user");
        if (!res.ok) throw new Error(`Erreur API ${res.status}`);
        const result = await res.json();
        const parsed = result.data.map((prog: any) => ({
          ...prog,
          when: typeof prog.when === "string"
            ? prog.when.split(",").map((d: string) => d.trim().toLowerCase())
            : prog.when,
        }));
        setProgrammes(parsed);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);  // Une fois les programmes récupérés, on met à jour l'état loading
      }
    };
    fetchProgrammes();
  }, []);  // Le tableau vide [] fait en sorte que l'effet s'exécute seulement une fois, au montage du composant

  if (loading) {
    return <SkeletonEmissionCard />;  // Affichage du Skeleton pendant le chargement
  }

  return (
    <section>
      <div className="py-10">
        <div className="items-center flex flex-row w-full xl:px-20">
          <h1 className="text-[16px] md:text-xl xl:text-3xl px-2 lg:px-5 text-white">Toutes&nbsp;nos&nbsp;émissions</h1>
          <hr className="w-full mx-3.5" />
        </div>
        
        <div className="xl:px-20 py-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Affichage des programmes */}
          {programmes.map((programme) => (
            <EmissionCard key={programme.id} textCouleur="text-white" contenu={programme}/>
          ))}
        </div>
      </div>
    </section>
  );
}
