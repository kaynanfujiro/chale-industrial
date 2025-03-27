import { useEffect, useState } from "react";
import { api } from "../../api";
import { ChaletCard } from "./ChaletCard";
import { ChaletData } from "./ChaletData";

export const ChaletList = () => {
    const [chalets, setChalets] = useState<ChaletData[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchChalets = async () => {
            try {
                const response = await api.get("/alugueis");
                setChalets(response.data);
            } catch (error) {
                console.error("Erro ao buscar chalés:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChalets();
    }, []);

    if (loading) {
        return <p className="text-center text-xl">Carregando...</p>;
    }

    return (
        <div className="flex flex-col m-4 justify-center items-center">
            <h1 className="text-2xl md:text-4xl m-3 font-mono">Grupo Industrial</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                {chalets.map((ChaleProps) => (
                    <ChaletCard key={ChaleProps.id} ChaleProps={ChaleProps} />
                ))}
            </div>
        </div>
    );
};
