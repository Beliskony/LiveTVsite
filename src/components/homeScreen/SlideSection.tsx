'use client'

import { useEffect, useState } from "react";
import VideoCarousel from "../mediaComponent/Videos-carousel";
import type { IVideo } from "@/interfaces/Videos";
import { SkeletonVideoCard } from "../Skeletons/SkeletonVideoCard";


interface optionShow {
  textVues: string
}

export const SlideSection = ({textVues}: optionShow) => {
  const [video, setVideos] = useState<IVideo[]>([])


  const fetchVideos = async () => {
  try {
    const res = await fetch("https://chunk.yeshouatv.com/api/list_videos_for_user", {
      method: "GET",
    })
    if (!res.ok) throw new Error("Erreur lors du chargement des vidéos")
    const result = await res.json()

    if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }
    setVideos(result.data || [])
  } catch (error) {
    console.error("Erreur lors du chargement des vidéos")
  }
}

useEffect(() => {
  fetchVideos()
}, [])

    return(
          <div className="flex flex-col items-start justify-start p-6 max-sm:p-0.5 max-sm:mb-3 w-full space-y-2.5">
            {/*la partie des videos recommander*/}
            <div className="flex flex-col mx-auto max-sm:px-2 items-start justify-center w-full space-y-2.5">
              <h3 className={`text-2xl font-normal text-[16px] md:text-[24px]  xl:pl-32 py-5 text-white ${textVues}`}>
                contenues populaires
              </h3>
            </div>
            
               {video.length === 0 ? (
                <SkeletonVideoCard />
                ) : (
                  <VideoCarousel videos={video} />
                )}

            
          </div>
        )
}