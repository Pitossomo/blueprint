import { ReactElement, ReactNode } from "react"

type toolbarButtonProps = { 
    onClick: () => void,
    children: ReactNode
}

export const ToolbarButton = ( { onClick, children }: toolbarButtonProps): ReactNode => {
    return (
        <button
            className="px-4 py-2 text-lg cursor-pointer bg-blue-600 text-white border border-gray-300 rounded transition duration-300 hover:bg-blue-800"
            onClick={onClick}
        >
            {children}
        </button>
    )
}