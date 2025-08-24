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


export function ProgramTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
  const fetchProgrammes = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://api.yeshouatv.com/api/list_programmes")
      if (!res.ok) throw new Error("Erreur lors du chargement des programmes")
      const data: IProgramme[] = await res.json()
      setProgrammes(data)
    } catch (error) {
      setError("Erreur lors du chargement des programmes")
      console.error("Erreur Api: ", error)
    } finally {
      setLoading(false)
    }
  }
  fetchProgrammes()
}, [])

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
       <div className="rounded-md border mb-2">
        {loading ?(
                 <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-100 rounded-full animate-spin" />
                </div>
            ) : (
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
      )}
       </div>
      </CardContent>
    </Card>
  )
}
