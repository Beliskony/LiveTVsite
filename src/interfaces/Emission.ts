export interface IEmission {
  id: string;
  nom: string;
  description: string,
  starting: string;
  ending: string;
  when: string;
  genre: string; // tableau de catégories
  couverture: string; // URL ou chemin de l'image
}