import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/contentApi";
import Modal from "../components/ui/Modal";
import { toast } from "react-hot-toast";
import AI from "../api/aiApi";
import { Pencil, Trash2, CalendarDays, Copy } from "lucide-react";

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

  const navigate = useNavigate();
  useEffect(() => {
    if (editing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [editing]);
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

        toast.success("Content deleted successfully!");

        setShowDeleteModal(false);
        setContentToDelete(null);

      } catch (err) {
        console.error(err);

        toast.error("Failed to delete content.");
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

      toast.success("Content updated successfully!");

      } catch (err) {
        console.error(err);

        toast.error("Failed to update content.");
      }
    };
  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-white text-black"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex-1 max-w-5xl mx-auto w-full py-10 px-4">
<div className="mb-10">

  <h1
    className={`text-4xl font-bold ${
      darkMode
        ? "text-white"
        : "text-gray-900"
    }`}
  >
    📚 Content History
  </h1>

  <p
    className={`mt-2 ${
      darkMode
        ? "text-gray-400"
        : "text-gray-600"
    }`}
  >
    View, edit and manage all your AI-generated marketing content.
  </p>

</div>

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
  className={`rounded-2xl shadow-lg hover:shadow-2xl mb-8 overflow-hidden transition-all duration-300 hover:scale-[1.01] ${
    darkMode
      ? "bg-gray-900/80 border border-gray-800"
      : "bg-white/90 border border-gray-200 backdrop-blur-sm"
  }`}
>
  {/* Header */}

<div className="flex justify-between items-start mb-6">

  <div>

    <h2
      className={`text-2xl font-bold ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      🍽 {item.productName}
    </h2>

    <p
      className={`mt-2 text-sm ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      AI Generated Marketing Content
    </p>

  </div>

  <span
    className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold"
  >
    {item.category}
  </span>

</div>

  <div className="p-6">

    {/* Prompt */}

    <div className="mb-6">

      <h3 className="font-bold text-lg mb-2">
        <div className="flex items-center gap-2 mb-2">
  <span className="text-xl">📝</span>
  <h3 className="font-semibold text-lg">Prompt</h3>
</div>
      </h3>

      <p
        className={`${
          darkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        {item.prompt}
      </p>

    </div>

    {/* Generated */}

{/* Generated */}

<div>

  <div className="flex items-center gap-2 mb-2">
    <span className="text-xl">✨</span>
    <h3 className="font-semibold text-lg">
      AI Generated Content
    </h3>
  </div>

  <p
    className={`whitespace-pre-line leading-7 ${
      darkMode
        ? "text-gray-300"
        : "text-gray-700"
    }`}
  >
    {item.generatedContent}
  </p>

  {/* Copy Button */}

<button
  onClick={() => {
    navigator.clipboard.writeText(item.generatedContent);
    toast.success("Content copied successfully!");
  }}
  className="flex items-center gap-2 mt-5 text-green-600 hover:text-green-700 font-medium"
>
  <Copy size={18} />
  Copy Content
</button>

</div>

    {/* Footer */}

    <div
  className={`flex justify-between items-center mt-8 pt-6 border-t ${
    darkMode ? "border-gray-700" : "border-gray-200"
  }`}
>
  <span
    className={`text-sm ${
      darkMode ? "text-gray-400" : "text-gray-500"
    }`}
  >
    AI Marketing Content
  </span>

  <div className="flex gap-3">

<button
  onClick={() => handleEdit(item)}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl text-white font-medium"
>
  <Pencil size={18} />
  Edit
</button>

<button
  onClick={() => {
    setContentToDelete(item._id);
    setShowDeleteModal(true);
  }}
  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl text-white font-medium"
>
  <Trash2 size={18} />
  Delete
</button>

    </div>
    </div>
  </div>

</div>
          ))
        )}
      </div>
      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 ${
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
            <hr
              className={`mb-6 ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            />
            <div
              className={`flex items-center gap-2 mt-3 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
            {editing?.createdAt && (
              <div
                className={`flex items-center gap-2 mt-3 text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <CalendarDays size={16} />
                {new Date(editing.createdAt).toLocaleDateString()}
              </div>
            )}
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

            <div
              className={`pt-4 mt-4 border-t flex justify-end gap-4 ${
                darkMode
                  ? "border-gray-700"
                  : "border-gray-200"
              }`}
            >
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
     
      <Footer />
    </div>
  );
}

export default History;