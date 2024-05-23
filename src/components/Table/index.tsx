import { Widgets } from "components/Widgets"
import { TrashIcon, MagnifyingGlassIcon, ChevronRightIcon, EllipsisVerticalIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, FormEvent, InputHTMLAttributes, useContext, useEffect, useState } from "react"
import { MessageContext } from "context/message"
import http from "http/index"
import TrGoal from "./TrGoal"
import Link from "next/link"

interface TableProps {
    thead: string[]
    tbody: { id: string, date: string, amount?: number, type?: string, type2?: 'Entrada' | 'Saída', progress?: number, createdAt?: string, quantity?: number, motivation?: string, description?: string, changeLog?: [], data?: {}, members?: {}, status?: 'Aguardando aprovação' | 'Em progresso' | 'Concluído' }[] | undefined
    type: string
    aside?: boolean
}

export default function Table({ tbody, thead, type, aside }: TableProps) {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const [tbodyData, setTbodyData] = useState(tbody)
    const { setFields } = useContext(MessageContext)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        setTbodyData(tbody)
    }, [tbody])

    function searchItem(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setSearch(true)

        let hlp
        if (value.length > 0) {
            hlp = tbodyData?.filter(mov => (mov.id).toLocaleLowerCase().includes(value.toLocaleLowerCase()))

            setTbodyData(hlp)
        } else {
            setTbodyData(tbody)
            setSearch(false)
        }
    }

    function removeItem(id: number) {
        if (typeof tbodyData !== 'undefined') {
            let hlp = tbodyData

            let updatedArr = hlp.filter(mov => mov !== hlp[id])

            setTbodyData(updatedArr)
        }
    }

    async function formSubmited(e: FormEvent) {
        e.preventDefault()
        await http.post('/api/crud/DELETE', { updatedList: tbodyData }).then(res => {
            if (res.data.error) {
                setFields({ type: false, isActived: true, text: res.data.message })
                return
            }

            sessionStorage.setItem('GF - data', JSON.stringify(res.data.userData))
            setFields({ type: true, isActived: true, text: res.data.message })

        }).catch(e => console.log(e))
    }

    if (type === 'projects') {
        return (
            <div className={`rounded-md border border-gray-200`}>
                <>
                    {!aside && (
                        <form className="relative py-3 border flex items-center px-4 text-zinc-600" onSubmit={e => formSubmited(e)}>
                            <MagnifyingGlassIcon className="absolute left-6 w-4 h-4" />
                            <input type="search" onChange={e => searchItem(e)} placeholder="Buscar" className="border-b border-gray-200 outline-none ps-8 rounded-md py-1" />
                            <button type="submit" className="text-blue-700 text-sm font-medium absolute right-4">Salvar</button>
                        </form>
                    )}
                    <div className="grid grid-cols-4 items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
                        <p className="text-zinc-600 font-medium col-span-2">{thead[0]}</p>
                        <p className="text-zinc-600 font-medium text-left">{thead[1]}</p>
                        <p className="text-gray-600 font-medium text-right">{thead[2]}</p>
                    </div>
                </>
                <div>
                    {typeof tbodyData !== 'undefined' && tbodyData.map((tr, index) => (
                        <div className="relative grid grid-cols-4 items-center justify-between px-4 py-8 border-b" key={index}>
                            {index < tbodyData.length && (
                                <span className="absolute -left-2 -top-[11px] text-sm ">
                                    {/* Timeline */}
                                </span>
                            )}
                            <p className="relative col-span-2 flex items-center">
                                <span className={`absolute left-0 w-2 h-2 rounded-full ${tr.status === 'Aguardando aprovação' ? 'bg-yellow-500' : tr.status === 'Em progresso' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
                                <span className="ms-6 pe-4">{tr.id}</span>
                            </p>
                            <p className={`text-xs text-zinc-600`}>
                                <span className={`rounded-full py-1 px-2 ${tr.status === 'Aguardando aprovação' ? 'bg-yellow-200' : tr.status === 'Em progresso' ? 'bg-blue-500' : 'bg-emerald-500'}`}>{tr.status}</span>
                            </p>
                            <p className="text-right text-sm flex justify-end items-center gap-3">
                                {/* <span>{`${tr.date.split('-')[2]} ${months[parseInt(tr.date.split('-')[1]) - 1]} ${tr.date.split('-')[0]}`}</span> */}
                                <Link href={`/projetos/${index+1}`}><ChevronRightIcon className="h-4 w-4 text-blue-500" /></Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={`rounded-md ${type !== 'changeLog' ? 'border border-gray-200' : ''}`}>
            {type !== 'changeLog' && (
                <>
                    {!aside && (
                        <form className="relative py-3 border flex items-center px-4 text-zinc-600" onSubmit={e => formSubmited(e)}>
                            <MagnifyingGlassIcon className="absolute left-6 w-4 h-4" />
                            <input type="search" onChange={e => searchItem(e)} placeholder="Buscar" className="border-b border-gray-200 outline-none ps-8 rounded-md py-1" />
                            <button type="submit" className="text-blue-700 text-sm font-medium absolute right-4">Salvar</button>
                        </form>
                    )}
                    <div className="grid grid-cols-4 items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
                        <p className="text-zinc-600 font-medium col-span-2">{thead[0]}</p>
                        <p className="text-zinc-600 font-medium text-left">{thead[1]}</p>
                        <p className="text-gray-600 font-medium text-right">{thead[2]}</p>
                    </div>
                </>
            )}
            {typeof tbodyData === 'undefined' ?
                <>
                    <div className="w-full flex items-center justify-center py-12">
                        <div className="w-96 h-72 flex items-center justify-center rounded-md py-6 px-4">
                            <div className="loader"></div>
                        </div>
                    </div>
                </>
                :
                <>
                    {tbodyData.length > 0 ?
                        <div>
                            {type === 'money' ?

                                tbodyData.map((tr, index) => (
                                    <div className="relative grid grid-cols-4 items-center justify-between px-4 py-8 border-b" key={index}>
                                        {index < tbodyData.length && (
                                            <span className="absolute -left-2 -top-[11px] text-sm ">
                                                {/* Timeline */}
                                            </span>
                                        )}
                                        <p className="relative col-span-2 flex items-center">
                                            <span className={`absolute left-0 w-2 h-2 rounded-full ${tr.type === 'Entrada' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                                            <span className="ms-6 pe-4">{tr.id}</span>
                                        </p>
                                        <p className={`text-left font-medium ${tr.type === 'Entrada' ? 'text-emerald-600' : 'text-red-600'}`}>R${typeof tr.amount !== 'undefined' && (tr.amount).toLocaleString('pt-br')}</p>
                                        <p className="text-right text-zinc-500 text-sm flex justify-end items-center gap-3">
                                            <span>{`${tr.date.split('-')[2]} ${months[parseInt(tr.date.split('-')[1]) - 1]} ${tr.date.split('-')[0]}`}</span>
                                            <TrashIcon className="h-4 w-4 text-red-500 cursor-pointer" onClick={e => removeItem(index)} />
                                        </p>
                                    </div>
                                ))
                                :
                                <>
                                    {type === 'goals' ?
                                        tbodyData.map((tr, index) => (
                                            <TrGoal
                                                aside={aside}
                                                index={index}
                                                tr={tr}
                                            />
                                        ))
                                        :
                                        tbodyData.filter((trData, index) => index <= 4).map((tr, index) => (
                                            <div className={`px-4 ${index !== 0 && 'py-6'}`} key={index}>
                                                {tr.type === 'Atualização' ?
                                                    <p className={`relative flex flex-col text-gray-600 ps-4 after:absolute after:w-[3px] after:h-full after:left-0 after:rounded-l-3xl after:bg-red-400`}>
                                                        <span className="text-gray-400 text-xs">{tr.date.split('-')[2].substring(0, 2)} de {months[parseInt(tr.date.split('-')[1]) - 1]}, {tr.date.split('-')[0]}</span>
                                                        <span>O seu registro de movimentações foi atualizado. Dados financeiros foram excluídos.</span>
                                                    </p>
                                                    :
                                                    tr.type === 'Movimentação' &&
                                                    <p className={`relative flex flex-col text-gray-600 ps-4 after:absolute after:w-[3px] after:h-full after:left-0 after:rounded-l-3xl ${tr.type2 === 'Entrada' ? 'after:bg-blue-400' : 'after:bg-red-400'}`}>
                                                        <span className="text-gray-400 text-xs">{tr.date.split('-')[2].substring(0, 2)} de {months[parseInt(tr.date.split('-')[1]) - 1]}, {tr.date.split('-')[0]}</span>
                                                        <span>A movimentação "<span className={`font-medium ${tr.type2 === 'Entrada' ? 'text-blue-700' : 'text-red-700'}`}>{tr.id}</span>" foi registrada com sucesso no valor de <span className={`font-medium ${tr.type2 === 'Entrada' ? 'text-blue-700' : 'text-red-700'}`}>R$ {typeof tr.amount !== 'undefined' && tr.amount.toLocaleString('pt-br')}</span>.</span>
                                                    </p>
                                                }
                                            </div>
                                        ))
                                    }
                                </>
                            }
                        </div>
                        :
                        <>
                            {search ?
                                <div className="w-full flex items-center justify-center py-12">
                                    <div className="w-96 border border-purple-200 rounded-md py-6 px-4">
                                        <Widgets.EmptyData type={type} search={true} />
                                    </div>
                                </div>
                                :
                                <div className="w-full flex items-center justify-center py-12">
                                    <div className="w-96 border border-purple-200 rounded-md py-6 px-4">
                                        <Widgets.EmptyData type={type} />
                                    </div>
                                </div>
                            }
                        </>
                    }
                </>
            }
        </div>
    )
}