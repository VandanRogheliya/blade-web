import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
    <div className="space-y-4">
      {(title || description) && (
        <div>
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-balance">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {TRANSACTION_PARSER_STRINGS.inputLabel}
        </Label>
        <Textarea
          id={id}
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          className="min-h-[120px] resize-none bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <Button
        onClick={onParse}
        disabled={isLoading}
        className="w-full font-semibold"
      >
        {isLoading ? (
          <>
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            {TRANSACTION_PARSER_STRINGS.parsingButton}
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            {TRANSACTION_PARSER_STRINGS.parseButton}
          </>
        )}
      </Button>
    </div>
  )
}
