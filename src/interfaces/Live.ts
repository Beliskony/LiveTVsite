
export interface ILive {
  id: string;
  title?: string;
  description?: string;
  startTime?: string; // ISO 8601 format
  endingTime?: string; // ISO 8601 format
  Miniature?: string; // URL to the thumbnail image
  category?: string[]; // Category of the live stream
  viewers?: number;
  lien?: string;
}