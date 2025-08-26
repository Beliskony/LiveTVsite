export interface IVideo {
  id: string;
  title?: string;
  description?: string;
  couverture?: string;
  programmeId: string;
  status?: "published" | "draft";
  createdAt: Date;
  duration: string;
  views?: number;
  videoUrl: string;
}