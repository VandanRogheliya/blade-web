"use client"

import { useState } from "react"
import {
  TRANSACTION_PLACEHOLDER_TEXT,
  TRANSACTION_PARSER_STRINGS,
} from "@/lib/constants/transaction-parser"
import { generateCurlCommand, parseTransaction } from "@/lib/services/ai-api"
import type { ParseTxnResponse } from "@/lib/types/transaction-parser"
import { ValuePropositionCard } from "./value-proposition-card"
import { InputProvidedSection } from "./input-provided-section"
import { JsonResponseViewer } from "./json-response-viewer"
import { CurlCommandSection } from "./curl-command-section"
import { TransactionInputForm } from "./transaction-input-form"

export default function TransactionParserDemo() {
  const [inputText, setInputText] = useState("")
  const [hasResult, setHasResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [responseTime, setResponseTime] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<ParseTxnResponse | null>(null)

  const effectiveInput = inputText || TRANSACTION_PLACEHOLDER_TEXT
  const curlCommand = generateCurlCommand(effectiveInput)

  const handleParse = async () => {
    setIsLoading(true)
    setError(null)
    const startTime = performance.now()

    try {
      const response = await parseTransaction(effectiveInput)
      setResponseTime(Math.round(performance.now() - startTime))
      setApiResponse(response)
      setHasResult(true)
    } catch (err) {
      setResponseTime(Math.round(performance.now() - startTime))
      setError(err instanceof Error ? err.message : "Failed to parse transaction")
      setHasResult(true)
    } finally {
      setIsLoading(false)
    }
  }

  const isInvalidTransaction = apiResponse && !apiResponse.is_valid_transaction

  if (hasResult) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="animate-stagger space-y-8">
          <InputProvidedSection inputText={effectiveInput} />

          {error ? (
            <div className="terminal-card p-5 border-destructive/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <p className="text-destructive text-sm font-mono">{error}</p>
              </div>
            </div>
          ) : isLoading ? (
            <div className="relative">
              {apiResponse && (
                <div className="opacity-50 pointer-events-none">
                  <JsonResponseViewer data={apiResponse} responseTime={responseTime} />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/80 border border-border/50 backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-mono text-muted-foreground">Parsing...</span>
                </div>
              </div>
            </div>
          ) : isInvalidTransaction ? (
            <div className="space-y-4">
              <div className="terminal-card p-5 border-yellow-500/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <p className="text-yellow-500 text-sm font-mono">
                    The given message is not a valid transaction message
                  </p>
                </div>
              </div>
              <JsonResponseViewer data={apiResponse} responseTime={responseTime} />
            </div>
          ) : (
            <JsonResponseViewer data={apiResponse} responseTime={responseTime} />
          )}

          <CurlCommandSection curlCommand={curlCommand} />

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                New Request
              </span>
            </div>
          </div>

          <TransactionInputForm
            inputText={inputText}
            onInputChange={setInputText}
            onParse={handleParse}
            isLoading={isLoading}
            placeholder={TRANSACTION_PLACEHOLDER_TEXT}
            title={TRANSACTION_PARSER_STRINGS.tryAnotherTitle}
            description={TRANSACTION_PARSER_STRINGS.tryAnotherDescription}
            id="transaction-text-2"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-16">
      <div className="animate-stagger space-y-10">
        {/* Hero Section */}
        <div className="space-y-5 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            AI-Powered Parsing Engine
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-foreground">
              {TRANSACTION_PARSER_STRINGS.title.split(" ")[0]}
            </span>
            <br />
            <span className="text-primary">
              {TRANSACTION_PARSER_STRINGS.title.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
            {TRANSACTION_PARSER_STRINGS.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary">Fast</div>
              <div className="text-[10px] sm:text-xs text-foreground/60 uppercase tracking-wider font-semibold">Avg Response</div>
            </div>
            <div className="w-px h-8 sm:h-10 bg-border" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary">High</div>
              <div className="text-[10px] sm:text-xs text-foreground/60 uppercase tracking-wider font-semibold">Accuracy</div>
            </div>
            <div className="w-px h-8 sm:h-10 bg-border" />
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary">Many</div>
              <div className="text-[10px] sm:text-xs text-foreground/60 uppercase tracking-wider font-semibold">Banks</div>
            </div>
          </div>
        </div>

        <ValuePropositionCard />

        <TransactionInputForm
          inputText={inputText}
          onInputChange={setInputText}
          onParse={handleParse}
          isLoading={isLoading}
          placeholder={TRANSACTION_PLACEHOLDER_TEXT}
          id="transaction-text"
        />
      </div>
    </div>
  )
}
