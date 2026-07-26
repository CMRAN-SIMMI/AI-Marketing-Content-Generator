import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Toast from "../components/ui/Toast";
import AuthAPI from "../api/authApi";

function Register({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
const handleRegister = async () => {
  try {
    const response = await AuthAPI.post("/register", {
      name,
      email,
      password,
    });

    setToast({
      show: true,
      message: response.data.message,
      type: "success",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (error) {

    setToast({
      show: true,
      message:
        error.response?.data?.message ||
        "Registration failed.",
      type: "error",
    });

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

      <div className="flex-grow flex justify-center items-center px-4">

        <div
          className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
            darkMode
              ? "bg-gray-900"
              : "bg-white"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Register
          </h1>

          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            darkMode={darkMode}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            darkMode={darkMode}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            darkMode={darkMode}
          />

          <div className="mt-6 flex justify-center">
            <Button onClick={handleRegister}>
              Register
            </Button>
          </div>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
        />
)}
      <Footer />
    </div>
  );
}

export default Register;