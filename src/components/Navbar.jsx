import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          AI Marketing Content Generator
        </h1>

        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/assistant">Assistant</Link>
          <Link to="/history">History</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;