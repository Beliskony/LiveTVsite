"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Calendar, Clapperboard, Clock} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type {IProgramme} from "@/interfaces/Programme"
import type { IVideo } from "@/interfaces/Videos"
import { VideoCard } from "@/components/mediaComponent/VideoCard"
import { VideosFilters } from "@/components/mediaComponent/VideoFilter"
import getReadableDaysRange from "@/utilitaires/getReadableDaysRange"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"
import { SkeletonVideoCard } from "@/components/Skeletons/SkeletonVideoCard"

const ITEMS_PER_PAGE = 9

export default function SingleProgrammePage() {
  const { id } = useParams<{ id: string }>()
  const [programme, setProgramme] = useState<IProgramme | null>(null)
  const [allVideos, setAllVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [filters, setFilters] = useState({ search: "", sort: "recent", })
  const [currentPage, setCurrentPage] = useState(1)

    // Récupération de l'émission
  useEffect(() => {
    if (!id) return

    setLoading(true)

    Promise.all([
      fetch("https://api.yeshouatv.com/api/list_programmes_for_user").then(res => res.json()),
      fetch("https://api.yeshouatv.com/api/list_videos_for_user").then(res => res.json())
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



  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort }))
  }


      // Lier automatiquement les vidéos à l'émission
  const linkedVideos: IVideo[]= programme ? allVideos.filter((video) => video.programme_id === programme.id) : []

    const filteredVideos = linkedVideos
  .filter((video) =>
    video.title?.toLowerCase().includes(filters.search.toLowerCase())
  )
  .sort((a, b) => {
    if (filters.sort === "recent") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    if (filters.sort === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    }
    if (filters.sort === "title") {
      return (a.title ?? "").localeCompare(b.title ?? "")
    }
    if (filters.sort === "title-desc") {
      return (b.title ?? "").localeCompare(a.title ?? "")
    }
    return 0
  })

    const totalPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen flex flex-col relative">

         {/* Image de couverture en fond */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: `url(${programme.couverture})` }}
      />

      {/* Overlay noir + blur progressif */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent via-black/70 to-black backdrop-blur-md" />

      
      <section className="flex-1 xl:px-20 px-6 py-10 flex flex-col text-white">
        
        {/* Infos de l’émission */}
        <div className="max-w-5xl my-10 max-sm:h-[200px] md:h-[400px]  md:pt-16 lg:pt-16 xl:pt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{programme.nom}</h1>
          <p className="mb-6 text-lg md:text-xl leading-relaxed">{programme.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Badge className="bg-indigo-100 text-indigo-800 break-all">{programme.genre}</Badge>
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {getReadableDaysRange(programme.when)}</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {programme.starting} - {programme.ending}</div>
          </div>

            <div className="flex items-center my-2.5 gap-1"><Clapperboard className="w-4 h-4" /> {linkedVideos.length} <span>Video(s)</span></div>

        </div>

        {/* Titre de la section vidéo & filtre */}
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row w-full justify-between border-b mb-6 max-sm:items-start">
            <h2 className="text-5xl md:text-2xl lg:text-3xl max-sm:text-xl font-semibold mb-6 text-left">Vidéos de l’émission</h2>

            <VideosFilters activeFilters={filters}
                       onSearchChange={handleSearchChange}
                       onSortChange={handleSortChange} />
        </div>

      <div className="flex-1">
      {loading ? (
        <div className="w-full min-h-[50vh] my-4 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonVideoCard key={i} />
            ))}
        </div>
      ): 

        linkedVideos.length === 0 ? (
          <p className="text-gray-500 text-center min-h-[50vh] flex items-center justify-center">Aucune vidéo disponible pour cette émission.</p>
        ) : (
          <div className="w-full my-4 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {paginatedVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        )}
        
      </div>

       <PaginationArticle
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredVideos.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
      </section>

    </div>
  )
}
