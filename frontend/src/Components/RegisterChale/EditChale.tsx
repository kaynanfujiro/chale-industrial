import { useState, useEffect } from "react";
import { RegisterChale } from "./RegisterChale";
import {BASE_URL } from "../../api";

type ChaleData = {
  id: string;
  name: string;
  description: string;
  type: string;
  value: string;
  imageP?: string;
  images?: string[];
  video?: string;
};

export const EditChale = () => {
  const [searchCode, setSearchCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedChale, setSelectedChale] = useState<ChaleData | null>(null);
  const [recentChales, setRecentChales] = useState<ChaleData[]>([]);

  // Carregar chalés recentes ao montar o componente
  useEffect(() => {
    fetchRecentChales();
  }, []);

  // Buscar lista de chalés recentes
  const fetchRecentChales = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/alugueis`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // Limitar a 6 chalés recentes
        const recentData = data.slice(0, 6).map((chale: any) => ({
          id: chale.id.toString(),
          name: chale.name || "Sem nome",
          description: chale.description || "",
          type: chale.type || "",
          value: chale.value ? chale.value.toString() : "0",
          imageP: chale.imageP || ""
        }));
        setRecentChales(recentData);
      } else {
        console.error("Erro ao buscar chalés recentes");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar um chalé específico pelo ID
  const handleSearch = async () => {
    if (!searchCode.trim()) {
      setErrorMessage("Por favor, informe o código do chalé");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSelectedChale(null);

    try {
      const response = await fetch(`${BASE_URL}/alugueis/${searchCode}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // Formatando os dados conforme esperado pelo componente RegisterChale
        const formattedChale = {
          id: data.id.toString(),
          name: data.name || "",
          description: data.description || "",
          type: data.type || "",
          value: data.value ? data.value.toString() : "0",
          imageP: data.imageP || "",
          images: Array.isArray(data.images) ? data.images : [],
          video: data.video || ""
        };
        setSelectedChale(formattedChale);
      } else if (response.status === 404) {
        setErrorMessage("Chalé não encontrado com este código");
      } else {
        setErrorMessage("Erro ao buscar chalé. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChaleSelection = (chale: ChaleData) => {
    // Quando um chalé é selecionado da lista, buscamos os detalhes completos
    setSearchCode(chale.id);
    handleSearch();
  };

  return (
    <div className="m-4">
      <div className="mb-8 bg-white rounded-lg shadow-md p-6 border-2 border-gray-100">
        <h1 className="text-2xl font-bold mb-6">Buscar e Editar Chalé</h1>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código do Chalé
            </label>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Digite o código do chalé..."
              className="w-full p-2 border-2 border-black rounded-md shadow-sm focus:border-red-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px]"
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {errorMessage && (
          <div className="mt-3 text-red-600 text-sm">{errorMessage}</div>
        )}

        {/* Lista de chalés recentes */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Chalés Recentes</h2>
          {isLoading && recentChales.length === 0 ? (
            <div className="text-gray-500">Carregando chalés recentes...</div>
          ) : recentChales.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentChales.map((chale) => (
                <div
                  key={chale.id}
                  onClick={() => handleChaleSelection(chale)}
                  className={`p-4 border rounded-md cursor-pointer transition-all ${
                    selectedChale?.id === chale.id
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium">{chale.name}</div>
                  <div className="text-sm text-gray-500">
                    Código: {chale.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    Tipo: {chale.type}
                  </div>
                  <div className="text-sm font-medium text-red-600">
                    R$ {parseFloat(chale.value).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  {chale.imageP && (
                    <div className="mt-2 w-full h-[250px] bg-gray-100 overflow-hidden rounded">
                      <img
                        src={chale.imageP.startsWith('/') ? `${BASE_URL}${chale.imageP}` : chale.imageP}
                        alt={chale.name}
                        className="w-full h-[250px]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">Nenhum chalé recente encontrado</div>
          )}
        </div>
      </div>

      {/* Componente de edição */}
      {selectedChale && <RegisterChale chaleToEdit={selectedChale} />}
    </div>
  );
};