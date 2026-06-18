import { useState, useRef } from 'react'
import { Upload, LoaderCircle  } from 'lucide-react'
import type { EmailResult } from '@/types/email'
import { getAnalysis } from '@/headers/headers'
import { XHeaders } from '@/components/XHeaders'
import { BasicHeaders } from '@/components/BasicHeaders'
import { Body } from '@/components/Body'
import { ShowBody } from '@/components/ShowBody'
import { SecurityHeaders } from '@/components/SecurityHeaders'


// TODO: fix time out error when waiting for ollama to respond
// TODO: style the parsed data
// TODO: create hops table


export const UploadEML = () => {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<EmailResult | null>(null)
    const [loading, setLoading] = useState(false)
    // const [loadingAnalysis, setLoadingAnalysis] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const analysis = getAnalysis(result)

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
            try{
            const parseRes = await fetch('/api/analyse', { // uncomment when testing prod
            // const parseRes = await fetch('http://192.168.1.50:8080/analyse', { // uncomment when testing webserver
            // const parseRes = await fetch('http://localhost:8080/parse', {
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


        // LLM API


        // setLoadingAnalysis(true)
        //     try{
        //         // const analyseRes = await fetch('/api/analyse', { // uncomment when testing prod
        //         // const analyseRes = await fetch('http://192.168.1.50:8080/analyse', { // uncomment when testing webserver
        //         const analyseRes = await fetch('http://localhost:8080/analyse', {
        //             method:'POST',
        //             body: formData,
        //     })
        //     const analyseText = await analyseRes.text()
        //     // console.log("Raw parseRes:", analyseText)
        //     // console.log("Status:", parseRes.status)

        //     if (!analyseText) {
        //         console.error("Empty response from server")
        //         return
        //     }

        //     const analyseData = JSON.parse(analyseText)
        //     setResult(prev => prev ? {...prev, analysis: analyseData.analysis} : null)
        //     setLoadingAnalysis(false)
        //     } catch (analyseError) {
        //         console.error("Error analysing data:", analyseError)
        //     } finally {
        //         setLoadingAnalysis(false)
        //     }

    }

    return (
        <>
            <div className="flex flex-col items-center px-4" id="upload">
                <div className='mt-100 flex flex-col items-center justify-center'>
                    <button 
                        className='flex flex-col items-center gap-2 border-dashed border-card-border 
                                    border px-8 py-20 cursor-pointer rounded-2xl card-hover-bg w-188'
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
                        // disabled={loading || loadingAnalysis}
                        disabled={loading}
                        className='mt-5 border-2 border-primary cosmic-button'
                    >
                        Analyse
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {loading && <div className="mt-6 animate-spin"><LoaderCircle size={32} /></div>}
                </div>
                {result && (
                    <div className="w-full max-w-400 flex flex-col mb-10">
                        <BasicHeaders result={result}/>
                        <SecurityHeaders result={result} />
                        <XHeaders result={result}/>
                        <Body result={result}/>
                        <ShowBody result={result}/>
                        {result?.analysis && (
                            <div>{analysis.label}: {result.analysis}</div>
                        )}
                        {/* {loadingAnalysis && 
                            <div className='flex flex-col items-center'>
                                <span>Loading report</span>
                                <div className="mt-2 animate-spin"><LoaderCircle size={32} /></div>
                            </div>
                        } */}
                    </div>
                )}
            </div>
        </>
    )

}