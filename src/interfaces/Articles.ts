export interface IArticle {
  id: number
  title: string
  author?: string
  category: string
  status: "brouillon" | "publié" | "supprimé" 
  contenu: string
  created_at: string
  featured_image?: string
}
