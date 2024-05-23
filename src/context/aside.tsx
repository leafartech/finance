import { ReactNode, SetStateAction, createContext, useState } from "react";

interface AsideContextProps {
    selectedData: string
    setSelectedData: React.Dispatch<SetStateAction<string>>
}

export const AsideContext = createContext({} as AsideContextProps)

interface AsideProviderProps {
    children: ReactNode
}

export default function AsideProvider({ children }: AsideProviderProps) {
    const [ selectedData, setSelectedData ] = useState<string>('changeLog')

    return (
        <AsideContext.Provider value={{ selectedData, setSelectedData }}>
            {children}
        </AsideContext.Provider>
    )
}