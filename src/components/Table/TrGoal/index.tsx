import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Dropdown from "components/Dropdown";
import Link from "next/link";
import { useState } from "react";

interface TrGoalProps {
    tr: { id: string; date: string; amount?: number; type?: string; type2?: "Entrada" | "Saída"; progress?: number | undefined, createdAt?: string, quantity?: number, motivation?: string, description?: string, changeLog?: [] }
    index: number
    aside?: boolean
}

export default function TrGoal({ tr, index, aside }: TrGoalProps) {
    const [dropdown, setDropdown] = useState<boolean>(false)
    const [tableRow, setTableRow] = useState(tr)

    function calcDeadline(deadline: string) {
        const currentData = new Date()
        const deadlineData = new Date(deadline)

        const differenceInMs: number = Math.abs(Number(currentData) - Number(deadlineData));
        const differenceInDays: number = differenceInMs / (1000 * 60 * 60 * 24);

        return Math.ceil(differenceInDays)
    }

    return (
        <>
            <div className="relative grid grid-cols-4 items-center justify-between px-4 py-8 border-b" key={index}>
                <p className="relative flex items-center col-span-2">
                    <div className="bg-blue-700 h-[32px] w-[2px] rounded-full mx-1"></div>
                    <span className="ms-2">{tr.id}</span>
                </p>
                <p className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">{tableRow.progress?.toFixed(0)}%</span>
                    <div className="relative w-24 h-2 bg-gray-200 rounded-full">
                        <div className="bg-blue-500 absolute left-0 h-full rounded-full" style={{ width: `${tableRow.progress}%` }}></div>
                    </div>
                </p>
                <p className="flex items-center justify-end gap-2 text-sm">
                    <span>{calcDeadline(tr.date)} dias</span>
                    <Link href={`/metas/${index + 1}`}><ChevronRightIcon className="h-4 w-4 text-blue-700" /></Link>
                </p>
            </div>
        </>
    )
}