import React, { useState, useEffect } from "react";
import type { IProgramme } from "@/interfaces/Programme";
import { EmissionCard } from "../mediaComponent/EmissionCard";
import { SkeletonEmissionCard } from "../Skeletons/SkeletonEmissionCard";

const ReplaySection = () => {
  const [programmes, setProgrammes] = useState<IProgramme[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

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

        // Extraire les genres uniques
        const uniqueGenres: string[] = Array.from(new Set(parsed.map((prog: IProgramme) => prog.genre)));
        setGenres(uniqueGenres);
      } catch (err) {
        console.error("Erreur API:", err);
      }
    };
    fetchProgrammes();
  }, []);

  // Filtrer les programmes par genre
  const filteredProgrammes = selectedGenre
    ? programmes.filter((prog) => prog.genre === selectedGenre)
    : programmes;

  return (
    <section className="py-10">
      <div className="items-center flex flex-row w-full xl:px-20">
        <h1 className="text-xl md:text-3xl xl:text-5xl px-4 text-white">Replay</h1>
        <hr className="w-full mx-3.5" />
      </div>

      <div className="w-full xl:px-20 py-6">
        <h3 className="px-5 text-[15px] font-light text-white">
          Accédez au replay de vos émissions préférées
        </h3>
      </div>

      <div className="w-full flex flex-row gap-x-2.5 xl:px-28 lg:px-20 md:px-10 max-sm:grid max-sm:grid-cols-2 max-sm:gap-y-1.5 max-sm:p-2">
        {/* Filtres de genres */}
        <button onClick={() => setSelectedGenre(null)} className={`px-4 py-2 rounded-md ${!selectedGenre ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`} >
          Tous
        </button>

        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)} className={`p-2 text-sm rounded-md ${selectedGenre === genre ? "bg-blue-500 text-white" : "bg-gray-700/40 text-white"}`} >
            {genre}
          </button>
        ))}
      </div>

      <div className=" xl:px-20 py-7 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Afficher les programmes filtrés */}
        {filteredProgrammes.map((programme) => (
          <EmissionCard key={programme.id} textCouleur="text-white" contenu={programme} />
        ))}
      </div>
    </section>
  );
};

export default ReplaySection;
