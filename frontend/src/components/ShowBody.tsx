import { getTextHtml } from '@/headers/headers'
import type { EmailResult } from '@/types/email'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useState } from 'react'

type View = 'text/html' | 'text/plain' | 'json'
interface Props {
    result: EmailResult | null
}

export const ShowBody = ({ result }: Props) => {
    const [plain, html] = getTextHtml(result)

    const isHtml = !!html?.value
    const isPlain = !!plain?.value

    const defaultView: View = isPlain ? 'text/plain' : 'text/html'
    const [view, setView] = useState<View>(defaultView)

    if (!isHtml && !isPlain) return null

    const views: View[] = [
        ...(isPlain ? ['text/plain' as View] : []),
        ...(isHtml ? ['text/html' as View] : []),
        ...(['json' as View])
    ]

    return (
        <div className="w-full mt-5 border-t-2 flex flex-col">
            <hr className="border-t-2 border-border w-full" />
            <div className="pl-10 rounded text-sm text-left w-full overflow-x-auto">
                <div className='flex justify-center gap-2 mt-4'>
                    {views.map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`px-3 py-1 rounded cursor-pointer ${
                                view === v ? 'bg-primary text-white' : 'bg-card-border text-muted'
                            }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
                <div className='mt-4'>
                    {view === 'text/html' && (
                        <div className='grid sm:grid-cols-2 mt-4 gap-6'>
                            <SyntaxHighlighter
                                className='rounded-lg h-96 text-sm'
                                language="html"
                                style={atomOneDark}
                            >
                                {String(html.value)}
                            </SyntaxHighlighter>
                            <iframe
                                srcDoc={html.value}
                                sandbox=""
                                className="flex-auto w-full h-96 border-0 bg-white rounded-lg"
                            />
                        </div>
                    )}
                    {view === 'text/plain' && (
                        <pre className='border-0 rounded-lg gradient-border h-96 
                                        text-sm flex-auto w-full bg-gray-950 pl-6'>
                            {plain.value}
                        </pre>
                    )}
                    {view === 'json' && (
                        <SyntaxHighlighter
                            className='rounded-lg h-96 text-sm'
                            language="json"
                            style={atomOneDark}
                        >
                            {JSON.stringify(result, null, 2)}
                        </SyntaxHighlighter>
                    )}
                </div>
            </div>
        </div>
    )
}