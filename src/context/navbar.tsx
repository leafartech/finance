import { ReactNode, SetStateAction, createContext, useState } from "react"

type NavbarContextType = {
    navbarToggle: boolean
    setNavbarToggle: React.Dispatch<SetStateAction<boolean>>
}

export const NavbarContext = createContext({} as NavbarContextType)

interface NavbarProviderProps {
    children: ReactNode
}

export function NavbarProvider({ children }: NavbarProviderProps) {
    const [ navbarToggle, setNavbarToggle ] = useState(true)

    return (
        <NavbarContext.Provider value={{ navbarToggle, setNavbarToggle }}>
            {children}
        </NavbarContext.Provider>
    )
}