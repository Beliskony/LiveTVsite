import { useEffect, useRef, useState } from "react"
import { formatRelativeDate, videoFormatRelativeDate } from "@/utilitaires/FormatDate"
import type { IVideo } from "@/interfaces/Videos"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const VideoCard = (video: IVideo) => {
  const { title, duration, created_at, video_url, couverture } = video

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isIOS, setIsIOS] = useState(false)


  // Détecte si l'utilisateur est sur iOS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
      setIsIOS(isIOSDevice)
    }
  }, [])


  return (
    <Card className="group w-[350px] font-normal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={video_url}
          poster={couverture || "/placeholder.svg"}
          controls
          preload="metadata"
          muted={true}
          loop
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => {
            e.currentTarget.pause()
            e.currentTarget.currentTime = 0
          }}
          className="w-full h-full max-h-[80vh] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="w-full py-2 space-y-1 h-20 text-gray-800">
        <div className="flex flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>{videoFormatRelativeDate(new Date(created_at).toLocaleDateString())}</span>

          {duration && (
            <Badge variant="secondary" className="bg-black/80 text-white hover:bg-black/80">
              <Clock className="mr-1 h-3 w-3" />
              {duration}
            </Badge>
          )}
        </div>
        <h3 className="text-wrap truncate text-sm leading-tight line-clamp-2 font-extrabold transition-colors">
          {title}
        </h3>
      </CardContent>
    </Card>
  )
}
