import { ReactNode } from "react"

interface LabelPadraoProps {
    children: ReactNode; 
}

export const LabelPadrao:React.FC<LabelPadraoProps> = ({children}) => {
    return(
        <label className="flex font-bold text-gray-600 items-start">{children}</label>
    )
}

