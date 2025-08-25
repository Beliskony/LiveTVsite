"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginationArticle } from "@/components/articlesPage/PaginationArticle"

export function UserInfoTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://api.yeshouatv.com/api/users", {
          credentials: "include",
          headers: {
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        })
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs")
        const data = await res.json()
        setUsers(data)
      } catch (error) {
        console.error(error)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    return (
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <TableHead>Password</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
          </div>
        )}
        {loading && (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Chargement...</p>
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