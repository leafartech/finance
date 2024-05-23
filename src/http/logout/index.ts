import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'

export default async function DestroyUser() {
    destroyCookie(undefined, 'GF')
    sessionStorage.removeItem('GF - data')
    
    return 
}