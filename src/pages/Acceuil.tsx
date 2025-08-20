import Footer from "../components/Footer"
import Header from "../components/NavBar"
import { SlideSection } from "../components/homeScreen/SlideSection";
import { EmissionSlideSection } from "../components/homeScreen/EmissionSlideSection";
import HeroHeaderSection from "../components/homeScreen/HeroHeaderSection";
import TestimonialSection from "../components/homeScreen/TestimonialSection";
import FeaturesListSection from "../components/homeScreen/FeaturesListSection";
import { EmissionCarouselForEmission } from "@/components/EmblaCarouselForEmission";
import DownloadAppBanner from "@/components/separateur/DownloadAppBanner";

export const Acceuil = () => {
   
  return (
    <div className="h-full">

        <section>
          <Header />
          <EmissionCarouselForEmission/>
        </section>

        <section className="flex flex-col items-center justify-center bg-white">
         <DownloadAppBanner />
          
          <SlideSection />

          <EmissionSlideSection />

        {/*Testimonial*/}
          <TestimonialSection/>

        
        {/*OtherSection*/}
          <FeaturesListSection/>

        </section>

        <section> 
            <Footer />
        </section>

    </div>
  )
}
