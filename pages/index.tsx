import Navbar from "components/Navbar";
import Template from "components/Template";
import Link from "next/link";

export default function Home() {
    return (
        <Template type={false}>
            <div className="flex flex-col gap-3 items-center px-4 sm:max-w-lg text-center">
                <Link href="/conta/entrar" className="text-sm font-semibold text-white sm:text-emerald-400 hover:text-white bg-emerald-500 sm:bg-transparent  hover:bg-emerald-500 transition hover:font-semibold px-12 py-2 border border-emerald-400 rounded-md">Acessar</Link>
            </div>
        </Template>
    )
}