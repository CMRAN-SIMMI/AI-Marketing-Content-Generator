import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

import { FaRobot, FaMicrophone, FaHashtag, FaPenFancy } from "react-icons/fa";

function Home({ darkMode, setDarkMode }) {
  const features = [
    {
      icon: <FaPenFancy />,
      title: "Content Generator",
      description:
        "Generate product descriptions, captions and marketing content instantly.",
    },
    {
      icon: <FaRobot />,
      title: "AI Assistant",
      description:
        "Chat with an AI marketing assistant to create better promotional content.",
    },
    {
      icon: <FaMicrophone />,
      title: "Voice Input",
      description:
        "Describe your product using voice and convert it into marketing content.",
    },
    {
      icon: <FaHashtag />,
      title: "Hashtag Generator",
      description:
        "Generate relevant hashtags and catchy taglines for social media.",
    },
  ];

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
      <Hero darkMode={darkMode} />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2
  className={`text-3xl font-bold text-center mb-10 ${
    darkMode ? "text-white" : "text-black"
  }`}
>
          Powerful AI Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
             darkMode={darkMode} 
            />
          ))}
        </div>
        <section
  className={`py-16 ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gray-100 text-black"
  }`}
>
      <div className="max-w-6xl mx-auto px-4">

        <h2
  className={`text-3xl font-bold text-center mb-12 ${
    darkMode ? "text-white" : "text-black"
  }`}
>
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

        <div className={`p-6 rounded-xl shadow-lg ${
  darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black"
}`}>
          <h3 className="text-xl font-bold mb-3">
            1️⃣ Enter Product Details
          </h3>
          <p>
            Fill in product information such as name,
            category, ingredients and description.
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-lg ${
  darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black"
}`}>
          <h3 className="text-xl font-bold mb-3">
            2️⃣ Generate Content
          </h3>
          <p>
            AI creates marketing captions, product
            descriptions and hashtags instantly.
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-lg ${
  darkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black"
}`}>
          <h3 className="text-xl font-bold mb-3">
            3️⃣ Copy & Share
          </h3>
          <p>
            Use the generated content on social media,
            websites and promotional campaigns.
          </p>
        </div>

      </div>

    </div>
    </section>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Home;
