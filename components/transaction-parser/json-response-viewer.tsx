"use client"

import { useState } from "react"
import { Check, Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TRANSACTION_PARSER_STRINGS } from "@/lib/constants/transaction-parser"
import type { JsonResponseViewerProps } from "@/lib/types/transaction-parser"

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

function renderJsonLine(
  key: string | null,
  value: JsonValue,
  isLast: boolean,
  indent: number = 1
): React.ReactNode[] {
  const lines: React.ReactNode[] = []
  const indentStr = "  ".repeat(indent)

  if (value === null) {
    lines.push(
      <div key={`${key}-null`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        {key && (
          <>
            <span className="json-key">&quot;{key}&quot;</span>
            <span className="json-bracket">: </span>
          </>
        )}
        <span className="json-null">null</span>
        {!isLast && <span className="json-bracket">,</span>}
      </div>
    )
    return lines
  }

  if (typeof value === "boolean") {
    lines.push(
      <div key={`${key}-bool`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        {key && (
          <>
            <span className="json-key">&quot;{key}&quot;</span>
            <span className="json-bracket">: </span>
          </>
        )}
        <span className="json-boolean">{value.toString()}</span>
        {!isLast && <span className="json-bracket">,</span>}
      </div>
    )
    return lines
  }

  if (typeof value === "number") {
    lines.push(
      <div key={`${key}-num`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        {key && (
          <>
            <span className="json-key">&quot;{key}&quot;</span>
            <span className="json-bracket">: </span>
          </>
        )}
        <span className="json-number">{value}</span>
        {!isLast && <span className="json-bracket">,</span>}
      </div>
    )
    return lines
  }

  if (typeof value === "string") {
    lines.push(
      <div key={`${key}-str`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        {key && (
          <>
            <span className="json-key">&quot;{key}&quot;</span>
            <span className="json-bracket">: </span>
          </>
        )}
        <span className="json-string">&quot;{value}&quot;</span>
        {!isLast && <span className="json-bracket">,</span>}
      </div>
    )
    return lines
  }

  if (Array.isArray(value)) {
    lines.push(
      <div key={`${key}-arr-open`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        {key && (
          <>
            <span className="json-key">&quot;{key}&quot;</span>
            <span className="json-bracket">: </span>
          </>
        )}
        <span className="json-bracket">[</span>
      </div>
    )

    value.forEach((item, index) => {
      lines.push(...renderJsonLine(null, item, index === value.length - 1, indent + 1))
    })

    lines.push(
      <div key={`${key}-arr-close`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        <span className="json-bracket">]</span>
        {!isLast && <span className="json-bracket">,</span>}
      </div>
    )
    return lines
  }

  if (typeof value === "object") {
    const entries = Object.entries(value)

    lines.push(
      <div key={`${key}-obj-open`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        {key && (
          <>
            <span className="json-key">&quot;{key}&quot;</span>
            <span className="json-bracket">: </span>
          </>
        )}
        <span className="json-bracket">{"{"}</span>
      </div>
    )

    entries.forEach(([k, v], index) => {
      lines.push(...renderJsonLine(k, v as JsonValue, index === entries.length - 1, indent + 1))
    })

    lines.push(
      <div key={`${key}-obj-close`} className="line">
        <span className="text-muted-foreground">{indentStr}</span>
        <span className="json-bracket">{"}"}</span>
        {!isLast && <span className="json-bracket">,</span>}
      </div>
    )
    return lines
  }

  return lines
}

function renderJson(data: JsonValue): React.ReactNode {
  const lines: React.ReactNode[] = []

  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    lines.push(
      <div key="root-open" className="line">
        <span className="json-bracket">{"{"}</span>
      </div>
    )

    const entries = Object.entries(data)
    entries.forEach(([key, value], index) => {
      lines.push(...renderJsonLine(key, value as JsonValue, index === entries.length - 1, 1))
    })

    lines.push(
      <div key="root-close" className="line">
        <span className="json-bracket">{"}"}</span>
      </div>
    )
  }

  return lines
}

export function JsonResponseViewer({ data, responseTime }: JsonResponseViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isSuccess = data && typeof data === "object" && "status" in data && data.status === "success"

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            {TRANSACTION_PARSER_STRINGS.jsonResponseTitle}
          </h3>
          {isSuccess && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Parsed</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
            <span className="text-xs font-mono text-muted-foreground">
              {responseTime}ms
            </span>
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
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
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
            <span className="text-xs font-mono text-muted-foreground ml-2">response.json</span>
          </div>

          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
            application/json
          </span>
        </div>

        {/* Code block */}
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm font-mono code-block leading-relaxed">
            <code>{renderJson(data as JsonValue)}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
