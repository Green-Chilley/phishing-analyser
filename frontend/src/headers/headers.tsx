import type { EmailResult } from "@/types/email"

export const getBasicHeaders = (result: EmailResult | null) => [
    { label: 'Subject', value: result?.header?.subject },
    { label: 'Message ID', value: result?.header?.header?.["message-id"] },
    { label: 'From', value: result?.header?.from },
    { label: 'To', value: result?.header?.to?.join(', ') },
    { label: 'Date', value: result?.header?.date },
]

export const getXHeaders = (result: EmailResult | null) => [
    { 
        label: 'x-ms-exchange-eopdirect', 
        value: result?.header?.header?.["x-ms-exchange-eopdirect"]
    },
    { 
        label: 'x-ms-exchange-crosstenant-network-message-id', 
        value: result?.header?.header?.["x-ms-exchange-crosstenant-network-message-id"]
    },
    { 
        label: 'x-ms-exchange-organization-expirationstarttimereason', 
        value: result?.header?.header?.["x-ms-exchange-organization-expirationstarttimereason"]
    },
    { 
        label: 'x-mailgun-track-clicks', 
        value: result?.header?.header?.["x-mailgun-track-clicks"]
    },
    { 
        label: 'x-ms-exchange-crosstenant-id', 
        value: result?.header?.header?.["x-ms-exchange-crosstenant-id"]
    },
    { 
        label: 'x-sid-result', 
        value: result?.header?.header?.["x-sid-result"]
    },
]

export const getBody = (result: EmailResult | null) => [
    { label: "Hash", value: result?.body?.[0]?.["hash"]},
    { label: "Domain", value: result?.body?.[1]?.["domain"]?.join('\n')},
    { label: "URI", value: result?.body?.[1]?.["uri"]?.join('\n\n')},
]

export const getTextHtml = (result: EmailResult | null) => [
    { label: "Plain", value: result?.body?.[0]?.["content"]},
    { label: "HTML", value: result?.body?.[1]?.["content"]}
]

export const getAnalysis = (result: EmailResult | null) => (
    { label: 'Analysis', value: result?.analysis }
)
