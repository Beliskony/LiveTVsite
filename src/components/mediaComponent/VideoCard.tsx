import React, {Suspense, lazy} from "react"

import { formatRelativeDate } from "@/utilitaires/FormatDate"
import type { IVideo } from "@/interfaces/Videos"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


const VideoModal = lazy(() => import("@/components/mediaComponent/VideoModal"))

export const VideoCard = (video: IVideo) => {
  
  const { title, duration, createdAt, videoUrl, } = video;
  
  return (
    <>
    <Card
       className="group w-[350px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-video overflow-hidden">
        
        <video
          src={videoUrl}
          controls
          preload="metadata"
          muted={false}
          loop
          playsInline
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) =>{ e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
          className="w-full h-full max-h-[80vh] object-contain transition-transform duration-300 group-hover:scale-105"
        />
 
      </div>

      <CardContent className="w-full py-2 space-y-1 h-20 text-gray-800">

        <div className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
            <span>{formatRelativeDate(createdAt.toLocaleDateString())}</span>
            {/* Duration badge */}
         {duration && (
          <Badge variant="secondary" className=" bg-black/80 text-white hover:bg-black/80">
            <Clock className="mr-1 h-3 w-3" />
            {duration}
          </Badge>
          )}
        </div>
        {/* Title */}
        <h3 className="text-wrap text-sm leading-tight line-clamp-2 font-extrabold transition-colors">
          {title}
        </h3>

      </CardContent>
    </Card>    
</>
  )
}
