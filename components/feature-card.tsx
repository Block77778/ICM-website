import { Leaf, Zap, Code, Shield, LinkIcon, Users } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "leaf":
        return <Leaf className="w-6 h-6 text-[#ADFF2F]" />
      case "zap":
        return <Zap className="w-6 h-6 text-[#56CCF2]" />
      case "code":
        return <Code className="w-6 h-6 text-[#4ECDC4]" />
      case "shield":
        return <Shield className="w-6 h-6 text-[#2F80ED]" />
      case "link":
        return <LinkIcon className="w-6 h-6 text-[#56CCF2]" />
      case "users":
        return <Users className="w-6 h-6 text-[#4ECDC4]" />
      default:
        return null
    }
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-[#2F80ED]/20 hover:border-[#2F80ED]/40 transition-all group">
      <div className="bg-black/50 p-3 rounded-lg inline-block mb-4 group-hover:bg-[#0A1A2F] transition-colors">
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-[#56CCF2] transition-colors">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
