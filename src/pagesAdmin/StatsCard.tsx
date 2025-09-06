import { Minus, type LucideIcon,  } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  trendLabel: string
}

export function StatsCard({ title, value, icon: Icon, trendLabel }: StatsCardProps) {
  const getTrendIcon = () => {
        return <Minus className="h-4 w-4 text-gray-700" />
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className="h-4 w-4 text-gray-600" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`flex items-center gap-1 text-xs text-gray-700`}>
          {getTrendIcon()}
          {trendLabel}
        </div>
      </div>
    </div>
  )
}
