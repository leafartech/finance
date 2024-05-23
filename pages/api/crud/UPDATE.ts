import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import clientPromise from "../../../lib/mongodb";

export default async function UPDATE(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const db = client.db('BASEDEDADOS')
    const collection = db.collection('finance_apps')

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

    const id = req.body.index - 1
    const newValue = req.body.updateValue

    data.finance.goals[id].changeLog.unshift({
        name: 'Atualização',
        prevValue: data.finance.goals[id].quantity,
        newValue: newValue,
        createdAt: new Date()
    })

    data.finance.goals[id].quantity = newValue
    data.finance.goals[id].progress = newValue / data.finance.goals[id].amount * 100

    const newLog = {
        type: 'positive',
        area: 'Metas',
        filter: 'Update',
        detail: data.finance.goals[id].id,
        detail2: data.finance.goals[id].progress,
        date: new Date()
    }

    data.changeLog.unshift(newLog)

    console.log(data.finance.goals[id])

    await collection.findOneAndUpdate({ email }, {
        $set: {
            "finance": {
                "goals": data.finance.goals,
                "movimentacoes": data.finance.movimentacoes,
            },
            "changeLog": data.changeLog
        }
    })

    res.status(200).send({ message: 'Registros de movimentações atualizadas.', error: false, userData: data })
}