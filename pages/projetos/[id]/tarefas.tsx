import Aside from "components/Aside";
import Header from "components/Header";
import ProjectNavbar from "components/Navbar/ProjectNavbar";
import MainGrid from "components/Template/MainGrid";
import System from "components/Template/System";
import Text from "components/Text";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProjectType } from "utils/types/projectsData";

export default function TarefasPage() {
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
                                <Text>Lista de tarefas</Text>
                            </div>
                        </div>
                    </div>
                )}
                <Aside />
            </MainGrid>
        </System>
    )
}