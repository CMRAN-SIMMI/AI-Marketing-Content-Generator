
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import API from "../api/contentApi";
import AI from "../api/aiApi";
import { useLanguage } from "../context/LanguageContext";

function Generate({ darkMode, setDarkMode }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { t } = useLanguage();
const handleGenerate = async () => {
  if (
    !productName.trim() ||
    !category.trim() ||
    !prompt.trim()
  ) {
    setToast({
      message: t.fillAllFields,
      type: "error",
    });
    return;
  }

  try {
    setLoading(true);
    setOutput("");

    // 1️⃣ Generate content using Groq
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
      message: t.generatedSuccess,
      type: "success",
    });

  } catch (error) {
    console.error(error);

    setToast({
      message:
        error.response?.data?.message ||
        t.generatedFailed,
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
          {t.GenerateContent}
        </h1>

        {/* Product Name */}
        <div className="w-full max-w-xl mb-4">
        <Input
          label={t.productName}
          placeholder={t.enterProductName}
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          darkMode={darkMode}
        />
        </div>

        {/* Category */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label={t.category}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={t.enterCategory}
            darkMode={darkMode}
          />
        </div>

        {/* Prompt */}
        <div className="w-full max-w-xl mb-4">
          <Input
            label={t.prompt}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.promptPlaceholder}
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
            {t.generateContent}
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
              {t.generating}
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
              ✨ {t.generatedContent}
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