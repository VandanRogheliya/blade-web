"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="relative border-b border-border/50 backdrop-blur-sm bg-background/80">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-6 py-6 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative text-4xl sm:text-5xl font-black tracking-tighter text-primary transition-all duration-300 group-hover:tracking-tight">
              Blade
            </div>
          </Link>

          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 status-pulse" />
            <span className="text-xs font-mono text-muted-foreground">API {process.env.NEXT_PUBLIC_API_VERSION || "v0.1"}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
