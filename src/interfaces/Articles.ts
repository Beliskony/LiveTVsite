export interface IArticle {
  id: number
  title: string
  author: string
  category: string
  status: "brouillon" | "publié" | "supprimé"
  created_at: string
  views: number
  featured_image?: string
}
