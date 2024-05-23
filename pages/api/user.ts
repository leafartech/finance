import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nookies from 'nookies'

export default async function User(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise
    const db = client.db('BASEDEDADOS')
    const collection = db.collection('finance_apps')

    try {
        if (req.body.type === 'register') { //Usuário está tentando criar uma conta

            //Verificar se usuário já existe.

            let verifyExists = null
            await collection.findOne({email: req.body.email}).then(res => {
                verifyExists = res
            }).catch(e => console.log(e))

            if (verifyExists !== null) return res.send({error: true, message: 'Este usuário já existe.'})

            //Fazer hash da senha com o Bcypt.

            const saltRounds = 10
            const hashedPassword = await bcrypt.hashSync(req.body.password, saltRounds)

            //Criar objeto com os dados do usuário.
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                finance: {movimentacoes: [], goals: []},
                projects: {
                    members: {},
                    data: {}
                },
                changeLog: []
            }

            await collection.insertOne({ ...newUser })
            
            //Criando token de acesso

            await GenerateAccessToken(req.body.email, res)

            res.send({user: newUser, error: false, message: 'Usuário criado com sucesso!'})
        } else {
            
            //Verificar se usuário existe
            const user = await collection.findOne({email: req.body.email})

            if (user === null) return res.send({error: true, message: 'Usuário não existe.'})

            //Verificar se a senha está válida
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
            
            if (!isPasswordCorrect) return res.send({error: true, message: 'Senha inválida.'})

            //Gerando token de acesso
            await GenerateAccessToken(req.body.email, res)

            res.status(200).send({error: false, message: 'Login efetuado com sucesso!', user})
        }


    } catch(e) {
        console.log(e)
        res.send('Server error')
    }
}

async function GenerateAccessToken(email: string, res: NextApiResponse) {
    const payload = {email}
    const SECRET_KEY = `${process.env.SECRET_KEY}`
    const token = jwt.sign(payload, SECRET_KEY)
    nookies.set({ res }, 'GF', token, {
        maxAge: 60 * 60 * 24 * 7, //Access_token 7 days
        path: '/'
    })
}