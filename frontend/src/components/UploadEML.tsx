import { useState, useRef } from 'react'
import { Upload, LoaderCircle  } from 'lucide-react'
import {cn} from '@/lib/utils'
import type { AnalysisResult, EmailResult } from '@/types/email'

import { XHeaders } from '@/components/XHeaders'
import { BasicHeaders } from '@/components/BasicHeaders'
import { Body } from '@/components/Body'
import { SecurityHeaders } from '@/components/SecurityHeaders'


// TODO: fix time out error when waiting for ollama to respond - solved by hosting ollama on PC
// TODO: create hops table


export const UploadEML = () => {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<EmailResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
    const [loadingAnalysis, setLoadingAnalysis] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const runAnalysis = async (parseData: any) => {
        setLoadingAnalysis(true)

        try {
            const analyseRes = await fetch('http://localhost:8080/analyse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    from_address: parseData.header?.from ?? "",
                    reply_to: parseData.header?.header?.['reply-to']?.[0] ?? null,
                    subject: parseData.header?.subject ?? "",
                    body: parseData.body?.[0]?.content?.slice(0, 3000) ?? ""
                })
            })
            const analyseData = await analyseRes.json()
            setAnalysis(analyseData)
        } catch (analyseError) {
            console.error("Error analysing email:", analyseError)
            setError("Failed to analyse email")
        } finally {
            setLoadingAnalysis(false)
        }
    }

    const handleSubmit = async () => {
        setResult(null)
        if (!file) {
            setError("Please upload a file first")
            return
        }
        setError(null)

        const formData = new FormData()
        formData.append('file', file)
        setLoading(true)

        let parseData: any = null
        try {
        // const parseRes = await fetch('/api/parse', { // uncomment when testing prod
        // const parseRes = await fetch('http://192.168.1.50:8080/parse', { // uncomment when testing webserver
            const parseRes = await fetch('http://localhost:8080/parse', { // testing locally
                    method: 'POST',
                    body: formData,
            })
            parseData = await parseRes.json()
            setResult(parseData)
        } catch (parseError) {
            console.error("Error fetching email data:", parseError)
            setError("Failed to parse email.")
        } finally {
            setLoading(false)
        }

        if (!parseData) return
        runAnalysis(parseData)
    }

    return (
<>
            <div
                className="flex flex-col items-center justify-center px-4 min-h-screen"
                id="upload"
            >
                <div
                    className={cn(
                        'flex flex-col items-center justify-center w-full',
                        result ? "mt-24 mb-24" : "mt-0"
                    )}
                >
                    <button
                        className='flex flex-col items-center gap-2 border-dashed border-card-border 
                                    border px-8 py-20 cursor-pointer rounded-2xl card-hover-bg w-full max-w-3xl'
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
                        <span className='w-full truncate text-center'>
                            {file ? file.name.slice(0, 20) + (file.name.length > 20 ? '...' : '') :
                                "Upload email here:"}
                        </span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || loadingAnalysis}
                        className='mt-5 border-2 border-primary cosmic-button'
                    >
                        Analyse
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {loading && <div className="mt-6 animate-spin"><LoaderCircle size={32} /></div>}
                </div>

                {result && (
                    <div className="w-full max-w-400 flex flex-col mb-10">
                        <div className="mb-6">
                            <h1 className='text-3xl mb-4'>Analysis</h1>
                            {loadingAnalysis ? (
                                <div className='flex flex-col items-center'>
                                    <span>Loading report</span>
                                    <div className="mt-2 animate-spin"><LoaderCircle size={32} /></div>
                                </div>
                            ) : analysis && (
                                <div>
                                    <div>
                                        <span className="font-semibold">Verdict: </span>
                                        <span className={
                                            analysis.verdict === "phishing" ? "text-red-500" :
                                            analysis.verdict === "suspicious" ? "text-yellow-500" :
                                            "text-green-500"
                                        }>
                                            {analysis.verdict ?? "unknown"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Confidence: </span>
                                        {analysis.confidence ?? "unknown"}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Risk Score: </span>
                                        {analysis.risk_score ?? "N/A"}/10
                                    </div>
                                    <div>
                                        <span className="font-semibold">Reasons:</span>
                                        <ul className="list-disc list-inside mt-1">
                                            {analysis.reasons?.map((reason: string, i: number) => (
                                                <li key={i}>{reason}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                        <BasicHeaders result={result} />
                        <Body result={result} />
                        <SecurityHeaders result={result} />
                        <XHeaders result={result} />

                    </div>
                )}
            </div>
        </>
    )

}