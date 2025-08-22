import { useState, useEffect, useRef } from "react"
import { formatRelativeDate } from "@/utilitaires/FormatDate"
import type { IVideo } from "@/interfaces/Videos"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const VideoCard = (video: IVideo) => {
  const { title, duration, createdAt, videoUrl } = video

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [posterUrl, setPosterUrl] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const hiddenVideo = document.createElement("video")
    hiddenVideo.src = videoUrl
    hiddenVideo.preload = "auto"
    hiddenVideo.muted = true
    hiddenVideo.playsInline = true

    const captureFirstFrame = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = hiddenVideo.videoWidth
        canvas.height = hiddenVideo.videoHeight
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.drawImage(hiddenVideo, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL("image/png")
        setPosterUrl(dataUrl)
        setIsReady(true)
      } catch (err) {
        console.warn("Erreur capture frame", err)
        setIsReady(true) // fallback
      }
    }

    hiddenVideo.addEventListener("loadeddata", captureFirstFrame)

    return () => {
      hiddenVideo.removeEventListener("loadeddata", captureFirstFrame)
    }
  }, [videoUrl])

  if (!isReady) return null // ou un skeleton/loading spinner

  return (
    <Card className="group w-[350px] font-normal overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl ?? undefined}
          preload="metadata"
          muted
          playsInline
          loop
          controls
          onMouseEnter={(e) => {
            if (!/iPhone|iPad|Android/i.test(navigator.userAgent)) {
              e.currentTarget.play()
            }
          }}
          onMouseLeave={(e) => {
            if (!/iPhone|iPad|Android/i.test(navigator.userAgent)) {
              e.currentTarget.pause()
              e.currentTarget.currentTime = 0
            }
          }}
          className="w-full h-full max-h-[80vh] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="w-full py-2 space-y-1 h-20 text-gray-800">
        <div className="flex flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>{formatRelativeDate(createdAt.toLocaleDateString())}</span>
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

