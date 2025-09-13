
import ProgrammesGrid from "@/components/programmesPage/ProgrammesListGrid"

 const Programmes = () => {
  return (
    <div className="min-h-screen h-full flex flex-col bg-[url('/images/bgForBlur.webp')] bg-cover bg-center">
        
        <section className="flex flex-col flex-1 max-sm:mt-0.5 backdrop-blur-3xl bg-black/80">
          {/* Programmes list */}
          <div className="w-full md:mt-20 xl:mt-20 max-sm:mt-20 xl:px-10">
            <ProgrammesGrid/>
          </div>
        
        </section>

    </div>
  )
}

export default Programmes