"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Clock } from "lucide-react"

// Données d'exemple - à remplacer par vos données Laravel
const mockPrograms = [
  {
    id: "1",
    title: "Journal du matin",
    day: "monday",
    startTime: "08:00",
    endTime: "09:00",
    type: "live",
    description: "Actualités du jour",
  },
  {
    id: "2",
    title: "Sport en direct",
    day: "saturday",
    startTime: "20:00",
    endTime: "22:00",
    type: "live",
    description: "Match de football",
  },
  {
    id: "3",
    title: "Documentaire Nature",
    day: "sunday",
    startTime: "14:00",
    endTime: "15:00",
    type: "recorded",
    description: "La vie sauvage en Afrique",
  },
]

export function ProgramTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [programs] = useState(mockPrograms)

  const filteredPrograms = programs.filter((program) => program.title.toLowerCase().includes(searchTerm.toLowerCase()))

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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Grille des Programmes</CardTitle>
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
                <TableCell className="font-medium">{program.title}</TableCell>
                <TableCell>{getDayLabel(program.day)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {program.startTime} - {program.endTime}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(program.type)}>{getTypeLabel(program.type)}</Badge>
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
      </CardContent>
    </Card>
  )
}
