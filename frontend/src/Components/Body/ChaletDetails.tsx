import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { ChaletData } from "./ChaletData";
import Calendar from "../../Services/Calendar";
import { ChaletRes } from "./ChaletRes";
import { VideoModal } from "../../Services/VideoModal";
import { FaVideo } from "react-icons/fa";
import ReservationButton from "../../Services/ReservationButton";

export const ChaletDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [chale, setChale] = useState<ChaletData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const Url = 'http://localhost:3000';

    // Estado para armazenar as datas selecionadas
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchChalet = async () => {
            try {
                const response = await api.get(`/chalets/${id}`);
                setChale(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do chalé:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChalet();
    }, [id]);

    // Função para calcular a quantidade de dias
    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Converte de ms para dias
    };

    const totalPrice = calculateDays() * (chale?.value || 0);

    // Função para abrir o modal de imagem
    const openModal = (image: string) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    // Função para fechar o modal de imagem
    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    // Função para abrir o modal de vídeo
    const openVideoModal = () => {
        setIsVideoModalOpen(true);
    };

    // Função para fechar o modal de vídeo
    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
    };

    if (loading) {
        return <p className="text-center text-xl">Carregando...</p>;
    }

    if (!chale) {
        return <h1 className="text-center text-2xl font-bold mt-10">Chalé não encontrado!</h1>;
    }

    return (
        <div className="flex flex-col items-start p-2 gap-4">
            <div className="flex flex-col items-start p-4 w-full">
                <h1 className="text-3xl font-bold mb-4">{chale.name}</h1>

                <div className="flex flex-col justify-center items-center md:flex-row gap-4">
                    <img className="rounded-lg w-full md:w-[400px] h-[300px] flex-shrink-0" src={`${Url}${chale.imageP}`} alt={`Imagem do ${chale.name}`} />

                    <div className="grid grid-cols-3 gap-4">
                        {chale.images.slice(0, 6).map((image, index) => (
                            <img
                                key={index}
                                className="rounded-lg w-[200px] h-[150px] object-cover cursor-pointer hover:opacity-75"
                                src={`${Url}${image}`}
                                onClick={() => openModal(`${Url}${image}`)}
                                alt={`Imagem ${index + 1} do ${chale.name}`}
                            />
                        ))}
                    </div>
                </div>

                <p className="text-lg text-gray-700 mt-4">{chale.description}</p>
                <p className="text-2xl font-semibold mt-2">R$ {chale.value} / noite</p>
                <span className="w-full flex justify-center">
                    <button
                        onClick={openVideoModal}
                        className="flex justify-center items-center w-[150px] h-[auto] 
                        mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg 
                        text-white transition-colors gap-2"
                    >
                        <FaVideo className="text-lg" /> Ver Vídeo
                    </button>
                </span>
            </div>

            {/* Seção de Reservas */}
            <div className="flex justify-between w-full mt-6">
                <div className="flex-1">
                    <p className="text-xl font-bold mb-4">Selecione uma data para alugar</p>
                    <Calendar onDateChange={(start, end) => {
                        setStartDate(start || null);
                        setEndDate(end || null);
                    }} />
                </div>

                <div className="flex-1 flex justify-end">
                    <ChaletRes chale={chale} totalPrice={totalPrice} days={calculateDays()} checkIn={startDate} checkOut={endDate} />
                </div>
            </div>

            {/* Modal de Imagem */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
                    onClick={closeModal} // Fecha o modal ao clicar fora da imagem
                >
                    <div className="relative max-w-full max-h-full p-4">
                        <img
                            src={selectedImage || ""}
                            alt="Imagem em tela cheia"
                            className="max-w-full max-h-screen"
                        />
                        <button
                            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                            onClick={closeModal} // Fecha o modal ao clicar no botão
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Vídeo */}
            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={closeVideoModal}
                videoUrl={chale.video}
            />

            {/* Botão de Reserva */}
            <ReservationButton
                message={`Olá, gostaria de reservar o ${chale.name} de ${startDate?.toLocaleDateString()} até ${endDate?.toLocaleDateString()}.`}
            />
        </div>
    );
};