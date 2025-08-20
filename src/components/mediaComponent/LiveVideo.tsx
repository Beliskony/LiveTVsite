import React from "react"
import { liveData } from "@/data/liveData"

const LiveVideo = () => {
  const live = liveData

  return (
    
      <div className="w-full h-full flex flex-col">
        <iframe
          src={`${live.lien}?autoplay=1&loop=1`}
          title={live.title}
          className="w-full h-full rounded-lg"
          allow="autoplay; fullscreen; picture-in-picture"
        />

         {/* Infos par-dessus */}
          <div className="absolute top-17 left-1 p-4 rounded-lg bg-black/50 text-white max-w-md
                  max-sm:hidden">
            <h1 className="text-lg font-bold max-sm:text-lg">Vous suivez actuellement le live</h1>
            <h2 className="text-xs font-bold mt-2 max-sm:text-lg">{live.title}</h2>
            <p className="mt-2 text-sm">{live.description}</p>
  </div>
      </div>
  )
}

export default LiveVideo
