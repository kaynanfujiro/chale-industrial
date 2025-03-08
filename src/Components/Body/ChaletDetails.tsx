import { useParams } from "react-router-dom";
import chaletData from "../../Services/ChaletInfos.json";

export const ChaletDetails = () => {
    const { id } = useParams<{ id: string }>();
    const chale = chaletData.find((chale) => chale.Id === parseInt(id || "", 10));
    if (!chale) {
        return <h1 className="text-center text-2xl font-bold mt-10">Chalé não encontrado!</h1>;
    }

    return (
            <div className="flex flex-col items-start p-4">
                <h1 className="text-3xl font-bold mb-4">{chale.Name}</h1>

                <div className="flex flex-col justify-center items-center md:flex-row gap-4">
                    <img 
                        className="rounded-lg w-full md:w-[400px] h-[300px] flex-shrink-0" 
                        src={chale.Image} 
                        alt="Imagem do Chalé"
                    />

                    <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
                        <div className="flex gap-4">
                            <img className="rounded-lg w-[200px] h-[150px]" src={chale.Image} alt="Imagem do Chalé" />
                            <img className="rounded-lg w-[200px] h-[150px]" src={chale.Image} alt="Imagem do Chalé" />
                        </div>
                        <div className="flex gap-4">
                            <img className="rounded-lg w-[200px] h-[150px]" src={chale.Image} alt="Imagem do Chalé" />
                            <img className="rounded-lg w-[200px] h-[150px]" src={chale.Image} alt="Imagem do Chalé" />
                        </div>
                    </div>
                </div>

                <p className="text-lg text-gray-700 mt-4">{chale.Description}</p>
                <p className="text-2xl font-semibold mt-2">R$ {chale.Value}</p>
            </div>
    );
};
