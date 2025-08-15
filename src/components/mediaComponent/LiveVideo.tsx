import React from "react"
import { liveData } from "@/data/liveData"

const LiveVideo = () => {
  const live = liveData

  return (
    
      <div className="w-4/6 md:w-full max-sm:w-full sm:h-[200px] md:h-[300px] lg:h-[350px] xl:h-full 2xl:h-full flex flex-col">
        <iframe
          src={live.lien}
          title={live.title}
          className="w-full h-full rounded-lg bg-white shadow-lg border border-gray-900"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
  )
}

export default LiveVideo
