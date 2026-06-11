import { useState, useRef } from 'react'
import { Upload, LoaderCircle  } from 'lucide-react'

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

export const UploadEML = () => {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<EmailResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [loadingAnalysis, setLoadingAnalysis] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)
    // TODO: fix time out error when waiting for ollama to respond
    // TODO: style the parsed data

    const basic_headers = [
        { label: 'Subject', value: result?.header?.subject },
        { label: 'Message ID', value: result?.header?.header?.["message-id"] },
        { label: 'From', value: result?.header?.from },
        { label: 'To', value: result?.header?.to?.join(', ') },
        { label: 'Date', value: result?.header?.date },
    ]

    const analysis = { label: 'Analysis', value: result?.analysis }

    const handleSubmit = async () => {
        if (!file) {
            setError("Please upload a file first")
            return
        }
        setError(null)

        const formData = new FormData()
        formData.append('file', file)

        setLoading(true)
            try{
            // const parseRes = await fetch('/api/analyse', { // uncomment when in production
            // const parseRes = await fetch('http://192.168.1.50:8080/analyse', {
            const parseRes = await fetch('http://localhost:8080/parse', {
                method: 'POST',
                body: formData,
            })
            const parseText = await parseRes.text()
            // console.log("Raw parseRes:", parseText)
            // console.log("Status:", parseRes.status)

            if (!parseText) {
                console.error("Empty response from server")
                return
            }
            
            const parseData = JSON.parse(parseText)
            console.log(parseData)
            setResult(parseData)
        } catch (parseError) {
            console.error("Error fetching email data:", parseError)
        } finally {
            setLoading(false)
        }
        setLoadingAnalysis(true)
            try{
                const analyseRes = await fetch('http://localhost:8080/analyse', {
                    method:'POST',
                    body: formData,
            })
            const analyseText = await analyseRes.text()
            // console.log("Raw parseRes:", analyseText)
            // console.log("Status:", parseRes.status)

            if (!analyseText) {
                console.error("Empty response from server")
                return
            }

            const analyseData = JSON.parse(analyseText)
            setResult(prev => prev ? {...prev, analysis: analyseData.analysis} : null)
            setLoadingAnalysis(false)
            } catch (analyseError) {
                console.error("Error analysing data:", analyseError)
            } finally {
                setLoadingAnalysis(false)
            }

    }

    return (
        <>
            <div 
                className="relative min-h-screen flex flex-col items-center justify-center px-4"
                id="upload"
            >
                <button 
                    className='flex flex-col items-center gap-2 border-dashed border-card-border 
                                border px-80 py-20 cursor-pointer rounded-2xl card-hover-alt'
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".eml"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        className="hidden"
                    />
                    <Upload />
                    {file ? file.name : "Upload email here:"}
                </button>
                <button
                    onClick={handleSubmit}
                    className='mt-5 border-2 border-primary cosmic-button'
                >
                    Analyse
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="w-full flex flex-col items-center">
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
                <div className="w-full flex flex-col items-center">
                    {loading && <div className="absolute mt-6 animate-spin"><LoaderCircle size={32} /></div>}
                    {result?.analysis && (
                        <div>
                            {analysis.label}: {result.analysis}
                        </div>
                    )}
                    {loadingAnalysis && 
                        <div className='flex flex-col items-center'>
                            <span>Loading report</span>
                            <div className="mt-2 animate-spin"><LoaderCircle size={32} /></div>
                        </div>}
                </div>
            </div>
        </>
    )

}