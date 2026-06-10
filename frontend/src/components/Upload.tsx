import { useState } from 'react'

interface EmailResult {
    header: {
        from: string
        subject: string
        date: string
        to: string[]
        header: {
            "message-id": string
        }
    }
    body: {
        content_type: string
        content: string
    }[]
    attachment: {
        filename: string
        mime_type: string
        raw: string
    }[]
    analysis: string
}

export const Upload = () => {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<EmailResult | null>(null)
    const [loading, setLoading] = useState(false)

    const basic_headers = [
        { label: 'Subject', value: result?.header?.subject },
        { label: 'Message ID', value: result?.header?.header?.["message-id"] },
        { label: 'From', value: result?.header?.from },
        { label: 'To', value: result?.header?.to?.join(', ') },
        { label: 'Date', value: result?.header?.date },
    ]

    const analysis = { label: 'Analysis', value: result?.analysis }

    const handleSubmit = async () => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        setLoading(true)
            try{
            // const response = await fetch('/api/analyse', { // uncomment when in production
            const response = await fetch('http://192.168.1.50:8080/analyse', {
            // const response = await fetch('http://localhost:8080/analyse', {
                method: 'POST',
                body: formData,
            })
            const text = await response.text()
            // console.log("Raw response:", text)
            // console.log("Status:", response.status)

            if (!text) {
                console.error("Empty response from server")
                return
            }
            
            const data = JSON.parse(text)
            console.log(data)
            setResult(data)
        } catch (error) {
            console.error("Error fetching email data:", error)
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <div className="flex items-center flex-col mb-6 relative">
                <input
                    type="file"
                    accept=".eml"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <button
                    onClick={handleSubmit}
                    className='border-2 border-primary button'
                >
                    Upload
                </button>
                <div className="w-full flex flex-col">
                    {result && (
                        <pre className="p-4 rounded text-sm text-left w-full mt-4 overflow-x-auto wrap-break-word">

                            {basic_headers.map((field, index) => (
                                <div key={index}>
                                    {field.label}: {field.value}
                                </div>
                            ))}
                            {result?.analysis && (
                                <div>
                                    {analysis.label}: {result.analysis}
                                </div>
                            )}
                        </pre>
                    )}
                    {loading && <p>Processing...</p>}
                </div>
            </div>
        </>
    )

}