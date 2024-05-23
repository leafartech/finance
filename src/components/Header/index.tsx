import { useContext, useState } from "react"
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline'
import { NavbarContext } from "context/navbar"
import Dropnavbar from "./Dropnavbar"

interface HeaderProps {
    title: string
}

export default function Header({ title }: HeaderProps) {
    const { navbarToggle } = useContext(NavbarContext)
    const [dropdown, setDropdown] = useState<boolean>(false)



    return (
        <div className="justify-between border-b border-gray-200 h-9 px-4 hidden sm:flex">
            <h1 className={`font-semibold relative after:block after:absolute after:left-0 after:translate-y-2 after:rounded-lg after:h-my after:w-full after:bg-blue-500 ${!navbarToggle && 'translate-x-4'}`}>{title}</h1>
            
            <div className="relative">
                <span className={`hover:text-blue-700 cursor-pointer`} onClick={() => setDropdown(!dropdown)}>
                    <Cog6ToothIcon className="h-5 w-5" />
                </span>
                <Dropnavbar dropdown={dropdown}/>
            </div>
    
        </div>
    )
}