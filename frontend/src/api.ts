import axios from "axios";

export const BASE_URL = "http://31.97.28.66:3000"; // URL base para o backend

export const api = axios.create({
  baseURL: BASE_URL, // URL do backend
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;