import { FireIcon, TrashIcon } from "@heroicons/react/24/outline";
import http from "http/index";
import { FormEvent, useEffect, useState } from "react";

interface DropdownProps {
    dropdown: boolean
    index: number
    tr: { id: string; date: string; amount: number; type: string; type2: "Entrada" | "Saída"; progress?: number | undefined, createdAt?: string, quantity?: number, motivation?: string, description: string, changeLog?: [] }
    setTr: React.Dispatch<{ id: string; date: string; amount: number; type: string; type2: "Entrada" | "Saída"; progress?: number | undefined, createdAt?: string, quantity?: number, motivation?: string, description: string, changeLog?: [] }>
}

export default function Dropdown({ dropdown, tr, index, setTr }: DropdownProps) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const [success, setSuccess] = useState<string[]>([])
    const [restante, setRestante] = useState(0)
    useEffect(() => {
        const firstDate: Date = new Date();
        const secondDate: Date = new Date(tr.date);

        const diferencaEmMilissegundos: number = Math.abs(Number(firstDate) - Number(secondDate));
        const diferencaEmDias: number = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

        setRestante(Math.ceil(diferencaEmDias))
    }, [])

    const [updateValue, setUpdateValue] = useState<number>(Number(tr.quantity))

    async function formSubmited(e: FormEvent) {
        e.preventDefault()

        await http.post('/api/crud/UPDATE', { index, updateValue }).then(res => {
            if (res.data.error) {
                setSuccess(['Error', 'Erro'])
                return
            }

            setSuccess(['Success', 'Sucesso!'])
            sessionStorage.setItem('GF - data', JSON.stringify(res.data.userData))
            setTr(res.data.userData.finance.goals[index])
        }).catch(e => console.log(e))
    }

    return (
        <div className={`col-span-4 mt-4 p-4 border-t ${dropdown ? 'block' : 'hidden'}`}>
            <div className="w-full grid grid-cols-4 gap-12">
                <div className="flex flex-col gap-2">
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Valor da meta</h5>
                        <h6 className="text-sm">R$ {tr.amount.toLocaleString('pt-br')}</h6>
                    </div>
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Progresso (R$)</h5>
                        <h6 className="text-sm">R$ {tr.quantity!.toLocaleString('pt-br')}</h6>
                    </div>
                </div>
                <div>
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Motivação</h5>
                        <h6 className="text-sm">{tr.motivation}</h6>
                    </div>
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Descrição</h5>
                        <h6 className="text-sm">{tr.description}</h6>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Início</h5>
                        <h6 className="text-sm">{tr.createdAt!.split('-')[2].substring(0, 2)} de {months[parseInt(tr.createdAt!.split('-')[1]) - 1]} {tr.createdAt!.split('-')[0]}</h6>
                    </div>
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Prazo</h5>
                        <h6 className="text-sm">{tr.date.split('-')[2]} de {months[parseInt(tr.date.split('-')[1]) - 1]} {tr.date.split('-')[0]}</h6>
                    </div>
                    <div className="">
                        <h5 className="flex font-medium text-xs text-gray-600"><FireIcon className="h-4 w-4" /> Restam</h5>
                        <h6 className="text-sm">{restante} dias</h6>
                    </div>
                </div>
                <div className="relative">
                    <div className="">
                        <h5 className="font-medium text-xs text-gray-600">Atualizações</h5>
                        <h6 className="text-sm">{tr.changeLog!.length}</h6>
                    </div>
                    <form className="" onSubmit={e => formSubmited(e)}>
                        <h5 className="font-medium text-xs text-gray-600">Nova atualização</h5>
                        <div className="relative flex mt-1 w-32">
                            <h6 className="text-xs bg-gray-200 text-gray-600 font-medium rounded-s px-1 flex items-center">R$</h6>
                            <input type="" value={updateValue} onChange={e => setUpdateValue(Number(e.target.value))} className="outline-none text-sm border rounded-e px-2 text-gray-400 w-full" />
                            <button type="submit" className="absolute -bottom-4 right-0 text-xs text-blue-700 underline">salvar</button>
                        </div>
                    </form>
                    {success[0] === 'Success' && (
                        <h5 className="text-emerald-500 text-sm font-medium mt-5">Atualizado.</h5>
                    )}
                </div>
            </div>
        </div>
    )
}