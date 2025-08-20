import React from 'react'

const DownloadAppBanner = () => {
  return (
    <div className="border-b-2 border-gray-900 flex flex-row max-sm:flex-col gap-x-2 max-sm:gap-y-2 items-center lg:justify-start md:justify-center w-full text-gray-900 px-2 md:px-7
     lg:px-10 xl:px-16 xl:pb-2.5 2xl:pb-2.5 lg:pb-2.5 md:pb-2.5 my-5 max-sm:pb-1 shadow-2xl">
            <h1 className="text-left font-medium">Télécharger l'applicaton{""} <span className="font-bold">YeshouaApp</span></h1>
       
            <button onClick={() => {}} className="bg-gray-800 border border-gray-800 shadow-xl flex flex-row items-center justify-center gap-x-1 px-2 rounded-lg cursor-pointer
            hover:scale-105 transition-transform duration-300">
                <img src="/playStoreBlanc.svg" alt="Google Play" className="h-5" />
                <div className='flex flex-col items-start justify-start'>
                    <span className="text-white text-xs">Télécharger l'application</span>
                    <span className="text-white text-lg font-semibold">Google Play</span>
                </div>
            </button>

            <button onClick={() => {}} className="bg-gray-800 border border-gray-400 shadow-xl flex flex-row items-center justify-center gap-x-1 px-2 rounded-lg cursor-pointer
            hover:scale-105 transition-transform duration-300">
                <img src="/appleStoreBlanc.svg" alt="App Store" className="h-5" />
                <div className='flex flex-col items-start justify-start'>
                    <span className="text-white text-xs">Télécharger l'application</span>
                    <span className="text-white text-lg font-semibold">App Store</span>
                </div>
            </button>
     

    </div>
  )
}

export default DownloadAppBanner