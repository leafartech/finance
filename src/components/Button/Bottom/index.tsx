import { PlusIcon } from "@heroicons/react/24/outline"
import { ModalContext } from "context/modal"
import { useContext } from "react"

interface BottomProps {
    type: 'movimentacoes' | 'goal' | 'planejamentos' | 'projetos'
}

export default function Bottom({ type }: BottomProps) {
    let { modal, setModal, setModalType } = useContext(ModalContext)

    return (
        <button className="fixed sm:absolute right-2 group bottom-2 flex items-center gap-1 text-white bg-purple-700 hover:bg-purple-800 transition rounded-md p-2" onClick={e => {
            setModal(!modal)
            setModalType(type)
        }}>
            <PlusIcon className="h-4 w-4 transition group-hover:rotate-90" />
            {type === 'movimentacoes' ?
                <span className="text-xs font-medium">Nova Movimentação</span>
                :
                type === 'goal' ?
                <span className="text-xs font-medium">Adicionar Meta</span>
                :
                type === 'planejamentos' ?
                <span className="text-xs font-medium">Criar planejamento</span>
                :
                <span className="text-xs font-medium">Adicionar projeto</span>
            }
        </button>
    )
}