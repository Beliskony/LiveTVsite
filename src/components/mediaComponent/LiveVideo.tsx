import React from "react"
import { liveData } from "@/data/liveData"

const LiveVideo = () => {
  const live = liveData

  return (
    
      <div className="w-full h-full flex flex-col p-4">
        <iframe
          src={live.lien}
          title={live.title}
          className="w-full h-full rounded-lg"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
  )
}

export default LiveVideo
