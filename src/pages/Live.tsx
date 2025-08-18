import LiveVideoComponent from "@/components/mediaComponent/LiveVideoComponent";
import Footer from "../components/Footer"
import Header from "../components/NavBar"

import { SlideSection } from "../components/homeScreen/SlideSection";

export const TVLive = () => {
   
  return (
    <div className="h-full bg-white">

        <section>
          <Header />
        </section>

        <section className="flex flex-col my-4 gap-y-4">
          {/*la partie Live*/}
          <div className="w-full rounded-2xl">
            <LiveVideoComponent />
          </div>

          <div className="flex w-full my-3 items-center justify-center
          max-sm:p-2 lg:p-10 md:p-5 xl:p-10 p-4">
            <p className="text-wrap text-center font-bold text-xl text-gray-900 lg:text-xl max-sm:text-xs mx-40 max-sm:mx-2 md:mx-6">
              Découvrez des contenus exclusifs, des émissions en direct et des vidéos à la demande, disponibles 24h/24 et 7j/7.
            </p>
          </div>

          <SlideSection />

        </section>

        <section> 
            <Footer />
        </section>

    </div>
  )
}
