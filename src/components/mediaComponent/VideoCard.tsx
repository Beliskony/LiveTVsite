import { useEffect, useRef, useState } from "react"
import { videoFormatRelativeDate } from "@/utilitaires/FormatDate"
import type { IVideo } from "@/interfaces/Videos"
import { Clock} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface VideoCardProps {
  video: IVideo
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const { title, duration, created_at, video_url, couverture } = video

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hasIncrementedView = useRef(false)
  // Nouvelle state locale pour les vues
  const [views, setViews] = useState<number>(video.views ?? 0)
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [dynamicPoster, setDynamicPoster] = useState<string | null>(null)


  const handleViewIncrement = () => {
    if (hasIncrementedView.current) return
    hasIncrementedView.current = true

    const viewedVideos = JSON.parse(localStorage.getItem("viewedVideos") || "[]")
      if (viewedVideos.includes(video.id)) {
    console.log("Vue déjà comptabilisée pour cette vidéo sur cet appareil.")
    return
  }

    incrementTimeoutRef.current = setTimeout(async () => {
      try {
      const response = await fetch(`https://chunk.yeshouatv.com/api/increment_views/${video.id}`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        })
        
         if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }
      const json = await response.json()
      setViews(prev => prev + 1)

      const updatedViewed = [...viewedVideos, video.id]
      localStorage.setItem("viewedVideos", JSON.stringify(updatedViewed))
      } catch (err) {
        console.error("Erreur lors de l'incrémentation de la vue :", err)
        hasIncrementedView.current = false
      }
    }, 2000)
  }

  // Nettoyage du timeout si le composant est démonté avant les 2s
  useEffect(() => {
    return () => {
      if (incrementTimeoutRef.current) clearTimeout(incrementTimeoutRef.current)
    }
  }, [])


  return (
    <Card className="group w-[320px] md:w-[220px] lg:w-[250px] bg-black/45 border-0 font-normal overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={video_url}
          poster={ couverture}
          controls
          preload="metadata"
          muted={true}
          loop
          onPlay={handleViewIncrement}
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause()
            e.currentTarget.currentTime = 0
          }}
          className="w-full h-full max-h-[80vh] object-fill transition-transform duration-300 group-hover:scale-105"
        />
          
      </div>

      <CardContent className="w-full py-2 space-y-1 h-20 text-white">
        <div className="flex flex-row justify-between items-center gap-4 text-sm">
        <span>{videoFormatRelativeDate(new Date(created_at))}</span>

         {duration && (
            <Badge variant="secondary" className="bg-black/80 text-white hover:bg-black/80">
              <Clock className="mr-1 h-3 w-3" />
              {duration}
            </Badge>
          )} 
        </div>

        <div className="flex flex-row justify-between items-center gap-4 text-sm">
         <h3 className="text-wrap truncate text-sm leading-tight line-clamp-2 font-extrabold transition-colors">
          {title}
         </h3>
        </div>
      </CardContent>
    </Card>
  )
}
