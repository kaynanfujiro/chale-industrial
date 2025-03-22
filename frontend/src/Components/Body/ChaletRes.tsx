import { ChaletData } from "../Body/ChaletData";
import { ReservationForms } from "../../Services/ReservationForms";

interface ChaletResProps {
    chale: ChaletData;
    totalPrice: number;
    days: number;
    checkIn: Date | null;
    checkOut: Date | null;
    aluguelId: number; // Adicione aluguelId como prop
}

export const ChaletRes: React.FC<ChaletResProps> = ({ chale, totalPrice, days, checkIn, checkOut, aluguelId }) => {
    return (
        <div className="flex flex-col justify-center items-start border rounded-lg shadow-lg h-auto w-full max-w-[400px] p-6 bg-white hover:shadow-xl transition-shadow duration-300">
            {/* Cabeçalho do Card */}
            <div className="flex justify-center items-center gap-2 border-b-2 pb-4 w-full">
                <p className="text-lg font-semibold text-gray-800">{chale.name}</p>
            </div>
    
            {/* Corpo do Card */}
            <div className="flex flex-col p-4 items-start gap-4 w-full">
                <p className="text-md font-medium text-gray-700">Informações de Preço</p>
                <p className="text-sm text-gray-500">R$ {chale.value} / noite</p>
    
                {days > 0 && (
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-md text-gray-700">{days} noite(s)</p>
                        <p className="text-xl font-bold text-gray-900">
                            Total: R$ {totalPrice.toLocaleString("pt-BR")}
                        </p>
                    </div>
                )}

                <div className="w-full mt-2">
                    <ReservationForms 
                        startDate={checkIn} 
                        endDate={checkOut} 
                        aluguelId={aluguelId} // Passa o aluguelId
                        chale={chale} // Passa os dados do chalé
                        totalPrice={totalPrice} // Passa o preço total
                    />
                </div>

                {/* Mensagem de Aviso */}
                <p className="text-center text-sm text-gray-500 mt-2">
                    Você ainda não será cobrado
                </p>
            </div>
        </div>
    );
};