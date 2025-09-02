import { useEffect, useRef, useState } from "react"
import { formatRelativeDate, videoFormatRelativeDate } from "@/utilitaires/FormatDate"
import type { IVideo } from "@/interfaces/Videos"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const VideoCard = (video: IVideo) => {
  const { title, duration, created_at, video_url, couverture } = video

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [frame0Poster, setFrame0Poster] = useState<string | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const hasCapturedRef = useRef(false)

  // Détecte si l'utilisateur est sur iOS
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
      setIsIOS(isIOSDevice)
    }
  }, [])

  // Capture frame 0 uniquement si non-iOS
  useEffect(() => {
    if (isIOS || hasCapturedRef.current) return

    const videoEl = videoRef.current
    if (!videoEl) return

    const captureFrame0 = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = videoEl.videoWidth
        canvas.height = videoEl.videoHeight
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL("image/png")
          setFrame0Poster(dataUrl)
          hasCapturedRef.current = true
          videoEl.pause()
          videoEl.currentTime = 0
        }
      } catch (err) {
        console.warn("Erreur lors de la capture de la frame 0", err)
      }
    }

    videoEl.addEventListener("loadeddata", captureFrame0, { once: true })

    return () => {
      videoEl.removeEventListener("loadeddata", captureFrame0)
    }
  }, [isIOS])

  return (
    <Card className="group w-[350px] font-normal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={video_url}
          poster={isIOS ? couverture : frame0Poster || "/placeholder.svg"}
          controls
          preload="metadata"
          muted={false}
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
