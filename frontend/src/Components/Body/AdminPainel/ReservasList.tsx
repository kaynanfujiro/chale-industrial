import { useEffect, useState } from "react";
import { api } from "../../../api";
import { ReservasData } from "./ReservasData";

export const ReservasList = () => {
  const [reservas, setReservas] = useState<ReservasData[]>([]);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:3000/reservas";

  const updateStatus = async (id: number, status: "APROVADO" | "REPROVADO") => {
    try {
      await api.patch(`${url}/${id}`, { status }); 
      setReservas((prevReservas) =>
        prevReservas.map((reserva) =>
          reserva.id === id ? { ...reserva, status } : reserva
        )
      );
    } catch (error) {
      console.error(`Erro ao atualizar reserva ${id}:`, error);
    }
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get(url);
        setReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Carregando...</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Lista de Reservas</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr className="border border-gray-300">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Número</th>
              <th className="p-2 border">E-mail</th>
              <th className="p-2 border">Período</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>

          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id} className="border border-gray-300 text-center">
                <td className="p-2 border">{reserva.id}</td>
                <td className="p-2 border">{reserva.name}</td>
                <td className="p-2 border">{reserva.number}</td>
                <td className="p-2 border">{reserva.email}</td>
                <td className="p-2 border">
                  {new Date(reserva.startDate).toLocaleDateString()} -{" "}
                  {new Date(reserva.endDate).toLocaleDateString()}
                </td>
                <td className="p-2 border font-semibold">{reserva.status}</td>
                <td className="p-5 border flex justify-center gap-2">
                  <button 
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => updateStatus(reserva.id, "APROVADO")}
                  >
                    Aprovar
                  </button>
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => updateStatus(reserva.id, "REPROVADO")}
                  >
                    Reprovar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
