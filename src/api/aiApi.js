import axios from "axios";

const AI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/ai`,
});

// Automatically attach JWT
AI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default AI;