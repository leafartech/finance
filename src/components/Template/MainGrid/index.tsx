import { ReactNode } from "react"

interface MainGridPros {
    children: ReactNode
}

export default function MainGrid({ children }: MainGridPros) {
    return (
        <main className="overflow-x-hidden flex flex-col sm:grid sm:grid-cols-gridMain h-full">
            {children}
        </main>
    )
}