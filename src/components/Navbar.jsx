import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-green-600">
          AI Marketing
        </h1>

        {/* Desktop */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/assistant">Assistant</Link>
          <Link to="/history">History</Link>
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
        <div className="md:hidden flex flex-col items-center gap-4 pb-4">
          <Link to="/">Home</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/assistant">Assistant</Link>
          <Link to="/history">History</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;