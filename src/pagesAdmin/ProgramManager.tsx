import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProgramForm } from './ProgramForm'
import { ProgramTable } from './ProgramTable'
import type { IProgramme } from '@/interfaces/Programme'

const ProgramManager = () => {
  const [showProgramForm, setShowProgramForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState<IProgramme | null>(null)
  const [programmes, setProgrammes] = useState<IProgramme[]>([])

const fetchProgrammes = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch("https://chunk.yeshouatv.com/api/list_programmes", {
      headers: { Authorization: `Bearer ${token}` },
    })

    const result = await res.json()

    const programmesWithArrayWhen = result.data.map((prog: any) => ({
      ...prog,
      when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
    }))

    setProgrammes(programmesWithArrayWhen)
  } catch (error) {
    console.error("Erreur chargement programmes:", error)
  }
}

useEffect(() => {
  fetchProgrammes()
}, [])


  const closeForm = () => {
    setShowProgramForm(false)
    setEditingProgram(null)
  }

    // Ouverture du formulaire pour l'édition
  const handleEdit = (program: IProgramme) => {
    setEditingProgram(program)
    setShowProgramForm(true)
  }


  return (
    <section className='min-h-screen'>
      <div className='flex flex-row justify-between items-center w-full p-1 lg:p-5 xl:p-10'>
        <div className='flex flex-col space-y-2'>
          <h3 className='text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900'>Gestion du Programme</h3>
          <p className='text-sm lg:text-lg xl:text-xl font-light text-gray-900'>Planifiez votre grille de programmes</p>
        </div>
        <Button onClick={() => setShowProgramForm(true)} className="flex items-center gap-2 lg:text-xl lg:py-4">
          <Plus className="h-4 w-4" />
          Ajouter un programme
        </Button>
      </div>

      {showProgramForm && (
        <ProgramForm
          program={editingProgram ? { ...editingProgram, when: editingProgram.when.join(", ") } : undefined}
          onClose={closeForm}
          onRefresh={fetchProgrammes}
        />
      )}

      <ProgramTable  onEdit={handleEdit} />
    </section>
  )
}

export default ProgramManager
