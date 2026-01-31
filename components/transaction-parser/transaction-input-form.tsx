"use client"

import { Sparkles, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { TRANSACTION_PARSER_STRINGS } from "@/lib/constants/transaction-parser"
import type { TransactionInputFormProps } from "@/lib/types/transaction-parser"

export function TransactionInputForm({
  inputText,
  onInputChange,
  onParse,
  isLoading,
  placeholder,
  title,
  description,
  id = "transaction-text",
}: TransactionInputFormProps) {
  return (
    <div className="space-y-5">
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <Label
          htmlFor={id}
          className="text-sm font-medium flex items-center gap-2 text-muted-foreground"
        >
          <Terminal className="w-4 h-4" />
          {TRANSACTION_PARSER_STRINGS.inputLabel}
        </Label>

        <div className="terminal-card group transition-all duration-300 focus-within:border-primary/50">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-secondary/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-xs font-mono text-muted-foreground ml-2">input.txt</span>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              id={id}
              placeholder={placeholder}
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full min-h-[140px] px-4 py-4 bg-transparent resize-none font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none leading-relaxed"
              spellCheck={false}
            />

            {/* Cursor line indicator */}
            {!inputText && (
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="inline-block w-2 h-5 bg-primary/70 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={onParse}
        disabled={isLoading}
        size="lg"
        className="w-full font-semibold btn-glow relative overflow-hidden group"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <span className="relative flex items-center gap-2">
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              {TRANSACTION_PARSER_STRINGS.parsingButton}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              {TRANSACTION_PARSER_STRINGS.parseButton}
            </>
          )}
        </span>
      </Button>

    </div>
  )
}
