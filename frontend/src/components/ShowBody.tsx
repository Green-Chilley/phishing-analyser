import { getTextHtml } from '@/headers/headers'
import type { EmailResult } from '@/types/email'

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
                    <iframe
                        srcDoc={body[1].value}
                        sandbox=""
                        className="w-full h-96 border-0 bg-white card-hover"
                    />
                </div>
            </div>
        </>
    )
}