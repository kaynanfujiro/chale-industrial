import chaletData from "../../Services/ChaletInfos.json"
import { ChaletCard } from "./ChaletCard"


export const ChaletList = () => {

    return (
        <div className=" flex flex-col m-4 justify-center items-center">
            <h1 className="text-2xl md:text-4xl m-3 font-mono">Chalés Industriais</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                {chaletData.map((ChaleProps) => (
                    <ChaletCard key={ChaleProps.Id} ChaleProps={ChaleProps} />
                ))}
            </div>
        </div>
    );
};