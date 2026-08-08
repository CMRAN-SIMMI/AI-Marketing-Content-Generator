import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-green-600 font-bold"
      : darkMode
      ? "text-white hover:text-green-400"
      : "text-black hover:text-green-600";

  return (
    <nav
      className={`shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">
          AI Marketing
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={linkStyle}>
            {t.home}
          </NavLink>

        <NavLink to="/dashboard" className={linkStyle}>
          {t.dashboard}
        </NavLink>

          <NavLink to="/generate" className={linkStyle}>
            {t.generate}
          </NavLink>

          <NavLink to="/assistant" className={linkStyle}>
            {t.assistant}
          </NavLink>

          <NavLink to="/history" className={linkStyle}>
            {t.history}
          </NavLink>

        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition ${
                darkMode
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <span className="font-medium">
                {user?.name?.split(" ")[0]}
              </span>

              <span>▼</span>
            </button>

            {profileOpen && (
              <div
                className={`absolute right-0 mt-3 w-72 rounded-2xl shadow-xl border z-50 ${
                  darkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold">
                        {user?.name}
                      </p>

                      <p className="text-sm text-gray-500 break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileOpen(false);
                    }}
                    className="w-full rounded-lg bg-red-500 hover:bg-red-600 text-white py-2 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
            <NavLink to="/login" className={linkStyle}>
              {t.login}
            </NavLink>
          )}

         <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`rounded-md px-2 py-1 border text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="en">🇺🇸 English</option>
            <option value="hi">🇮🇳 हिन्दी</option>
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 border rounded-md hover:bg-gray-200 text-sm"
          >
            {darkMode ? `☀️ light` : `🌙 dark`}
          </button>
         

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className={`md:hidden flex flex-col items-center gap-4 pb-4 border-t w-full ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <NavLink
            to="/"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            {t.home}
          </NavLink>

          <NavLink
            to="/dashboard"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            {t.dashboard}
          </NavLink>

          <NavLink
            to="/generate"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            {t.generate}
          </NavLink>

          <NavLink
            to="/assistant"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            {t.assistant}
          </NavLink>

          <NavLink
            to="/history"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            {t.history}
          </NavLink>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-red-500 font-semibold"
            >
              {t.logout}
            </button>
          ) : (
            <NavLink
              to="/login"
              className={linkStyle}
              onClick={() => setIsOpen(false)}
            >
              {t.login}
            </NavLink>
          )}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`rounded-md px-2 py-1 border text-sm ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="en">🇺🇸 English</option>
            <option value="hi">🇮🇳 हिन्दी</option>
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

         


        </div>
      )}
    </nav>
  );
}

export default Navbar;