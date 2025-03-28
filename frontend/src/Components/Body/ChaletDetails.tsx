import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { ChaletData } from "./ChaletData";
import Calendar from "../../Services/Calendar";
import { ChaletRes } from "./ChaletRes";
import { VideoModal } from "../../Services/VideoModal";
import { FaVideo } from "react-icons/fa";

export const ChaletDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [chale, setChale] = useState<ChaletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [reservedDates, setReservedDates] = useState<{ startDate: Date; endDate: Date }[]>([]);

  const Url = "http://localhost:3000";

  // Busca os detalhes do chalé
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

    // Busca as reservas específicas do chalé
    const fetchReservas = async () => {
      try {
        console.log(`Buscando reservas para o aluguel ID: ${id}`);
        
        // Importante: certifique-se de que está filtrando pelo aluguelId correto
        const response = await api.get(`/reservas`, {
          params: {
            aluguelId: id
          }
        });
        
        console.log("Reservas encontradas:", response.data);
        
        // Filtra para pegar apenas as reservas APROVADAS
        const approvedReservations = response.data.filter(
          (reserva: any) => reserva.status === "APROVADO"
        );
        
        console.log("Reservas aprovadas:", approvedReservations);
        
        // Converte as datas para objetos Date
        const datesArray = approvedReservations.map((reserva: any) => ({
          startDate: new Date(reserva.startDate),
          endDate: new Date(reserva.endDate),
        }));
        
        console.log("Datas reservadas processadas:", datesArray);
        setReservedDates(datesArray);
      } catch (error) {
        console.error("Erro ao buscar reservas do chalé:", error);
      }
    };

    if (id) {
      fetchChalet();
      fetchReservas();
    }
  }, [id]);

  // Calcula a quantidade de dias entre o check-in e check-out
  const calculateDays = useCallback(() => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const totalPrice = calculateDays() * (chale?.value || 0);

  const handleModal = (image: string | null) => {
    setSelectedImage(image);
    setIsModalOpen(!!image);
  };

  if (loading) return <p className="text-center text-xl">Carregando...</p>;
  if (!chale) return <h1 className="text-center text-2xl font-bold mt-10">Chalé não encontrado!</h1>;

  return (
    <div className="flex flex-col items-start p-2 gap-4">
      <div className="flex flex-col items-start p-4 w-full">
        <h1 className="text-3xl font-bold mb-4">{chale.name}</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <img className="rounded-lg w-full md:w-[400px] h-[300px]" src={`${Url}${chale.imageP}`} alt={chale.name} />
          <div className="grid grid-cols-3 gap-4">
            {chale.images.slice(0, 6).map((image, index) => (
              <img
                key={index}
                className="rounded-lg w-[200px] h-[150px] object-cover cursor-pointer hover:opacity-75"
                src={`${Url}${image}`}
                onClick={() => handleModal(`${Url}${image}`)}
                alt={`Imagem ${index + 1} de ${chale.name}`}
              />
            ))}
          </div>
        </div>
        <p className="text-lg text-gray-700 mt-4">{chale.description}</p>
        <p className="text-2xl font-semibold mt-2">R$ {chale.value} / noite</p>
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="flex items-center justify-center w-[150px] px-4 py-2 mt-4 bg-red-500 hover:bg-red-600 rounded-lg text-white gap-2 transition-colors"
        >
          <FaVideo className="text-lg" /> Ver Vídeo
        </button>
      </div>
      <div className="flex justify-between w-full mt-6">
        <div className="flex-1">
          <p className="text-xl font-bold mb-4">Selecione uma data para alugar</p>
          <Calendar
            onDateChange={(start, end) => {
              setStartDate(start || null);
              setEndDate(end || null);
            }}
            reservedDates={reservedDates} // Passando as reservas do chalé específico
          />
        </div>
        <div className="flex-1 flex justify-end">
          <ChaletRes
            chale={chale}
            totalPrice={totalPrice}
            days={calculateDays()}
            checkIn={startDate}
            checkOut={endDate}
            aluguelId={parseInt(id!, 10)}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50" onClick={() => handleModal(null)}>
          <div className="relative max-w-full max-h-full p-4">
            <img src={selectedImage || ""} alt="Imagem em tela cheia" className="max-w-full max-h-screen" />
            <button className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center" onClick={() => handleModal(null)}>
              &times;
            </button>
          </div>
        </div>
      )}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoUrl={chale.video} />
    </div>
  );
};