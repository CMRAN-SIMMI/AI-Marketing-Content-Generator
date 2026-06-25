// function Hero() {
//   return (
//     <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-24">

//       <div className="max-w-5xl mx-auto text-center px-4">

//         <h1 className="text-5xl font-bold mb-6">
//           🚀 AI Marketing Content Generator
//         </h1>

//         <p className="text-xl mb-8">
//           Generate product descriptions, social media captions,
//           taglines and hashtags for food processing businesses.
//         </p>

//         <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
//           Start Generating
//         </button>

//       </div>
//     </section>
//   );
// }

// export default Hero;


function Hero({ darkMode }) {
  return (
    <section
      className={`py-24 text-white ${
        darkMode
          ? "bg-gradient-to-r from-gray-900 to-gray-800"
          : "bg-gradient-to-r from-green-600 to-emerald-500"
      }`}
    >
      <div className="max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-6">
          🚀 AI Marketing Content Generator
        </h1>

        <p className="text-xl mb-8">
          Generate product descriptions, social media captions,
          taglines and hashtags for food processing businesses.
        </p>

        <button
          className={`px-8 py-3 rounded-lg font-semibold ${
            darkMode
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-white text-green-600 hover:bg-gray-100"
          }`}
        >
          Start Generating
        </button>
      </div>
    </section>
  );
}

export default Hero;