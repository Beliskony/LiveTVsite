export interface IVideo {
  id: string;
  title?: string;
  description?: string;
  couverture?: string;
  programme_id: string;
  status?: "published" | "draft";
  created_at: Date;
  duration: string;
  views?: number;
  video_url: string;
}