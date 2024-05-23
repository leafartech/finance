import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import clientPromise from "../../../lib/mongodb";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const db = client.db('BASEDEDADOS')
    const collection = db.collection('finance_apps')

    if (typeof req.body.Nome === 'undefined') return res.send({ message: 'Preencha todos os campos.', error: true })

    let token = ''
    if (req.headers.authorization?.split(' ')[1]) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (token === 'undefined') return res.status(401).send({ message: 'Operação não autorizada.', error: true, unauthorized: true })

    const decodedToken = jwt.decode(token) as JwtPayload

    let email: string | undefined = '';
    if (typeof decodedToken !== 'string' && decodedToken?.email) {
        email = decodedToken.email;
    }

    const data = await collection.findOne({ email })

    if (data === null) return res.status(500).send({ message: 'Tente novamente mais tarde.', error: true })

    if (req.body.modalType === 'movimentacoes') {
        if (req.body.radio === null || req.body.Nome === null || req.body.Data === null) return res.status(500).send({ message: 'Tente novamente mais tarde.', error: true })

        const newData = {
            type: req.body.radio,
            id: req.body.Nome,
            date: req.body.Data,
            amount: parseInt(req.body.Valor)
        }

        let type = req.body.radio === 'Entrada' ? 'positive' : 'negative'
        const newLog = {
            type,
            area: 'Movimentações',
            filter: 'New',
            detail: req.body.Nome,
            detail2: parseInt(req.body.Valor),
            date: req.body.Data
        }

        if (data !== null) {
            data.finance.movimentacoes.unshift(newData)
            data.changeLog.unshift(newLog)
        }
    } else if (req.body.modalType === 'goal') {
        if (req.body.Prazo === null || req.body.Nome === null || req.body.Valor === null) return res.status(500).send({ message: 'Tente novamente mais tarde.', error: true })

        const newData = {
            id: req.body.Nome,
            date: req.body.Prazo,
            createdAt: new Date(),
            amount: parseInt(req.body.Valor),
            quantity: 0,
            description: req.body['Descrição'],
            motivation: req.body['Motivação'],
            progress: 0,
            changeLog: []
        }

        const newLog = {
            type: 'positive',
            area: 'Metas',
            filter: 'New',
            detail: req.body.Nome,
            detail2: parseInt(req.body.Valor),
            date: new Date()
        }

        if (data !== null) {
            data.finance.goals.unshift(newData)
            data.changeLog.unshift(newLog)
        }
    } else if (req.body.modalType === 'projetos') {
        if (req.body.Nome === null) return res.status(500).send({ message: 'Tente novamente mais tarde.', error: true })
        
        const newData = {
            id: req.body.Nome,
            description: req.body.Descrição,
            payment: 0,
            members: [],
            tasks: [],
            status: 'Aguardando aprovação',
            createdAt: new Date(),
            changeLog: []
        }

        if (data !== null) {
            data.projects.unshift(newData)
        }
    }

    await collection.findOneAndUpdate({ email }, {
        $set: {
            "finance": {
                "movimentacoes": data.finance.movimentacoes,
                "goals": data.finance.goals,
                "planejamentos": data.finance.planejamentos
            },
            projects: data.projects,
            "changeLog": data.changeLog
        }
    })

    res.status(200).send({ message: 'Movimentação registrada com sucesso.', error: false, userData: data })
}