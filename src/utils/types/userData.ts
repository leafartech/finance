export interface UserData {
    name: string
    email: string
    password: string
    finance: {
        movimentacoes: { id: string; date: string; amount: number; type: string, type2: 'Entrada' | 'Saída' }[], 
        goals: {id: string, progress: number, date: string, quantity: number, description?: string}[],
        planejamentos: {id: string, goal: string, budget: number, spent: number, status: 'Início' | 'Em andamento' | 'Finalizado'}[]
    }
    projects: {
        members: {},
        status: 'Aguardando aprovação' | 'Em progresso' | 'Concluído'
    }[]
    changeLog: []
}