import React, {Suspense, lazy} from "react"

import { formatRelativeDate } from "@/utilitaires/FormatDate"
import { useState } from "react"
import type { IVideo } from "@/interfaces/Videos"
import { Play, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { videosData } from "@/data/videosData"

const VideoModal = lazy(() => import("@/components/mediaComponent/VideoModal"))

export const VideoCard = (video: IVideo) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleOpen = (e: React.MouseEvent) => {
  e.stopPropagation();
  const vid = e.currentTarget
    .closest("div")
    ?.querySelector("video") as HTMLVideoElement | null;
  if (vid) {
    vid.pause();
    vid.currentTime = 0; // reset
  }
  openModal();
};

  const { id, title, duration, createdAt, videoUrl, } = video;
  const emptyVideo: IVideo = { id: "", title: "Vidéo non trouvée", description: "", createdAt: new Date(), duration: "", views: 0, Miniature: "", category: "", status: "draft", videoUrl: "", };

  
  return (
    <>
    <Card
       className="group w-[350px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        
        <video
          src={videoUrl}
          controls
          preload="metadata"
          muted
          loop
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) =>{ e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          className="w-full h-full max-h-[80vh] object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Duration badge */}
        {duration && (
          <Badge variant="secondary" className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </Badge>
        )}

 
      </div>

      <CardContent className="w-full py-2 space-y-1 h-20 text-gray-800">

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatRelativeDate(createdAt.toLocaleDateString())}</span>
          </div>
        {/* Title */}
        <h3 className="text-wrap text-sm leading-tight line-clamp-2 font-extrabold transition-colors">
          {title}
        </h3>

      </CardContent>
    </Card>

    
      <Suspense fallback={<div className="p-6 text-center text-gray-400">Chargement...</div>}>
        {isModalOpen && (
          <VideoModal video={videosData.find((video) => video.id === id) ?? emptyVideo} isOpen={isModalOpen} onClose={closeModal} />
        )}
      </Suspense>
    </>
  )
}
