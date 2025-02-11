import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string, // URL de tu API
  timeout: 10000, // Tiempo máximo de espera en ms
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
