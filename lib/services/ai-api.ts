import { AI_API_BASE_URL, AI_API_ENDPOINTS } from "@/lib/constants/api"
import type { ParseTxnRequest, ParseTxnResponse } from "@/lib/types/transaction-parser"

export class AiApiError extends Error {
  public readonly code: string
  public readonly statusCode?: number

  constructor(message: string, code: string, statusCode?: number) {
    super(message)
    this.name = "AiApiError"
    this.code = code
    this.statusCode = statusCode
  }
}

export async function parseTransaction(
  text: string,
  date?: string
): Promise<ParseTxnResponse> {
  const url = `${AI_API_BASE_URL}${AI_API_ENDPOINTS.transactionParser}`

  const body: ParseTxnRequest = { text }
  if (date) {
    body.date = date
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new AiApiError(
      `API request failed: ${response.statusText}`,
      "API_ERROR",
      response.status
    )
  }

  return response.json() as Promise<ParseTxnResponse>
}

export function generateCurlCommand(text: string): string {
  const url = `${AI_API_BASE_URL}${AI_API_ENDPOINTS.transactionParser}`
  const escapedText = text.replace(/"/g, '\\"').replace(/\n/g, '\\n')

  return `curl --request POST \\
  --url ${url} \\
  --header 'Content-Type: application/json' \\
  --data '{"text": "${escapedText}"}'`
}
