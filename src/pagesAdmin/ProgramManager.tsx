import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ProgramForm } from './ProgramForm'
import { ProgramTable } from './ProgramTable'
import type { IProgramme } from '@/interfaces/Programme'

const ProgramManager = () => {
  const [showProgramForm, setShowProgramForm] = useState(false)
  const [editingProgram, setEditingProgram] = useState<IProgramme | null>(null)
  const [programmes, setProgrammes] = useState<IProgramme[]>([]) // Pour stocker les programmes


  const closeForm = () => {
    setShowProgramForm(false)
    setEditingProgram(null)
  }

    // Mettre à jour la liste des programmes après un ajout ou une modification
  const updateProgramList = (updatedProgram: IProgramme) => {
    setProgrammes((prevPrograms) => {
      if (editingProgram) {
        // Si nous étions en train de modifier un programme, on remplace celui-ci
        return prevPrograms.map((prog) =>
          prog.id === updatedProgram.id ? updatedProgram : prog
        )
      } else {
        // Sinon, on ajoute le programme à la liste
        return [...prevPrograms, updatedProgram]
      }
    })
    closeForm()
  }


    // Ouverture du formulaire pour l'édition
  const handleEdit = (program: IProgramme) => {
    setEditingProgram(program)
    setShowProgramForm(true)
  }


  return (
    <section>
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
        />
      )}

      <ProgramTable programmes={programmes} onEdit={handleEdit} />
    </section>
  )
}

export default ProgramManager
