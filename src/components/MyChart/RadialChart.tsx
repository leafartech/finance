import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RadialChartProps {
    title: string
    date: string
    progress: number
    index: number
    quantity: number
}

export default function RadialChart({ title, progress, date, index, quantity }: RadialChartProps) {
    const opt = {
        colors: ['rgba(59, 130, 246, .6)'],
        plotOptions: {
            radialBar: {
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: 5
                    }
                }
            }
        },
        labels: ['Cricket'],
    };

    const [restante, setRestante] = useState(0)
    useEffect(() => {
        const firstDate: Date = new Date();
        const secondDate: Date = new Date(date);

        const diferencaEmMilissegundos: number = Math.abs(Number(firstDate) - Number(secondDate));
        const diferencaEmDias: number = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

        setRestante(Math.ceil(diferencaEmDias))
    }, [])

    return (
        <div className="relative h-full py-5 px-4 border border-gray-200 rounded-md">
            <div className="flex flex-col gap-2 text-gray-600">
                <h3 className="">{title}</h3>
                <h5 className="">{restante} dias restantes</h5>
                <h5 className="text-sm">Progresso: R${quantity}</h5>
            </div>
            <div className="absolute bottom-3 left-0 w-full h-2 px-4">
                <div className="bg-gray-200 w-full h-full rounded-full">
                    <h6 className="absolute -top-6 text-blue-700 text-sm font-semibold" style={{ left: `${progress-10}%`}}>{progress.toFixed(0)}%</h6>
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${progress}%`}}></div>
                </div>
            </div>
            <Link href={`/metas/${index+1}`} className="absolute top-2 right-2 text-blue-700"><ArrowTopRightOnSquareIcon className="h-4 w-4" /> </Link>
        </div>
    )
}