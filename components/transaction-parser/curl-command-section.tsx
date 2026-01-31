"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
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
        <h3 className="text-lg font-semibold text-foreground">
          {TRANSACTION_PARSER_STRINGS.curlCommandTitle}
        </h3>
        <Button onClick={handleCopy} size="sm" variant="ghost" className="text-xs">
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1" />
              {TRANSACTION_PARSER_STRINGS.copiedButton}
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1" />
              {TRANSACTION_PARSER_STRINGS.copyButton}
            </>
          )}
        </Button>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap break-words">
          {curlCommand}
        </pre>
      </div>
    </div>
  )
}
