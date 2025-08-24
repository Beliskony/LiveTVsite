import type { IVideo } from "./Videos";
export interface IProgramme {
  id: string;
  nom: string;
  description: string,
  starting: string;
  ending: string;
  when: string[];
  genre: string;
  couverture: string; // URL ou chemin de l'image
  videos?: IVideo[],
}