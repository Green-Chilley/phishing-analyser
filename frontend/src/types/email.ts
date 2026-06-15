export interface EmailResult {
    header: {
        from: string
        subject: string
        date: string
        to: string[]
        header: {
            "message-id": string
            "authentication-results": string[]
            "dkim-signature": string[]
            "received-spf": string[]
            "return-path": string[]
            "sender": string[]

            "x-ms-exchange-eopdirect": boolean[]
            "x-ms-exchange-crosstenant-network-message-id": string[]
            "x-ms-exchange-organization-expirationstarttimereason": string[]
            "x-mailgun-track-clicks": boolean[]
            "x-ms-exchange-crosstenant-id": string[]
            "x-sid-result": string[]

            [key: string]: unknown
        }
        received: {
            src: string,
            from:[],
            by:[],
            with: string,
            date: string,
        }[]
    }
    body: {
        content_type: string
        content: string
        hash?: string
        domain?: []
        uri?: []
        [key: string]: unknown
    }[]
    attachment: {
        filename: string
        mime_type: string
        raw: string
    }[]
    analysis: string
}