import { AI_API_BASE_URL, AI_API_ENDPOINTS } from "@/lib/constants/api"
import type { ApiResponse, AiApiConfig } from "@/lib/types/api"
import type { TransactionData, ParseResponse } from "@/lib/types/transaction-parser"

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

function getApiConfig(): AiApiConfig {
  return {
    baseUrl: AI_API_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_BLADE_API_KEY,
  }
}

export async function aiApiRequest<T>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> {
  const config = getApiConfig()
  const url = `${config.baseUrl}${endpoint}`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
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

  return response.json() as Promise<ApiResponse<T>>
}

export async function parseTransaction(text: string): Promise<ParseResponse> {
  return aiApiRequest<TransactionData>(AI_API_ENDPOINTS.transactionParser, {
    text,
  })
}

export function generateCurlCommand(text: string): string {
  const config = getApiConfig()
  const url = `${config.baseUrl}${AI_API_ENDPOINTS.transactionParser}`
  const escapedText = text.replace(/"/g, '\\"')

  return `curl -X POST ${url} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "text": "${escapedText}"
  }'`
}
