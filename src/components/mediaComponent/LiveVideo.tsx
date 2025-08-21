import React from "react"
import { liveData } from "@/data/liveData"

const LiveVideo = () => {
  const live = liveData

  return (
    <div className="w-full h-full flex flex-col lg:flex-row lg:p-16 xl:p-16 gap-4 justify-center items-center">
      {/* Vidéo à gauche */}
      <div className="w-full px-5 md:px-5 lg:w-8/12 xl:w-7/12 max-sm:h-[250px] h-[400px] lg:h-[450px]">
        <iframe
          src={`${live.lien}?autoplay=1&loop=1`}
          title={live.title}
          className="w-full h-full rounded-md"
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>

      {/* Infos à droite */}
      <div className="w-full px-7 md:px-7 lg:w-4/12 xl:w-5/12 lg:px-2 xl:px-10 text-white text-left">
        <h1 className="text-3xl max-sm:text-xl lg:text-2xl font-bold">Vous suivez actuellement le live</h1>
        <h2 className="text-xl max-sm:text-lg font-semibold mt-2">{live.title}</h2>
        <p className="mt-2 text-sm max-sm:hidden md:hidden lg:flex">{live.description}</p>
      </div>
    </div>
  )
}

export default LiveVideo
