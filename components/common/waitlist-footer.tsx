"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, Sparkles } from "lucide-react"

export default function WaitlistFooter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-t from-card/80 to-transparent backdrop-blur-sm">
      {/* Subtle glow effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left side - Text */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Ready to integrate Blade?</p>
              <p className="text-sm text-muted-foreground">Join the waitlist for early access and updates.</p>
            </div>
          </div>

          {/* Right side - Form */}
          <form onSubmit={handleSubmit} className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-initial">
              <Input
                type="email"
                placeholder="developer@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitted}
                className="w-full lg:w-72 h-11 bg-input/50 border-border/50 focus:border-primary/50 input-glow font-mono text-sm placeholder:text-muted-foreground/50"
              />
            </div>

            <Button
              type="submit"
              disabled={submitted}
              className="h-11 px-6 btn-glow whitespace-nowrap"
            >
              {submitted ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Joined
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Join Waitlist
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
          <div className="flex items-center gap-2">
            <span className="font-mono">Blade</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

        </div>
      </div>
    </footer>
  )
}
