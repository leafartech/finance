import { BanknotesIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/outline"
import Aside from "components/Aside"
import Bottom from "components/Button/Bottom"
import IconCard from "components/Cards/IconCard"
import Header from "components/Header"
import Table from "components/Table"
import MainGrid from "components/Template/MainGrid"
import System from "components/Template/System"
import Text from "components/Text"
import { MessageContext } from "context/message"
import { useContext, useEffect, useState } from "react"
import { UserData } from 'utils/types/userData'

export default function Movimentacoes() {
    const { fields } = useContext(MessageContext)
    const [data, setData] = useState<UserData>()
    const [cardsData, setCardsData] = useState<{income: number, costs: number, profit: number} | null>(null)

    if (typeof window !== 'undefined') {
        let session = sessionStorage.getItem('GF - data')
        useEffect(() => {
            if (session !== null) {
                setData(JSON.parse(session))
            }
        }, [])
    }

    useEffect(() => {
        let session = sessionStorage.getItem('GF - data')
        if (session !== null) {
            setData(JSON.parse(session))
        }
    }, [fields])

    useEffect(() => {
        if (typeof data !== 'undefined') {
            let income = 0
            let costs = 0
            let profit = 0

            data.finance.movimentacoes.map((movimentacao, index) => {
                if (movimentacao.type === 'Entrada') {
                    income += movimentacao.amount
                } else {
                    costs += movimentacao.amount
                }
            })

            profit = income - costs
            setCardsData({income, costs, profit})
        }
    }, [data])

    return (
        <System type="movimentacoes" overflow={false}>
            <Header title="Movimentações" />
            <MainGrid>
                <div className="overflow-y-scroll px-4 border-r pb-12">
                    <div className="mt-4 sm:mx-4 px-4 py-8 border border-gray-300 border-dashed rounded-md">
                        <p className="text-sm text-gray-600">"Um dia" ou "primeiro dia"? A escolha é sempre sua.</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-4 sm:px-4">
                        <Text>Finanças</Text>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <IconCard main={`R$ ${(cardsData?.income)?.toLocaleString('pt-br')}`} subtitle="Receita total">
                                <div className="flex items-center justify-center h-12 w-12 rounded bg-blue-100">
                                    <WalletIcon className="w-4 h-4 text-blue-700" />
                                </div>
                            </IconCard>
                            <IconCard main={`R$ ${(cardsData?.costs)?.toLocaleString('pt-br')}`} subtitle="Gastos totais">
                                <div className="flex items-center justify-center h-12 w-12 rounded bg-red-100">
                                    <CreditCardIcon className="w-4 h-4 text-red-700" />
                                </div>
                            </IconCard>
                            <IconCard main={`R$ ${(cardsData?.profit)?.toLocaleString('pt-br')}`} subtitle="Lucro total">
                                <div className="flex items-center justify-center h-12 w-12 rounded bg-emerald-100">
                                    <BanknotesIcon className="w-4 h-4 text-emerald-700" />
                                </div>
                            </IconCard>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-4 sm:px-4">
                        <Text>
                            Suas movimentações
                        </Text>
                        <Table type="money" tbody={data?.finance?.movimentacoes || []} thead={['Identificação', 'Valor', 'Data']} />
                    </div>
                </div>
                <Aside />
            </MainGrid>
            <Bottom type="movimentacoes" />
        </System >
    )
}