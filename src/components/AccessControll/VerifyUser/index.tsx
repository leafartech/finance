import { ReactNode, useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import RepairUser from "http/repairUser"

interface AccessControllVerifyUserProps {
    children: ReactNode
    pageLevel: '1' | '2'
}

export default function AccessControllVerifyUser({ children, pageLevel }: AccessControllVerifyUserProps) {
    const router = useRouter()
    const [allow, setAllow] = useState<boolean>(false)

    let token = null
    token = parseCookies().GF

    if (typeof token === 'undefined') { //Aqui, o token não existe e preciso redirecionar para a tela de login
        useEffect(() => {
            // router.push('/conta/entrar') 
            
        })
    } else { //Aqui, preciso recuperar os dados do usuário
        let user = sessionStorage.getItem('GF - data')
        
        if (user === null) {
            RepairUser(sessionStorage)
        }
        
        if (pageLevel === '2') {
            setAllow(true)
        } else if (user !== null) {
            router.push('/geral')
        }
    }

    if (pageLevel === '2') {
        return (
            <div>
                {allow && {children}}
            </div>
        )
    }

    return (
        <div>
            { children }
        </div>
    )
}