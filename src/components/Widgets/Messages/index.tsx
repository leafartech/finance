import { useContext, useEffect } from "react"
import { MessageContext } from "context/message"
import { XMarkIcon } from "@heroicons/react/24/outline"

export function Messages() {
    const { fields, setFields } = useContext(MessageContext)
    if (fields.isActived) {
        setTimeout(() => {
            setFields({ type: false, isActived: false, text: '' })
        }, 12000)
    }

    return (
        <div className={`z-20 absolute top-8 right-0 rounded-l-lg bg-white py-4 shadow overflow-hidden transition duration-300 ${fields.isActived ? 'opacity-1' : 'opacity-0'}`}>
            <div className={`absolute left-0 top-0 w-[6px] h-full rounded-l-xl ${fields.type ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
            <p className={`ms-6 me-4 flex items-center gap-12 ${fields.type ? 'text-emerald-700' : 'text-red-700'}`}>
                {fields.text}
                {fields.text && <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={e => setFields({ type: false, isActived: false, text: '' })} />}
            </p>
        </div>
    )
}