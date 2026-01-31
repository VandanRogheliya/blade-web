"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal } from "lucide-react"

export function HeroSection() {
  const scrollToWaitlist = () => {
    const footer = document.querySelector("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center animate-stagger">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 status-pulse" />
            <span className="text-sm font-mono text-muted-foreground">Now in Early Access</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
            <span className="text-primary glow-text">Blade</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-medium text-foreground/90 mb-4">
            AI-Powered Fintech APIs
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Intelligent APIs that transform unstructured financial data into actionable insights.
            Built for fintech companies that move fast.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="btn-glow w-full sm:w-auto"
              onClick={scrollToWaitlist}
            >
              Join Waitlist
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto group"
            >
              <Link href="/transaction-parser">
                <Terminal className="w-5 h-5" />
                Try Demo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
