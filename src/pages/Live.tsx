import LiveVideoComponent from "@/components/mediaComponent/LiveVideoComponent";
import Footer from "../components/Footer"
import Header from "../components/NavBar"

import { SlideSection } from "../components/homeScreen/SlideSection";
import { EmissionSlideSection } from "@/components/homeScreen/EmissionSlideSection";

export const TVLive = () => {
   
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">

        <section className="z-10">
          <Header />
        </section>

        <section className="flex flex-col flex-1 max-sm:my-0.5 backdrop-blur-sm bg-black/50">
          {/*la partie Live*/}
          <div className="w-full md:mt-20 xl:mt-20 max-sm:mt-20">
            <LiveVideoComponent />
          </div>

          <div className="w-full bg-white">
            <EmissionSlideSection />
            <SlideSection />
          </div>

        </section>

        <section> 
            <Footer />
        </section>

    </div>
  )
}
