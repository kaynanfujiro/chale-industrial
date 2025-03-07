import chaletData from "../../Services/ChaletInfos.json"
import { ChaletCard } from "./ChaletCard"


export const ChaletList = () =>{
    return(
        <div>
            <h1>Nossos Chalés</h1>
            <div>
                {chaletData.map((ChaleProps) => (
                    <ChaletCard key={ChaleProps.Id} ChaleProps={ChaleProps} />
                ))}
            </div>
        </div>
    );
};