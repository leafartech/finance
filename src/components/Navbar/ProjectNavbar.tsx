import { useRouter } from 'next/router'
import Link from 'next/link'


export default function ProjectNavbar() {
    const router = useRouter()
    let id = ''
    if (router.query.id && typeof router.query.id === 'string') {
        id = router.query.id
    }

    return (
        <nav className="mb-3 mt-3 border-b border-zinc-300">
            <ul className="flex gap-4">
                <li>
                    <Link href={`/projetos/${id}`} className={`hover:text-blue-700 relative ${router.pathname === `/projetos/[id]` && 'bottom-line'}`}>Geral</Link>
                </li>
                <li>
                    <Link href={`/projetos/${id}/tarefas`} className={`hover:text-blue-700 relative ${router.pathname === `/projetos/[id]/tarefas` && 'bottom-line'}`}>Tarefas</Link>
                </li>
                <li>
                    <Link href={`/projetos/${id}/configuracoes`} className={`hover:text-blue-700 relative ${router.pathname === `/projetos/[id]/configuracoes` && 'bottom-line'}`}>Configurações</Link>
                </li>
            </ul>
        </nav>
    )
}