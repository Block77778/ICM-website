"use client"

import { Users, BarChart3, Leaf } from "lucide-react"

interface StatsCounterProps {
  label: string
  value: string
  icon: "chart" | "users" | "activity"
}

export default function StatsCounter({ label, value, icon }: StatsCounterProps) {
  // No animation, just display the value directly

  const IconComponent = () => {
    switch (icon) {
      case "chart":
        return <BarChart3 className="w-8 h-8 text-[#56CCF2]" />
      case "users":
        return <Users className="w-8 h-8 text-[#4ECDC4]" />
      case "activity":
        return <Leaf className="w-8 h-8 text-[#ADFF2F]" />
      default:
        return null
    }
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-[#2F80ED]/20 hover:border-[#2F80ED]/40 transition-all">
      <div className="flex items-center mb-4">
        <IconComponent />
        <h3 className="ml-3 text-xl font-medium text-gray-300">{label}</h3>
      </div>
      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#56CCF2] to-[#4ECDC4] bg-clip-text text-transparent h-[48px] flex items-center">
        {value}
      </p>
    </div>
  )
}
