import { Button } from "@/components/ui/button"

export function HeroSectionPre() {
  return (
    <section className="relative h-screen md:h-[500px] max-sm:h-[400px] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/presentationBG.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-sans text-white text-5xl md:text-7xl max-sm:text-3xl font-bold mb-6 hover:text-gray-900 hover:scale-125 hover:transition-all hover:ease-in-out hover:delay-100">Église de Yeshoua</h1>
        <p className="font-serif text-white text-xl md:text-2xl max-sm:text-xs mb-8 leading-relaxed">
          Une communauté de foi accueillante où chacun trouve sa place dans l'amour de Dieu
        </p>
      </div>
    </section>
  )
}
