function FeatureCard({ icon, title, description, darkMode }) {
 return (
  <div
    className={`rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300 ${
      darkMode
        ? "bg-gray-800 text-white"
        : "bg-white text-black"
    }`}
  >
    <div className="text-4xl mb-4 text-green-600">
      {icon}
    </div>

    <h3 className="text-xl font-semibold mb-2">
      {title}
    </h3>

    <p
      className={
        darkMode
          ? "text-gray-300"
          : "text-gray-600"
      }
    >
      {description}
    </p>
  </div>
);
}

export default FeatureCard;