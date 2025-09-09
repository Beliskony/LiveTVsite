interface MembreEquipe {
  nom: string
  photoProfil: string // Chemin vers l’image, dans public/
}

const team: MembreEquipe[] = [
  {
    nom: "Aïssata Diaby",
    photoProfil: "/team/diaby.jpg",
  },
  {
    nom: "Franck Kouadio",
    photoProfil: "/team/kouadio.jpg",
  },
  {
    nom: "Kevin Gondo",
    photoProfil: "/team/gondo.jpg",
  },
  {
    nom: "Patricia N’Guessan",
    photoProfil: "/team/nguessan.jpg",
  },
  {
    nom: "Mohamed Diallo",
    photoProfil: "/team/diallo.jpg",
  },
]

export default team