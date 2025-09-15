import { useState, useEffect } from 'react'
import { VideoForm } from './VideosForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { VideoTable } from './VideoTable'
import type { IVideo } from '@/interfaces/Videos'

const VideoManager = () => {
    const [showVideoForm, setShowVideoForm] = useState(false)
   const [editingVideo, setEditingVideo] = useState<IVideo | null>(null)
   const [videos, setvideos] = useState<IVideo[]>([])

    // Ouvrir formulaire édition
  const handleEdit = (video: IVideo) => {
    setEditingVideo(video)
    setShowVideoForm(true)
  }

  // Fermer formulaire
  const closeForm = () => {
    setShowVideoForm(false)
    setEditingVideo(null)
  }

  const fetchVideos = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch("https://chunk.yeshouatv.com/api/list_videos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error("Erreur lors du chargement des vidéos")
    const result = await res.json()

    if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }
    setvideos(result.data || [])
  } catch (error) {
    console.error("Erreur lors du chargement des vidéos")
  }
}

useEffect(() => {
  fetchVideos()
}, [])

  return (
    <section className='flex flex-col w-full '>
        <div className='flex flex-row justify-between items-center px-0 py-1.5 gap-x-1.5 lg:p-5 xl:p-10'>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900'>Gestion de videos</h3>
                <p className='text-sm lg:text-lg xl:text-xl font-light text-gray-900'>Ajoutez, modifiez ou supprimez vos vidéos</p>
            </div>
              <Button onClick={() => setShowVideoForm(true)} className="flex items-center gap-2 lg:text-xl lg:py-4">
                <Plus className="h-4 w-4" />
                    Ajouter une vidéo
              </Button>

        </div>

      {showVideoForm && (
        <VideoForm
          video={editingVideo ?? undefined}  // passe undefined si création
          onClose={closeForm}
          onRefresh={fetchVideos}
        />
      )}
            
            <VideoTable onEdit={handleEdit} />

    </section>
  )
}

export default VideoManager