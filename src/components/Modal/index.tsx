import { XMarkIcon } from "@heroicons/react/24/outline";
import Text from "components/Text";
import { ModalContext } from "context/modal";
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import http from 'http/index'
import { useRouter } from 'next/router'
import { MessageContext } from "context/message";

export default function Modal() {
    const { modalType } = useContext(ModalContext)

    const fields = []
    if (modalType === 'movimentacoes') {
        fields.push(['radio', 'Tipo', ['Entrada', 'Saída']])
        fields.push(['text', 'Nome'])
        fields.push(['date', 'Data'])
        fields.push(['number', 'Valor'])
    } else if (modalType === 'goal') {
        fields.push(['text', 'Nome'])
        fields.push(['text', 'Motivação'])
        fields.push(['textarea', 'Descrição'])
        fields.push(['date', 'Prazo'])
        fields.push(['number', 'Valor'])
    } else if (modalType === 'updateGoal') {
        fields.push(['text', 'Nome'])
        fields.push(['number', 'Meta'])
        fields.push(['number', 'Progresso'])
    } else if (modalType === 'projetos') {
        fields.push(['text', 'Nome'])
        fields.push(['text', 'Descrição'])
        fields.push(['number', 'Valor'])
    }


    const { modal, setModal } = useContext(ModalContext)
    const { setFields } = useContext(MessageContext)
    const { register, handleSubmit, reset } = useForm()
    const router = useRouter()

    async function formSubmited(data: any) {
        await http.post('/api/crud/POST', { ...data, modalType }).then(res => {
            if (res.data.error) {
                setFields({ type: false, isActived: true, text: res.data.message })
                return
            }

            sessionStorage.setItem('GF - data', JSON.stringify(res.data.userData))
            setModal(false)
            setFields({ type: true, isActived: true, text: res.data.message })
            reset()
        }).catch(e => {
            if (e.response?.status === 401) {
                router.push('/conta/entrar?unauthorized=true') //Logar erro na página de login
            }
        })
    }

    return (
        <>
            {modal && (
                <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/80" onClick={e => {
                        setModal(!modal)
                        reset()
                    }}></div>
                    <form onSubmit={handleSubmit(formSubmited)} className="relative rounded border border-gray-200 bg-white w-[442px] z-10">
                        <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
                            <Text>
                                <span>{modalType === 'movimentacoes' ? 'Nova movimentação' : modalType === 'updateGoal' ? 'Atualizar' : modalType === 'goal' ? 'Iniciar nova meta financeira' : 'Novo projeto'}</span>
                            </Text>
                        </div>
                        <button className="absolute top-3 right-3 p-1 border border-gray-400 hover:text-red-700 rounded cursor-pointer group" onClick={e => {
                            setModal(!modal)
                            reset()
                        }}>
                            <XMarkIcon className="h-4 w-4 group-hover:rotate-90 transition" />
                        </button>
                        <div className="p-4">
                            <div className="flex flex-col gap-3">
                                {fields.map((field, index) => (
                                    <div className="flex flex-col gap-1" key={index}>
                                        {field[0] === 'radio' ?
                                            <>
                                                <label className="">{field[1]}</label>
                                                <div className="flex gap-4">
                                                    {typeof field[2] !== 'string' && field[2].map((radio, index2) => (
                                                        <div className="flex items-center gap-1">
                                                            <input required type="radio" value={radio} id={`${index2}`} {...register('radio')} className="bg-purple-700 hover:bg-purple-800" />
                                                            <label htmlFor={`${index2}`} className="text-gray-500">{radio}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                            :
                                            <>
                                                {field[0] === 'textarea' ?
                                                <>
                                                    <label className="text-gray-600">{field[1]} (descreva sua meta)</label>
                                                    <textarea rows={3} required {...register(`${field[1]}`)} className="outline-none border border-gray-300 rounded py-1 px-2 text-gray-500 resize-none" />
                                                </>
                                                :
                                                    <>
                                                        <label className="text-gray-600">{field[1]}</label>
                                                        <input required type={`${field[0]}`} {...register(`${field[1]}`)} className="outline-none border border-gray-300 rounded py-1 px-2 text-gray-500" />
                                                    </>
                                                }
                                            </>
                                        }
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="w-full py-2 flex justify-center mt-3 bg-purple-700 hover:bg-purple-800 rounded text-white font-semibold">{modalType === 'movimentacoes' ? 'Finalizar movimentação' : 'Salvar meta'}</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}