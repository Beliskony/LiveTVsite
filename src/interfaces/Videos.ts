export interface IVideo {
  id: string;
  title?: string;
  description?: string;
  Miniature?: string;
  category?: string;
  status?: "published" | "draft";
  createdAt: Date;
  duration: string;
  views?: number;
}