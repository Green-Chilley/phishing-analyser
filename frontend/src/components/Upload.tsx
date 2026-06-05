import { useState } from 'react'

export const Upload = () => {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState(null)

    const handleSubmit = async () => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('http://localhost:8080/analyse', {
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
                {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
            </div>
        </>
    )

}