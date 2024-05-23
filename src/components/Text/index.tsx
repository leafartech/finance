import { ReactNode } from "react"

interface TextProps {
    subtitle?: string
    children: ReactNode
}

export default function Text({children, subtitle}: TextProps) {
    return (
        <div className="flex flex-col pt-4 pb-2 sm:py-4">
            <h1 className="font-semibold text-xl">{children}</h1>
            <p className="font-normal text-sm text-gray-600">{subtitle}</p>
        </div>
    )
}