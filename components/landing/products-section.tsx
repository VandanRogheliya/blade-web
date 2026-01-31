"use client"

import Link from "next/link"
import { ArrowRight, FileText, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const products = [
  {
    title: "Transaction Parser",
    description: "Extract structured data from messy transaction descriptions. Bank feeds, payment processors, POS systems — we handle them all.",
    icon: FileText,
    status: "live" as const,
    href: "/transaction-parser",
    accent: "from-primary/20 to-amber-500/20",
    iconColor: "text-primary",
  },
  {
    title: "Smart Categorization",
    description: "Automatically categorize transactions with ML-powered merchant detection and spending classification.",
    icon: Sparkles,
    status: "coming" as const,
    href: "#",
    accent: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
]

export function ProductsSection() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A growing suite of APIs designed to solve fintech&apos;s hardest data problems.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProductCardProps {
  title: string
  description: string
  icon: React.ElementType
  status: "live" | "coming"
  href: string
  accent: string
  iconColor: string
}

function ProductCard({ title, description, icon: Icon, status, href, accent, iconColor }: ProductCardProps) {
  const isLive = status === "live"

  const cardClassName = cn(
    "group relative terminal-card p-6 transition-all duration-300 block",
    isLive && "cursor-pointer hover:border-primary/50",
    !isLive && "opacity-80"
  )

  const cardContent = (
    <>
      {/* Gradient accent on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 rounded-xl",
        isLive && "group-hover:opacity-100",
        accent
      )} />

      <div className="relative space-y-4">
        {/* Header with icon and status */}
        <div className="flex items-start justify-between">
          <div className={cn(
            "w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center transition-transform duration-300",
            isLive && "group-hover:scale-110",
            iconColor
          )}>
            <Icon className="w-6 h-6" />
          </div>

          {/* Status badge */}
          {isLive ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
              <span className="text-xs font-mono text-emerald-400">Live</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/50 border border-border/50">
              <span className="text-xs font-mono text-muted-foreground">Coming Soon</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA */}
        {isLive && (
          <div className="flex items-center gap-2 text-sm font-medium text-primary pt-2">
            <span>Try Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </>
  )

  if (isLive) {
    return (
      <Link href={href} className={cardClassName}>
        {cardContent}
      </Link>
    )
  }

  return (
    <div className={cardClassName}>
      {cardContent}
    </div>
  )
}
