interface FormInputProps {
    name: string
    label: string
    type: string
    value: string | number
    valueChange: (e: string) => void
}

export default function FormInput({ name, value, label, type, valueChange }: FormInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="text-lg text-white">{label}</label>
            <input type={type} value={value} onChange={e => valueChange(e.target.value)} className="border border-gray-400 rounded-md" />
        </div>
    )
}