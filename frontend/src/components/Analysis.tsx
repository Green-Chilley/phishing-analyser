import type { AnalysisResult } from '@/types/email'

interface Props {
    analysis: AnalysisResult | null
}

export const Analysis = ({ analysis }: Props) => {
    return (
        <div>
            <div>
                <span className="font-semibold">Verdict: </span>
                <span className={
                    analysis?.verdict === "malicious" ? "text-red-500" :
                    analysis?.verdict === "suspicious" ? "text-yellow-500" :
                    analysis?.verdict === "graymail" ? "text-gray-400":
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
    )
}