import Aside from 'components/Aside'
import Bottom from 'components/Button/Bottom'
import Header from 'components/Header'
import MainGrid from 'components/Template/MainGrid'
import System from 'components/Template/System'
import Text from 'components/Text'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { UserData } from 'utils/types/userData'
import { FireIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import http from 'http/index'

export default function MetasPage() {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const router = useRouter()
    const [data, setData] = useState<UserData>()
    const [alert, setAlert] = useState<boolean>(false)

    let id = ''
    if (router.query.id && typeof router.query.id === 'string') {
        id = router.query.id
    }

    if (typeof window !== 'undefined') {
        let session = sessionStorage.getItem('GF - data')
        useEffect(() => {
            if (session !== null) {
                setData(JSON.parse(session))
            }
        }, [])
    }

    let shortcut: { description: string, id: string, amount: number, progress: number, quantity: number, motivation: string, date: string, createdAt: string, changeLog: [] } = data?.finance.goals[parseInt(id) - 1] || { id: '', amount: 0, progress: 0, quantity: 0, motivation: '', date: '', createdAt: '', changeLog: [], description: '' }
    const [restante, setRestante] = useState(0)
    useEffect(() => {
        const firstDate: Date = new Date();
        const secondDate: Date = new Date(shortcut.date);

        const diferencaEmMilissegundos: number = Math.abs(Number(firstDate) - Number(secondDate));
        const diferencaEmDias: number = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

        setRestante(Math.ceil(diferencaEmDias))
    }, [shortcut])

    const [updateValue, setUpdateValue] = useState<number>()
    const [success, setSuccess] = useState<string[]>([])

    async function formSubmited(e: FormEvent) {
        e.preventDefault()

        await http.post('/api/crud/UPDATE', { index: id, updateValue }).then(res => {
            if (res.data.error) {
                setSuccess(['Error', 'Erro'])
                return
            }

            setSuccess(['Success', 'Sucesso!'])
            sessionStorage.setItem('GF - data', JSON.stringify(res.data.userData))
            setData(res.data.userData)
        }).catch(e => console.log(e))
    }

    async function excludeGoal(e: FormEvent) {
        e.preventDefault()

        await http.delete(`/api/crud/DELETE/${id}`).then(res => {
            if (res.data.error) {
                return
            }

            sessionStorage.setItem('GF - data', JSON.stringify(res.data.userData))
            router.push('/metas?message=meta-excluida-com-sucesso')
        })
    }

    return (
        <System type="metas" overflow={false}>
            <Header title={`Metas`} />
            <MainGrid>
                {typeof data !== 'undefined' && shortcut.id.length > 0 && (
                    <div className="overflow-y-scroll px-4 border-r pb-12">
                        <div className="relative flex flex-col gap-1 mt-4 px-4">
                            <Link href="/metas" className="flex items-center text-blue-700 text-sm absolute -top-2 left-4 hover:underline">
                                <span>voltar</span>
                            </Link>
                            <Text>{shortcut.id}</Text>
                            <div className="grid grid-cols-3 gap-3 h-64">
                                <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between gap-3">
                                    <div className="text-gray-600">
                                        <h4>Início</h4>
                                        <h6 className="font-medium">{shortcut.createdAt.split('-')[2].substring(0, 2)} de {months[parseInt(shortcut.createdAt.split('-')[1]) - 1]} {shortcut.createdAt.split('-')[0]}</h6>
                                    </div>
                                    <div className="text-gray-600">
                                        <h4>Data final</h4>
                                        <h6 className="font-medium">{shortcut.date.split('-')[2]} de {months[parseInt(shortcut.date.split('-')[1]) - 1]} {shortcut.date.split('-')[0]}</h6>
                                    </div>
                                    <div className="font-medium text-gray-600">
                                        <h4 className="flex gap-1 items-center "><FireIcon className="h-4 w-4" />Restam</h4>
                                        <h6 className="font-medium">{restante} dias</h6>
                                    </div>
                                </div>
                                <div className="relative border border-gray-200 rounded-md col-span-2 p-4 pt-0 flex flex-col justify-between">
                                    <div>
                                        <Text>Progresso</Text>
                                        <div className="flex gap-2 text-gray-600">
                                            <h4>Total de atualizações:</h4>
                                            <p>{shortcut.changeLog.length}</p>
                                        </div>
                                        <div className="flex gap-2 text-gray-600">
                                            <h4>Motivação:</h4>
                                            <p>{shortcut.motivation}</p>
                                        </div>
                                        <div className="flex gap-2 text-gray-600">
                                            <h4>Meta:</h4>
                                            <p>R$ {shortcut.amount.toLocaleString('pt-br')}</p>
                                        </div>
                                        <div className="flex gap-2 text-gray-600">
                                            <h4>Valor restante:</h4>
                                            <p>R$ {(shortcut.amount - shortcut.quantity).toLocaleString('pt-br')}</p>
                                        </div>
                                    </div>
                                    <div className="relative left-0 w-full h-2 rounded-full bg-gray-100">
                                        <h6 className="absolute -top-7 font-medium text-blue-700" style={{ left: `${shortcut.progress > 5 ? shortcut.progress - 5 : shortcut.progress}%` }}>{shortcut.progress.toFixed(0)}%</h6>
                                        <div className="absolute left-0 h-full bg-blue-500 rounded-full" style={{ width: `${shortcut.progress}%` }}></div>
                                    </div>
                                    <h4 className="absolute top-4 right-4 text-3xl flex items-end gap-1">
                                        <span className="text-sm text-gray-400 -translate-y-[3px]">R$</span>
                                        <span className="font-bold">{shortcut.quantity.toLocaleString('pt-br')}</span>
                                    </h4>
                                </div>
                            </div>
                            <div className="mt-4 px-4 py-8 border border-gray-300 border-dashed rounded-md flex flex-col">
                                <h4>Descrição</h4>
                                <p className="text-gray-600">{shortcut.description}</p>
                            </div>
                            <form className="relative mt-4 px-4 py-8 border border-gray-300 border-dashed rounded-md flex flex-col" onSubmit={e => formSubmited(e)}>
                                {success.length > 0 && <span className="absolute -top-[1px] -right-[1px] font-medium text-white rounded-se-md rounded-bl-md bg-emerald-300 text-xs p-2">Atualizado com sucesso</span>}
                                <h5 className="">Nova atualização</h5>
                                <div className="flex gap-4">
                                    <div className="relative flex flex-col mt-1 w-64">
                                        <h6 className="text-sm mb-1">Valor antigo</h6>
                                        <div className="flex">
                                            <h6 className="bg-gray-100 text-gray-600 text-sm rounded-s p-2 flex items-center">R$</h6>
                                            <input type="" readOnly value={shortcut.quantity} className="outline-none text-sm border rounded-e px-2 text-gray-400 w-full" />
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col mt-1 w-64">
                                        <h6 className="text-sm mb-1">Valor novo</h6>
                                        <div className="flex">
                                            <h6 className="bg-gray-100 text-gray-600 text-sm rounded-s p-2 flex items-center">R$</h6>
                                            <input type="number" value={updateValue} onChange={e => setUpdateValue(Number(e.target.value))} className="outline-none text-sm border rounded-e px-2 text-gray-400 w-full" />
                                            <button type="submit" className="absolute -bottom-4 right-0 text-xs text-blue-700 hover:underline">salvar</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className={`mt-4 px-4 py-8 border border-gray-300 border-dashed rounded-md flex flex-col ${alert && 'bg-red-50 border-red-300'}`}>
                                <button onClick={e => setAlert(!alert)} className="w-24 text-red-700 hover:underline">{alert ? 'Cancelar' : 'Excluir meta'}</button>
                                {alert && (
                                    <form className="mt-2 flex flex-col gap-1" onSubmit={e => excludeGoal(e)}>
                                        <p className="text-red-700 px-[18px] text-sm mt-2">Essa ação não pode ser desfeita.</p>
                                        <p className="text-red-700 px-[18px] text-sm">Todas as informações relacionadas a essa meta serão excluídas do sistema e não poderão mais ser recuperadas.</p>
                                        <p className="text-red-700 px-[18px] text-sm">Tem certeza que deseja continuar?</p>
                                        <div className="mt-2 flex">
                                            <button type="button" className="flex items-center gap-1 text-sm text-blue-700 border border-blue-400 px-3 py-2 rounded ms-[18px] hover:font-medium hover:bg-blue-500 hover:text-white" onClick={e => setAlert(false)}>Cancelar exclusão</button>
                                            <button type="submit" className="flex items-center gap-1 text-sm text-red-700 border border-red-400 px-3 py-2 rounded ms-[18px] hover:font-medium hover:bg-red-500 hover:text-white"><TrashIcon className="h-4 w-4" /> Continuar exclusão</button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                <Aside />
            </MainGrid>
            <Bottom type="goal" />
        </System>
    )
}