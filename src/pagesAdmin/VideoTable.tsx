"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import type { IVideo } from "@/interfaces/Videos"
import type { IProgramme} from "@/interfaces/Programme"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"
import { videoFormatRelativeDate } from "@/utilitaires/FormatDate"
import { formatViews } from "@/utilitaires/FormatViews"

const itemsPerPage = 10
interface VideoTableProps {
  videos?: IVideo[]
  onEdit?: (video: IVideo) => void
}

export function VideoTable({ onEdit }: VideoTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [programmes, setProgrammes] = useState<IProgramme[]>([])
  const [videos, setvideos] = useState<IVideo[]>([])
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

    // Dans VideoTable, ajoute :

const fetchVideos = async () => {
  try {
    const token = localStorage.getItem("token")
    const res = await fetch("https://api.yeshouatv.com/api/list_videos", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!res.ok) throw new Error("Erreur lors du chargement des vidéos")
    const result = await res.json()

    if (!Array.isArray(result.data)) {
        throw new Error("La réponse API ne contient pas un tableau de programmes.")
      }
    setvideos(result.data || [])
  } catch (e) {
    setError("Erreur lors du chargement des vidéos")
  }
}

useEffect(() => {
  fetchVideos()
  fetchProgrammes()

    const interval = setInterval(() => {
    fetchVideos() // refetch every 5 sec
    fetchProgrammes()
    }, 5000)

    return() => clearInterval(interval)
}, [])

const handleDelete = async (id: string) => {
  if (!confirm("Voulez-vous vraiment supprimer cette vidéo ?")) return
  try {
    const token = localStorage.getItem("token")
    const res = await fetch(`https://api.yeshouatv.com/api/delete_video/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error("Erreur lors de la suppression")
    fetchVideos()
  } catch (e) {
    alert("Erreur lors de la suppression")
  }
}


  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalItems = filteredVideos.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )


  const getStatusColor = (status?: "published" | "draft") => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getprogrammeName = (programmeId?: string) => {
    const programme = programmes.find((p) => p.id === programmeId)
    return programme ? programme.nom: "_"
  }

  return (
    <Card className="px-0 py-4 md:p-4 lg:p-4 xl:p-4">
      <CardHeader>
        <div className="flex items-center justify-between p-4">
          <CardTitle className="max-sm:hidden">Liste des Vidéos</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher une vidéo..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
       <div className="rounded-md border mb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>programme</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Vues</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedVideos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">{video.title}</TableCell>
                <TableCell>
                  <Badge>{getprogrammeName(video.programme_id)}</Badge>
                </TableCell>
                <TableCell>{video.duration}</TableCell>
                <TableCell>{formatViews(video.views ?? 0)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(video.status)}>
                    {video.status === "published" ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {videoFormatRelativeDate(video.created_at) }
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(video)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(video.id)}
                      >
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
       </div>

       {paginatedVideos.length === 0 && (
         <div className="text-center py-12">
           <p className="text-muted-foreground">Aucune vidéo trouvée</p>
         </div>
       )}

      </CardContent>

      {/* Pagination */}
       <div className="ml-4">
         <PaginationArticle
           currentPage={currentPage}
           totalPages={totalPages}
           totalItems={totalItems}
           itemsPerPage={itemsPerPage}
           onPageChange={setCurrentPage}
         />
       </div>
    </Card>
  )
}
