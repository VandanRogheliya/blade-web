"use client"

import { useState } from "react"
import {
  TRANSACTION_PLACEHOLDER_TEXT,
  TRANSACTION_PARSER_STRINGS,
} from "@/lib/constants/transaction-parser"
import { generateCurlCommand } from "@/lib/services/ai-api"
import { ValuePropositionCard } from "./value-proposition-card"
import { InputProvidedSection } from "./input-provided-section"
import { JsonResponseViewer } from "./json-response-viewer"
import { CurlCommandSection } from "./curl-command-section"
import { TransactionInputForm } from "./transaction-input-form"

const SAMPLE_RESPONSE = {
  status: "success",
  data: {
    bank: "SBI",
    account_last_digits: "234567",
    transaction_type: "debit",
    method: "NACH",
    amount: 8456.0,
    currency: "INR",
    date: "2025-11-03",
    balance: 112345.78,
  },
}

export default function TransactionParserDemo() {
  const [inputText, setInputText] = useState("")
  const [hasResult, setHasResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [responseTime, setResponseTime] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const effectiveInput = inputText || TRANSACTION_PLACEHOLDER_TEXT
  const curlCommand = generateCurlCommand(effectiveInput)

  const handleParse = () => {
    setIsLoading(true)
    setError(null)

    // Simulate API call with random response time between 50-800ms
    const time = Math.floor(Math.random() * 750) + 50
    setTimeout(() => {
      setResponseTime(time)
      setHasResult(true)
      setIsLoading(false)
    }, time)
  }

  if (hasResult) {
    return (
      <div className="w-full max-w-4xl space-y-8 mx-auto my-10">
        <InputProvidedSection inputText={effectiveInput} />

        {error ? (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        ) : (
          <JsonResponseViewer data={SAMPLE_RESPONSE} responseTime={responseTime} />
        )}

        <CurlCommandSection curlCommand={curlCommand} />

        <div className="border-t border-border" />

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
    )
  }

  return (
    <div className="w-full max-w-3xl space-y-6 mx-auto my-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold tracking-tight text-balance">
            {TRANSACTION_PARSER_STRINGS.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {TRANSACTION_PARSER_STRINGS.description}
          </p>
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
