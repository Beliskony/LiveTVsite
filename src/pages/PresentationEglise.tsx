
import { HeroSectionPre } from '@/components/presentationPage/HeroSectionPre'
import { PastorSection } from '@/components/presentationPage/PastorSection'
import { CalendarSectionPre } from '@/components/presentationPage/CalendarSection'
import { TestimonialsSectionPre } from '@/components/presentationPage/TestmonialSectionPre'
import ArticleCarousel from '@/components/presentationPage/ArticlesSection'
import { AboutSection } from '@/components/presentationPage/AboutSection'


function PresentationEglise() {
  return (
    <div className="min-h-screen bg-background">

        <section>
            <HeroSectionPre />

            <AboutSection />

            <PastorSection />

            <CalendarSectionPre />

            <TestimonialsSectionPre />

            <ArticleCarousel />

        </section>

    </div>
  )
}

export default PresentationEglise