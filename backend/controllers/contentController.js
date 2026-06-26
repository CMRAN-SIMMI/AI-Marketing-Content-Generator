const contents = require("../data/content");

// GET all content
const getAllContent = (req, res) => {
  res.status(200).json(contents);
};
// GET content by ID
const getContentById = (req, res) => {
  const id = parseInt(req.params.id);

  const content = contents.find((item) => item.id === id);

  if (!content) {
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  }

  res.status(200).json(content);
};

// POST new content
const createContent = (req, res) => {
  const {
    productName,
    category,
    prompt,
    generatedContent,
    hashtags,
  } = req.body;

  // Validation
  if (!productName || !category || !prompt) {
    return res.status(400).json({
      success: false,
      message: "Product name, category and prompt are required.",
    });
  }

  const newContent = {
    id: contents.length + 1,
    productName,
    category,
    prompt,
    generatedContent:
  generatedContent ||
  `🌟 Marketing Description

Introducing ${productName}, a premium ${category.toLowerCase()} product crafted with quality and care. Designed to deliver exceptional taste and value, it is the perfect choice for customers looking for freshness, quality, and reliability.

✨ Product Highlights
• Premium Quality
• Fresh Ingredients
• Rich Taste
• Perfect for Everyday Use

📢 Experience the difference today with ${productName}!`,
    hashtags: hashtags || [],
    createdAt: new Date().toISOString(),
  };

  contents.push(newContent);

  res.status(201).json({
    success: true,
    message: "Content created successfully.",
    data: newContent,
  });
};

// PUT update content
const updateContent = (req, res) => {
  const id = parseInt(req.params.id);

  const content = contents.find((item) => item.id === id);

  if (!content) {
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  }

  const {
    productName,
    category,
    prompt,
    generatedContent,
    hashtags,
  } = req.body;

  content.productName = productName || content.productName;
  content.category = category || content.category;
  content.prompt = prompt || content.prompt;
  content.generatedContent =
    generatedContent || content.generatedContent;
  content.hashtags = hashtags || content.hashtags;

  res.status(200).json({
    success: true,
    message: "Content updated successfully.",
    data: content,
  });
};

// DELETE content
const deleteContent = (req, res) => {
  const id = parseInt(req.params.id);

  const index = contents.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Content not found",
    });
  }

  contents.splice(index, 1);

  res.status(204).send();
};

// SEARCH content
const searchContent = (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required.",
    });
  }

  const results = contents.filter(
    (item) =>
      item.productName.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.prompt.toLowerCase().includes(query.toLowerCase())
  );

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  searchContent,
};