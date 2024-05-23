import { ArrowPathIcon, RectangleStackIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Aside from "components/Aside";
import Bottom from "components/Button/Bottom";
import IconCard from "components/Cards/IconCard";
import Header from "components/Header";
import Table from "components/Table";
import MainGrid from "components/Template/MainGrid";
import System from "components/Template/System";
import Text from "components/Text";
import { useEffect, useState } from "react";
import { UserData } from "utils/types/userData";

export default function Projetos() {
    const [data, setData] = useState<UserData>()
    const [cards, setCards] = useState<number[]>([])

    if (typeof window !== 'undefined') {
        let session = sessionStorage.getItem('GF - data')
        useEffect(() => {
            if (session !== null) {
                setData(JSON.parse(session))
            }
        }, [])
    }

    useEffect(() => {
        let total = data?.projects?.length || 0
        let completed = data?.projects?.filter((plano: { status: string }) => plano.status === 'Em progresso').length || 0
        let progress = data?.projects?.filter((plano: { status: string }) => plano.status === 'Concluído').length || 0

        if (typeof total !== 'undefined' && typeof completed !== 'undefined' && typeof progress !== 'undefined') setCards([total, progress, completed])
    }, [data])

    return (
        <System type="planejamentos">
            <Header title="Planejamentos" />
            <MainGrid>
                <div className="overflow-y-scroll px-4 border-r pb-12">
                    <div className="mt-4 mx-4 px-4 py-8 border border-gray-300 border-dashed rounded-md">
                        <p className="text-sm text-gray-600">"Um dia" ou "primeiro dia"? A escolha é sempre sua.</p>
                    </div>
                    <div className="flex flex-col gap-1 mt-4 px-4">
                        <Text>Resumo</Text>
                        <div className="flex gap-3">
                            <IconCard main={`${cards[0]}`} subtitle="Total de planos">
                                <div className="flex items-center justify-center h-12 w-12 rounded bg-blue-100">
                                    <RectangleStackIcon className="w-4 h-4 text-blue-700" />
                                </div>
                            </IconCard>
                            <IconCard main={`${cards[1]}`} subtitle="Em progresso">
                                <div className="flex items-center justify-center h-12 w-12 rounded bg-blue-100">
                                    <ArrowPathIcon className="w-4 h-4 text-blue-700" />
                                </div>
                            </IconCard>
                            <IconCard main={`${cards[2]}`} subtitle="Finalizados">
                                <div className="flex items-center justify-center h-12 w-12 rounded bg-blue-100">
                                    <ShieldCheckIcon className="w-4 h-4 text-blue-700" />
                                </div>
                            </IconCard>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
                        <Text>Seus projetos</Text>
                        <Table thead={['Nome', 'Status']} tbody={data?.projects} type="projects" />
                    </div>
                </div>
                <Aside />
            </MainGrid>
            <Bottom type="projetos" />
        </System>
    )
}