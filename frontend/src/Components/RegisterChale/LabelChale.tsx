import { ReactNode } from "react"

interface LabelChaleProps {
    children: ReactNode; 
}

export const LabelChale:React.FC<LabelChaleProps> = ({children}) => {
    return(
        <label className="flex font-bold text-gray-600 items-start">{children}</label>
    )
}

