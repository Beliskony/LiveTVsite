"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

export function PaginationArticle({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: PaginationProps) {
  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex flex-col text-gray-900 sm:flex-row items-center justify-between gap-4 mt-8">

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button variant="outline" size="sm" onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Précédent
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <div className="px-3 py-2">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              ) : (
                <Button
                  aria-label={`Aller à la page ${page}`}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} >
          Suivant
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
