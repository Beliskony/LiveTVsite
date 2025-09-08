
import { SlideSection } from "../components/homeScreen/SlideSection";
import { EmissionSlideSection } from "../components/homeScreen/EmissionSlideSection";
import TestimonialSection from "../components/homeScreen/TestimonialSection";
import FeaturesListSection from "../components/homeScreen/FeaturesListSection";
import { EmissionCarouselForEmission } from "@/components/EmblaCarouselForEmission";

const Acceuil = () => {
   
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.webp')] bg-cover bg-center">

        <section className="z-10">
          <EmissionCarouselForEmission/>
        </section>

        <section className="flex flex-col flex-1 max-sm:mt-0.5 backdrop-blur-sm bg-black/50">
          
          <SlideSection textVues="hidden" />

          <EmissionSlideSection />

        {/*Testimonial*/}
          <TestimonialSection/>

        
        {/*OtherSection*/}
          <FeaturesListSection/>

        </section>


    </div>
  )
}

export default Acceuil
