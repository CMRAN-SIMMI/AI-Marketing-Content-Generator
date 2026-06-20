import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

import { FaRobot, FaMicrophone, FaHashtag, FaPenFancy } from "react-icons/fa";

function Home() {
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
    <>
      <Navbar />
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Powerful AI Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">
            1️⃣ Enter Product Details
          </h3>
          <p>
            Fill in product information such as name,
            category, ingredients and description.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">
            2️⃣ Generate Content
          </h3>
          <p>
            AI creates marketing captions, product
            descriptions and hashtags instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
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

      <Footer />
    </>
  );
}

export default Home;