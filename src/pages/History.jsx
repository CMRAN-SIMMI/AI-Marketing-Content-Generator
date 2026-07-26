import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/contentApi";
import Modal from "../components/ui/Modal";
import Toast from "../components/ui/Toast";
import AI from "../api/aiApi";

function History({ darkMode, setDarkMode }) {
  const [contents, setContents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({
    productName: "",
    category: "",
    prompt: "",
    generatedContent: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
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

    const handleDelete = async () => {
      try {
        await API.delete(`/${contentToDelete}`);

        setContents((prevContents) =>
          prevContents.filter(
            (item) => item._id !== contentToDelete
          )
        );

        setToast({
          show: true,
          message: "Content deleted successfully!",
          type: "success",
        });

        setShowDeleteModal(false);
        setContentToDelete(null);

      } catch (err) {
        console.error(err);

        setToast({
          show: true,
          message: "Failed to delete content.",
          type: "error",
        });
      }
    };
    const handleEdit = (item) => {
      setEditing(item);

      setEditForm({
        productName: item.productName,
        category: item.category,
        prompt: item.prompt,
        generatedContent: item.generatedContent,
      });
    };
    const handleUpdate = async () => {
      try {

        // 1. Generate NEW AI content
        const aiResponse = await AI.post("/generate", {
          productName: editForm.productName,
          category: editForm.category,
          prompt: editForm.prompt,
        });

        const generatedContent =
          aiResponse.data.generatedContent;

        // 2. Save updated data
        const response = await API.put(
          `/${editing._id}`,
          {
            ...editForm,
            generatedContent,
          }
        );

        // 3. Refresh UI
        setContents((prev) =>
          prev.map((item) =>
            item._id === editing._id
              ? response.data.data
              : item
          )
        );

        setEditing(null);

        setToast({
          show: true,
          message: "Content regenerated successfully!",
          type: "success",
        });

      } catch (err) {
        console.error(err);

        setToast({
          show: true,
          message: "Failed to update content.",
          type: "error",
        });
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
              onClick={() => {
                setContentToDelete(item._id);
                setShowDeleteModal(true);
              }}
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`w-full max-w-2xl rounded-xl shadow-xl p-6 ${
              darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6">
              Edit Marketing Content
            </h2>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={editForm.productName}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    productName: e.target.value,
                  })
                }
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Category
              </label>

              <input
                type="text"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    category: e.target.value,
                  })
                }
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            {/* Prompt */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Prompt
              </label>

              <textarea
                rows={3}
                value={editForm.prompt}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    prompt: e.target.value,
                  })
                }
                className={`w-full p-3 rounded-lg border resize-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            {/* Generated Content */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Generated Content
              </label>

              <textarea
                rows={8}
                value={editForm.generatedContent}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    generatedContent: e.target.value,
                  })
                }
                className={`w-full p-3 rounded-lg border ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-300"
                }`}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditing(null)}
                className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={showDeleteModal}
        title="Delete Content"
        onClose={() => setShowDeleteModal(false)}
        darkMode={darkMode}
      >
        <p className="mb-6">
         ⚠ Are you sure you want to delete this content?
          <br />
          <span className="text-red-500 text-sm">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              ...toast,
              show: false,
            })
          }
        />
      )}
      <Footer />
    </div>
  );
}

export default History;