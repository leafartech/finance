import { ArrowDownIcon, ArrowSmallDownIcon, ArrowSmallUpIcon, CurrencyDollarIcon, TrophyIcon } from "@heroicons/react/24/outline"
import { Widgets } from "components/Widgets"

interface AsideTableProps {
    selectedData: string
    tableData: { detail2: number, filter?: string, area?: string, detail: string, date: string, amount: number, type: string, type2: 'Entrada' | 'Saída', progress?: number, createdAt?: string, quantity?: number, motivation?: string, description: string, changeLog?: [] }[] | undefined
}

export default function AsideTable({ tableData, selectedData }: AsideTableProps) {

    return (
        <div>
            {typeof tableData !== 'undefined' && tableData.length > 0 ?
                <div>
                    {tableData.filter((tr, index) => index <= 6).map((row, index) => (
                        row.area === 'Movimentações' ?
                            <div className="grid grid-cols-12 gap-2 items-center py-4" key={index}>
                                <div className={`relative col-span-2 flex items-center justify-center h-12 w-12 rounded-full ${row.type === 'positive' ? 'text-emerald-600 bg-emerald-200' : 'text-red-600 bg-red-200'}`}>
                                    {index > 0 && (
                                        <span className={`absolute -top-[54%] w-[2px] h-[54%] ${row.type === 'positive' ? 'bg-emerald-300' : 'bg-red-300'}`}></span>
                                    )}
                                    <CurrencyDollarIcon className="w-6 h-6" />
                                    <span className={`absolute -bottom-[54%] w-[2px] h-[54%] ${row.type === 'positive' ? 'bg-emerald-300' : 'bg-red-300'}`}></span>
                                </div>
                                <div className="flex flex-col col-span-10">
                                    <p className="text-sm">{row.area}</p>

                                    {row.area === 'Movimentações' ?
                                        <p>A movimentação <span className={`font-medium ${row.type === 'positive' ? 'text-blue-500' : 'text-red-500'}`}>{row.detail}</span> no valor de <span className={`font-medium ${row.type === 'positive' ? 'text-blue-500' : 'text-red-500'}`}>R${row.detail2}</span> foi registrada.</p>
                                        :
                                        <p>A meta <span className="text-blue-500 font-medium">{row.detail}</span> foi registrada com sucesso.</p>
                                    }
                                </div>
                            </div>
                            :
                            <div className="grid grid-cols-12 gap-2 items-center py-4" key={index}>
                                <div className={`relative col-span-2 flex items-center justify-center h-12 w-12 rounded-full ${row.type === 'positive' ? 'text-emerald-600 bg-emerald-200' : 'text-red-600 bg-red-200'}`}>
                                    {index !== 0 && (
                                        <span className={`absolute -top-[54%] w-[2px] h-[54%] ${row.type === 'positive' ? 'bg-emerald-300' : 'bg-red-300'}`}></span>
                                    )}
                                    <TrophyIcon className="w-6 h-6" />
                                    {index > 5 && (
                                        <span className={`absolute -bottom-[54%] w-[2px] h-[54%] ${row.type === 'positive' ? 'bg-emerald-300' : 'bg-red-300'}`}></span>
                                    )}
                                </div>
                                <div className="flex flex-col col-span-10">
                                    <p className="text-sm">{row.area}</p>

                                    {row.area === 'Movimentações' ?
                                        <p>A movimentação <span className={`font-medium ${row.type === 'positive' ? 'text-blue-500' : 'text-red-500'}`}>{row.detail}</span> no valor de <span className={`font-medium ${row.type === 'positive' ? 'text-blue-500' : 'text-red-500'}`}>R${row.detail2}</span> foi registrada.</p>
                                        :
                                        <p>A meta <span className="text-blue-500 font-medium">{row.detail}</span> foi registrada com sucesso.</p>
                                    }
                                </div>
                            </div>
                    ))}
                </div>
                :
                <div className="w-full flex items-center justify-center py-12">
                    <div className="w-96 border border-purple-200 rounded-md py-6 px-4">
                        <Widgets.EmptyData type={selectedData} />
                    </div>
                </div>
            }
        </div>
    )

    // return (
    //     <div className="">
    //         {typeof tableData !== 'undefined' && tableData.length > 0 ?
    //             tableData.filter((trData, index) => index <= 4).map((row, index) => (
    //                 selectedData === 'changeLog' ?
    //                     <div className={`flex justify-center flex-col text-gray-600 border-l-2 ps-3 mt-6 h-20 ${row.type === 'positive' ? 'border-blue-500' : 'border-red-500'}`}>
    //                         <p className="font-medium text-xs text-gray-600">{row.area}</p>
    //                         {row.area === 'Metas' ?
    //                             row.filter === 'New' ?
    //                                 <p>A meta <span className="text-blue-500 font-medium">{row.detail}</span> foi registrada com sucesso.</p>
    //                                 :
    //                                 <p>A meta <span className="text-blue-500 font-medium">{row.detail}</span> foi atualizada com sucesso.</p>
    //                             :
    //                             row.area === 'Movimentações' ?
    //                                 row.filter === 'New' ?
    //                                     <p>A movimentação <span className={`font-medium ${row.type === 'positive' ? 'text-blue-500' : 'text-red-500'}`}>{row.detail}</span> no valor de <span className={`font-medium ${row.type === 'positive' ? 'text-blue-500' : 'text-red-500'}`}>R${row.detail2}</span> foi registrada.</p>
    //                                     :
    //                                     <p>O registro de movimentações foi atualizado.</p>
    //                                 :
    //                                 //Notificações para planejamentos
    //                                 ''
    //                         }
    //                     </div>
    //                     :
    //                     <div className={`px-4 ${index !== 0 && 'py-6'}`} key={index}>
    //                         aq
    //                     </div>
    //             ))
    //             :
    //             <div className="w-full flex items-center justify-center py-12">
    //                 <div className="w-96 border border-purple-200 rounded-md py-6 px-4">
    //                     <Widgets.EmptyData type={selectedData} />
    //                 </div>
    //             </div>
    //         }
    //     </div>
    // )
}