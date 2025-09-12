import LiveVideoComponent from "@/components/mediaComponent/LiveVideoComponent";
import DownloadAppBanner from "@/components/separateur/DownloadAppBanner";
import ReplaySection from "@/components/homeScreen/ReplaySection";

const TVLive = () => {
   
  return (
    <div className="h-full min-h-screen flex flex-col bg-[url('/images/bgForBlur.webp')] bg-cover bg-center">


        <section className="flex flex-col flex-1 max-sm:mt-0.5 backdrop-blur-sm bg-black/50">
          {/*la partie Live*/}
          <div className="w-full md:mt-20 xl:mt-16 max-sm:mt-20">
            <LiveVideoComponent />
          </div>

          <div className="w-full">
            <div className="mx-3.5">
              <DownloadAppBanner />
            </div>

            <ReplaySection />
          </div>

        </section>


    </div>
  )
}

export default TVLive