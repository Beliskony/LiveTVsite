'use client'

import { useEffect, useState } from "react";
import VideoCarousel from "../mediaComponent/Videos-carousel";
import { videosData } from "../../data/videosData";
import type { IVideo } from "@/interfaces/Videos";
import { data } from "react-router-dom";

interface optionShow {
  textVues: string
}

export const SlideSection = (valeur: optionShow) => {
  const [videos, setVideos] = useState<IVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://api.yeshouatv.com/api/videos")
     .then((res) => res.json())
     .then((data: IVideo[]) =>{ const formatted = data.map(video => ({...video, createdAt: new Date(video.createdAt), 
     }))
     setVideos(formatted)
    })
    .catch(() => setError("Erreur lors du chargement des videos"))
    .finally(() => setLoading(false)) 
  }, [])

    return(
          <div className="flex flex-col items-start justify-start p-6 max-sm:p-0.5 max-sm:mb-3 w-full space-y-2.5">
            {/*la partie des videos recommander*/}
            <div className="flex flex-col mx-auto max-sm:px-2 items-start justify-center w-full space-y-2.5">
              <h3 className={`text-2xl font-normal text-[16px] md:text-[24px]  xl:pl-32 py-5 text-white ${valeur}`}>
                contenues populaires
              </h3>
            </div>
            
               <VideoCarousel videos={videosData} /> {/*remplacer videosData par videos le moment venu*/}
            
          </div>
        )
}