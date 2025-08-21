"use client"

import { useState } from "react"
import { useParams, Navigate } from "react-router-dom"
import { Calendar, Clapperboard, Clock} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/NavBar"
import Footer from "@/components/Footer"
import { programmeData } from "@/data/programmeData"
import { videosData } from "@/data/videosData"
import type {IProgramme} from "@/interfaces/Programme"
import type { IVideo } from "@/interfaces/Videos"
import { VideoCard } from "@/components/mediaComponent/VideoCard"
import { VideosFilters } from "@/components/mediaComponent/VideoFilter"


// Récupérer l'émission par id
function getEmissionById(id: string): IProgramme | undefined {
  return programmeData.find((emission) => emission.id === id)
}

export default function SingleProgrammePage() {
  const { id } = useParams<{ id: string }>()
  const emission = id ? getEmissionById(id) : undefined

  if (!emission) {
    return null //<Navigate to="/404" replace />
  }

    // Lier automatiquement les vidéos à l'émission
  const linkedVideos: IVideo[] = videosData.filter(
    (video) => video.emissionId === emission.id // Assurez-vous que vos vidéos ont la propriété `emissionId`
  )

  const [filters, setFilters] = useState({
    search: "",
    sort: "recent",
  })

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }))
  }

  const handleSortChange = (sort: string) => {
    setFilters((prev) => ({ ...prev, sort }))
  }

  const filteredVideos = linkedVideos
  .filter((video) =>
    video.title?.toLowerCase().includes(filters.search.toLowerCase())
  )
  .sort((a, b) => {
    if (filters.sort === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    if (filters.sort === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    if (filters.sort === "title") {
      return (a.title ?? "").localeCompare(b.title ?? "")
    }
    if (filters.sort === "title-desc") {
      return (b.title ?? "").localeCompare(a.title ?? "")
    }
    return 0
  })




  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

         {/* Image de couverture en fond */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-2]"
        style={{ backgroundImage: `url(${emission.couverture})` }}
      />

      {/* Overlay noir + blur progressif */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-transparent via-black/70 to-black backdrop-blur-md" />

        
        <section className="z-10">
          <Header />
        </section>
      
         <section className="xl:px-20 px-6 py-10 flex flex-col text-white">
        
        {/* Infos de l’émission */}
        <div className="max-w-5xl my-10 max-sm:h-[200px] md:h-[400px]  md:pt-16 lg:pt-16 xl:pt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{emission.nom}</h1>
          <p className="mb-6 text-lg md:text-xl leading-relaxed">{emission.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Badge className="bg-indigo-100 text-indigo-800">{emission.genre}</Badge>
            <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {emission.when}</div>
            <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {emission.starting} - {emission.ending}</div>
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

      <div>
        {linkedVideos.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune vidéo disponible pour cette émission.</p>
        ) : (
          <div className="w-full my-4 grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        )}
      </div>
      </section>

      {/* Footer */}
      <section>
        <Footer />
      </section>

    </div>
  )
}
