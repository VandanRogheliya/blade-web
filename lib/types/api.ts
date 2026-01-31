export interface ApiSuccessResponse<T> {
  status: "success"
  data: T
}

export interface ApiErrorResponse {
  status: "error"
  error: {
    code: string
    message: string
  }
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export interface AiApiConfig {
  baseUrl: string
  apiKey: string | undefined
}
