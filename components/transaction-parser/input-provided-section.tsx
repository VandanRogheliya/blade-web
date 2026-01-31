import { TRANSACTION_PARSER_STRINGS } from "@/lib/constants/transaction-parser"
import type { InputProvidedSectionProps } from "@/lib/types/transaction-parser"

export function InputProvidedSection({ inputText }: InputProvidedSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">
        {TRANSACTION_PARSER_STRINGS.inputProvidedTitle}
      </h3>
      <div className="bg-card border border-border rounded-lg p-4">
        <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap break-words">
          {inputText}
        </pre>
      </div>
    </div>
  )
}
