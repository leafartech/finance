import { ReactNode, SetStateAction, createContext, useState } from "react";

type ModalContextType = {
    modal: boolean
    setModal: React.Dispatch<SetStateAction<boolean>>
    modalType: string
    setModalType: React.Dispatch<SetStateAction<string>>
}

export const ModalContext = createContext({} as ModalContextType)

interface ModalProviderProps {
    children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
    const [ modal, setModal ] = useState(false)
    const [ modalType, setModalType ] = useState('')

    return (
        <ModalContext.Provider value={{ modal, setModal, modalType, setModalType }}>
            {children}
        </ModalContext.Provider>
    )
}