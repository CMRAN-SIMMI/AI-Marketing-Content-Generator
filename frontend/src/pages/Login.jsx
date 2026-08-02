import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Toast from "../components/ui/Toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import AuthAPI from "../api/authApi";

function Login({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const handleLogin = async () => {
    try {
      const response = await AuthAPI.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setToast({
        show: true,
        message: "Login Successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {

      setToast({
        show: true,
        message:
          error.response?.data?.message || "Login Failed",
        type: "error",
      });

    }
  };
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex-grow flex items-center justify-center px-4 py-10">

        <div
          className={`w-full max-w-sm rounded-2xl shadow-xl border p-8 ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >

          <h1 className="text-3xl font-bold text-center">
            Welcome Back!
          </h1>

          <p
            className={`text-center mt-2 mb-8 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Create engaging marketing content with AI. Sign in to continue.
          </p>

          <div className="mb-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              darkMode={darkMode}
            />
          </div>

          <div className="mb-6">
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            darkMode={darkMode}
          />
          </div>

          <div className="w-full">
          <Button
            onClick={handleLogin}
            className="w-full"
          >
            Login
          </Button>
        </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />

            <span
              className={`mx-4 text-sm ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              OR
            </span>

            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className={`w-full flex items-center justify-center gap-3 rounded-lg border py-3 font-medium transition-all duration-200 shadow-sm
            ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FcGoogle size={24} />

            Continue with Google
          </button>

          <p
            className={`text-center mt-8 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign Up
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

export default Login;