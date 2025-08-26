export interface IVideo {
  id: string;
  title?: string;
  description?: string;
  Miniature?: string;
  programmeId: string;
  status?: "published" | "draft";
  createdAt: Date;
  duration: string;
  views?: number;
  videoUrl: string;
}