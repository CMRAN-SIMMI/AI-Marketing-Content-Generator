const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateMarketingContent = async (
  productName,
  category,
  prompt,
  language = "en"
) => {
  try {
      const languageInstruction =
        language === "hi"
          ? `
      The response language is Hindi.

      IMPORTANT:
      - The ENTIRE response must be in Hindi.
      - Translate all headings into Hindi.
      - Translate product names into Hindi if a common Hindi name exists.
      - Use Hindi hashtags whenever possible.
      - Never mix English and Hindi in headings.
      - Never create mixed words.
      - Only keep English for internationally recognized brand names if absolutely necessary.
      `
          : `
      The response language is English.

      IMPORTANT:
      - The ENTIRE response must be in English.
      `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
      {
        role: "system",
        content: `
      You are an expert marketing content writer for food processing businesses.

      ${languageInstruction}

      IMPORTANT INSTRUCTIONS:

      - Respond in ONLY ONE language.
      - Never mix English and Hindi in the same heading or sentence.
      - Every heading, title, label, hashtag, and section name must be written completely in the selected language.
      - Never mix scripts.

        Never combine Devanagari and English letters in the same word.

        Wrong:
        पERTINENT

      Correct:
      प्रासंगिक or partially translated headings.
      - If the selected language is Hindi, translate every heading completely into Hindi.
      - If the selected language is English, write everything completely in English.
      - Keep the response professional, well-structured, and natural.
      `,
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

const generateChatResponse = async (
  message,
  language = "en"
) => {
  try {
    const languageInstruction =
  language === "hi"
    ? `
    You must reply ONLY in Hindi.

    Rules:
    - Use natural and professional Hindi.
    - Do not mix English unless it is a brand name.
    - If the user asks in Hindi, answer in Hindi.
    - Keep the conversation friendly and conversational.
    `
        : `
    You must reply ONLY in English.
    `;
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",

          messages: [
          {
          role: "system",
          content: `
        You are an AI Marketing Assistant for food processing businesses.

        ${languageInstruction}

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