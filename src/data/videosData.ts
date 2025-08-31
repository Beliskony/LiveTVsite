import type { IVideo } from "@/interfaces/Videos";

export const videosData: IVideo[] = [
  {
    id: "V1",
    title: "Introduction à React avec Vite",
    description: "Apprenez à démarrer rapidement un projet React avec Vite pour un développement ultra-rapide.",
    createdAt: new Date("2025-08-07T10:00:00Z"),
    duration: "22:00",
    views: 289,
    couverture: "/placeholder.svg?height=200&width=350&text=React+Vite",
    programmeId: "37667932-0b7f-46e4-8e0a-755c2e34e634", // Émission Sportive
    status: "published",
    videoUrl: "/videos/test1.mp4",
  },
  {
    id: "V2",
    title: "Styliser avec Tailwind CSS",
    description: "Un tutoriel pour utiliser les utilitaires Tailwind CSS afin de créer des designs modernes et réactifs.",
    createdAt: new Date("2025-03-02T10:00:00Z"),
    duration: "55:08",
    views: 1894,
    couverture: "https://i.pinimg.com/736x/88/88/69/8888695935ae01676977fc90bf0464ab.jpg",
    programmeId: "37667932-0b7f-46e4-8e0a-755c2e34e634", // Les Petits Génies
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "37667932-0b7f-46e4-8e0a-755c2e34e634", // Cultures du Monde
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "37667932-0b7f-46e4-8e0a-755c2e34e634", // Foi et Vie
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "0198ee8d-0d28-4ec4-bb06-a5f0d2ae4a5c", // Culte du soir
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "0198ee8d-0d28-4ec4-bb06-a5f0d2ae4a5c", // Rire Ensemble
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "0198ee8d-0d28-4ec4-bb06-a5f0d2ae4a5c", // Émission Sportive
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "0198ee8d-0d28-4ec4-bb06-a5f0d2ae4a5c", // Cultures du Monde
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "eb504353-882c-4f14-9513-c4e6baec3796", // Foi et Vie
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "eb504353-882c-4f14-9513-c4e6baec3796", // Culte du soir
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "eb504353-882c-4f14-9513-c4e6baec3796", // Les Petits Génies
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
    couverture: "/placeholder.svg?height=200&width=350&text=React+Hooks",
    programmeId: "eb504353-882c-4f14-9513-c4e6baec3796", // Rire Ensemble
    status: "published",
    videoUrl: "/videos/test2.mp4"
  },
];
