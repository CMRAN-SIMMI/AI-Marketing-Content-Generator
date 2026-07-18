import axios from "axios";

const AI = axios.create({
  baseURL: "http://localhost:5000/api/ai",
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