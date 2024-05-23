import DestroyUser from 'http/logout'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'

export default function Logout() {
    destroyCookie(undefined, 'GF')
    sessionStorage.removeItem('GF - data')
    
    const router = useRouter()
    setTimeout(() => {
        router.push('/')
    }, 3000)

    return (
        <div className="w-full h-screen flex items-center justify-center bg-zinc-50">
            <div className="w-80 h-96 border flex flex-col gap-1 justify-center items-center border-gray-200 bg-white rounded-md">
                <svg viewBox="25 25 50 50" className="loader-2">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
        </div>
    )
}