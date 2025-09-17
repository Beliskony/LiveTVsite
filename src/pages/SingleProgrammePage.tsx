"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Clock } from "lucide-react"
import type {IProgramme} from "@/interfaces/Programme"
import type { IVideo } from "@/interfaces/Videos"
import { VideoCard } from "@/components/mediaComponent/VideoCard"
import getReadableDaysRange from "@/utilitaires/getReadableDaysRange"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"
import { SkeletonVideoCard } from "@/components/Skeletons/SkeletonVideoCard"

const ITEMS_PER_PAGE = 15

export default function SingleProgrammePage() {
  const { id } = useParams<{ id: string }>()
  const [programme, setProgramme] = useState<IProgramme | null>(null)
  const [allVideos, setAllVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isSmall, setIsSmall] = useState(false);


   useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth <= 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

    // Récupération de l'émission
  useEffect(() => {
    if (!id) return

    setLoading(true)

    Promise.all([
      fetch("https://chunk.yeshouatv.com/api/list_programmes_for_user").then(res => res.json()),
      fetch("https://chunk.yeshouatv.com/api/list_videos_for_user").then(res => res.json())
    ])
      .then(([programmesRes, videosRes]) => {
        const foundProgramme = programmesRes.data.find((p: IProgramme) => p.id === id)
        if (!foundProgramme) {
          setError("Émission introuvable")
          return
        }

        const relatedVideos = videosRes.data.filter((video: IVideo) => video.programme_id === foundProgramme.id)

        setProgramme(foundProgramme)
        setAllVideos(relatedVideos)
      })
      .catch(() => setError("Erreur lors du chargement des données"))
      .finally(() => setLoading(false))
  }, [id]) 
  if (loading) return <div>Chargement…</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (!programme) return <div>Aucune émission trouvée.</div>

      // Lier automatiquement les vidéos à l'émission
  const linkedVideos: IVideo[]= programme ? allVideos.filter((video) => video.programme_id === programme.id) : []


  const totalPages = Math.ceil(linkedVideos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedVideos = linkedVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
  <div className="relative min-h-screen flex flex-col bg-[url('/images/bgForBlur.webp')] backdrop-blur-2xl bg-black/70">

 {/* 🟦 Section 1 : Titre + Description (Hero sans flou) */}
<section className="relative z-10 w-full max-sm:h-[530px] h-[500px] xl:h-[600px] overflow-hidden">
  
  {/* ✅ Image en arrière-plan (remplit tout) */}
  <img
    src={isSmall ? programme.couverture : (programme.slide_cover ?? programme.couverture)}
    alt={programme.nom}
    className="absolute inset-0 w-full h-full max-sm:h-[470px] object-fill max-sm:object-center z-0 mt-16"
  />

  {/* ✅ Overlay foncé pour lisibilité */}
  <div className="absolute inset-0 z-10" />

  {/* ✅ Infos texte en bas à gauche */}
  <div className="absolute bottom-20 max-sm:hidden md:bottom-10 lg:bottom-20 xl:bottom-50 left-0 z-20 p-6 xl:px-20 text-white max-w-5xl">
    <h1 className="text-2xl md:text-3xl font-bold mb-4 break-words">{programme.nom}</h1>

    <div className="flex items-center gap-1">{getReadableDaysRange(programme.when)}</div>
    
      <div className="flex flex-wrap items-center gap-4 text-sm mb-2">
      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {programme.starting} - {programme.ending}</div>
    
    </div>

    <div className="flex items-center gap-1 text-sm">
       {linkedVideos.length} <span>Vidéo(s)</span>
    </div>
  </div>



  <div className="absolute max-sm:hidden bottom-2 items-center flex flex-row w-full xl:px-20">
    <h1 className="text-xl md:text-3xl px-4 text-white">
      Emission&nbsp;Entière
    </h1>

    <hr className="w-full mx-3.5 border-t-2 text-white"/>

  </div>
</section>

    


  {/* 🟪 Section 2 : Filtres + Vidéos (avec flou) */}
  <section className="relative z-10 xl:px-20 px-6 py-5 flex flex-col text-white">
    {/*section Mobile*/}
    <section className="flex flex-col justify-center py-3 items-center w-full text-white md:hidden z-50 ">
      <h2 className="text-lg">{programme.nom}</h2>
      <div className="flex flex-row text-white/90 gap-x-2.5 justify-center items-center">
        <h2 className="text-lg break-words line-clamp-3">{getReadableDaysRange(programme.when)}</h2>
        <span className="text-2xl font-bold">-</span>
        <h2>{programme.starting}</h2>
      </div>

    </section>

    {/* 💡 Fond flouté */}
    <div
      className="absolute inset-0 z-0 bg-cover bg-center blur-3xl opacity-30"
      style={{ backgroundImage: `url("${programme.couverture}")` }}
    />

    {/* 🧼 Overlay pour assombrir un peu */}
    <div className="absolute inset-0 min-h-screen z-0" />

    {/* Contenu au-dessus du flou */}
    <div className="relative z-10">


      {/* Vidéos */}
      <div className="flex-1 min-h-screen py-4">
        {loading ? (
          <div className="w-full min-h-[50vh] my-4 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonVideoCard key={i} />
            ))}
          </div>
        ) : linkedVideos.length === 0 ? (
          <p className="text-gray-300 text-center min-h-[50vh] flex items-center justify-center">
            Aucune vidéo disponible pour cette émission.
          </p>
        ) : (
          <div className="w-full mt-0.5 mb-4 grid gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 justify-items-center">
            {paginatedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>

      <PaginationArticle
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={linkedVideos.length}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  </section>
</div>

  )
}
