
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import API from "../api/contentApi";
import AI from "../api/aiApi";

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

    // 1️⃣ Generate content using Gemini
    const aiResponse = await AI.post("/generate", {
      productName,
      category,
      prompt,
    });

    const generatedContent =
      aiResponse.data.generatedContent;

    // 2️⃣ Save generated content to MongoDB
    await API.post("/", {
      productName,
      category,
      prompt,
      generatedContent,
    });

    // 3️⃣ Show content on screen
    setOutput(generatedContent);

    setToast({
      message: "✅ AI Content Generated Successfully",
      type: "success",
    });

  } catch (error) {
    console.error(error);

    setToast({
      message:
        error.response?.data?.message ||
        "❌ Failed to generate AI content",
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
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          darkMode={darkMode}
        />
        </div>

        {/* Category */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            darkMode={darkMode}
          />
        </div>

        {/* Prompt */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label="Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Generate Instagram Caption"
            darkMode={darkMode}
          />
        </div>

        {/* Button */}
        <div className="w-full max-w-xl">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full"
          >
            🚀 Generate Content
          </Button>
        </div>

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
            className={`mt-8 w-full max-w-xl rounded-xl p-6 shadow-lg ${
              darkMode
                ? "bg-gray-900 border border-gray-700 text-white"
                : "bg-white border border-gray-200 text-black"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">
              ✨ Generated Content
            </h2>

            <div className="whitespace-pre-line">
              {output}
            </div>
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