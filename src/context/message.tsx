import { ReactNode, SetStateAction, createContext, useState } from "react";

interface MessageContextProps {
    fields: {
        type: boolean,
        isActived: boolean,
        text: string
    },
    setFields: React.Dispatch<SetStateAction <{type: boolean, isActived: boolean, text: string}>>
}

export const MessageContext = createContext({} as MessageContextProps)

interface MessageProviderProps {
    children: ReactNode
}

export default function MessageProvider({children}: MessageProviderProps) {
    const [ fields, setFields ] = useState({type: false, isActived: false, text: ''})

    return (
        <MessageContext.Provider value={{ fields, setFields }}>
            {children}
        </MessageContext.Provider>
    )
}