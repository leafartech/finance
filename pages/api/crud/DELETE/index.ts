import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import clientPromise from "../../../../lib/mongodb";

export default async function DELETE(req: NextApiRequest, res: NextApiResponse) {
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

    let params = req.query

    data.finance.movimentacoes = req.body.updatedList

    // const newLog = {
    //     type: 'negative',
    //     area: 'Movimentações',
    //     filter: 'Delete',
    //     detail: '',
    //     detail2: '',
    //     date: new Date()
    // }

    // data.changeLog.unshift(newLog)

    await collection.findOneAndUpdate({ email }, {
        $set: {
            "finance": {
                "movimentacoes": data.finance.movimentacoes,
                "goals": data.finance.goals
            },
            "changeLog": data.changeLog
        }
    })

    res.status(200).send({ message: 'Registros de movimentações atualizadas.', error: false, userData: data })
}