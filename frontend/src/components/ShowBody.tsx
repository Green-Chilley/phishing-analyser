import { getTextHtml } from '@/headers/headers'
import type { EmailResult } from '@/types/email'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useState } from 'react'

type View = 'text/html' | 'text/plain'
interface Props {
    result: EmailResult | null
}

export const ShowBody = ({ result }: Props) => {
    const [view, setView] = useState<View>('text/plain')
    const [plain, html] = getTextHtml(result)

    const isHtml = !!html?.value
    const isPlain = !!plain?.value

    if (!isHtml && !isPlain) return null

    const views: View[] = [
        ...(isPlain ? ['text/plain' as View] : []),
        ...(isHtml ? ['text/html' as View] : [])
    ]

    return (
            <>
                <div className="w-full max-w-400 mt-5 border-t-2 flex flex-col">
                    <hr className="border-t-2 border-border w-full" />
                    <div className="pl-10 rounded text-sm text-left w-full overflow-x-auto">
                        <div className='flex gap-2 mt-4'>
                            {views.map(v => (
                                <button
                                    key={v}
                                    onClick={() => setView(v)}
                                    className={`px-3 py-1 rounded text-xs capitalize ${
                                        view === v ? 'bg-green-500 text-white' : 'bg-card-border text-muted'
                                    }`}
                                >
                                    {v}
                                </button>
                                
                            ))}
                        </div>
                        <div className='grid sm:grid-cols-2 mt-10 gap-6'>
                            {view === 'text/html' ? (
                                <>
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
                                </>

                            ) : (
                                <div className='rounded-lg h-96 text-sm flex-auto w-full border-0 bg-gray-500'>
                                    {plain.value}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>    
    )

    if (html && !plain) {
    return (
            <>
                <div className="w-full max-w-400 mt-5 border-t-2 flex flex-col">
                    <hr className="border-t-2 border-border w-full" />
                    <div className="pl-10 rounded text-sm text-left w-full overflow-x-auto">
                            <div className='grid sm:grid-cols-2 mt-10 gap-6'>
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
                    </div>
                </div>
            </>
        )
    }
    else if (!html && plain) {
        return (
            <>
                <div className="w-full max-w-400 mt-5 border-t-2 flex flex-col">
                    <hr className="border-t-2 border-border w-full" />
                    <div className="pl-10 rounded text-sm text-left w-full overflow-x-auto">
                            <div className='grid sm:grid-cols-2 mt-10 gap-6'>
                                {plain.value}
                            </div>
                    </div>
                </div>
            </>
        )
    }
    else if (html && plain) {
        return (
            <>
                <div className="w-full max-w-400 mt-5 border-t-2 flex flex-col">
                    <hr className="border-t-2 border-border w-full" />
                    <div className="pl-10 rounded text-sm text-left w-full overflow-x-auto">
                            <div className='grid sm:grid-cols-2 mt-10 gap-6'>
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
                    </div>
                </div>
            </>
        )
    }
}