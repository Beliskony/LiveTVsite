import { useState } from "react";
import VideoCarousel from "../mediaComponent/Videos-carousel";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { videosData } from "../../data/videosData";
import { Link } from "react-router-dom";

export const SlideSection = () => {
    const [isHovered, setIsHoverred] = useState(false)
    return(
          <div className="flex flex-col items-start justify-start p-6 max-sm:p-0.5 bg-white w-full space-y-2.5">
            {/*la partie des videos recommander*/}
            <div className="flex flex-col mx-auto max-sm:px-2 items-start justify-center w-full space-y-2.5">
              <h3 className="text-xl font-bold lg:text-4xl xl:text-6xl xl:pl-32 py-5">
                contenues populaires
              </h3>
            </div>
               <VideoCarousel videos={videosData} />
            
           {/* <div className="w-full flex my-7 justify-center items-center">
              <Link to="/catalogue"> 
                <button
                onMouseEnter={() => setIsHoverred(true)}
                onMouseLeave={() => setIsHoverred(false)}
                className="flex flex-row w-60 h-10 justify-center items-center rounded-2xl bg-gray-900 space-x-1
                hover:scale-110 transition-all">
                  <h3 className="text-white text-lg">Voir toutes les videos</h3>
                  {isHovered ? (<ArrowUpRight className="text-white mt-0.5 transition-transform duration-300 ease-in-out"/>
                ):(
                    <ArrowRight className="text-white mt-0.5 transition-transform duration-300 ease-in-out"/>
                )}
                     
                    
                </button>
              </Link>
            </div> */}
           
          </div>
        )
}