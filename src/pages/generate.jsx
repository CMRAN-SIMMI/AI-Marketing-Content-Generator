
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import API from "../api/contentApi";

function Generate({ darkMode, setDarkMode }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [prompt, setPrompt] = useState("");

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleGenerate = async () => {
  if (
    !productName.trim() ||
    !category.trim() ||
    !prompt.trim()
  ) {
    setToast({
      message: "⚠ Please fill all fields",
      type: "error",
    });
    return;
  }

  try {
    setLoading(true);
    setOutput("");

    const response = await API.post("/", {
      productName,
      category,
      prompt,
    });

    setOutput(response.data.data.generatedContent);

    setToast({
      message: "✅ Content generated successfully",
      type: "success",
    });

  } catch (error) {
    console.error(error);

    setToast({
      message:
        error.response?.data?.message ||
        "❌ Something went wrong",
      type: "error",
    });

  } finally {
    setLoading(false);
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

      <div className="flex-grow flex flex-col items-center px-4 pt-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Generate Marketing Content
        </h1>

        {/* Product Name */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        {/* Category */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>

        {/* Prompt */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Generate Instagram Caption"
          />
        </div>

        {/* Button */}
        <Button
          onClick={handleGenerate}
          disabled={loading}
        >
          Generate
        </Button>

        {/* Loader */}
        {loading && (
          <div className="mt-6 w-full max-w-xl">
            <Loader />
            <p
              className={
                darkMode
                  ? "text-gray-300 text-center"
                  : "text-gray-500 text-center"
              }
            >
              Generating content...
            </p>
          </div>
        )}

        {/* Output */}
        {output && !loading && (
          <div
            className={`mt-6 w-full max-w-xl p-4 rounded-md whitespace-pre-line ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {output}
          </div>
        )}

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Generate;