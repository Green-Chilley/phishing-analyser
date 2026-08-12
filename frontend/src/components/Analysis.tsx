import type { AnalysisResult } from '@/types/email'
import {cn} from '@/lib/utils'

interface Props {
    analysis: AnalysisResult | null
}

export const Analysis = ({ analysis }: Props) => {
    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>Attack Analysis</h1>
            <div className={cn('border-t-8 pt-2 rounded-l-md', 
            analysis?.verdict === 'Malicious' ? 'border-red-600':
            analysis?.verdict === 'Suspicious' ? 'border-yellow-500':
            analysis?.verdict === 'Graymail' ? 'border-gray-400':
            'border-green-500'
            )}
            >
                <div>
                    <span className="font-semibold">Verdict: </span>
                    <span className={
                        analysis?.verdict === "Malicious" ? "text-red-500" :
                        analysis?.verdict === "Suspicious" ? "text-yellow-500" :
                        analysis?.verdict === "Graymail" ? "text-gray-400":
                        "text-green-500"
                    }>
                        {analysis?.verdict ?? "unknown"}
                    </span>
                </div>
                <div>
                    <span className="font-semibold">Reasons:</span>
                    <ul className="list-disc list-inside mt-1">
                        {analysis?.reasons?.map((reason: string, i: number) => (
                            <li key={i}>{reason}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}