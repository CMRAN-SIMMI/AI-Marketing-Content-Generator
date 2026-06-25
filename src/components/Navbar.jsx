import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

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
            Home
          </NavLink>

          <NavLink to="/generate" className={linkStyle}>
            Generate
          </NavLink>

          <NavLink to="/assistant" className={linkStyle}>
            Assistant
          </NavLink>

          <NavLink to="/history" className={linkStyle}>
            History
          </NavLink>

          <NavLink to="/login" className={linkStyle}>
            Login
          </NavLink>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 border rounded-md hover:bg-gray-200 text-sm"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
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
            Home
          </NavLink>

          <NavLink
            to="/generate"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            Generate
          </NavLink>

          <NavLink
            to="/assistant"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            Assistant
          </NavLink>

          <NavLink
            to="/history"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            History
          </NavLink>

          <NavLink
            to="/login"
            className={linkStyle}
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>

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