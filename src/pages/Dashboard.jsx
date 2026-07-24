import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/contentApi";

function Dashboard({ darkMode, setDarkMode }) {
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await API.get("/");
        setContents(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContents();
  }, []);

  const categories = [
    ...new Set(contents.map((item) => item.category)),
  ];

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

      <div className="max-w-7xl mx-auto w-full px-6 py-10 flex-grow">

        <h1 className="text-4xl font-bold">
          👋 Welcome Back!
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your AI-generated marketing content from one place.
        </p>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-green-600 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold">
              Total Contents
            </h2>

            <p className="text-4xl font-bold mt-3">
              {contents.length}
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold">
              Categories
            </h2>

            <p className="text-4xl font-bold mt-3">
              {categories.length}
            </p>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold">
              Latest Product
            </h2>

            <p className="text-xl font-bold mt-3">
              {contents.length
                ? contents[0].productName
                : "--"}
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/generate")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Generate Content
            </button>

            <button
              onClick={() => navigate("/assistant")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              AI Assistant
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
            >
              View History
            </button>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Recent Activity
          </h2>

          {contents.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className={`rounded-lg p-5 mb-4 shadow ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">
                {item.productName}
              </h3>

              <p>Category: {item.category}</p>

              <p className="text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;