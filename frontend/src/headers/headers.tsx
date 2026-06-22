import type { EmailResult } from "@/types/email"

export const getBasicHeaders = (result: EmailResult | null) => [
    { label: 'Subject', value: result?.header?.subject },
    { label: 'Message ID', value: result?.header?.header?.["message-id"] },
    { label: 'From', value: result?.header?.from },
    { label: 'To', value: result?.header?.to?.join(', ') },
    { label: 'Date', value: result?.header?.date },
]

export const getSecurityHeaders = (result: EmailResult | null) => [
    {
        label: "authentication-results",
        value: result?.header?.header?.["authentication-results"]
    },
    {
        label: "dkim-signature",
        value: result?.header?.header?.["dkim-signature"]
    },
    {
        label: "received-spf",
        value: result?.header?.header?.["received-spf"]
    },
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

export const getBody = (result: EmailResult | null) => {
    const hashPart = result?.body?.find(p => 'hash' in p)
    const contentPart = result?.body?.find(p => 'domain' in p)

    return [
        { label: "Hash", value: hashPart?.["hash"] },
        { label: "Domain", value: contentPart?.["domain"]?.join('\n') },
        { label: "URI", value: contentPart?.["uri"]?.join('\n\n') },
    ]
}

export const getTextHtml = (result: EmailResult | null) => {
    const plainPart = result?.body?.find(p => p.content_type === 'text/plain')
    const htmlPart = result?.body?.find(p => p.content_type === 'text/html')
    return [
        { label: "Plain", value: plainPart?.content },
        { label: "HTML", value: htmlPart?.content },
    ]
}
