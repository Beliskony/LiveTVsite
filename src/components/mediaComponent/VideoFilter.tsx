import React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface VideosFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  onStatusChange: (status: string) => void
  activeFilters: {
    search: string
    category: string
    sort: string
  }
  categories: string[]
}

export function VideosFilters({
  onSearchChange,
  onCategoryChange,
  onSortChange,
  activeFilters,
  categories,
}: VideosFiltersProps) {
  const [searchValue, setSearchValue] = useState(activeFilters.search)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(searchValue)
  }

  const clearAllFilters = () => {
    setSearchValue("")
    onSearchChange("")
    onCategoryChange("")
    onSortChange("recent")
  }

  const hasActiveFilters =
    activeFilters.search || activeFilters.category || activeFilters.sort !== "recent"

  return (
    <div className="flex lg:flex-row md:flex-col max-sm:flex-col w-full items-center justify-around max-sm:gap-y-4 md:gap-y-4 mb-8" >
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative bg-white lg:w-[500px] xl:w-[600px] max-sm:w-full md:w-full rounded-md border shadow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher des videos..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            onSearchChange(e.target.value)
          }}
          className="pl-10 pr-4"
        />
      </form>

      {/* Filters Row */}
      <div className="flex flex-wrap max-sm:gap-4 md:gap-x-5 lg:gap-x-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filtres:</span>
        </div>

        {/* Category Filter */}
        <Select value={activeFilters.category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] max-sm:w-32 border rounded-md shadow bg-white">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Filter */}
        <Select value={activeFilters.sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[160px] max-sm:w-32 border rounded-md shadow bg-white">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Plus récent</SelectItem>
            <SelectItem value="oldest">Plus ancien</SelectItem>
            <SelectItem value="title">Titre A-Z</SelectItem>
            <SelectItem value="title-desc">Titre Z-A</SelectItem>
          </SelectContent>
        </Select>

        </div>
    
    </div>
  )
}
