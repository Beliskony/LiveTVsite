import { useEffect, useRef } from "react";
import { formatRelativeDate } from "../../utilitaires/FormatDate";
import Hls from "hls.js";

interface Live {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO 8601 format
  endingTime: string; // ISO 8601 format
  Miniature: string; // URL to the thumbnail image
  category?: string[]; // Category of the live stream
  lien: string;
}



const LiveVideo = (liveProps: Live) => {
   const liveVideoRef = useRef<HTMLVideoElement>(null);

   useEffect(() => {
    if (Hls.isSupported() && liveVideoRef.current) {
      const hls = new Hls()
      hls.loadSource(liveProps.lien)
      hls.attachMedia(liveVideoRef.current)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        liveVideoRef.current?.play()
      })

      return () => {
        hls.destroy()
      }
    } else if (liveVideoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support for Safari
      liveVideoRef.current.src = liveProps.lien
      liveVideoRef.current.addEventListener("loadedmetadata", () => {
        liveVideoRef.current?.play()
      })
    }
  }, [liveProps.lien])

  return (
    <div className="relative w-full max-w-screen-xl mx-auto my-3 flex flex-col items-center justify-center">
       <div className="flex flex-row md:flex-col lg:flex-col items-center gap-x-10 max-sm:gap-y-2 max-sm:px-1 justify-between w-full
       max-sm:flex-col md:gap-y-2.5 md:p-3 xl:flex-row 2xl:flex-row">
            <div className="w-4/6 md:w-full max-sm:w-full sm:h-[200px] md:h-[300px] lg:h-[350px] xl:h-[375px] 2xl:h-[400px] flex flex-col">
              <video
                ref={liveVideoRef}
                className="w-full h-full rounded-lg bg-white shadow-lg border border-gray-900"
                controls
                autoPlay
                playsInline
                poster={liveProps.Miniature || "/placeholder.svg"}
              >
                Your browser does not support the video tag.
              </video>

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
                      Début: {formatRelativeDate(liveProps.startTime)}
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      Fin: {formatRelativeDate(liveProps.endingTime)}
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

          </div>
        
    </div>
  )
}

export default LiveVideo