import React from 'react'
import Header from '@/components/NavBar'
import Footer from '@/components/Footer'
import { ArticlesGrid } from '@/components/articlesPage/ArticleGrid'

function ArticlesListePage() {
  return (
    <div className="h-full bg-white">

        <section>
          <Header />
        </section>

        <section className="flex flex-col items-center justify-center">

        {/*liste d'articles*/}
          <div className="w-full">
            <ArticlesGrid />
          </div>
        
        

        </section>

        <section> 
            <Footer />
        </section>

    </div>
  )
}

export default ArticlesListePage