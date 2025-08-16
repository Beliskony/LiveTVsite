"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { videosData } from "@/data/videosData"
import type { IVideo } from "@/interfaces/Videos"

interface VideoTableProps {
  videos: IVideo[]
  onEdit?: (video: IVideo) => void
  onDelete?: (videoId: string) => void
}

export function VideoTable({ videos = videosData, onEdit, onDelete }: VideoTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      news: "bg-blue-100 text-blue-800",
      sports: "bg-green-100 text-green-800",
      entertainment: "bg-purple-100 text-purple-800",
      documentary: "bg-orange-100 text-orange-800",
      music: "bg-pink-100 text-pink-800",
      programmation: "bg-indigo-100 text-indigo-800",
    }
    return category ? colors[category] || "bg-gray-100 text-gray-800" : "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status?: "published" | "draft") => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Liste des Vidéos</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher une vidéo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
       <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Vues</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVideos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">{video.title}</TableCell>
                <TableCell>
                  <Badge className={getCategoryColor(video.category)}>{video.category}</Badge>
                </TableCell>
                <TableCell>{video.duration}</TableCell>
                <TableCell>{video.views?.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(video.status)}>
                    {video.status === "published" ? "Publié" : "Brouillon"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(video.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(video)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete?.(video.id)}
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
      </CardContent>
    </Card>
  )
}
