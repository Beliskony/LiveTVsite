export interface IVideo {
  id: string;
  title: string;
  description: string;
  Time: string;
  Miniature: string;
  category?: string[];
  lien: string;
  duration: string;
  views: number;
}