import { ChaletData } from "./ChaletData";

interface ChaletDataProps {
    ChaleProps: ChaletData;
}

export const ChaletCard = ({ChaleProps}: ChaletDataProps) => {
    return (
        <div className="border bg-gray-400">
            <img src={ChaleProps.Image} alt="Imagem Chale" />
            <p>{ChaleProps.Name}</p>
            <p>{ChaleProps.Description}</p>
            <p>{ChaleProps.Value}</p>
        </div>
    );
}