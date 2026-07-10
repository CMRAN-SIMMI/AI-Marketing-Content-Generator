import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import AuthAPI from "../api/authApi";

function Login({ darkMode, setDarkMode }) {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const response = await AuthAPI.post("/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    alert("Login Successful!");

    navigate("/");
  } catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <div
  className={`min-h-screen flex flex-col ${
    darkMode
      ? "bg-gray-950 text-white"
      : "bg-white text-black"
  }`}
>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex-grow flex flex-col items-center pt-10 px-4">
        <div
          className={`w-full max-w-md border rounded-lg p-6 shadow-md ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Login
          </h1>

          <div className="mb-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button onClick={handleLogin}>
              Login
            </Button>
          </div>

         <p
          className={`text-center mt-4 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;