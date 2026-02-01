"use client"

import { useState } from "react"
import { Copy, Check, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TRANSACTION_PARSER_STRINGS } from "@/lib/constants/transaction-parser"
import type { CurlCommandSectionProps } from "@/lib/types/transaction-parser"

export function CurlCommandSection({ curlCommand }: CurlCommandSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">
            {TRANSACTION_PARSER_STRINGS.curlCommandTitle}
          </h3>
        </div>

        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="text-xs h-8 px-2"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span className="text-emerald-400">{TRANSACTION_PARSER_STRINGS.copiedButton}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1" />
              {TRANSACTION_PARSER_STRINGS.copyButton}
            </>
          )}
        </Button>
      </div>

      <div className="terminal-card overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-secondary/30">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">terminal</span>
          </div>

          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
            bash
          </span>
        </div>

        {/* Command */}
        <div className="p-4 overflow-x-auto">
          <div className="flex items-start gap-2">
            <span className="text-primary font-mono text-sm select-none">$</span>
            <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words leading-relaxed">
              {curlCommand}
            </pre>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground/60 text-center">
        Use this command to make the same request from your terminal
      </p>
    </div>
  )
}
