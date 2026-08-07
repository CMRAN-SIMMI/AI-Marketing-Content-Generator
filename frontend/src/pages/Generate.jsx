import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import { toast } from "react-hot-toast";
import API from "../api/contentApi";
import AI from "../api/aiApi";
import { useLanguage } from "../context/LanguageContext";

function Generate({ darkMode, setDarkMode }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
 
  const { t, language } = useLanguage();
const handleGenerate = async () => {
  if (
    !productName.trim() ||
    !category.trim() ||
    !prompt.trim()
  ) {
    toast.error(t.fillAllFields);
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
      language,
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

    toast.success(t.generatedSuccess);

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      t.generatedFailed
    );

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
      <div className="text-center mb-10">

        <h1
          className={`text-5xl font-extrabold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          ✨ AI Marketing Generator
        </h1>

        <p
          className={`mt-4 text-lg max-w-2xl mx-auto ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Create engaging product descriptions, promotional content,
          social media captions and marketing copy for your food
          products using Artificial Intelligence.
        </p>

      </div>
      <div
  className={`w-full max-w-3xl rounded-3xl shadow-xl p-8 ${
    darkMode
      ? "bg-gray-900 border border-gray-800"
      : "bg-white border border-gray-200"
  }`}
>

<h2
  className={`text-2xl font-bold mb-8 ${
    darkMode ? "text-white" : "text-gray-900"
  }`}
>
  📦 Product Information
</h2>

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
            className={`mt-10 w-full max-w-3xl rounded-3xl shadow-xl overflow-hidden ${
              darkMode
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200"
            }`}
          >

            {/* Header */}
            <div
              className={`px-6 py-4 flex justify-between items-center ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-green-50"
              }`}
            >
              <h2 className="text-xl font-bold">
                ✨ Generated Marketing Content
              </h2>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Content copied!");
                }}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                📋 Copy
              </button>
            </div>

            {/* AI Response */}
            <div
              className={`p-8 whitespace-pre-line leading-8 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {output}
            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Generate;