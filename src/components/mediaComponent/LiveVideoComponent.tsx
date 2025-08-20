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
       
      <div className="w-full xl:h-[560px] max-sm:h-[450px]">
          <LiveVideo/>
      </div>

    </section>
  )
}

export default LiveVideoComponent