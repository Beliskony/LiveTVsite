import { Telescope, HeartHandshake, PictureInPicture } from "lucide-react"

const TestimonialSection = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center py-10 lg:min-h-[500px] xl:min-h-[550px] 2xl:min-h-[600px] gap-y-16">
        <div className="flex flex-col w-full gap-y-4 mb-3 lg:mb-7 xl:mb-10">
            <h1 className="text-gray-900 font-bold text-3 lg:text-5xl text-center text-wrap">Explorez nos ressources & programmes</h1>

            <p className="text-gray-600 text-lg text-center text-wrap">Devertissement, Religion, Decouverte, Culture sont au rendez-vous</p>
        </div>

        <div className="justify-self-center space-y-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full">
            <div className="flex flex-col justify-center items-center">
                <Telescope size={70} className="hover:scale-125"/>
                <h3 className="text-2xl underline">Découverte</h3>
                <p>Découvrez de nouveau horizon sur le monde</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <PictureInPicture size={70} className="hover:scale-125"/>
                <h3 className="text-2xl underline">Divertissement</h3>
                <p>Des emissions de jeunesse</p>
            </div>

            <div className="flex flex-col justify-center items-center">
                <HeartHandshake size={70} className="hover:scale-125"/>
                <h3 className="text-2xl underline">Cultures</h3>
                <p>Découvrez les culutures de ce monde</p>
            </div>

        </div>

    </div>
  )
}

export default TestimonialSection