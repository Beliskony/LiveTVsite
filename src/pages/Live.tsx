import LiveVideoComponent from "@/components/mediaComponent/LiveVideoComponent";
import ReplaySection from "@/components/homeScreen/ReplaySection";

const TVLive = () => {
   
  return (
    <div className="h-full min-h-screen flex flex-col bg-black bg-cover bg-center">


        <section className="flex flex-col flex-1 max-sm:mt-0.5 backdrop-blur-3xl">
          {/*la partie Live*/}
          <div className="w-full md:mt-20 xl:mt-16 max-sm:mt-20">
            <LiveVideoComponent />
          </div>

          <div className="w-full">

            <ReplaySection />
          </div>

        </section>


    </div>
  )
}

export default TVLive