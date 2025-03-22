import { FormEvent, useState } from "react";
import { ChaletData } from "../Components/Body/ChaletData";
import { LabelPadrao } from "../Components/RegisterChale/LabelPadrao";

interface ReservationFormsProps {
    startDate: Date | null;
    endDate: Date | null;
    aluguelId: number;
    chale: ChaletData; // Recebe os dados do chalé diretamente do componente pai
    totalPrice: number;
}

export const ReservationForms = ({ startDate, endDate, aluguelId, chale, totalPrice }: ReservationFormsProps) => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    const whatsappNumber = "19996104456"; // Número do WhatsApp
    const url = "http://localhost:3000";

    const generateWhatsAppMessage = () => {
        const checkInFormatted = startDate ? startDate.toLocaleDateString("pt-BR") : "não selecionada";
        const checkOutFormatted = endDate ? endDate.toLocaleDateString("pt-BR") : "não selecionada";
        
        return `Olá! Gostaria de reservar o chalé *${chale.name}*.\n\n
        *Detalhes da Reserva:*\n
        - Check-In: *${checkInFormatted}*\n
        - Check-Out: *${checkOutFormatted}*\n
        - Valor Total: *R$ ${totalPrice.toLocaleString("pt-BR")}*\n\n
        *Dados do Cliente:*\n
        - Nome: *${name}*\n
        - Telefone: *${number}*\n
        - E-mail: *${email}*\n\n
        Por favor, confirme a disponibilidade e envie mais detalhes sobre a reserva. Obrigado!`;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            alert("Por favor, selecione as datas de Check-in e Check-out.");
            return;
        }

        const requestData = {
            name,
            number,
            email,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: "PENDING",
            aluguelId,
        };

        try {
            const response = await fetch(`${url}/reservas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(generateWhatsAppMessage())}`;
                alert("Reserva solicitada com sucesso! Você será redirecionado para o WhatsApp.");
                window.location.href = whatsappLink; // Redireciona para o WhatsApp após o sucesso
            } else {
                console.error("Erro ao tentar reservar");
                alert("Erro ao tentar reservar. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados", error);
            alert("Ocorreu um erro ao enviar a reserva. Tente novamente.");
        }
    };

    return (
        <div className="m-1">
            <h1 className="text-lg font-semibold text-gray-800">Formulário de Reserva</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <LabelPadrao>Nome</LabelPadrao>
                    <input
                        className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"
                        type="text"
                        placeholder="Digite seu Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <LabelPadrao>Número de Telefone</LabelPadrao>
                    <input
                        className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"
                        type="text"
                        placeholder="Ex: 1999987444"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />

                    <LabelPadrao>E-mail</LabelPadrao>
                    <input
                        className="w-[300px] shadow-xl border-solid border-2 border-black rounded-md p-1 hover:border-gray-500"
                        type="text"
                        placeholder="Ex: SeuEmail@Hotmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white w-full mt-4 py-3 rounded-lg font-semibold"
                >
                    Enviar Reserva
                </button>
            </form>
        </div>
    );
};