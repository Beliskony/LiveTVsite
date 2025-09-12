import type { IVideo } from "./Videos";
export interface IProgramme {
  id: string;
  nom: string;
  description: string,
  starting: string;
  ending: string;
  when: string[];
  genre: string;
  couverture: string; 
  slide_cover?:string; //nouveau
  logo?:string; //nouveau
  videos?: IVideo[],
}