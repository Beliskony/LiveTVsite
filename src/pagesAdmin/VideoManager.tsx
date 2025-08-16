import { useState } from 'react'
import { VideoForm } from './VideosForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { VideoTable } from './VideoTable'
import { videosData } from '@/data/videosData'

const VideoManager = () => {
    const [showVideoForm, setShowVideoForm] = useState(false)

  return (
    <section className='flex flex-col w-full '>
        <div className='flex flex-row justify-between items-center p-1 lg:p-5 xl:p-10'>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900'>Gestion de videos</h3>
                <p className='text-sm lg:text-lg xl:text-xl font-light text-gray-900'>Ajoutez, modifiez ou supprimez vos vidéos</p>
            </div>
              <Button onClick={() => setShowVideoForm(true)} className="flex items-center gap-2 lg:text-xl lg:py-4">
                <Plus className="h-4 w-4" />
                    Ajouter une vidéo
              </Button>

        </div>

            {showVideoForm && <VideoForm onClose={() => setShowVideoForm(false)} />}
            
            <VideoTable videos={videosData} />

    </section>
  )
}

export default VideoManager