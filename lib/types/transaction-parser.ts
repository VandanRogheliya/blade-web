// Request type for the transaction parser API
export interface ParseTxnRequest {
  text: string
  date?: string // Optional date override
}

// Response type from the Go API
export interface ParseTxnResponse {
  is_valid_transaction: boolean
  transaction: {
    amount: number // in paise/cents
    currency: string
    type: string // "DEBIT" | "CREDIT"
    method: string // "NETBANKING", "UPI", etc.
    status: string // "SUCCESS", "FAILED", etc.
    timestamp: string // ISO format "2025-11-03T00:00:00"
  }
  user_account: {
    institution: string | null
    masked_number: string | null
    balance_available: number | null // in paise/cents
  }
  counterparty: {
    name: string | null
    identifier: string | null
  }
  refs: {
    reference_number: string | null
    secondary_reference: string | null
  }
}

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
