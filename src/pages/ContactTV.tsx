import Footer from '../components/Footer'
import Header from '@/components/NavBar'
import ContactPage from '@/components/contactScreen/ContactFormTV'

export const ContactTV = () => {
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">

        <section className='z-10'>
            <Header />
        </section>
        
        <section className="flex flex-col flex-1 max-sm:my-0.5 backdrop-blur-xl bg-black/50">
          <div className="w-full md:mt-20 xl:mt-20 max-sm:mt-20 xl:px-10">
            <ContactPage />
          </div>
        </section>
        
        <section> 
            <Footer />
        </section>
    </div>
  )
}
