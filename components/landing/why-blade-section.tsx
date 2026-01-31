import { Zap, Brain, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Fast responses with intelligent caching. Recognized patterns return instantly.",
    accent: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Machine learning that adapts to your data. The more you use it, the smarter it gets.",
    accent: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Code2,
    title: "Developer-First",
    description: "Clean REST APIs, comprehensive SDKs, and docs that don't make you cry.",
    accent: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
]

export function WhyBladeSection() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Why Blade?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built by fintech engineers for fintech engineers. We know the pain of parsing messy financial data.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative terminal-card p-6 transition-all duration-300 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient accent on hover */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl",
                feature.accent
              )} />

              <div className="relative space-y-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                  feature.iconColor
                )}>
                  <feature.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
