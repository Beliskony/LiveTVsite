import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LivePreview } from "./LivePreview"
import { LiveForm } from "./LiveForm"
import { Ellipsis } from "lucide-react"



const LiveManager = () => {
    const [showLiveForm, setLiveForm] = useState(false)
  return(
    <section>
      <div className='flex flex-row justify-between items-center w-full p-1 lg:p-5 xl:p-10'>
            <div className='flex flex-col space-y-2'>
                <h3 className='text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900'>Gestion du Programme</h3>
                <p className='text-sm lg:text-lg xl:text-xl font-light text-gray-900'>Planifiez votre grille de programmes</p>
            </div>

              <Button onClick={() => setLiveForm(true)} className="flex items-center gap-2 lg:text-xl lg:py-4">
                <Ellipsis className="h-4 w-4" />
                Modifier live
              </Button>
      </div>

      {showLiveForm && <LiveForm onClose={() => setLiveForm(false)} />} {/*onClose={() => setLiveForm(false)}*/}

      <LivePreview />

    </section>
  )
}

export default LiveManager