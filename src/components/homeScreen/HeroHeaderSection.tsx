import { Link } from "react-router-dom"


const HeroHeaderSection = () => {
  return (
    <div className="w-full flex flex-col p-2 lg:p-10 lg:flex-row xl:flex-row 2xl:flex-row gap-y-3.5">
        <div className="w-full lg:1/2 xl:1/2 2xl:1/2 p-2 lg:p-10 flex flex-col justify-center items-start text-left space-y-3.5">
            <h2 className="text-5xl text-wrap font-bold text-white">Inspiration et partage à portée de main </h2>

            <p className="text-lg text-wrap text-gray-400 font-light">Accédez gratuitement à nos messages, cultes et événements.
                 Connectez-vous avec notre communauté, où que vous soyez.</p>
            
            <div className="flex flex-row gap-4">
                <div className="bg-gray-900 rounded p-2 font-medium text-white justify-center items-center
                hover:bg-white hover:text-gray-900">
                    <Link to={'/live'}>Live Streaming</Link>
                </div> 

                <div className="bg-white rounded p-2 font-medium text-gray-900 justify-center items-center
                hover:bg-gray-900 hover:text-white">
                    <Link to={'/catalogue'}>Nos Programmes</Link>
                </div> 
            </div>   
                 
        </div>


        <div className=" flex w-full justify-center items-center lg:1/2 xl:1/2 2xl:1/2">
            <iframe
                width="600px"
                height="400px"
                src="https://www.youtube.com/embed/lXbJSDHbrSA"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>

        </div>
    </div>
  )
}

export default HeroHeaderSection