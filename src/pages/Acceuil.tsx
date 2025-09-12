
import ProgrammesParJourSlider from "@/components/homeScreen/EmissionSlideSection";
import { EmissionCarouselForEmission } from "@/components/EmblaCarouselForEmission";
import TVPresentation from "@/components/homeScreen/TvPresentation";



const Acceuil = () => {
   
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.webp')] bg-cover bg-center">

        <section className="z-10 bg-black/70 backdrop-blur-3xl">
          <EmissionCarouselForEmission/>
        </section>

        <section className="flex flex-col flex-1 max-sm:py-5 pt-12 backdrop-blur-3xl bg-black/50">

          <ProgrammesParJourSlider/>

        {/* TV presentation*/}
          <TVPresentation />

        </section>


    </div>
  )
}

export default Acceuil
