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

const generateChatResponse = async (message) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are an AI Marketing Assistant for food processing businesses.

Help users naturally with:

- Product descriptions
- Marketing ideas
- Taglines
- Social media captions
- Branding
- Advertising
- Hashtags
- Food product promotion

Reply conversationally.

Only answer what the user asks.

Do NOT generate all sections unless the user specifically requests them.
          `,
        },

        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 600,
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("Groq Chat Error:", error);
    throw error;
  }
};

module.exports = {
  generateMarketingContent,
  generateChatResponse,
};