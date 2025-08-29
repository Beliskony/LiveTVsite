import ContactPage from '@/components/contactScreen/ContactFormTV'

export const ContactTV = () => {
  return (
    <div className="h-full flex flex-col bg-[url('/images/bgForBlur.jpg')] bg-cover bg-center">
        
        <section className="flex flex-col flex-1 max-sm:my-0.5 backdrop-blur-xl bg-black/50">
          <div className="w-full md:mt-20 xl:mt-20 max-sm:mt-20 xl:px-10">
            <ContactPage />
          </div>

          <div className='w-full h-full py-2 px-2 md:px-4 lg:px-11'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.721269908783!2d-3.993052125525082!3d5.3061176361129485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb3558694319%3A0xe88522adb90468d6!2sEGLISE%20D&#39;ADONAI%20YESHOUA%20HA%20MAHSHYAH!5e0!3m2!1sfr!2sci!4v1756461261044!5m2!1sfr!2sci" 
            width="100%" height="450" loading="lazy">

            </iframe>
          </div>
        </section>
        
    </div>
  )
}
