import { ReactNode } from "react"

interface IconCardProps {
    main: string
    subtitle: string
    children: ReactNode
}

export default function IconCard({ children, main, subtitle }: IconCardProps) {
    return (
        <div className={`flex gap-6 rounded-md border border-gray-200 w-full py-4 px-6 ${main === 'undefined' && 'justify-center'}`}>
            {main === 'undefined' ?
                <>
                    <div className="loader"></div>
                </>
                :
                <>
                    {children}
                    < div >
                        <h3 className="text-gray-900 text-xl font-medium">{main}</h3>
                        <p className="text-gray-600 text-sm">{subtitle}</p>
                    </div>
                </>
            }
        </div >
    )
}