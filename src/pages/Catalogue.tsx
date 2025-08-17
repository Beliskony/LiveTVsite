import Footer from '../components/Footer'
import Header from '../components/NavBar'
import HeroSliderVideo from '../components/videoScreen/HeroSliderVideo'
import { VideoSectionFilter } from '../components/videoScreen/VideosSecrionFilter'

export const Catalogue = () => {
  return (
    <div className="h-full bg-white">
        <section>
          <Header />
        </section>
        
        <section className='flex flex-col justify-center items-center'>
          <HeroSliderVideo />

          <VideoSectionFilter />
        </section>
        
        <section> 
            <Footer />
        </section>
    </div>
  )
}
