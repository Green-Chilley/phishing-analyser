import { getTextHtml } from '@/headers/headers'
import type { EmailResult } from '@/types/email'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
interface Props {
    result: EmailResult | null
}

export const ShowBody = ({ result }: Props) => {
    
    const body = getTextHtml(result)
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
                            {String(body[1].value)}
                        </SyntaxHighlighter>

                        <iframe
                            srcDoc={body[1].value}
                            sandbox=""
                            className="flex-auto w-full h-96 border-0 bg-white rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}