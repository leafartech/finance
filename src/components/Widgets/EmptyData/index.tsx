import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { EmptyField } from "../EmptyField";
import { useContext } from "react";
import { ModalContext } from "context/modal";

type EmptyDataType = {
    type: string
    search?: boolean
}

export function EmptyData({ type, search }: EmptyDataType) {
    const { modal, setModal, setModalType } = useContext(ModalContext)
    let dataType = ''
    let title = ''
    let paragraph = ''
    let btn = ''
    let href = ''

    switch (type) {
        case 'money':
            dataType = 'money',
                title = 'Sem movimentações',
                paragraph = 'Vejo que você ainda não iniciou o controle das suas movimentação financeiras...',
                btn = 'Dar o primeiro passo',
                href = '/movimentacoes'
            break;
        case 'goals':
            dataType = 'goal',
                title = 'Nenhuma meta',
                paragraph = 'Parece que você ainda não criou nenhum planejamento para o seu futuro... O que está esperando?',
                btn = 'Planejar meu futuro',
                href = '/metas'
            break;
        case 'changeLog':
            dataType = 'changelog',
                title = 'Nenhuma atividade',
                paragraph = 'Comece a utilizar a plataforma e as suas últimas operações irão aparecer aqui.',
                btn = ''
            href = ''
            break;
        case 'projects':
            dataType = 'projects',
            title = 'Sem tarefas',
            paragraph = 'Incie o seu projeto adicionando as primeiras tarefas'
            btn = 'Criar tarefa'
            href = '/projetos'
    }

    if (search) {
        return (
            <div>
                <EmptyField type={'search'} />
                <div className="flex flex-col items-center text-center gap-1">
                    <h2 className="text-xl font-medium">Sem dados</h2>
                    <p className="text-gray-600">Nenhum dado com o nome pesquisado foi encontrado em nosso banco de dados. </p>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <EmptyField type={dataType} />
                <div className="flex flex-col items-center text-center gap-1">
                    <h2 className="text-xl font-medium">{title}</h2>
                    <p className="text-gray-600">{paragraph}</p>
                    {btn.length > 0 && (
                        <button className="overflow-x-hidden flex gap-1 group items-center justify-center w-52 text-white bg-purple-700 hover:bg-purple-800 transition rounded-md p-2" onClick={e => {
                            setModal(!modal)
                            if (type === 'goals') {
                                setModalType('goal')
                            } else if (type === 'money') {
                                setModalType('movimentacoes')
                            } else if (type === 'projects') {
                                setModalType('projects')
                            }
                        }}>
                            <span className="transition group-hover:translate-x-3 text-sm font-medium">{btn}</span>
                            <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-12" />
                        </button>
                    )}
                </div>
            </div>
        )
    }
}