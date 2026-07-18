const { generateMarketingContent } = require("../services/groqService");
const generateContent = async (req, res) => {
  try {
    const { productName, category, prompt } = req.body;

    // Validation
    if (!productName || !category || !prompt) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Call Gemini
    const aiResponse = await generateMarketingContent(
      productName,
      category,
      prompt
    );

    res.status(200).json({
      success: true,
      generatedContent: aiResponse,
    });

  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI content.",
    });
  }
};

module.exports = {
  generateContent,
};