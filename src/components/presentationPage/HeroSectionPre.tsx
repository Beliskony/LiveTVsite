import { Button } from "@/components/ui/button"

export function HeroSectionPre() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
        }}
      />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="font-sans text-5xl md:text-7xl font-bold text-foreground mb-6">Église de la Grâce</h1>
        <p className="font-serif text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Une communauté de foi accueillante où chacun trouve sa place dans l'amour de Dieu
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            Rejoignez-nous
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
            Découvrir nos services
          </Button>
        </div>
      </div>
    </section>
  )
}
