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
}

export const Upload = () => {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<EmailResult | null>(null)

    const basic_headers = [
        { label: 'Subject', value: result?.header?.subject },
        { label: 'Message ID', value: result?.header?.header?.["message-id"] },
        { label: 'From', value: result?.header?.from },
        { label: 'To', value: result?.header?.to.join(', ') },
        { label: 'Date', value: result?.header?.date },
    ]

    const handleSubmit = async () => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/analyse', { // uncomment when in production
        // const response = await fetch('http://localhost:8080/analyse', {
            method: 'POST',
            body: formData,
        })
        const text = await response.text()
        console.log("Raw response:", text)
        console.log("Status:", response.status)

        if (!text) {
            console.error("Empty response from server")
            return
        }
        
        const data = JSON.parse(text)
        console.log(data)
        setResult(data)
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
                        </pre>
                    )}
                </div>
            </div>
        </>
    )

}