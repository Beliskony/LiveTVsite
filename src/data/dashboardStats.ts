// dashboardStats.ts
import { Video, Calendar, Radio, BarChart3, type LucideIcon } from "lucide-react"
import { videosData } from "@/data/videosData"
import { programmeData } from "./programmeData"
import { liveData } from "@/data/liveData"
import { formatViews } from "@/utilitaires/FormatViews"

 interface StatItem {
  title: string
  value: string
  displayValue?: string
  description: string
  icon: LucideIcon
  trend: "up" | "down" | "stable"
}

export const dashboardStats: StatItem[] = [
  {
    title: "Total Vidéos",
    value: String(videosData.length),
    description: "+12 cette semaine",
    icon: Video,
    trend: "up",
  },
  {
    title: "Programmes",
    value: String(programmeData.length),
    description: "Cette semaine",
    icon: Calendar,
    trend: "stable",
  },
  {
    title: "Vues Live",
    value: formatViews(liveData.viewers ? liveData.viewers : 0),
    description: "Actuellement",
    icon: Radio,
    trend: "up",
  }
]
