"use client"

import { useState, useEffect } from "react"
import { LoaderCircle, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"

export function UserInfoTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)


    const fetchUsers = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://chunk.yeshouatv.com/api/list_users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs")
        const users = await res.json()
        setUsers(users.data)
      } catch (error) {
        console.error(error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

      // useEffect pour le chargement initial + refresh auto
  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
  setCurrentPage(1)
  }, [searchTerm])


{/*  const deleteUser = async (id: string) =>{
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`https://chunk.yeshouatv.com/api/delete_user/${id}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`}
      })

      if (!res.ok) {
      const errorText = await res.text()
      console.error("Erreur API DELETE:", errorText)
      throw new Error("Erreur lors de la suppression du programme")
      }

      console.log("Programme supprimé avec succès")
      await fetchUsers()

    } catch (error) {
      console.error("Erreur lors du DELETE:", error)
      throw error
    }
  }*/}


const filteredUsers = [...users]
  .sort((a, b) => {
    // Les admins d'abord
    if (a.role === "admin" && b.role !== "admin") return -1
    if (a.role !== "admin" && b.role === "admin") return 1
    return 0 // sinon, garder l'ordre
  })
  .filter((user) => {
    return (
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })


  //pagination
  const totalItems = filteredUsers.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <Card className="px-0 py-4 md:p-4 lg:p-4 xl:p-4">
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border mb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Mail</TableHead>
                <TableHead>Role</TableHead>
               {/* <TableHead className="text-right">Action</TableHead>*/}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium truncate max-w-40">{user.name}</TableCell>
                  <TableCell className="font-medium truncate max-w-40">{user.email}</TableCell>
                  <TableCell>
                    {user.role === "admin" ? (
                      <span className="text-red-600 text-sm font-semibold">Admin</span>
                      ) : (
                      <span>{user.role}</span>
                    )}
                  </TableCell>

                {/*    <TableCell className="text-right">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="items-end">
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => deleteUser(user.id).catch(()=> alert("Erreur lors de la suppression"))}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>*/}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="flex justify-center items-center w-full py-12">
              <LoaderCircle className="h-10 w-10 animate-spin" />
          </div>
        )}
      </CardContent>

      <div className="ml-5 max-sm:ml-0">
        {/* Pagination */}
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