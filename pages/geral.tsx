import Header from "components/Header";
import System from "components/Template/System";
import Text from "components/Text";
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import MainGrid from "components/Template/MainGrid";
import Table from "components/Table";
import Aside from "components/Aside";
import Bottom from "components/Button/Bottom";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "context/message";
import { UserData } from "utils/types/userData";
import Chart from "components/MyChart";
import RadialChart from "components/MyChart/RadialChart";

export default function Geral() {
    const { fields } = useContext(MessageContext)
    const [data, setData] = useState<UserData>()
    const [chartData, setChartData] = useState<number[]>([])
    const [income, setIncome] = useState<number[]>([])
    const [expense, setExpense] = useState<number[]>([])
    const [name, setName] = useState<string[][]>([[], []])

    if (typeof window !== 'undefined') {
        let session = sessionStorage.getItem('GF - data')
        useEffect(() => {
            if (session !== null) {
                setData(JSON.parse(session))
            }
        }, [])
    }

    let incomeQtd: number[] = []
    let expenseQtd = []
    useEffect(() => {
        let incomeHlp: number[] = []
        let expenseHlp: number[] = []
        let namesHlp: string[][] = [[], []]
        data?.finance.movimentacoes.map(movimentacao => {
            if (movimentacao.type === 'Entrada') {
                incomeHlp.push(movimentacao.amount)
                incomeQtd.push(0)
                namesHlp[0].push(movimentacao.id)
            }
            if (movimentacao.type === 'Saída') {
                expenseHlp.push(movimentacao.amount)
                expenseQtd.push(0)
                namesHlp[1].push(movimentacao.id)
            }
        })
        setIncome(...[incomeHlp])
        setExpense(...[expenseHlp])
        setName(...[namesHlp])
        setChartData([incomeQtd.length, expenseQtd.length])
    }, [data])

    useEffect(() => {
        let session = sessionStorage.getItem('GF - data')
        if (session !== null) {
            setData(JSON.parse(session))
        }
    }, [fields])

    return (
        <System type="movimentacoes" overflow={false}>
            <Header title="Início" />
            <MainGrid>
                <div className="overflow-y-scroll px-4 border-r pb-12">
                    <div className="mt-4 sm:mx-4 px-4 py-8 border border-gray-300 border-dashed rounded-md">
                        <p className="text-sm text-gray-600">"Um dia" ou "primeiro dia"? A escolha é sempre sua.</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-4 sm:px-4">
                        <Text>
                            O que você quer fazer?
                        </Text>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/metas" className="flex gap-2 items-center px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:text-blue-700 hover:border-blue-200 transition hover:-translate-y-1">
                                <EyeIcon className="h-4 w-4" />
                                <span>Visualizar metas</span>
                            </Link>
                            <Link href="/movimentacoes" className="flex gap-2 items-center px-4 py-2 border border-gray-200 rounded-md text-gray-600 hover:text-blue-700 hover:border-blue-200 transition hover:-translate-y-1">
                                <PlusIcon className="h-4 w-4" />
                                <span>Histório financeiro</span>
                            </Link>
                        </div>
                    </div>
                    {typeof data !== 'undefined' && data?.finance?.goals.length > 0 && (
                        <div className="flex flex-col gap-1 mt-4 sm:px-4">
                            <Text>
                                Sugestões
                            </Text>
                            <div className="flex flex-col sm:flex-row gap-3 justify-between">
                                {data.finance.goals.filter((goal, index) => index <= 1).map((goal, index: number) => (
                                    <div className="w-full h-44">
                                        <RadialChart
                                            progress={goal.progress}
                                            title={goal.id}
                                            date={goal.date}
                                            index={index}
                                            quantity={goal.quantity}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {typeof data !== 'undefined' && data?.finance?.goals.length > 0 && (
                        <div className="flex flex-col gap-1 mt-4 sm:px-4">
                            <Text>
                                Resumo dos Registros
                            </Text>
                            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
                                {income.length > 0 && (
                                    <>

                                        <Chart categories={name[0].reverse()} title="Faturamento" value={income.reduce((acc, curr) => acc += curr)} data={income.reverse()} type="positive" qtd={chartData[0]} />
                                        <Chart categories={name[1].reverse()} title="Gastos" value={expense.reduce((acc, curr) => acc += curr)} data={expense.reverse()} type="negative" qtd={chartData[1]} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col gap-1 mt-4 sm:px-4">
                        <Text>
                            Suas movimentações
                        </Text>
                        <Table type="money" thead={['Nome', 'Valor', 'Data']} tbody={data?.finance?.movimentacoes || []} />
                    </div>
                </div>
                <Aside />
            </MainGrid>
            <Bottom type="movimentacoes" />
        </System>
    )
}