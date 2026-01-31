import { VALUE_PROPOSITION } from "@/lib/constants/transaction-parser"
import type { ValuePropositionCardProps } from "@/lib/types/transaction-parser"
import { cn } from "@/lib/utils"

export function ValuePropositionCard({ className }: ValuePropositionCardProps) {
  return (
    <div
      className={cn(
        "border border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 space-y-3",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full" />
        {VALUE_PROPOSITION.title}
      </h3>
      <div className="space-y-2 text-muted-foreground text-sm leading-relaxed">
        <p>
          <span className="text-primary font-semibold">
            {VALUE_PROPOSITION.seenPattern.label}
          </span>{" "}
          {VALUE_PROPOSITION.seenPattern.description}
        </p>
        <p>
          <span className="text-primary font-semibold">
            {VALUE_PROPOSITION.newPattern.label}
          </span>{" "}
          {VALUE_PROPOSITION.newPattern.description}
        </p>
        <p className="text-accent font-medium">{VALUE_PROPOSITION.summary}</p>
      </div>
    </div>
  )
}
