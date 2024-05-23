import Navbar from "components/Navbar"
import { ReactNode } from "react"

interface TemplateProps {
    type: boolean //false - páginas iniciais. true - páginas do sistema
    children: ReactNode
}

export default function Template({ type, children }: TemplateProps) {
    return (
        <main className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
            {children}
        </main>
    )
}