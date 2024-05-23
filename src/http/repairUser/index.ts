import { parseCookies } from 'nookies'
import axios from 'axios'
import { useRouter } from 'next/router'

export default async function RepairUser(sessionStorage: any) {
    const token = parseCookies().GF
    const router = useRouter()

    let user = null
    await axios.get('/api/getUser', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        sessionStorage.setItem('GF - data', JSON.stringify(res.data))
        return router.reload()
    })

    return user
}