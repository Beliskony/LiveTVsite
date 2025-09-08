import LiveVideoComponent from "@/components/mediaComponent/LiveVideoComponent";


import { SlideSection } from "../components/homeScreen/SlideSection";
import { EmissionSlideSection } from "@/components/homeScreen/EmissionSlideSection";
import DownloadAppBanner from "@/components/separateur/DownloadAppBanner";

const TVLive = () => {
   
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.webp')] bg-cover bg-center">


        <section className="flex flex-col flex-1 max-sm:mt-0.5 backdrop-blur-sm bg-black/50">
          {/*la partie Live*/}
          <div className="w-full md:mt-20 xl:mt-16 max-sm:mt-20">
            <LiveVideoComponent />
          </div>

          <div className="w-full">
            <div className="mx-3.5">
              <DownloadAppBanner />
            </div>
            <EmissionSlideSection />
            <SlideSection textVues="" />
          </div>

        </section>


    </div>
  )
}

export default TVLive