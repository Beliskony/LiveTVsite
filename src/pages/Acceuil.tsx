import Footer from "../components/Footer"
import Header from "../components/NavBar"
import { SlideSection } from "../components/homeScreen/SlideSection";
import { EmissionSlideSection } from "../components/homeScreen/EmissionSlideSection";
import TestimonialSection from "../components/homeScreen/TestimonialSection";
import FeaturesListSection from "../components/homeScreen/FeaturesListSection";
import { EmissionCarouselForEmission } from "@/components/EmblaCarouselForEmission";

export const Acceuil = () => {
   
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">

        <section className="z-10">
          <Header />
          <EmissionCarouselForEmission/>
        </section>

        <section className="flex flex-col flex-1 max-sm:my-0.5 backdrop-blur-sm bg-black/50">
          
          <SlideSection textVues="hidden" />

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
