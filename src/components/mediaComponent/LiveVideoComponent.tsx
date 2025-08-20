import { useEffect, useRef } from "react";
import Hls from "hls.js";
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
    <section className="flex flex-col items-center max-sm:gap-y-0 justify-between w-full max-sm:flex-col md:gap-y-2.5">
       <div className="w-screen h-screen max-sm:h-[450px]">
          <LiveVideo/>
       </div>
       <div className="w-full text-white flex flex-row  max-sm:flex-col max-sm:px-2.5 max-sm:items-center max-sm:justify-center">
          
          <div className="w-full max-sm:h-[300px] p-5 my-4 max-sm:p-2 max-sm:mt-0.5">
            <h1 className="text-5xl font-bold mt-4">Vous suivez actuellement le live</h1>
            <h1 className="text-lg font-bold mt-4">{liveProps.title}</h1>
            <p className="mt-2">{liveProps.description}</p>
          </div>
       </div>

          </section>
  )
}

export default LiveVideoComponent