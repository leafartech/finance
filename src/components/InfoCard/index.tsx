import { ReactNode } from "react"

interface InfoCardProps {
    children: ReactNode
}

export default function InfoCard({ children }: InfoCardProps) {
    return (
        <div className="relative p-6 rounded-md border border-gray-200 h-64 w-64">
            {children}
        </div>
    )
}