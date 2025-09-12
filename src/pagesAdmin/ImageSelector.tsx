"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SelecteurImageProps {
  onImageSelect: (file: File | null) => void
  selectedFile?: File | null
}

export function ImageSelector({ onImageSelect, selectedFile }: SelecteurImageProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file)
        // Créer une URL de prévisualisation
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        alert("Veuillez sélectionner un fichier image valide")
      }
    },
    [onImageSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFileSelect(files[0])
      }
    },
    [handleFileSelect],
  )

  const handleRemoveFile = useCallback(() => {
    onImageSelect(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [onImageSelect])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragOver ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? "text-green-500" : "text-gray-400"}`} />
          <p className="text-lg font-medium text-gray-700 mb-2">Glissez votre image ici ou cliquez pour sélectionner</p>
          <p className="text-sm text-gray-500">Formats supportés:Webp(recommandé) ,JPG, PNG, GIF</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <ImageIcon className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {previewUrl && (
            <div className="relative">
              <img src={previewUrl} alt="preview" className="w-full h-48 object-cover rounded bg-gray-200" />
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full bg-transparent"
            onClick={() => fileInputRef.current?.click()}
          >
            Changer d’image
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
        </div>
      )}
    </div>
  )
}
