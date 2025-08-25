import React from 'react'
import Header from '../components/NavBar'
import Footer from '../components/Footer'
import ChoixMenu from '../pagesAdmin/SwitchNav'

function Admin() {
  return (
    <div className="h-screen bg-gray-200">
    
            <section>
              <Header />
            </section>

            <section>
                <ChoixMenu />
            </section>


            <section> 
               <Footer />
            </section>

    </div>
  )
}

export default Admin