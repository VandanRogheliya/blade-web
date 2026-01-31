import { Zap, Brain, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ValuePropositionCardProps {
  className?: string
}

const features = [
  {
    icon: Zap,
    title: "Cached Patterns",
    description: "Recognized formats return in milliseconds using our intelligent cache layer.",
    accent: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Brain,
    title: "AI Discovery",
    description: "New patterns are analyzed by our ML engine and learned for future requests.",
    accent: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: TrendingUp,
    title: "Self-Improving",
    description: "The more you use it, the faster it gets. Every call improves the system.",
    accent: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
]

export function ValuePropositionCard({ className }: ValuePropositionCardProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-3", className)}>
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className="group relative terminal-card p-5 transition-all duration-300 hover:border-primary/30"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient accent on hover */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl",
            feature.accent
          )} />

          <div className="relative space-y-3">
            <div className={cn(
              "w-10 h-10 rounded-lg bg-secondary/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
              feature.iconColor
            )}>
              <feature.icon className="w-5 h-5" />
            </div>

            <h3 className="font-bold text-foreground text-base">
              {feature.title}
            </h3>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
