import { useState } from "react";
import VideoCarousel from "../mediaComponent/Videos-carousel";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { videosData } from "../../data/videosData";

export const SlideSection = () => {
    const [isHovered, setIsHoverred] = useState(false)
    return(
          <div className="flex flex-col items-start justify-start p-6 bg-white w-full space-y-2.5">
            {/*la partie des videos recommander*/}
            <div className="flex flex-col max-sm:px-2 items-center justify-center w-full space-y-2.5">
              <h3 className="font-semibold text-gray-900 text-6xl max-sm:text-2xl">Recommander pour vous</h3>
              <p className="font-light text-gray-900 text-lg max-sm:text-xs">
                les contenues populaires du moment
              </p>
            </div>
               <VideoCarousel videos={videosData} />
            
            <div className="w-full flex my-7 justify-center items-center">
                <button onClick={() =>({})}
                onMouseEnter={() => setIsHoverred(true)}
                onMouseLeave={() => setIsHoverred(false)}
                className="flex flex-row w-60 h-10 justify-center items-center rounded-2xl bg-blue-600 space-x-1
                hover:scale-110 transition-all">
                  <h3 className="text-white text-lg">Voir toutes les videos</h3>
                  {isHovered ? (<ArrowUpRight className="text-white mt-0.5 transition-transform duration-300 ease-in-out"/>
                ):(
                    <ArrowRight className="text-white mt-0.5 transition-transform duration-300 ease-in-out"/>
                )}
                     
                     {/* si hover <ArrowUpRight className="text-white mt-0.5"/> avec une bonne animation */}
                </button>
            </div>
           
          </div>
        )
}