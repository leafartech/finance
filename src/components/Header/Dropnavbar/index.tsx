import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

interface DropNavbarProps {
    dropdown: boolean
}

export default function Dropnavbar({ dropdown }: DropNavbarProps) {
    return (
        <div className={`shadow-sm z-10 absolute -bottom-[262%] right-0 w-48 bg-zinc-100 border border-zinc-300 border-t-0 rounded-b ${dropdown ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col py-2 px-0">
                <li className="cursor-pointer border-b border-transparent hover:bg-zinc-50 hover:border-b-gray-200 p-2 rounded text-sm">
                    <Link href="/logout" className="flex gap-1 items-center">
                        <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                        <span>Sair</span>
                    </Link>
                </li>
                <li className="cursor-pointer border-b border-transparent hover:bg-zinc-50 hover:border-b-gray-200 p-2 rounded flex gap-1 items-center text-sm">
                    <UserIcon className="h-4 w-4" />
                    <span>Meu perfil</span>
                </li>
            </ul>
        </div>
    )
}