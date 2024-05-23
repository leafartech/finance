import Link from "next/link";
import Table from "components/Table";
import { useContext, useEffect, useState } from "react";
import { UserData } from "utils/types/userData";
import { AsideContext } from "context/aside";
import AsideTable from "components/Table/AsideTable";
import { ModalContext } from "context/modal";

export default function Aside() {
    const { selectedData, setSelectedData } = useContext(AsideContext)
    const { modal } = useContext(ModalContext)
    const [data, setData] = useState<UserData>()
    const [tableData, setTableData] = useState<{ detail2: number, detail: string, date: string, amount: number, type: string, type2: 'Entrada' | 'Saída', progress?: number, createdAt?: string, quantity?: number, motivation?: string, description: string, changeLog?: [] }[] | undefined>()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let session = sessionStorage.getItem('GF - data')
            if (session !== null) {
                setData(JSON.parse(session))
            }
        }
    }, [modal])

    useEffect(() => {
        setTableData(data?.changeLog)
    }, [data, selectedData])

    return (
        <div className="hidden sm:block relative bg-gray-50 px-4 pt-4">
            <AsideTable tableData={tableData} selectedData={selectedData} />
            {/* <div className="flex justify-center mt-6">
                <Link className="text-xs text-blue-700 font-medium" href={`${selectedData === 'goals' ? 'metas' : 'atividade'}`}>Ver mais</Link>
            </div> */}
        </div>
    )
}