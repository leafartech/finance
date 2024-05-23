type EmptyFieldType = { type: string }

export function EmptyField({ type }: EmptyFieldType) {
    return (
        <div className="w-full flex items-center justify-center">
            <img src={`./images/illustrations/${type}.png`} alt="Ilustração" className="w-48 h-48" />
        </div>
    )
}