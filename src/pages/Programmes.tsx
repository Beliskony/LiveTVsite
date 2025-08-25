import Header from '@/components/NavBar'
import Footer from '../components/Footer'
import { ProgrammesGrid } from '@/components/programmesPage/ProgrammesListGrid'

export const Programmes = () => {
  return (
    <div className="h-screen flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">

        <section className="z-10">
          <Header />
        </section>
        
        <section className="flex flex-col flex-1 max-sm:my-0.5 backdrop-blur-2xl bg-gray-100/10">
          {/* Programmes list */}
          <div className="w-full md:mt-20 xl:mt-20 max-sm:mt-20 xl:px-10">
            <ProgrammesGrid />
          </div>
        
        </section>
        
        <section> 
            <Footer />
        </section>
    </div>
  )
}
