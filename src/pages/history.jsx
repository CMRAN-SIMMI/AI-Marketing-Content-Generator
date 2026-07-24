import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/contentApi";

function History({ darkMode, setDarkMode }) {
  const [contents, setContents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newPrompt, setNewPrompt] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await API.get("/");
        

        setContents(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
  try {
    await API.delete(`/${id}`);

    setContents((prevContents) =>
      prevContents.filter((item) => item._id !== id)
    );

    alert("Content deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to delete content.");
  }
};
const handleEdit = (item) => {
  setEditing(item);
  setNewPrompt(item.prompt);
};
const handleUpdate = async () => {
  try {
    const response = await API.put(`/${editing._id}`, {
      ...editing,
      prompt: newPrompt,
    });

    setContents((prev) =>
      prev.map((item) =>
        item._id === editing._id ? response.data.data : item
      )
    );

    setEditing(null);
    alert("Content updated successfully!");
  } catch (err) {
    console.error(err);
  }
};

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
        <div
          className={`rounded-xl shadow-lg p-10 text-center ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="text-6xl mb-4">📂</div>

          <h2 className="text-2xl font-bold mb-2">
            No Marketing Content Yet
          </h2>

          <p
            className={`mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            You haven't generated any AI marketing content yet.
            Start by creating your first marketing campaign.
          </p>

          <button
            onClick={() => navigate("/generate")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Generate Content
          </button>
        </div>
      ) : (
          contents.map((item) => (
            <div
              key={item._id}
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
              <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => setDeleteId(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>

            </div>
          ))
        )}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Prompt</h2>

            <input
              className="border w-full p-2"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`w-96 rounded-xl p-6 shadow-xl ${
              darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-3">
              ⚠ Delete Content
            </h2>

            <p className="mb-6">
              Are you sure you want to permanently delete this
              marketing content?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default History;