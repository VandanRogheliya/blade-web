import type { ApiSuccessResponse, ApiErrorResponse } from "./api"

export interface TransactionData {
  bank: string
  account_last_digits: string
  transaction_type: "debit" | "credit"
  method: string
  amount: number
  currency: string
  date: string
  balance: number
}

export type ParseSuccessResponse = ApiSuccessResponse<TransactionData>
export type ParseErrorResponse = ApiErrorResponse
export type ParseResponse = ParseSuccessResponse | ParseErrorResponse

export interface ValuePropositionCardProps {
  className?: string
}

export interface InputProvidedSectionProps {
  inputText: string
}

export interface JsonResponseViewerProps {
  data: unknown
  responseTime: number
}

export interface CurlCommandSectionProps {
  curlCommand: string
}

export interface TransactionInputFormProps {
  inputText: string
  onInputChange: (value: string) => void
  onParse: () => void
  isLoading: boolean
  placeholder: string
  title?: string
  description?: string
  id?: string
}
