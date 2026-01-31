import { TRANSACTION_PARSER_STRINGS } from "@/lib/constants/transaction-parser"
import type { JsonResponseViewerProps } from "@/lib/types/transaction-parser"

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

function renderJsonValue(value: JsonValue, indent: number = 0): React.ReactNode {
  const indentStr = "  ".repeat(indent)
  const nextIndentStr = "  ".repeat(indent + 1)

  if (value === null) {
    return <span className="text-muted-foreground">null</span>
  }

  if (typeof value === "boolean") {
    return <span className="text-amber-400">{value.toString()}</span>
  }

  if (typeof value === "number") {
    return <span className="text-amber-400">{value}</span>
  }

  if (typeof value === "string") {
    return <span className="text-green-400">"{value}"</span>
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span className="text-muted-foreground">[]</span>
    }

    return (
      <>
        <span className="text-muted-foreground">{"[\n"}</span>
        {value.map((item, index) => (
          <span key={index}>
            <span className="text-muted-foreground">{nextIndentStr}</span>
            {renderJsonValue(item, indent + 1)}
            {index < value.length - 1 && (
              <span className="text-muted-foreground">,</span>
            )}
            <span className="text-muted-foreground">{"\n"}</span>
          </span>
        ))}
        <span className="text-muted-foreground">{indentStr}]</span>
      </>
    )
  }

  if (typeof value === "object") {
    const entries = Object.entries(value)
    if (entries.length === 0) {
      return <span className="text-muted-foreground">{"{}"}</span>
    }

    return (
      <>
        <span className="text-muted-foreground">{"{\n"}</span>
        {entries.map(([key, val], index) => (
          <span key={key}>
            <span className="text-muted-foreground">{nextIndentStr}</span>
            <span className="text-primary">"{key}"</span>
            <span className="text-muted-foreground">: </span>
            {renderJsonValue(val as JsonValue, indent + 1)}
            {index < entries.length - 1 && (
              <span className="text-muted-foreground">,</span>
            )}
            <span className="text-muted-foreground">{"\n"}</span>
          </span>
        ))}
        <span className="text-muted-foreground">{indentStr}{"}"}</span>
      </>
    )
  }

  return null
}

export function JsonResponseViewer({ data, responseTime }: JsonResponseViewerProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {TRANSACTION_PARSER_STRINGS.jsonResponseTitle}
        </h3>
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
          {responseTime}ms
        </span>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{renderJsonValue(data as JsonValue)}</code>
        </pre>
      </div>
    </div>
  )
}
