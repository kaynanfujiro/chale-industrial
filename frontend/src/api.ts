import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // URL do backend
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAlugueis = async () => {
  try {
    const response = await api.get("/alugueis");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar alugueis", error);
    return [];
  }
};

export default api;