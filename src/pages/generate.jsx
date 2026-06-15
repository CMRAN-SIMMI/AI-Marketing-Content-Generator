import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Generate() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Generate Marketing Content
        </h1>

        <p className="text-gray-600">
          Product form and AI content generation will be implemented here.
        </p>
      </div>

      <Footer />
    </>
  );
}
export default Generate;