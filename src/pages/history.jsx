import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function History({ darkMode, setDarkMode }) {
  return (
 <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-white text-black"
      }`}
  >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Content History
        </h1>

        <p className="text-gray-600">
          Previously generated content will be displayed here.
        </p>
      </div>

      <Footer />
    </div>
  );
}
export default History;