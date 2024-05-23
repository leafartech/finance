export type ProjectType = {
    id: string
    description: string
    payment: number
    members: {name: string, access: string}[],
    tasks: {name: string, status: string, deadline: string}[]
    status: string
    createdAt: string
    changeLog: []
}