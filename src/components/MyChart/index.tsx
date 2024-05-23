import { ArrowUpCircleIcon, ArrowDownCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { UserData } from 'utils/types/userData';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface MyChartProps {
    value: number
    title: string
    qtd: number
    type: 'positive' | 'negative'
    data: number[]
    categories: string[]
}

export default function MyChart({ categories, data, title, value, type, qtd }: MyChartProps) {
    if (data.length === 1) {
        var series = [{
            name: 'sales',
            data: [...data, 0]
        }]
    } else {
        var series = [{
            name: 'sales',
            data: [...data]
        }]
    }

    let colors = type === 'positive' ? ["rgb(52, 211, 153)"] : ["rgb(251, 113, 133)"]

    const opt = {
        chart: {
            id: "area",
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        toolbar: {
            show: false
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            y: {
                formatter: (value: number) => {
                    return `R$${value}`
                }
            }
        },
        stroke: {
            show: true,
            width: 2
        },
        grid: {
            borderColor: "rgb(255, 255, 255)"
        },
        colors,
        yaxis: {
            labels: {
                show: false,
                formatter: (value: number) => { return `R$${value}` }
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            categories: [...categories]
        }
    }
    return (
        <div className="relative border border-gray-200 rounded-md h-40 p-4 overflow-hidden">
            <div className="flex items-center flex-row gap-4">
                {type === 'positive' ?
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-emerald-100">
                        <ArrowUpCircleIcon className="h-6 w-6 text-emerald-400" />
                    </div>
                    :
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-rose-100">
                        <ArrowDownCircleIcon className="h-6 w-6 text-rose-400" />
                    </div>
                }
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold">{value}</h3>
                    <h5 className="text-gray-600 text-base">{title}</h5>
                </div>
                <div className={`absolute top-4 right-4 cursor-pointer text-gray-600 group`}>
                    <span className="group-hover:block hidden absolute -right-1 z-10 -top-1 text-sm font-medium capitalize w-28 text-center bg-gray-100 py-[2px] px-3 rounded-md border border-gray-200">{qtd} {qtd > 1 ? 'Registros' : 'Registro'}</span>
                    <EllipsisVerticalIcon className="w-5 h-5" />
                </div>
            </div>
            <div className="absolute -bottom-[30px] -left-[22px]" style={{ width: 'calc(100% + 34px)' }}>
                <ApexCharts
                    options={opt}
                    series={series}
                    type="area"
                    width="100%"
                    height={100}
                />
            </div>
        </div>
    )
}