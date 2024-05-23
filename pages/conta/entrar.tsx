import Template from "components/Template";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import axios from 'axios'
import { useState } from "react";
import AccessControllVerifyUser from "components/AccessControll/VerifyUser";
import { useRouter } from "next/router";

//Utilizar hookForm/resolvers para o formulário reconhecer o Schema do Zod

const UserLoginSchema = z.object({
    email: z.string()
        .nonempty('O e-mail é obrigatório.')
        .email('Formato de e-mail inválido.')
        .toLowerCase(),
    password: z.string()
        .min(6, 'A senha precisa de no mínimo 6 caracteres.')
})

//Para ajudar o useForm com as variáveis que o formState possui
type CreateUserFormData = z.infer<typeof UserLoginSchema>

export default function Entrar() {
    const [messages, setMessages] = useState('')
    const router = useRouter()

    //Enviar objeto de configuração dentro do useForm() para que ele reconheça a configuração do schema feito pelo Zod
    //Todos os erros na validação que acontecem estão dentro do useForm
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(UserLoginSchema) //Passar dentro do zodResolver o objeto de configuração
    })

    async function formSubmited(data: any) {
        await axios.post('/api/user', { ...data, type: 'login' }).then((res) => {
            if (res.data.error) {
                setMessages(res.data.message)
                return
            }

            setMessages(res.data.message)
            sessionStorage.setItem('GF - data', JSON.stringify(res.data.user))
            router.push('/geral')
        }).catch(e => console.log(e))

    }

    return (
        <AccessControllVerifyUser pageLevel="1">
            <Template type={false}>
                <Link href="/" className="absolute top-4 left-4 flex items-center gap-1 text-blue-500 font-medium">
                    <ChevronLeftIcon className="h-4 w-4" />
                    <span>Voltar</span>
                </Link>
                <div className="w-full p-4 sm:max-w-sm">
                    <form className="flex flex-col items-center justify-center gap-4 text-zinc-300" onSubmit={handleSubmit(formSubmited)}>
                        <div className="flex flex-col gap-4 items-center">
                            <img src="../images/logo.png" alt="Logo do projeto" className="h-12 w-12" />
                            <h2 className="text-2xl font-semibold text-white">Acessar conta</h2>
                            {messages.length > 0 && <span>{messages}</span>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" {...register('email')} className="flex-1 bg-transparent px-2 py-2 rounded-md border border-zinc-600 outline-none focus:border-gray-500" />
                            {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="password">Senha:</label>
                            <input type="password" id="password" {...register('password')} className="flex-1 bg-transparent px-2 py-2 rounded-md border border-zinc-600 outline-none focus:border-gray-500" />
                            {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}
                        </div>
                        <button type="submit" className="w-full mt-1 bg-emerald-500 hover:bg-emerald-600 transition font-semibold  px-16 py-2 rounded-md text-white">Acessar</button>
                        <div>
                            <p>Ainda não possui uma conta? <Link href="/conta/registrar" className="text-emerald-500 font-medium">Conta gratuita</Link></p>
                        </div>
                    </form>
                </div>
            </Template>
        </AccessControllVerifyUser>
    )
}