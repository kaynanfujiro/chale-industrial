import axios from "axios";

export const BASE_URL = 'https://api.grupoindustrial.kswebsolutions.com.br'; // URL base para o backend

export const api = axios.create({
  baseURL: BASE_URL, // URL do backend
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;