import { useState } from "react";
import { ChartColumn, Video, CalendarDays, Radio, FileSpreadsheet } from "lucide-react";
import VideoManager from "./VideoManager";
import ProgramManager from "./ProgramManager";
import { AdminDashboard } from "./AdminDashbord";
import { LivePreview } from "./LivePreview";
import LiveManager from "./LiveManager";
import ArticleManager from "./ArticleManager";

const ChoixMenu = () => {
    const [choice, setChoice] = useState(1)

    const renduContenu = () => {
        switch (choice) {
            case 1: 
                return <AdminDashboard />;
            
            case 2:
                return <VideoManager/>;
            
            case 3:
                return <ProgramManager/>;
            
            case 4:
                return <LiveManager />;
            
            case 5:
                return <ArticleManager />
            
            default:
                return <AdminDashboard />;
        }
    }

    return (
        <div className=" flex flex-col w-full p-5 md:p-7 lg:p-10 gap-x-2 items-center">
            <div className="lg:flex lg:flex-row xl:flex xl:flex-row grid grid-cols-2 w-full lg:h-10 xl:h-10 my-5 lg:w-[500px] xl:w-[750px]
            xl:space-x-9 space-x-0 p-3 justify-center items-center bg-gray-300 rounded-2xl">
                
                {/*La navigation*/}
                <button onClick={() => setChoice(1)} className={`flex flex-row gap-x-2 h-full p-4 items-center rounded transition-all duration-300 ease-in-out ${choice===1 ? 'bg-white shadow-md scale-105' : 'bg-transparent hover:bg-white/30'}`}>
                    <ChartColumn />
                    <h4 className="text-gray-900 text-sm">Dashboard</h4>
                </button>

                <button onClick={() => setChoice(2)} className={`flex flex-row gap-x-2 h-full p-4 items-center rounded transition-all duration-300 ease-in-out ${choice===2 ? 'bg-white shadow-md scale-105' : 'bg-transparent hover:bg-white/30'}`}>
                    <Video />
                    <h4 className="text-gray-900 text-sm">Videos</h4>
                </button>

                <button onClick={() => setChoice(3)} className={`flex flex-row gap-x-2 h-full p-4 items-center rounded transition-all duration-300 ease-in-out ${choice===3 ? 'bg-white shadow-md scale-105' : 'bg-transparent hover:bg-white/30'}`}>
                    <CalendarDays />
                    <h4 className="text-gray-900 text-sm">Programme</h4>
                </button>

                <button onClick={() => setChoice(4)} className={`flex flex-row gap-x-2 h-full p-4 items-center rounded transition-all duration-300 ease-in-out ${choice===4 ? 'bg-white shadow-md scale-105' : 'bg-transparent hover:bg-white/30'}`}>
                    <Radio />
                    <h4 className="text-gray-900 text-sm">Live</h4>
                </button>

                <button onClick={() => setChoice(5)} className={`flex flex-row gap-x-2 h-full p-4 items-center rounded transition-all duration-300 ease-in-out ${choice===5 ? 'bg-white shadow-md scale-105' : 'bg-transparent hover:bg-white/30'}`}>
                    <FileSpreadsheet />
                    <h4 className="text-gray-900 text-sm">Article</h4>
                </button>

            </div>

            {/*Contenu de l'onglet actif*/}
            <div key={choice} className="w-full">
                    {renduContenu()}
            </div>

        </div>
    )
}

export default ChoixMenu