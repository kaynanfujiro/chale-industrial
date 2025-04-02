import { useEffect, useState } from "react";
import { api, BASE_URL } from "../../../api";
import { ReservasData } from "./ReservasData";

export const ReservasList = () => {
  const [reservas, setReservas] = useState<ReservasData[]>([]);
  const [filteredReservas, setFilteredReservas] = useState<ReservasData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para os filtros
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const updateStatus = async (id: number, status: "APROVADO" | "REPROVADO") => {
    try {
      await api.patch(`${BASE_URL}/reservas/${id}`, { status }); 
      const updatedReservas = reservas.map((reserva) =>
        reserva.id === id ? { ...reserva, status } : reserva
      );
      setReservas(updatedReservas);
      applyFilters(updatedReservas);
    } catch (error) {
      console.error(`Erro ao atualizar reserva ${id}:`, error);
    }
  };

  // Função para aplicar os filtros
  const applyFilters = (data = reservas) => {
    let result = [...data];
    
    // Filtro por nome
    if (nameFilter) {
      result = result.filter(reserva => 
        reserva.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    
    // Filtro por status
    if (statusFilter) {
      result = result.filter(reserva => reserva.status === statusFilter);
    }
    
    // Filtro por data de início
    if (startDateFilter) {
      const startDate = new Date(startDateFilter);
      result = result.filter(reserva => new Date(reserva.startDate) >= startDate);
    }
    
    // Filtro por data de fim
    if (endDateFilter) {
      const endDate = new Date(endDateFilter);
      result = result.filter(reserva => new Date(reserva.endDate) <= endDate);
    }
    
    setFilteredReservas(result);
  };

  // Limpar todos os filtros
  const clearFilters = () => {
    setNameFilter("");
    setStatusFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setFilteredReservas(reservas);
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await api.get(`${BASE_URL}/reservas`);
        setReservas(response.data);
        setFilteredReservas(response.data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  // Aplicar filtros sempre que mudar algum dos critérios
  useEffect(() => {
    applyFilters();
  }, [nameFilter, statusFilter, startDateFilter, endDateFilter]);

  if (loading) {
    return <p className="text-center text-xl">Carregando...</p>;
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Lista de Reservas</h2>
      
      {/* Seção de filtros */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Filtrar por nome"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="PENDENTE">PENDENTE</option>
              <option value="APROVADO">APROVADO</option>
              <option value="REPROVADO">REPROVADO</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Data Inicial</label>
            <input
              type="date"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Data Final</label>
            <input
              type="date"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-4 text-right">
          <button
            onClick={clearFilters}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 mr-2"
          >
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Exibir contagem de resultados */}
      <div className="mb-4">
        <p className="text-gray-600">
          Exibindo {filteredReservas.length} de {reservas.length} reservas
        </p>
      </div>

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
            {filteredReservas.length > 0 ? (
              filteredReservas.map((reserva) => (
                <tr key={reserva.id} className="border border-gray-300 text-center">
                  <td className="p-2 border">{reserva.id}</td>
                  <td className="p-2 border">{reserva.name}</td>
                  <td className="p-2 border">{reserva.number}</td>
                  <td className="p-2 border">{reserva.email}</td>
                  <td className="p-2 border">
                    {new Date(reserva.startDate).toLocaleDateString()} -{" "}
                    {new Date(reserva.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border font-semibold">
                    <span 
                      className={`px-2 py-1 rounded text-white ${
                        reserva.status === "APROVADO" 
                          ? "bg-green-500" 
                          : reserva.status === "REPROVADO" 
                          ? "bg-red-500" 
                          : "bg-yellow-500"
                      }`}
                    >
                      {reserva.status}
                    </span>
                  </td>
                  <td className="p-5 border flex justify-center gap-2">
                    <button 
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => updateStatus(reserva.id, "APROVADO")}
                      disabled={reserva.status === "APROVADO"}
                    >
                      Aprovar
                    </button>
                    <button 
                      className="bg-red-500 text-white px-2 py- rounded hover:bg-red-600"
                      onClick={() => updateStatus(reserva.id, "REPROVADO")}
                      disabled={reserva.status === "REPROVADO"}
                    >
                      Reprovar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Nenhuma reserva encontrada com os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};