export const TRANSACTION_PLACEHOLDER_TEXT =
  "Dear Customer, Your A/C XXXXX234567 has a debit by NACH of Rs 8,456.00 on 03/11/25. Avl Bal Rs 112,345.78. Download YONO - SBI"

export const TRANSACTION_PARSER_API = {
  endpoint: "/parse",
  method: "POST" as const,
}

export const TRANSACTION_PARSER_STRINGS = {
  title: "Instant Transaction Parser",
  description:
    "Turn unstructured SMS alerts into structured JSON data with lightning-fast AI processing.",
  inputLabel: "Raw Transaction Text",
  parseButton: "Parse Transaction",
  parsingButton: "Parsing...",
  tryAnotherTitle: "Try Another Transaction",
  tryAnotherDescription: "Parse another SMS alert and get instant structured data.",
  inputProvidedTitle: "Input Provided",
  jsonResponseTitle: "JSON Response",
  curlCommandTitle: "cURL Command",
  copyButton: "Copy",
  copiedButton: "Copied",
}

export const VALUE_PROPOSITION = {
  title: "Intelligent Pattern Learning",
  seenPattern: {
    label: "Seen Pattern?",
    description:
      "Our API processes it in milliseconds with cached intelligence from previous calls.",
  },
  newPattern: {
    label: "New Pattern?",
    description:
      "We forward it to our AI engine for intelligent processing. Once learned, future calls with the same pattern become lightning-fast.",
  },
  summary:
    "This means your repeated transaction formats get faster with every API call, while new patterns are intelligently discovered and cached.",
}
