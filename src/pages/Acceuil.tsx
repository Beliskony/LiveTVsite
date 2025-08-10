import Footer from "../components/Footer"
import Header from "../components/NavBar"
import { SlideSection } from "../components/homeScreen/SlideSection";
import { EmissionSlideSection } from "../components/homeScreen/EmissionSlideSection";
import HeroHeaderSection from "../components/homeScreen/HeroHeaderSection";
import TestimonialSection from "../components/homeScreen/TestimonialSection";
import FeaturesListSection from "../components/homeScreen/FeaturesListSection";
import NewsletterSection from "../components/homeScreen/NewsletterSection";

export const Acceuil = () => {
   
  return (
    <div className="h-full bg-gray-200">

        <section>
          <Header />
        </section>

        <section className="flex flex-col items-center justify-center">
         
          {/*la partie Hero */}
          <div className="bg-gray-800 w-full">
            <HeroHeaderSection/>
          </div>

        {/*Testimonial*/}
          <div className="w-full">
            <TestimonialSection/>
          </div>
        
        {/*OtherSection*/}
        <div className="w-full bg-white">
            <FeaturesListSection/>
        </div>
          
          <SlideSection />

          <EmissionSlideSection />
          
          <NewsletterSection/>

        </section>

        <section> 
            <Footer />
        </section>

    </div>
  )
}
