import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";

function Generate() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleGenerate = () => {
  if (!input.trim()) {
    setToast({ message: "⚠ Please enter a prompt", type: "error" });
    return;
  }

  setLoading(true);
  setOutput("");

  setTimeout(() => {
    setOutput(
      `✨ AI Generated Marketing Content:\n\n"${input}"`
    );

    setLoading(false);

    setToast({ message: "✅ Content generated successfully", type: "success" });
  }, 1500);
};

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-10">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Generate Marketing Content
        </h1>

        {/* Input */}
        <div className="w-full max-w-xl mb-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt..."
          />
        </div>

        {/* Button */}
        <Button onClick={handleGenerate} disabled={loading}>
          Generate
        </Button>

        {/* Loader */}
        {loading && (
          <div className="mt-6 w-full max-w-xl">
            <Loader />
            <p className="text-center text-gray-500">
              Generating content...
            </p>
          </div>
        )}

        {/* Output */}
        {output && !loading && (
          <div className="mt-6 w-full max-w-xl p-4 bg-gray-100 rounded-md whitespace-pre-line">
            {output}
          </div>
        )}
        {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
)}
      </div>

      <Footer />
    </>
  );
}

export default Generate;