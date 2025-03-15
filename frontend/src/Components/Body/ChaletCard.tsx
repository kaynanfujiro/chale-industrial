import { Link } from "react-router-dom";
import { ChaletData } from "./ChaletData";

interface ChaletDataProps {
    ChaleProps: ChaletData;
}

export const ChaletCard = ({ ChaleProps }: ChaletDataProps) => {

    const Url = 'http://localhost:3000';

    return (
        <Link to={`/chalet/${ChaleProps.id}`}>
            <div className="flex flex-col w-[350px] sm:max-w-none
                h-auto p-4 m-2 gap-3 drop-shadow-lg rounded-xl border border-gray-200 
                hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <img className="rounded-xl w-[300px] h-[250px]" src={`${Url}${ChaleProps.imageP}`} alt="Imagem Chale" />
                <div className="flex flex-col text-start gap-3">
                    <p className="text-lg font-semibold">{ChaleProps.name}</p>
                    <p className="text-gray-500 text-sm">{ChaleProps.description}</p>
                    <p className="text-lg font-bold">R$ {ChaleProps.value}</p>
                </div>
            </div>
        </Link>
    );
};