import axios from "axios";

const AuthAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
});

export default AuthAPI;