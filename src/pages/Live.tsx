import Footer from "../components/Footer"
import Header from "../components/NavBar"
import LiveVideo from "../components/mediaComponent/LiveVideoComponent";
import { SlideSection } from "../components/homeScreen/SlideSection";

export const TVLive = () => {
   
  return (
    <div className="h-full bg-gray-900">

        <section>
          <Header />
        </section>

        <section className="flex flex-col my-4 sm: mx-0 md:px-10 lg:mx-3 xl:mx-10 gap-y-4 items-center justify-center">
          <div className="w-full mb-4">
            <h1 className="text-6xl text-wrap text-white font-extrabold text-center max-sm:text-2xl max-md:text-3xl max-lg:text-4xl">Votre Chaîne de Télévision en Direct</h1>
          </div>
          {/*la partie Live*/}
          <div className="bg-gray-800 w-full rounded-2xl">
          <LiveVideo id="test1"
                     title="Live Exclusif : Émission du Matin"
                     description=" Bienvenue sur notre chaîne ! Suivez en direct notre émission spéciale du matin
                      avec des invités passionnants et les dernières actualités. Ne manquez rien de l'action en temps réel !"
                     startTime="2025-08-07T19:00:00Z"
                     endingTime="2025-08-07T21:00:00Z"
                     Miniature="https://i.pinimg.com/1200x/d5/dd/e9/d5dde97c93285ba636019e4806c9eb64.jpg"
                     lien="https://www.youtube.com/live/EbgPzZ-sHFk?si=OhL_tA32Zfn-C-aj"
                     category={["Live", "Streaming", "Emission", "Eglise"]}
                     />
          </div>

          <div className="flex w-full my-3 items-center justify-center
          max-sm:p-2 lg:p-10 md:p-5 xl:p-10 bg-gray-900 p-4">
            <p className="text-wrap text-center text-white text-2xl font-bold max-sm:text-xs mx-40 max-sm:mx-2 md:mx-6">
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
