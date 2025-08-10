import { Star } from "lucide-react"

const FeaturesListSection = () => {
  return (
    <div className="flex flex-col lg:min-h-[400px] xl:min-h-[500px] border-b border-gray-700 p-10 lg:p-16 xl:p-20 md:flex-row lg:flex-row xl:flex-row justify-center xl:justify-start lg:justify-start items-center">
        <div className="flex flex-col w-full lg:w-1/2 xl:w-1/2 text-left gap-y-7">
            <h2 className="text-gray-900 text-3xl lg:text-5xl  font-bold text-wrap">Accédez à nos contenus où que vous soyez.</h2>
            <p className="text-gray-500 text-lg font-medium">Profitez de nos messages et événements sur tous vos appareils, sans interruption</p>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 xl:w-1/2 text-left gap-y-7 lg:p-4 xl:p-7">
            <div className="space-x-1.5 flex flex-row items-center">
                <Star size={25} color="gold"/>
                <p className="text-gray-900 font-semibold">Qualité Vidéo Optimale</p>
            </div>

            <div className="space-x-1.5 flex flex-row items-center">
                <Star size={25} color="gold"/>
                <p className="text-gray-900 font-semibold">Multi-appareils</p>
            </div>

            <div className="space-x-1.5 flex flex-row items-center">
                <Star size={25} color="gold"/>
                <p className="text-gray-900 font-semibold">Programmes multiple</p>
            </div>
        </div>
    </div>
  )
}

export default FeaturesListSection