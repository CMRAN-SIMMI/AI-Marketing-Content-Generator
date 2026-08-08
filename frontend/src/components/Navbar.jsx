import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaRobot,
  FaHistory,
} from "react-icons/fa";

import { MdDashboard } from "react-icons/md";

import { HiSparkles } from "react-icons/hi2";

import { FiChevronRight } from "react-icons/fi";
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
        className={`fixed inset-0 z-50 md:hidden ${
          darkMode
            ? "bg-gray-950 text-white"
            : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            darkMode
              ? "border-gray-800"
              : "border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold text-green-600">
            AI Marketing
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-72px)] px-5 py-5 space-y-5">

          {/* Profile Card */}
          {isLoggedIn && (
            <div
              className={`rounded-2xl border p-4 flex items-center gap-4 ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold truncate">
                  {user?.name}
                </p>

                <p className="text-sm text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}

          <div className="space-y-2">

            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-green-500/10 text-green-600 font-semibold"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FaHome />
                <span>{t.home}</span>
              </div>

              <FiChevronRight />
            </NavLink>

            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-green-500/10 text-green-600 font-semibold"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <MdDashboard />
                <span>{t.dashboard}</span>
              </div>

              <FiChevronRight />
            </NavLink>

            <NavLink
              to="/generate"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-green-500/10 text-green-600 font-semibold"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <HiSparkles />
                <span>{t.generate}</span>
              </div>

              <FiChevronRight />
            </NavLink>

            <NavLink
              to="/assistant"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-green-500/10 text-green-600 font-semibold"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FaRobot />
                <span>{t.assistant}</span>
              </div>

              <FiChevronRight />
            </NavLink>

            <NavLink
              to="/history"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-green-500/10 text-green-600 font-semibold"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <FaHistory />
                <span>{t.history}</span>
              </div>

              <FiChevronRight />
            </NavLink>

          </div>

          {/* Language */}

         <div
            className={`flex items-center justify-between rounded-xl border px-4 py-4 ${
              darkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🌐</span>

              <div>
                <p className="font-semibold">Language</p>
                <p className="text-xs text-gray-500">
                  Choose your language
                </p>
              </div>
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`rounded-lg px-3 py-2 text-sm border ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Theme */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-between rounded-xl px-4 py-4 transition ${
              darkMode
                ? "hover:bg-gray-800 border border-gray-700"
                : "hover:bg-gray-100 border border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {darkMode ? "☀️" : "🌙"}
              </span>

              <span className="font-semibold">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </div>

            <FiChevronRight />
          </button>
          
          {/* Login / Logout */}

          <hr
            className={`${
              darkMode
                ? "border-gray-700"
                : "border-gray-300"
            }`}
          />

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-4 transition ${
                darkMode
                  ? "hover:bg-red-900/20"
                  : "hover:bg-red-100"
              }`}
            >
              <div className="flex items-center gap-3 text-red-500">
                <span className="text-xl">🚪</span>

                <span className="font-semibold">
                  Logout
                </span>
              </div>

              <FiChevronRight className="text-red-500" />
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-xl bg-green-600 hover:bg-green-700 text-center text-white py-3 font-semibold"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    )}
    </nav>
  );
}

export default Navbar;