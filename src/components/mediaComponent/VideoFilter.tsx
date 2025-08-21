import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search} from "lucide-react"

interface VideosFiltersProps {
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  activeFilters: {
    search: string
    sort: string
  }
}

export function VideosFilters({
  onSearchChange,
  onSortChange,
  activeFilters,
}: VideosFiltersProps) {
  const [searchValue, setSearchValue] = useState(activeFilters.search)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange(searchValue)
  }

  const clearAllFilters = () => {
    setSearchValue("")
    onSearchChange("")
    onSortChange("recent")
  }

  const hasActiveFilters =
    activeFilters.search || activeFilters.sort !== "recent"

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 ">
      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white w-[300px] flex flex-row rounded-md border justify-center items-center px-2 focus:ring-0 focus:outline-nones"
      >
        <div className="flex flex-col gap-1 w-full">
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
    <Input
      id="searchInput"
      placeholder="Rechercher dans les vidéos..."
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value)
        onSearchChange(e.target.value)
      }}
      className="pl-10 text-gray-900 border-0 focus:ring-0 focus:outline-none w-full"
    />
  </div>
</div>

      </form>

      {/* Sort Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">Trier par :</span>
        <Select value={activeFilters.sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[120px] border rounded-md shadow bg-white text-gray-900">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent className="max-w-[90vw]">
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
