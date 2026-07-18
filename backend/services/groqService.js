const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateMarketingContent = async (
  productName,
  category,
  prompt
) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert marketing content writer for food processing businesses.",
        },
        {
          role: "user",
          content: `
Product Name: ${productName}

Category: ${category}

Task:
${prompt}

Generate:
1. Product Description
2. Promotional Content
3. Social Media Caption
4. Marketing Tagline
5. 5 Relevant Hashtags
`,
        },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};

module.exports = {
  generateMarketingContent,
};