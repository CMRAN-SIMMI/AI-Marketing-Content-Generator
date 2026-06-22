import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-green-600 font-bold"
      : "text-black hover:text-green-600";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-green-600">
          AI Marketing
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
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
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
  <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-white border-t border-gray-200 w-full">
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
  </div>
)}
    </nav>
  );
}

export default Navbar;