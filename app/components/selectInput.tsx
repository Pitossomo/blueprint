import { ChangeEvent, ReactNode } from "react"

type selectInputProps = { 
    label: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    children: ReactNode
}

export default function SelectInput ( {label, onChange , children}: selectInputProps) {
    return (
        <div className="mr-8 my-4">
            <legend className="text-sm font-bold">{label}</legend>
            <select className="p-4 border border-gray my-2 w-full" onChange={onChange}>
                {children}
            </select>
        </div>
    )
}
