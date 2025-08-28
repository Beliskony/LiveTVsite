"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Clock } from "lucide-react"
import type { IProgramme } from "@/interfaces/Programme"


interface ProgramTableProps {
  onEdit: (program: IProgramme) => void

}

export function ProgramTable({ onEdit}: ProgramTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [error, setError] = useState<string | null>(null)
  

 const fetchProgrammes = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://api.yeshouatv.com/api/list_programmes", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        const errorText = await res.text()
        console.error("Erreur API:", errorText)
        throw new Error("Erreur lors du chargement des programmes")
      }

      const result = await res.json()

      if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }

      const programmesWithArrayWhen = result.data.map((prog: any) => ({
        ...prog,
        when: typeof prog.when === "string" ? prog.when.split(",").map((d: string) => d.trim()) : prog.when,
      }))

      setProgrammes(programmesWithArrayWhen)
    } catch (error) {
      setError("Erreur lors du chargement des programmes")
      console.error("Erreur Api: ", error)
    }
  }

  // Appel initial
  useEffect(() => {
    fetchProgrammes()

  const interval = setInterval(() => {
    fetchProgrammes() // refetch every 5 sec
    }, 5000)

    return() => clearInterval(interval)

  }, [])

const updateProgramme = async (id: string, updatedData: Partial<IProgramme>) => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://api.yeshouatv.com/api/programmes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Erreur API PUT:", errorText)
      throw new Error("Erreur lors de la mise à jour du programme")
    }

    const result = await res.json()
    console.log("Programme mis à jour:", result)
    await fetchProgrammes()
    return result
  } catch (error) {
    console.error("Erreur lors du PUT:", error)
    throw error
  }
}


const deleteProgramme = async (id: string) => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://api.yeshouatv.com/api/delete_programme/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error("Erreur API DELETE:", errorText)
      throw new Error("Erreur lors de la suppression du programme")
    }

    console.log("Programme supprimé avec succès")
    await fetchProgrammes(
      
    )
  } catch (error) {
    console.error("Erreur lors du DELETE:", error)
    throw error
  }
}



const filteredPrograms = programmes.filter((program) =>
  program.nom.toLowerCase().includes(searchTerm.toLowerCase())
)

  const getDayLabel = (day: string) => {
    const days = {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    }
    return days[day as keyof typeof days] || day
  }

  const getTypeColor = (type: string) => {
    const colors = {
      live: "bg-red-100 text-red-800",
      recorded: "bg-blue-100 text-blue-800",
      rerun: "bg-gray-100 text-gray-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      live: "Direct",
      recorded: "Enregistré",
      rerun: "Rediffusion",
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <Card className="px-0 py-4 md:p-4 lg:p-4 xl:p-4">
      <CardHeader>
        <div className="flex items-center justify-between p-4">
          <CardTitle className="max-sm:hidden">Grille des Programmes</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un programme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programme</TableHead>
              <TableHead>Jour</TableHead>
              <TableHead>Horaire</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.nom}</TableCell>
                <TableCell>{getDayLabel(program.when.join(", "))}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {program.starting} - {program.ending}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(program.genre)}>{getTypeLabel(program.genre)}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{program.description}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(program)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" 
                      onClick={() => {
                        deleteProgramme(program.id).catch(()=> alert("Erreur lors de la suppression"))
                      }}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> 

      </CardContent>
    </Card>
  )
}
