import { formatRelativeDate } from "@/utilitaires/FormatDate"
import { formatViews } from "@/utilitaires/FormatViews"
import { useState } from "react"
import type { IVideo } from "@/interfaces/Videos"
import { Eye, Play, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VideoModal } from "./VideoModal"
import { videosData } from "@/data/videosData"



export const VideoCard = (video: IVideo) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

    const {
    id,
    title,
    description,
    category,
    duration,
    views,
    createdAt,
    videoUrl,
    Miniature
  } = video;
  
  return (
    <>
    <Card className="group w-[350px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <video
          src={videoUrl}
          controls={false}
          preload="metadata"
          className="justify-self-center object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Duration badge */}
        {duration && (
          <Badge variant="secondary" className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </Badge>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="lg"
            className="rounded-full bg-white/90 text-black hover:bg-white hover:scale-110 transition-all duration-200"
            asChild
          >
            <button onClick={openModal}>
              {/* Play icon */}
              <Play className="h-6 w-6" />
            </button>
            
          </Button>
        </div>
      </div>

      <CardContent className="w-full py-2 space-y-1 h-[220px] bg-gray-800 text-white">
        {/* Title */}
        <h3 className="m-0 font-medium text-wrap text-lg leading-tight line-clamp-2 group-hover:text-white hover:font-extrabold transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="m-0 text-sm text-muted-foreground text-wrap line-clamp-3 leading-relaxed">{description}</p>

        {/* Categories */}
        {category && category.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {category && (
              <Badge variant="outline" className="text-xs text-white">
                {category}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between border-t mt-3 pt-1.5">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{formatRelativeDate(createdAt.toLocaleDateString())}</span>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatViews(views ?? 0)}</span>
            </div>
          </div>

          <Button variant="ghost" size="sm" asChild>
            <button onClick={openModal} className="text-white hover:bg-white hover:text-gray-900">
              Regarder
            </button>
          </Button>
        </div>
      </CardContent>
    </Card>

    <VideoModal video={videosData.find(video => video.id === id) ?? {id: "", title: "", description: "", createdAt: new Date(), duration: "", views: 0, Miniature: "", category: "", status: "draft", videoUrl: ""}}
                isOpen={isModalOpen}
                onClose={closeModal}/>

    </>
  )
}
