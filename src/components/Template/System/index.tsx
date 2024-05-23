import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { parseCookies } from 'nookies'
import RepairUser from "http/repairUser";
import Navbar from "components/Navbar";
import Modal from "components/Modal";
import { Widgets } from "components/Widgets";

interface SystemProps {
    children: ReactNode
    overflow?: boolean
    type: 'movimentacoes' | 'metas' | 'planejamentos' | 'projetos'
}

export default function System({ children, overflow, type }: SystemProps) {
    const [allow, setAllow] = useState<boolean>(false)
    const router = useRouter()

    let session = null
    let token = null
    token = parseCookies().GF

    if (typeof token === 'undefined') { //Aqui, o token não existe e preciso redirecionar para a tela de login
        useEffect(() => {
            router.push('/conta/entrar')
        })
    } else { //Aqui, preciso recuperar os dados do usuário

        session = sessionStorage.getItem('GF - data')
        if (session === null) {
            RepairUser(sessionStorage)
        }

        useEffect(() => {
            setAllow(true)
        }, [])
    }

    return (
        allow ? (
            <div className={`flex flex-col sm:flex sm:flex-row ${!overflow ? 'h-screen' : 'min-h-screen'}`}>
                <Navbar />
                <div className="w-full py-4 px-0 sm:overflow-hidden">
                    {children}
                </div>
                <Widgets.Messages />
                <Modal />
            </div>
        ) :
            <></>

    )
}