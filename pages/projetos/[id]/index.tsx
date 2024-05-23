import Aside from "components/Aside"
import Header from "components/Header"
import ProjectNavbar from "components/Navbar/ProjectNavbar"
import MainGrid from "components/Template/MainGrid"
import System from "components/Template/System"
import Text from "components/Text"
import { Widgets } from "components/Widgets"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ProjectType } from "utils/types/projectsData"
import { UserData } from "utils/types/userData"

export default function ProjectPage() {
    const [projectData, setProjectData] = useState<ProjectType>()
    let router = useRouter()

    let id = ''
    if (router.query.id && typeof router.query.id === 'string') {
        id = router.query.id
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && router.query.id && typeof router.query.id === 'string') {
            let session = sessionStorage.getItem('GF - data')
            if (session !== null) {
                setProjectData(JSON.parse(session).projects[parseInt(id) - 1])
            }
        }
    }, [id])

    return (
        <System type="projetos" overflow={false}>
            <Header title={`Projetos`} />
            <MainGrid>
                {typeof projectData !== 'undefined' && (
                    <div className="overflow-y-scroll px-4 border-r pb-12">
                        <div className="relative flex flex-col gap-1 mt-4 px-4">
                            <Link href="/projetos" className="flex items-center text-blue-700 text-sm absolute -top-2 left-4 hover:underline">
                                <span>voltar</span>
                            </Link>
                            <Text>{projectData.id}</Text>
                            <ProjectNavbar />
                            <div className="grid grid-cols-3 gap-3 h-64">
                                <div className="border border-gray-200 rounded-md p-4 flex flex-col justify-between">
                                    <div className="text-gray-600">
                                        <h4>Valor do projeto</h4>
                                        <h6 className="font-medium">{projectData.payment}</h6>
                                    </div>
                                    <div className="text-gray-600">
                                        <h4>Status</h4>
                                        <h6 className="font-medium">{projectData.status}</h6>
                                    </div>
                                    <div className="text-gray-600">
                                        <h4>Quantidade de tarefas</h4>
                                        <h6 className="font-medium">{projectData.tasks.length}</h6>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-md col-span-2 p-4 pt-0 flex flex-col justify-between">
                                    {projectData.tasks.length > 0 ?
                                        <div>
                                            <Text>Tarefas</Text>
                                            <div>
                                                {projectData.tasks.map((task, index) => (
                                                    <div>
                                                        {task.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        :
                                        <div className="relative h-full flex flex-row justify-between p-4">
                                            <div className="flex flex-col justify-start items-start gap-1">
                                                <h2 className="text-xl font-medium">Sem tarefas</h2>
                                                <p className="text-gray-600">Inicie o seu projeto criando as primeiras tarefas.</p>
                                                <button className="overflow-x-hidden text-sm flex gap-1 group items-center justify-center w-44 text-white bg-purple-700 hover:bg-purple-800 transition rounded-md p-1">Criar primeira tarefa</button>
                                            </div>
                                            <img src="../images/illustrations/projects.png" alt="" className="w-52 absolute -right-6 -bottom-8" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Aside />
            </MainGrid>
        </System>
    )
}
{/* <div className="flex flex-col items-center text-center gap-1">
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
</div> */}