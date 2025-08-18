import { useEffect, useRef } from "react";
import { formatRelativeDate } from "../../utilitaires/FormatDate";
import Hls from "hls.js";
import type { ILive } from "@/interfaces/Live";
import { liveData } from "@/data/liveData";
import LiveVideo from "./LiveVideo";



const LiveVideoComponent = () => {
   const liveVideoRef = useRef<HTMLVideoElement>(null);
   const liveProps = liveData;

   useEffect(() => {
    if (Hls.isSupported() && liveVideoRef.current) {
      const hls = new Hls()
      hls.loadSource(liveProps.lien?? "")
      hls.attachMedia(liveVideoRef.current)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        liveVideoRef.current?.play()
      })

      return () => {
        hls.destroy()
      }
    } else if (liveVideoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support for Safari
      liveVideoRef.current.src = liveProps.lien?? ""
      liveVideoRef.current.addEventListener("loadedmetadata", () => {
        liveVideoRef.current?.play()
      })
    }
  }, [liveProps.lien])

  return (
    <section className="flex flex-row md:flex-col lg:flex-col items-center gap-x-10 max-sm:gap-y-2 max-sm:px-1 justify-between w-full
       max-sm:flex-col md:gap-y-2.5 md:p-3 xl:flex-row 2xl:flex-row md:px-4 lg:px-10">
       <div className="w-4/6 md:w-full max-sm:w-full h-[450px] flex flex-col">
          <LiveVideo/>
       </div>
            <div className="w-2/6 md:w-full md:flex-col flex flex-col max-sm:w-full">
              <div className="flex flex-col max-sm:p-4 md:p-5 lg:p-5 xl:p-7 bg-gray-900 w-full rounded-xl h-52 overflow-hidden">
                  <h2 className="text-2xl font-bold mb-2 text-white text-wrap">
                    {liveProps.title}
                  </h2>

                  <div className="flex flex-col overflow-y-auto overflow-x-hidden break-words h-[300px] custom-scrollbar">
                    <p className="text-sm w-full h-full flex flex-col text-gray-300 leading-relaxed">
                      {liveProps.description}
                    </p>
                  </div>
              </div>

              <div className="w-full rounded-xl my-2">
                <div className="flex flex-col items-start justify-start p-4 bg-gray-900 rounded-xl h-full">
                  <div className="flex flex-row items-center justify-between w-full mb-2">
                    <p className="text-sm text-gray-400 mb-2">
                      Début: {liveProps.startTime?? "0"}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      Fin: {liveProps.endingTime?? "0"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 my-0.5">
                    {liveProps.category && liveProps.category.map((cat, index) => (
                      <span key={index} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>

                    <div className="mt-2 w-full h-24 rounded-lg">
                      <img src={liveProps.Miniature || "/placeholder.svg"} alt={liveProps.title} className="w-full h-24 object-cover rounded-lg" />
                    </div>
                </div>
              </div>
            </div>

          </section>
  )
}

export default LiveVideoComponent