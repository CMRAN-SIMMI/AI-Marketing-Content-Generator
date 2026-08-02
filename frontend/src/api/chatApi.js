import axios from "axios";

const ChatAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/chat`,
});

ChatAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default ChatAPI;