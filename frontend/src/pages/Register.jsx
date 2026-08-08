import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
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
  const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const passwordChecks = {
  length: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
};

const strength =
  Object.values(passwordChecks).filter(Boolean).length;
  const isPasswordValid =
  Object.values(passwordChecks).every(Boolean);

const isFormValid =
  name.trim() &&
  email.trim() &&
  isPasswordValid &&
  password === confirmPassword;
const handleRegister = async () => {
  if (password !== confirmPassword) {
  setToast({
    show: true,
    message: "Passwords do not match.",
    type: "error",
  });
  return;
}
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

          <div className="mb-4">
          <label className="font-medium">Password</label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 pr-12 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
            >
              {showPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="mb-5">
          <div
            className={`h-2 rounded-full ${
              strength <= 2
                ? "bg-red-500"
                : strength <= 4
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${(strength / 5) * 100}%`,
              transition: "0.3s",
            }}
          />

          <p className="text-sm mt-2 font-medium">
            {strength <= 2
              ? "Weak Password"
              : strength <= 4
              ? "Medium Password"
              : "Strong Password"}
          </p>
        </div>

        
        <div className="space-y-1 text-sm mb-5">
          <p>{passwordChecks.length ? "✅" : "❌"} At least 8 characters</p>
          <p>{passwordChecks.uppercase ? "✅" : "❌"} One uppercase letter</p>
          <p>{passwordChecks.lowercase ? "✅" : "❌"} One lowercase letter</p>
          <p>{passwordChecks.number ? "✅" : "❌"} One number</p>
          <p>{passwordChecks.special ? "✅" : "❌"} One special character</p>
        </div>
        <div className="mb-4">
          <label className="font-medium">Confirm Password</label>

          <div className="relative mt-1">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full rounded-lg border px-4 py-3 pr-12 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-black"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition-colors duration-200"
            >
              {showConfirmPassword ? (
                <FiEyeOff size={20} />
              ) : (
                <FiEye size={20} />
              )}
            </button>
          </div>

          {confirmPassword && (
            <p
              className={`mt-2 text-sm ${
                password === confirmPassword
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {password === confirmPassword
                ? "✅ Passwords match"
                : "❌ Passwords do not match"}
            </p>
          )}
        </div>

          <div className="mt-6 flex justify-center">
          <Button
            onClick={handleRegister}
            disabled={!isFormValid}
            className={`w-full ${
              !isFormValid
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
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