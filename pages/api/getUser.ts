import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import jwt from 'jsonwebtoken'

interface decodedTokenProps {
    email: string
}

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const db = client.db('BASEDEDADOS')
    const collection = db.collection('finance_apps')

    let token = ''
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    const SECRET_KEY = `${process.env.SECRET_KEY}`
    let decodedToken: decodedTokenProps
    decodedToken = jwt.verify(token, SECRET_KEY) as decodedTokenProps
    const user = await db.collection('finance_apps').findOne({ email: decodedToken.email })

    return res.send(user)
}