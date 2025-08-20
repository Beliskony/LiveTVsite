import type { IVideo } from "@/interfaces/Videos";

export const videosData: IVideo[] = [
  {
    id: "V1",
    title: "Introduction à React avec Vite",
    description: "Apprenez à démarrer rapidement un projet React avec Vite pour un développement ultra-rapide.",
    createdAt: new Date("2025-08-07T10:00:00Z"), // ISO → Date
    duration: "22:00",
    views: 289,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Vite",
    category: "Web", // string et pas tableau
    status: "published",
    videoUrl: "/videos/test1.mp4", // Ajout de l'URL de la vidéo
  },
  {
    id: "V2",
    title: "Styliser avec Tailwind CSS",
    description: "Un tutoriel pour utiliser les utilitaires Tailwind CSS afin de créer des designs modernes et réactifs.",
    createdAt: new Date("2025-03-02T10:00:00Z"),
    duration: "55:08",
    views: 1894,
    Miniature: "https://i.pinimg.com/736x/88/88/69/8888695935ae01676977fc90bf0464ab.jpg",
    category: "Design",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
  {
    id: "V3",
    title: "Gestion d'état avec React Hooks",
    description: "Explorez useState, useEffect et d'autres Hooks pour une gestion d'état efficace dans vos applications React.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "43:09",
    views: 4789,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "draft",
    videoUrl: "/videos/test3.mp4"
  },
  {
    id: "V4",
    title: "Teste de video populaire",
    description: "Même contenu que V3 mais plus populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "08:46",
    views: 105463,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
  {
    id: "V5",
    title: "Gestion encore un titre comme ça",
    description: "Version très virale avec énormément de vues.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "45:09",
    views: 43289746,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test3.mp4"
  },
  {
    id: "V6",
    title: "Etat et droit de la vidéo view",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
    {
    id: "V7",
    title: "Etat et droit de la vidéo view1",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
    {
    id: "V8",
    title: "Etat et droit de la vidéo config",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
    {
    id: "V9",
    title: "Etat et droit de la vidéo test1",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
    {
    id: "V10",
    title: "Etat et droit de la vidéo test2",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
    {
    id: "V11",
    title: "Etat et droit",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
    {
    id: "V12",
    title: "Etat et droit de la vidéo",
    description: "Encore une variante populaire.",
    createdAt: new Date("2024-10-05T09:00:00Z"),
    duration: "10:45",
    views: 536567,
    Miniature: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    category: "React",
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
];
