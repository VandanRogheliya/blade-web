import { FileText } from "lucide-react"
import { TRANSACTION_PARSER_STRINGS } from "@/lib/constants/transaction-parser"
import type { InputProvidedSectionProps } from "@/lib/types/transaction-parser"

export function InputProvidedSection({ inputText }: InputProvidedSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">
          {TRANSACTION_PARSER_STRINGS.inputProvidedTitle}
        </h3>
      </div>

      <div className="terminal-card overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-secondary/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-2">raw_input.txt</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words leading-relaxed">
            {inputText}
          </pre>
        </div>
      </div>
    </div>
  )
}
