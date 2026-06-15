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
      </section>

      <Footer />
    </>
  );
}

export default Home;