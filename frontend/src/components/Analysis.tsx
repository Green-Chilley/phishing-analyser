import type { AnalysisResult } from '@/types/email'
import {cn} from '@/lib/utils'
import { TriangleAlert, ShieldAlert, MailCheck, MailX } from 'lucide-react'
import type { ReactNode } from 'react'

interface Props {
    analysis: AnalysisResult | null
}

type Verdict = "Malicious" | "Suspicious" | "Graymail" | "Benign"

const verdictConfig: Record<Verdict, {color: string, border: string, icon: ReactNode }> = {
    Malicious: { color: "text-red-500", border: "border-red-600", icon: <TriangleAlert size={20}/>},
    Suspicious: { color: "text-yellow-500", border: "border-yellow-500", icon: <ShieldAlert size={20}/>},
    Graymail: { color: "text-gray-400", border: "border-gray-400", icon: <MailX size={20}/>},
    Benign: { color: "text-green-500", border: "border-green-500", icon: <MailCheck size={20}/>},
}

export const Analysis = ({ analysis }: Props) => {
    const config = verdictConfig[analysis?.verdict as Verdict] ?? verdictConfig["Benign"]
    return (
        <div>
            <h1 className='text-2xl font-bold mb-2'>Attack Analysis</h1>
            <div className={cn('border-t-8 pt-2 rounded-l-md', config.border)}
            >
                <div className='flex flex-col'>
                    <span className="font-semibold">Verdict</span>
                    <div className={cn('flex items-center gap-2 border-2', config.color)}>
                        {config.icon}
                        <span>{analysis?.verdict ?? "unknown"}</span>
                    </div>
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