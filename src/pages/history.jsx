import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/contentApi";

function History({ darkMode, setDarkMode }) {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await API.get("/");
        console.log(response.data);

        setContents(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

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

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-8">
          Content History
        </h1>

        {contents.length === 0 ? (
          <p>No content available.</p>
        ) : (
          contents.map((item) => (
            <div
              key={item.id}
              className={`p-5 mb-5 rounded-lg ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-100"
              }`}
            >
              <h2 className="text-2xl font-bold">
                {item.productName}
              </h2>

              <p>
                <strong>Category:</strong> {item.category}
              </p>

              <p>
                <strong>Prompt:</strong> {item.prompt}
              </p>

              <p className="whitespace-pre-line mt-3">
                {item.generatedContent}
              </p>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default History;