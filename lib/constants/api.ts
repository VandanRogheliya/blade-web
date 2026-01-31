export const AI_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export const AI_API_ENDPOINTS = {
  transactionParser: "/api/parser/txn",
} as const
