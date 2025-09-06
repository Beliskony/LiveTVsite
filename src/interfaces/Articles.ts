export interface IArticle {
  id: string
  title: string
  author?: string
  category: string
  status: "brouillon" | "publié" | "supprimé" 
  contenu: string
  created_at: string
  feature_image?: string
}
