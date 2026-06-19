import { Fragment, } from 'react'
import { getBody } from '@/headers/headers'
import type { EmailResult } from '@/types/email'
import { ShowBody } from '@/components/ShowBody'

interface Props {
    result: EmailResult | null
}

export const Body = ({ result }: Props) => {
    
    const body = getBody(result)
    return (
        <>
            <div className="w-full max-w-400 mt-5 border-t-2 flex flex-col">
                <h1 className='justify-start pl-10 mt-5 mb-5 font-bold text-3xl text-left'>
                    Body
                </h1>
                <ShowBody result={result}/>
                <hr className="border-t-2 mt-5 mb-5 border-border w-full" />
                <div className="pl-10 rounded text-sm text-left w-full overflow-x-auto wrap-break-word">
                    {body.map((field, index) => (
                        <Fragment key={index}>
                            <div className='grid grid-cols-3 py-3'>
                                <div className='font-bold text-foreground col-start-1'>
                                    {field.label}
                                </div>
                                <div className='text-foreground col-start-2 col-span-2 whitespace-pre-line'>
                                    {field.value ?? 'N/A'}
                                </div>
                            </div>
                            <hr className="border-t border-border w-full" />
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}